# Reader App

This project is a Next.js 15 application written in TypeScript. It provides a small authentication interface consisting of login and registration forms. The UI is built with Tailwind CSS and Radix UI components. Client-side form validation is powered by [Zod](https://github.com/colinhacks/zod).

The login and registration forms display validation messages in German. Each field is validated only after the user has entered a value so no error messages appear initially.

## Quick Start Guide

### System Requirements

- Node.js 22
- NPM or any compatible package manager
- A free TCP port `3000`

### Initial Setup

```bash
npm install
cp .env.example .env   # or run ./agents/scripts/setup.sh
```

Edit `.env` and set the following variables:

- `NEXT_PUBLIC_BOOK_API` – base URL of the backend API
- `NEXT_PUBLIC_AUTH_COOKIE_NAME` – cookie name used to store the auth token

### Start the Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Docker Example

Build the Docker image and start the container on port 3000:

```bash
docker build -t reader-app .
docker run -p 3000:3000 --env-file .env reader-app
```

## Requirements

- Node.js 22
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

### Docker Image

The project includes a `Dockerfile` based on **Node 22 Alpine**. Build the image
and run the container with:

```bash
docker build -t reader-app .
docker run -p 3000:3000 --env-file .env reader-app
```

## Directory Overview

- `src/app` – root layout and pages used by Next.js
- `src/components` – reusable UI and authentication components
- `src/components/search` – building blocks for the search page
- `src/lib` – utility functions and API wrappers
- `public` – static assets such as the application logo

## Environment Variables

The application expects the following variables in a `.env` file:

- `NEXT_PUBLIC_BOOK_API` – base URL of the backend API
- `NEXT_PUBLIC_AUTH_COOKIE_NAME` – cookie name used to store the auth token

An example configuration is provided in `.env.example`.

## Agent Setup Script

A helper script is included under `agents/scripts/setup.sh`. It installs all dependencies and copies `.env.codex` to `.env` for convenience when running in Codex environments.

## Pre-commit Hooks

The repository provides a `.pre-commit-config.yaml` file using the [pre-commit](https://pre-commit.com/) framework. Install the tool and enable the hook so linting runs automatically before each commit:

```bash
pip install pre-commit
pre-commit install
```

The hook executes `npm run lint` and blocks the commit if any ESLint errors are found.

## Notes

This repository does not contain automated tests. Functionality can be verified by running the development server and the linter.
