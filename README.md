# Reader App

This project is a Next.js 15 application written in TypeScript. It provides a small authentication interface consisting of login and registration forms. The UI is built with Tailwind CSS and Radix UI components.

## Requirements

- Node.js 18 or newer
- NPM (or any compatible package manager)

## Getting Started

Install dependencies and create a local `.env` file. You can run the setup script or copy the example file manually:

```bash
npm install
cp .env.example .env   # or run ./agents/scripts/setup.sh
```

### Development

Start the development server with:

```bash
npm run dev
```

Navigate to `http://localhost:3000` to view the app.

### Building for Production

```bash
npm run build
npm start
```

### Linting

Run ESLint to check the codebase:

```bash
npm run lint
```

## Directory Overview

- `src/app` – root layout and pages used by Next.js
- `src/components` – reusable UI and authentication components
- `src/lib` – utility functions and API wrappers
- `public` – static assets such as the application logo

## Environment Variables

The application expects the following variables in a `.env` file:

- `NEXT_PUBLIC_BOOK_API` – base URL of the backend API
- `NEXT_PUBLIC_AUTH_COOKIE_NAME` – cookie name used to store the auth token

An example configuration is provided in `.env.example`.

## Agent Setup Script

A helper script is included under `agents/scripts/setup.sh`. It installs all dependencies and copies `.env.codex` to `.env` for convenience when running in Codex environments.

## Notes

This repository does not contain automated tests. Functionality can be verified by running the development server and the linter.
