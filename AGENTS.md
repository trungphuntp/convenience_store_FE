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
├─ app/
│ ├─ admin/
│ │ ├─ products/
│ │ └─ orders/
│ ├─ products/
│ ├─ cart/
│ └─ layout.tsx
├─ components/
│ ├─ ui/
│ ├─ admin/
│ └─ common/
├─ services/
│ ├─ product.service.ts
│ ├─ order.service.ts
│ └─ category.service.ts
├─ types/
│ ├─ product.ts
│ ├─ order.ts
│ └─ category.ts
└─ utils/

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
