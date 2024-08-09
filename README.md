# Node.js Typescript PostgreSQL CRUD Example with Express and Sequelize

## Overview

This project demonstrates how to create a REST API with Typescript Node.js, Express, and PostgreSQL using Sequelize ORM for CRUD operations. The API allows you to manage employee records with the following endpoints:

### Endpoints

- **GET** `/api/v1/employee`
  - **Description**: Get a list of all employees.
  
- **GET** `/api/v1/employee?id=1`
  - **Description**: Get employee details by ID.
  - **Query Parameter**: `id` - Employee ID

- **POST** `/api/v1/employee`
  - **Description**: Add a new employee or update an existing employee by ID.
  - **Request Body**: Employee details in JSON format.

- **DELETE** `/api/v1/employee?id=1`
  - **Description**: Delete an employee by ID.
  - **Query Parameter**: `id` - Employee ID

## Setup

### Prerequisites

- Node.js (>=18.x)
- PostgreSQL

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/panchal-jay-git/pjg_nodejs_crud_postgres_service.git
    cd your-repo
    ```

2. Install the required NPM packages:
    ```bash
    npm install
    ```

3. Configure your PostgreSQL database, PORT settings creating using the `.env` file.

4. Access the Swagger documentation at:
    ```bash
    http://localhost:8001/api-docs
    ```

### Running the Application

Start the Node.js application:
```bash
npm start
