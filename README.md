# 🚗 System Rezerwacji Samochodów (Car Rental App)

> 🔴 **LIVE DEMO:** [Kliknij tutaj, aby zobaczyć aplikację](https://wypozyczalnia-projekt.onrender.com)

---

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

> Projekt zaliczeniowy: Interaktywna aplikacja internetowa typu Full-Stack (MERN) umożliwiająca przeglądanie floty, sprawdzanie dostępności w czasie rzeczywistym oraz rezerwację pojazdów.

---

## 📋 Spis treści
* [O projekcie](#o-projekcie)
* [Funkcjonalności](#funkcjonalności)
* [Technologie](#technologie)
* [Instalacja i Uruchomienie](#instalacja-i-uruchomienie)
* [Zmienne Środowiskowe](#zmienne-środowiskowe)
* [API Endpoints](#api-endpoints)
* [Autor](#autor)

---

<a id="o-projekcie"></a>
## 🧐 O projekcie
Celem projektu było stworzenie systemu dla wypożyczalni samochodów, który upraszcza proces rezerwacji. Kluczowym elementem jest **interaktywny kalendarz**, który wizualizuje dostępność aut, zapobiegając konfliktom terminów. Aplikacja posiada również zabezpieczony **Panel Administratora** do zarządzania rezerwacjami.

---

<a id="funkcjonalności"></a>
## 🚀 Funkcjonalności

### 👤 Dla Użytkownika (Klienta):
* **Przeglądanie Floty:** Lista dostępnych samochodów z podziałem na karty.
* **Filtrowanie i Sortowanie:**
    * Wyszukiwanie po marce lub modelu (Live Search).
    * Sortowanie po cenie (rosnąco/malejąco) oraz dostępności.
* **Interaktywny Kalendarz:**
    * Wizualizacja zajętych terminów (oznaczone kolorem).
    * Wybór terminu poprzez zaznaczenie zakresu dni (Drag & Drop).
    * Blokada wyboru dat historycznych oraz zajętych.
* **Formularz Rezerwacji:**
    * Automatyczne uzupełnianie dat z kalendarza.
    * Kalkulacja kosztu całkowitego w czasie rzeczywistym.
    * Walidacja danych (poprawność emaila, nr telefonu).
    * Możliwość dodania uwag do rezerwacji.
* **Responsywność:** Pełne dostosowanie do urządzeń mobilnych (Modal na pełen ekran, uproszczony kalendarz).

### 🛡️ Dla Administratora:
* **Autentykacja:** Bezpieczne logowanie przy użyciu JWT (JSON Web Token).
* **Panel Zarządzania (Dashboard):**
    * Przegląd wszystkich rezerwacji w formie tabeli.
    * Widok szczegółów klienta (telefon, email, notatki).
    * Kolorowe statusy rezerwacji (Potwierdzona, Anulowana, Zakończona).
* **Edycja i Usuwanie:** Możliwość zmiany statusu rezerwacji oraz jej anulowania (z potwierdzeniem).

## 🔑 Dane do logowania (Konto Testowe)

Aby przetestować funkcjonalności **Panelu Administratora** (edycja, usuwanie rezerwacji), użyj poniższych danych:

| Rola | Email | Hasło |
| :--- | :--- | :--- |
| **Administrator** | `admin@admin.com` | `P@ssw0rd` |

<a id="technologie"></a>
## 🛠 Technologie

Projekt został zrealizowany w architekturze **Monorepo** (Frontend i Backend w jednym repozytorium).

### Frontend:
* **React.js** (Hooks, Context API)
* **Material UI (MUI)** - System komponentów i stylizacja.
* **FullCalendar** - Zaawansowana obsługa kalendarza.
* **Axios** - Komunikacja z API.
* **React Router** - Nawigacja (SPA).

### Backend:
* **Node.js & Express** - Serwer aplikacji REST API.
* **MongoDB & Mongoose** - Baza danych NoSQL i modelowanie danych.
* **JWT & Bcrypt** - Autentykacja i haszowanie haseł.

---

<a id="instalacja-i-uruchomienie"></a>
## ⚙️ Instalacja i Uruchomienie

Aby uruchomić projekt lokalnie, wykonaj następujące kroki:

1.  **Sklonuj repozytorium:**
    ```bash
    git clone [https://github.com/TWOJA_NAZWA/wypozyczalnia.git](https://github.com/TWOJA_NAZWA/wypozyczalnia.git)
    cd wypozyczalnia
    ```

2.  **Zainstaluj zależności (Backend):**
    ```bash
    npm install
    ```

3.  **Zainstaluj zależności (Frontend):**
    ```bash
    cd client
    npm install
    cd ..
    ```

4.  **Skonfiguruj zmienne środowiskowe:**
    Stwórz plik `.env` w głównym katalogu (patrz sekcja niżej).

5.  **Uruchom aplikację (Tryb Deweloperski):**
    ```bash
    # Uruchamia jednocześnie serwer i klienta (wymaga zainstalowanego concurrently)
    npm run dev 
    
    # LUB osobno w dwóch terminalach:
    # Terminal 1:
    npm run server
    # Terminal 2 (w folderze client):
    npm start
    ```

---

<a id="zmienne-środowiskowe"></a>
## 🔐 Zmienne Środowiskowe (.env)

Stwórz plik `.env` w głównym katalogu projektu i uzupełnij go swoimi danymi:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/wypozyczalnia
JWT_SECRET=tajny_ciag_znakow
NODE_ENV=development
```

---

<a id="api-endpoints"></a>
## 📡 API Endpoints

Lista dostępnych ścieżek API:


| Metoda | Endpoint     | Opis                      | Dostęp   |
| :-------- | :------- | :------------------------- | :------- |
| `GET` | `/api/cars` | Pobiera listę wszystkich samochodów | Publiczny|
| `GET` | `/api/reservations?carId=X` | Pobiera listę wszystkich samochodów | Publiczny|
| `POST` | `/api/reservations` | Tworzy nową rezerwację | Publiczny|
| `POST` | `/api/auth/login` | Logowanie administratora | Publiczny|
| `GET` | `/api/reservations` | Pobiera wszystkie rezerwacje | Admin|
| `PUT` | `/api/reservations/:id` | Edytuje rezerwację | Admin|
| `DELETE` | `/api/reservations/:id` | Usuwa rezerwację | Admin|

---

<a id="autor"></a>
## 👨‍💻 Autor
Sebastian Gransicki
* Student Informatyki
* [@sebciulina](https://www.github.com/sebciulina)