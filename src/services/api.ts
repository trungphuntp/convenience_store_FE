import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

let _store: typeof import('@/store').store | null = null;
async function getStore() {
  if (!_store) {
    const mod = await import('@/store');
    _store = mod.store;
  }
  return _store;
}

const MAX_RETRIES = 3;

// Prevent multiple concurrent refresh calls; queue other 403s until done.
let isRefreshing = false;
let refreshQueue: Array<{ resolve: () => void; reject: (err: unknown) => void }> = [];

function processQueue(error: unknown) {
  refreshQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve()));
  refreshQueue = [];
}

// Called on login so a fresh session starts with a clean slate.
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
      return Promise.reject(new Error(body.message || 'Có lỗi xảy ra'));
    }
    return response;
  },
  async (error: AxiosError) => {
    const req = error.config as RetryableConfig | undefined;
    const status = error.response?.status;
    const isRefreshEndpoint = req?.url?.includes('auth/refresh');

    // ── 4xx: refresh token → retry original request (up to MAX_RETRIES times) ──
    if (status !== undefined && status >= 400 && status < 500 && req && !isRefreshEndpoint) {
      req._retryCount = (req._retryCount ?? 0) + 1;

      if (req._retryCount > MAX_RETRIES) {
        await forceLogout();
        return Promise.reject(
          new Error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại'),
        );
      }

      // If a refresh is already in flight, wait for it then retry.
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: () => resolve(api(req)),
            reject,
          });
        });
      }

      isRefreshing = true;
      try {
        await api.post('auth/refresh');
        processQueue(null);
        return api(req);
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(new Error('Không có quyền truy cập'));
      } finally {
        isRefreshing = false;
      }
    }

    // ── Generic HTTP error messages ─────────────────────────────────────────
    if (error.response) {
      const serverMessage = (error.response.data as { message?: string })?.message;
      if (serverMessage) return Promise.reject(new Error(serverMessage));

      if (status === 400) return Promise.reject(new Error('Yêu cầu không hợp lệ'));
      if (status === 401) return Promise.reject(new Error('Vui lòng đăng nhập'));
      if (status === 403) return Promise.reject(new Error('Không có quyền truy cập'));
      if (status === 404) return Promise.reject(new Error('Không tìm thấy tài nguyên'));
      if (status === 500) return Promise.reject(new Error('Lỗi máy chủ, vui lòng thử lại'));
    } else if (error.request) {
      return Promise.reject(new Error('Không thể kết nối đến máy chủ'));
    }

    return Promise.reject(error);
  },
);

export default api;
