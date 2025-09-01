# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

Weecom Dashboard
A React-based dashboard for managing products, built with Vite, Tailwind CSS, Shadcn UI, and React Query.
Setup

Install dependencies: npm install
Init Shadcn UI: npx shadcn@latest init
Add Shadcn components: npx shadcn@latest add button dialog input skeleton select
Run dev server: npm run dev

Features

Product CRUD with pagination, search, and category filter.
Basic auth with login/logout.
Responsive layout.

Expanding

Add TypeScript: See Vite TS template.
Add tests: Use Vitest for unit tests.
Deploy: Use Vercel/Netlify.
