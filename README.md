# Frontend - In-Sys

This is the **React** frontend application for the In-Sys project, built using **Vite**, **Tailwind CSS**, and **React Router**.

---

## Tech Stack

- React 19
- Vite (build tool & dev server)
- Tailwind CSS (with Headless UI)
- React Router DOM (routing)
- Axios (HTTP client)
- React Modal (modal dialogs)
- React Icons (icons)

---

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/faizansafwan/in-sys.git
cd in-sys/frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```


3. **Start development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open your browser and visit http://localhost:5173 (or the URL provided in the terminal).**


---
---

# Backend - In-Sys (Laravel API)

This is the backend REST API for the In-Sys project, built with **Laravel 9** and powered by modern PHP ecosystem tools.

---

## Tech Stack

- PHP 8.0+
- Laravel Framework 9.x
- Laravel Sanctum (API authentication)
- Guzzle HTTP Client
- Composer (PHP dependency management)
- Vite (for frontend assets if applicable)
- Axios & Lodash (included in dev dependencies for frontend assets management)

---

## Prerequisites

- PHP 8.0 or higher
- Composer
- MySQL or other supported database
- Node.js & npm (for frontend assets if needed)

---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/faizansafwan/in-sys.git
cd in-sys/backend
```

2. **Install PHP dependencies**

```bash
composer install
```

3. **Install Node.js dependencies (for Vite assets)**

```bash
npm install
```

4. **Start development server**

```bash
npm run dev
# or
yarn dev
```

5. **Setup environment**
- Create .env from example and configure database & other environment variables:

```bash
cp .env.example .env
```

6. **Run database migrations**

```bash
php artisan migrate
```

7. **Start development server**

```bash
php artisan serve
```