<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# 📄 `AGENTS.md` (dành cho AI coding agent / reviewer)

> Mục tiêu: **chỉ đạo AI cách viết code trong project này**  
> File này cực kỳ hữu ích nếu bạn dùng Claude / Cursor / Copilot.

```md
# AI Agents Instructions – Frontend

## 1. Role of AI Agent

You are acting as a **Frontend Engineer assistant** working on a technical test project.

Your primary goals:

- Generate clean, readable code
- Respect project scope and constraints
- Avoid over-engineering

---

## 2. Folder Structure Rules

Follow this structure strictly:
```

src/
├─ app/ # Next.js App Router
│ ├─ (auth)/
│ │ └─ login/
│ │ └─ page.tsx
│ ├─ dashboard/
│ │ └─ page.tsx
│ ├─ api/ # Server Route Handlers (secure)
│ │ └─ auth/
│ │ └─ route.ts
│ └─ layout.tsx
│
├─ features/ # ⭐ CORE: chia theo nghiệp vụ
│ ├─ auth/
│ │ ├─ components/
│ │ ├─ hooks/ # useLogin, useAuth
│ │ ├─ services/ # auth.api.ts
│ │ ├─ store/ # auth.slice.ts
│ │ ├─ context/ # AuthContext (nếu cần)
│ │ ├─ types/ # auth.type.ts
│ │ ├─ constants/ # auth.constant.ts
│ │ └─ index.ts # public exports
│ │
│ ├─ user/
│ │ ├─ components/
│ │ ├─ hooks/
│ │ ├─ services/
│ │ ├─ store/
│ │ ├─ types/
│ │ └─ constants/
│ │
│ └─ job/
│ ├─ components/
│ ├─ hooks/
│ ├─ services/
│ ├─ store/
│ ├─ types/
│ └─ constants/
│
├─ components/
│ └─ ui/ # Button, Input, Modal (shared)
│
├─ store/ # ⭐ Redux Toolkit root
│ ├─ index.ts # configureStore
│ └─ rootReducer.ts
│
├─ providers/ # ⭐ App providers
│ ├─ redux.provider.tsx
│ ├─ auth.provider.tsx
│ └─ theme.provider.tsx
│
├─ services/ # ⭐ Shared services
│ └─ base.service.ts # base fetch / axios
│
├─ interceptors/ # ⭐ Axios interceptors
│ ├─ axios.instance.ts
│ ├─ request.interceptor.ts
│ └─ response.interceptor.ts
│
├─ hooks/ # ⭐ Custom hooks dùng chung
│ └─ useDebounce.ts
│
├─ context/ # ⭐ Global context (non-feature)
│ └─ ThemeContext.tsx
│
├─ utils/ # ⭐ Helper functions
│ ├─ formatDate.ts
│ ├─ cn.ts
│ └─ storage.ts
│
├─ constants/ # ⭐ Global constants
│ ├─ api.constant.ts
│ ├─ role.constant.ts
│ └─ regex.constant.ts
│
├─ types/ # ⭐ Global shared types
│ ├─ api.type.ts
│ └─ common.type.ts
│
├─ lib/
│ ├─ env.ts # safe env access
│ └─ auth.ts # server auth helpers
│
└─ middleware.ts # auth / role protection

DO NOT place business logic inside page components.

---

## 3. Component Guidelines

- Pages: fetch data, compose components
- Components: display logic only
- Services: API calls only
- Types: shared interfaces and enums

Example:

- `services/product.service.ts` → fetch products
- `types/product.ts` → Product interface

---

## 4. TypeScript Rules

- Always define interfaces for API responses
- Avoid `any`
- Use enums for constants (e.g. OrderStatus)

---

## 5. Styling Rules (Tailwind)

- Use utility classes only
- Avoid inline styles
- Prefer reusable components (Button, Input)

---

## 6. Data Fetching Rules

- Use `fetch` or a thin wrapper
- No caching layer
- No server actions unless required
- Client components are acceptable

---

## 7. Admin vs User Separation

- Admin pages must be under `/admin`
- Never mix admin UI with user UI
- Shared components go to `/components/common`

---

## 8. Error & Loading States

- Always handle loading
- Display basic error messages
- No toast libraries unless already installed

---

## 9. Forbidden Actions

❌ Do NOT:

- Add authentication logic
- Add Redux, Zustand, or complex state libraries
- Add UI frameworks other than Tailwind
- Add payment logic
- Add test frameworks unless explicitly requested

---

## 10. Output Expectations

Generated code should be:

- Understandable by a fresher-level developer
- Easy to explain in an interview
- Aligned with backend REST APIs
