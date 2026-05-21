import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

let _store: typeof import('@/store').store | null = null;
async function getStore() {
  if (!_store) {
    const mod = await import('@/store');
    _store = mod.store;
  }
  return _store;
}

const MAX_RETRIES = 3;

let isRefreshing = false;
let refreshQueue: Array<{ resolve: () => void; reject: (err: unknown) => void }> = [];

function processQueue(error: unknown) {
  refreshQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve()));
  refreshQueue = [];
}

export function resetRefreshFailCount() {}

async function forceLogout() {
  if (typeof window === 'undefined') return;
  const { clearUser } = await import('@/store/slices/authSlice');
  const store = await getStore();
  store.dispatch(clearUser());
  window.location.href = '/login';
}

// ─────────────────────────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ────────────────────────────────────────────────────
interface RetryableConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

api.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (body?.code !== undefined && body.code !== 200) {
      const msg: string = body.message || 'Có lỗi xảy ra';
      toast.error(msg);
      return Promise.reject(new Error(msg));
    }
    return response;
  },
  async (error: AxiosError) => {
    const req = error.config as RetryableConfig | undefined;
    const status = error.response?.status;
    const isRefreshEndpoint = req?.url?.includes('auth/refresh');
    const serverMessage = (error.response?.data as { message?: string })?.message;

    // ── 4xx: refresh token → retry (up to MAX_RETRIES times) then logout ──
    if (status !== undefined && status >= 400 && status < 500 && req && !isRefreshEndpoint) {
      req._retryCount = (req._retryCount ?? 0) + 1;

      if (req._retryCount > MAX_RETRIES) {
        const msg = serverMessage || 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại';
        toast.error(msg);
        await forceLogout();
        return Promise.reject(new Error(msg));
      }

      // If a refresh is already in flight, queue this request and retry after.
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve: () => resolve(api(req)), reject });
        });
      }

      isRefreshing = true;
      try {
        await api.post('auth/refresh');
        processQueue(null);
        return api(req);
      } catch {
        processQueue(new Error('session'));
        const msg = 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại';
        toast.error(msg);
        return Promise.reject(new Error(msg));
      } finally {
        isRefreshing = false;
      }
    }

    // ── All other errors: show backend message then reject ──────────────────
    const fallback = !error.response
      ? 'Không thể kết nối đến máy chủ'
      : status === 500
        ? 'Lỗi máy chủ, vui lòng thử lại'
        : 'Có lỗi xảy ra';

    const msg = serverMessage || fallback;
    toast.error(msg);
    return Promise.reject(new Error(msg));
  },
);

export default api;
