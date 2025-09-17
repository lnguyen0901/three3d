Vite + React (JavaScript) project

Quick start

Prerequisites
- Node.js 22.12+ or Node.js 20.19+ is required by recent Vite versions. On macOS, use nvm or Homebrew to upgrade Node.

Upgrade Node with nvm (recommended):

1. Install nvm if you don't have it:
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
   # then restart your terminal or source your profile

2. Install and use Node 22:
   nvm install 22
   nvm use 22

Or upgrade with Homebrew:
   brew install node@22

Commands

Install deps:

npm install

Start dev server:

npm run dev

Build for production:

npm run build

Preview production build:

npm run preview

Notes
- If `npm run dev` fails with Node engine errors, upgrade Node as shown above.
- The project was scaffolded with `npm create vite@latest . -- --template react`.

Happy coding!
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
