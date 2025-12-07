# 🚗 Car Reservation System (Car Rental App)

> 🔴 **LIVE DEMO:** [Click here to view the application](https://wypozyczalnia-projekt.onrender.com)

---

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

> Final Project: An interactive Full-Stack (MERN) web application that allows users to browse the fleet, check real-time availability, and reserve vehicles.

---

## 📋 Table of Contents
* [About the Project](#about-the-project)
* [Features](#features)
* [Technologies](#technologies)
* [Installation and Setup](#installation-and-setup)
* [Environment Variables](#environment-variables)
* [API Endpoints](#api-endpoints)
* [Author](#author)

---

<a id="about-the-project"></a>
## 🧐 About the Project
The goal of this project was to create a system for a car rental company that simplifies the reservation process. A key element is the **interactive calendar**, which visualizes car availability, preventing scheduling conflicts. The application also features a secured **Admin Panel** for managing reservations.

---

<a id="features"></a>
## 🚀 Features

### 👤 For Users (Clients):
* **Fleet Browsing:** A list of available cars displayed as cards.
* **Filtering and Sorting:**
    * Search by make or model (Live Search).
    * Sort by price (ascending/descending) and availability.
* **Interactive Calendar:**
    * Visualization of booked dates (color-coded).
    * Date selection via day range highlighting (Drag & Drop).
    * Blocking selection of past and booked dates.
* **Reservation Form:**
    * Automatic date pre-filling from the calendar.
    * Real-time total cost calculation.
    * Data validation (email and phone number correctness).
    * Option to add notes to the reservation.
* **Responsiveness:** Fully adapted for mobile devices (Full-screen modal, simplified calendar).

### 🛡️ For Administrators:
* **Authentication:** Secure login using JWT (JSON Web Token).
* **Management Dashboard:**
    * Overview of all reservations in a table format.
    * View client details (phone, email, notes).
    * Color-coded reservation statuses (Confirmed, Cancelled, Completed).
* **Editing and Deleting:** Ability to change reservation status and cancel reservations (with confirmation).

<a id="demo-credentials"></a>
## 🔑 Demo Credentials (Test Account)

To test the **Admin Panel** functionalities (editing, deleting reservations), use the credentials below:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@admin.com` | `P@ssw0rd` |

---

<a id="technologies"></a>
## 🛠 Technologies

The project was implemented using a **Monorepo** architecture (Frontend and Backend in a single repository).

### Frontend:
* **React.js** (Hooks, Context API)
* **Material UI (MUI)** - Component system and styling.
* **FullCalendar** - Advanced calendar handling.
* **Axios** - API communication.
* **React Router** - Navigation (SPA).

### Backend:
* **Node.js & Express** - REST API application server.
* **MongoDB & Mongoose** - NoSQL database and data modeling.
* **JWT & Bcrypt** - Authentication and password hashing.

---

<a id="installation-and-setup"></a>
## ⚙️ Installation and Setup

To run the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sebciulina/wypozyczalnia.git
    cd wypozyczalnia
    ```

2.  **Install dependencies (Backend):**
    ```bash
    npm install
    ```

3.  **Install dependencies (Frontend):**
    ```bash
    cd client
    npm install
    cd ..
    ```

4.  **Configure environment variables:**
    Create a `.env` file in the main directory (see section below).

5.  **Run the application (Development Mode):**
    ```bash
    # Runs both server and client concurrently (requires concurrently installed)
    npm run dev 
    
    # OR separately in two terminals:
    # Terminal 1:
    npm run server
    # Terminal 2 (inside client folder):
    npm start
    ```

---

<a id="environment-variables"></a>
## 🔐 Environment Variables (.env)

Create a `.env` file in the main project directory and fill it with your data:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/wypozyczalnia
JWT_SECRET=your_secret_string
NODE_ENV=development
```

---

<a id="api-endpoints"></a>
## 📡 API Endpoints

List of available API routes:


| Metoda | Endpoint     | Opis                      | Dostęp   |
| :-------- | :------- | :------------------------- | :------- |
| `GET` | `/api/cars` | Fetches a list of all cars | Public|
| `GET` | `/api/reservations?carId=X` | Fetches reservations for a specific car| Public|
| `POST` | `/api/reservations` | Creates a new reservation | Public|
| `POST` | `/api/auth/login` | Administrator login | Public|
| `GET` | `/api/reservations` | Fetches all reservations | Admin|
| `PUT` | `/api/reservations/:id` | Edits a reservation | Admin|
| `DELETE` | `/api/reservations/:id` |Deletes a reservation | Admin|

---

<a id="author"></a>
## 👨‍💻 Author
Sebastian Gransicki
* Computer Science Student
* [@sebciulina](https://www.github.com/sebciulina)