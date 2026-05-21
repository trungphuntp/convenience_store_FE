@AGENTS.md

# Project Context – Convenience Store Web App (FE)

## 1. Project Overview

This is a frontend web application for a **Convenience Store Ordering System**, built as part of a technical test for the Fresher Java Engineer position at 7-Eleven Vietnam.

The system supports:

- Admin product management
- User product browsing
- User order creation
- Admin order viewing

Backend is implemented separately using **Java Spring Boot + MySQL**.
Frontend communicates with backend via REST APIs.

---

## 2. Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- HTTP Client: fetch (or Axios if added later)
- State Management: React useState / useContext (no Redux)
- Auth: None (role-based routing only)

---

## 3. User Roles & Scope

### Admin

- Manage products (CRUD)
- View orders and order details

### User

- Browse products
- Filter products by category
- Create orders

⚠️ Authentication is NOT implemented.
Admin and user are separated by routes:

- `/admin/*` for admin
- `/products`, `/cart` for user

---

## 4. Domain Concepts

### Category

- Used to classify products
- Example: Food, Drinks, Cosmetics, Electronics

### Product

- Belongs to exactly one category
- Has price, stock, description, image

### Order

- Contains multiple order items
- Has status (CREATED, PAID, CANCELLED)

### OrderItem

- Represents a product inside an order
- Includes quantity and price at order time

---

## 5. API Interaction Rules

- Frontend NEVER assumes business logic
- Backend handles:
  - Stock validation
  - Order total calculation
  - Transaction handling
- Frontend only sends clean request payloads

Example order creation payload:

```json
{
  "items": [{ "productId": 1, "quantity": 2 }]
}
```

## 6. Error Handling

- Backend errors are displayed as simple messages
- No retry or complex fallback logic
- Focus is clarity, not production-grade resilience

## 7. UI Principles

- Clean & readable UI
- Admin uses tables
- User uses cards/grid
- No over-engineering
- Mobile-friendly but not mobile-first

## 8. Coding Rules for AI Assistance

- When generating or modifying code:

- Follow existing folder structure
- Use functional React components
- Prefer explicit typing over any
- Do NOT introduce unnecessary libraries
- Keep logic simple and readable

## 9. Non-goals

- Authentication & authorization
- Payment integration
- Real-time features
- SEO optimization

## 10. Folder Structure Rules

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
```
