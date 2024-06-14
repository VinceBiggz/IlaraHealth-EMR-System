# Ilara Health EMR System - Backend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository contains the backend code for the Ilara Health Electronic Medical Records (EMR) System. This project serves as the API and data management layer for the EMR system.

## Table of Contents

-   [Project Overview](#project-overview)
-   [API Endpoints](#api-endpoints)
-   [Technologies Used](#technologies-used)
-   [Installation and Setup](#installation-and-setup)
-   [Testing](#testing)
-   [Database Schema](#database-schema) 
-   [Project Structure](#project-structure)
-   [Contributing](#contributing)
-   [License](#license)

## Project Overview

This backend project is a Node.js/Express application that provides the following key functionalities:

-   **Authentication:**
    -   User registration and login.
    -   Token-based authentication using JWT (JSON Web Tokens).
-   **Inventory Management:**
    -   CRUD (Create, Read, Update, Delete) operations for inventory items.
    -   Endpoint to fetch inventory data.

## API Endpoints

| Endpoint             | Method | Description                            | Authentication Required |
| -------------------- | ------ | -------------------------------------- | ----------------------- |
| `/auth/register`     | POST   | Register a new user                    | No                      |
| `/auth/login`        | POST   | Authenticate user and get JWT token   | No                      |
| `/api/inventory`     | GET    | Get list of inventory items             | Yes (JWT Token)         |
| `/api/inventory/:id` | GET    | Get details of a specific inventory item | Yes (JWT Token)         |
| `/api/inventory`     | POST   | Add a new inventory item               | Yes (JWT Token)         |
| `/api/inventory/:id` | PUT    | Update an existing inventory item      | Yes (JWT Token)         |
| `/api/inventory/:id` | DELETE | Delete an inventory item               | Yes (JWT Token)         |

## Technologies Used

-   **Backend:**
    -   Node.js: JavaScript runtime environment.
    -   Express.js: Web application framework for Node.js.
    -   PostgreSQL: Relational database.
    -   JSON Web Tokens (JWT): For authentication and authorization.
    -   Bcrypt (or similar): For password hashing (replace SHA1 in production).

## Installation and Setup

1.  **Prerequisites:**
    -   Node.js and npm (or yarn) installed on your machine.
    -   PostgreSQL database set up and running.

2.  **Clone the Repository:**
    ```bash
    git clone [invalid URL removed]
    ```

3.  **Install Dependencies:**
    ```bash
    cd emr-backend
    npm install
    ```

4.  **Environment Variables:**
    -   Create a `.env` file in the root of your backend directory.
    -   Add the following variables (replace with your actual values):
        ```
        DATABASE_URL= your_database_connection_string
        JWT_SECRET=your_secret_key
        ```

5.  **Start the Server:**
    ```bash
    npm start  # or node app.js (if your main file is app.js)
    ```
    The server will typically run at `http://localhost:3100` (or the port you've configured).


## Testing

```bash
npm test
```

## Database Schema

**Users:**
user_id (SERIAL PRIMARY KEY)
username (VARCHAR(255) UNIQUE NOT NULL)
password (TEXT NOT NULL) - Store the hashed password
role (VARCHAR(255) NOT NULL) - 'admin' or 'pharmacist'

**Inventory:**
id (SERIAL PRIMARY KEY)
name (VARCHAR(255) UNIQUE NOT NULL)
quantity (INTEGER NOT NULL)
low_stock_threshold (INTEGER NOT NULL)

## Project Structure
```
├── app.js                # Main application file
├── db                    # Database connection and configuration
│   └── db.js
├── jest.config.js        # Jest configuration file
├── middleware            # Middleware functions (e.g., authMiddleware.js)
├── models                # (Optional) Database models 
├── routes                # API route definitions (auth.js, inventory.js)
├── tests                 # Test files
└── utils
    └── tokenUtils.js
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