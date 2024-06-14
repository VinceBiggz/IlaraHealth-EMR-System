# Ilara Health EMR System - Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository contains the frontend code for the Ilara Health Electronic Medical Records (EMR) System. This project provides the user interface for managing inventory and other core features of the EMR system.

## Table of Contents

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation and Setup](#installation-and-setup)
-   [Usage](#usage)
-   [Project Structure](#project-structure)
-   [Contributing](#contributing)
-   [License](#license)

## Project Overview

This frontend project is a React application designed to provide a user-friendly interface for interacting with the Ilara Health EMR backend. The core focus is on inventory management, but it's built to be extensible for future features.

## Features

-   **Secure Login:** User authentication for pharmacists and admins.
-   **Inventory Management:**
    -   View inventory items (name, quantity, low stock threshold).
    -   (To be implemented) Edit and add new inventory items.
    -   (To be implemented) Real-time low-stock notifications.
-   **Responsive Design:** Adapts to different screen sizes and devices.
-   **(To be implemented) Checkout:**  A simple checkout process to adjust inventory levels.

## Technologies Used

-   **Frontend:**
    -   React: JavaScript library for building user interfaces.
    -   React Bootstrap: UI component library for easier styling.
    -   Axios: Promise-based HTTP client for API requests.
    -   React Router:  (Optional) For handling navigation between pages.
-   **Build Tool:**
    -   Vite: Fast development server and build tool.

## Installation and Setup

1.  **Prerequisites:**
    -   Node.js and npm (or yarn) installed on your machine.

2.  **Clone the Repository:**

    ```bash
    git clone [invalid URL removed]
    ```

3.  **Install Dependencies:**
    ```bash
    cd emr-frontend
    npm install
    ```

4.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    The app will be running at `http://localhost:5173/emr-frontend/` (or similar).

## Usage

1.  **Login:** Enter your credentials (pharmacist or admin) to access the inventory page.
2.  **Inventory List:** View the current inventory, including item details and low stock thresholds.

## Project Structure

src
├── components           # Reusable components (LoginForm, LowStockAlert)
├── pages                # Page-level components (InventoryList)
├── services             # API request handling (api.ts)
├── types.ts             # TypeScript interfaces for type safety
├── App.tsx              # Main application component
├── index.css            # Global styles
├── main.tsx             # Entry point of the application
└── vite.config.ts       # Vite configuration file


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