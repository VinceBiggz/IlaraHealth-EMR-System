# Ilara Health EMR System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository contains the code for the Ilara Health Electronic Medical Records (EMR) System, a web application designed to streamline inventory management and patient care in healthcare settings.

## Table of Contents

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation and Setup](#installation-and-setup)
    -   [Prerequisites](#prerequisites)
    -   [Backend Setup](#backend-setup)
    -   [Frontend Setup](#frontend-setup)
-   [Usage](#usage)
-   [Project Structure](#project-structure)
-   [API Documentation](#api-documentation)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

## Project Overview

The Ilara Health EMR System simplifies inventory management and patient care, enabling healthcare professionals to efficiently track medical supplies and access patient records. It features a modern React frontend with TypeScript for a robust user interface and a Node.js/Express.js backend with TypeScript for handling API requests and data management.

## Features

-   **User Authentication and Authorization:** Secure login for pharmacists and admins with role-based access control.
-   **Inventory Management:**
    -   View, add, update, and delete inventory items.
    -   Track item quantities and low stock thresholds.
    -   (To be implemented) Real-time low-stock notifications via email.
-   **Responsive Design:** Ensures optimal user experience on various devices and screen sizes.

## Technologies Used

-   **Frontend:** ReactJS with TypeScript (Vite)
-   **Backend:** Node.js with TypeScript (Express.js)
-   **Database:** PostgreSQL
-   **API Gateway:** Express.js

## Installation and Setup

### Prerequisites

-   Node.js and npm (or yarn)
-   PostgreSQL database

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone 
    ```
2.  **Navigate to the backend directory:**
    ```bash
    cd emr-backend
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Set up environment variables:**
    -   Create a `.env` file in the backend root directory.
    -   Add your `DATABASE_URL` and `JWT_SECRET` 
5.  **Run database migrations:**
    ```bash
    npx prisma migrate dev
    ```
6.  **Start the server:**
    ```bash
    npm start
    ```
    The backend server will typically run at `http://localhost:3100`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd emr-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend will be accessible at `http://localhost:5173/emr-frontend/` (or similar).

## Usage

1.  Launch the frontend and backend servers.
2.  Register and log in as either a pharmacist or an admin.
3.  Pharmacists can manage inventory (view, add, update, delete items).
4.  Admins have full access, including user management.

## Project Structure
```
project-root/
├── README.md
├── backend
│   ├── README.md
│   ├── app.js
│   ├── db
│   │   ├── db.js
│   │   └── test_db.js
│   ├── jest.config.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   │   ├── auth.js
│   │   ├── inventory.js
│   │   └── users.js
│   ├── tests
│   │   └── inventory.test.js
│   └── utils
│       └── tokenUtils.js
├── docs
│   ├── flowcharts
│   │   ├── data-flow-diagram.png
│   │   ├── prescription-sequence-diagram.png
│   │   └── system-architecture-diagram.png
│   ├── system-design.md
│   └── task-breakdown.md
└── frontend
    ├── README.md
    ├── emr-frontend
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   ├── src
    │   │   ├── App.css
    │   │   ├── App.tsx
    │   │   ├── assets
    │   │   │   └── vite.svg
    │   │   ├── components
    │   │   │   ├── LoginForm.tsx
    │   │   │   └── LowStockAlert.tsx
    │   │   ├── index.css
    │   │   ├── index.html
    │   │   ├── main.tsx
    │   │   ├── pages
    │   │   │   ├── AddMedicationForm.tsx
    │   │   │   ├── Auth.tsx
    │   │   │   └── InventoryList.tsx
    │   │   ├── services
    │   │   │   └── api.ts
    │   │   └── types.ts
    │   └── vite.config.ts
    ├── package-lock.json
    └── package.json
```

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature/your-feature-name`
3.  Make your changes and commit them: `git commit -m 'Add some feature'`
4.  Push to the branch: `git push origin feature/your-feature-name`
5.  Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

-   Vincent Wachira - [LinkedIn Profile](https://www.linkedin.com/in/vincentwachira)

**Client:** Ilara Health