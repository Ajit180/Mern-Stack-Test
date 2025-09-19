
---

# Grammar Correction App ✍️✅

A full-stack **MERN** application where users can register, log in, attempt a grammar correction test, edit sentences, and view results.

---

## 📂 Folder Structure

```
project-root/
│
├── backend/         # Node.js + Express + MongoDB backend
│   ├── routes/      # API routes
│   ├── controllers/ # Business logic
│   ├── models/      # Mongoose models
│   ├── .env         # Environment variables (DB, PORT)
│   └── server.js    # App entry point
│
└── frontend/        # React frontend
    ├── src/
    │   ├── pages/   # Registration, Login, Test, Edit, Result 
    │   └── App.js
```

---

## 🚀 Features

1. **User Authentication**

   * Registration and Login with password bcrypt.
   * Passwords securely stored in database.

2. **Test Page**

   * Displays 3 random statements with grammatical/punctuation errors.

3. **Edit Mode**

   * Users can edit/correct the statements.
   * Submissions sent to backend for validation.

4. **Result Page**

   * Shows whether the corrected statements are error-free or wrong.
   * Displays score (`corrected/total`).

---

## ⚙️ Backend Setup

### 1️⃣ Environment Variables (`backend/.env`)

```env
DB="your_mongodb_connection_string"
PORT=3000
```

### 2️⃣ Install & Run

```bash
cd backend
npm install
npm start
```

---

## 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run on `http://localhost:5173` (Vite/CRA depending on your setup).

---

## 📡 API Endpoints

### 🔑 Authentication

* **POST** `/api/signup` → Register new user
* **POST** `/api/signin` → Login user

### 📝 Statements

* **GET** `/api/statements/random` → Fetch 3 random statements
* **PUT** `/api/statements/:id` → Update statement (edit mode)
* **POST** `/api/statements` → Add new statement (admin/test purpose)

### 📊 Result

* **POST** `/api/result` → Check user corrections and return results

---

## 🧑‍💻 Tech Stack

* **Frontend**: React, React Query, Axios, TailwindCSS
* **Backend**: Node.js, Express.js, MongoDB, Mongoose

---

## 🎯 Workflow

1. User registers/logs in.
2. Gets 3 random statements from backend.
3. Enters **edit mode** → corrects statements.
4. Submits answers → backend checks corrections.
5. Result page shows **✔ correct / ✖ wrong** summary.

---