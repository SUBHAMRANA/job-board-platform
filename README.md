# Full-Stack Job Board Platform

A modern, full-stack job board application built with **Next.js 14 (App Router)** and **Django REST Framework**. This project demonstrates Server-Side Rendering (SSR) for SEO, robust JWT authentication, and a decoupled architecture.

## 🚀 Tech Stack

### Frontend
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** CSS Modules
* **State Management:** React Context API (Auth)

### Backend
* **Framework:** Django & Django REST Framework (DRF)
* **Authentication:** JWT (SimpleJWT)
* **Database:** SQLite (Development) / PostgreSQL (Production ready)
* **Filtering:** Django-Filter

---

## ✨ Features

* **Server-Side Rendering (SSR):** Job listings are fetched on the server for optimal SEO performance.
* **Search & Filtering:** Filter jobs by location and search by keywords dynamically.
* **Authentication System:**
    * User Registration (Recruiter/Seeker roles).
    * Secure Login (JWT Access & Refresh tokens).
    * Auto-logout and protected route redirection.
* **Recruiter Dashboard:**
    * Protected "Post Job" route (only accessible to logged-in users).
    * Automatic recruiter assignment to posted jobs.
* **Admin Moderation:**
    * New jobs are set to "Pending" by default.
    * Admins must approve jobs via the Django Admin Panel before they go live.

---

## 🛠️ Installation & Setup

Follow these steps to run the project locally.

### 1. Prerequisites
* Python 3.8+
* Node.js 18+
* Git

### 2. Clone the Repository
```bash
git clone [https://github.com/yourusername/job-board.git](https://github.com/yourusername/job-board.git)
cd job-board
```
### 3. Backend Setup (Django)

1.  **Create and activate a virtual environment:**
    ```bash
    # Mac/Linux
    python -m venv backend_env
    source backend_env/bin/activate

    # Windows
    python -m venv backend_env
    backend_env\Scripts\activate
    ```

2.  **Install Python dependencies:**
    ```bash
    pip install django djangorestframework djangorestframework-simplejwt django-cors-headers django-filter boto3 django-storages
    ```

3.  **Run Migrations:**
    ```bash
    python manage.py migrate
    ```

4.  **Create a Superuser (Admin):**
    ```bash
    python manage.py createsuperuser
    ```

5.  **Start the Server:**
    ```bash
    python manage.py runserver
    ```
    *The API will run at `http://127.0.0.1:8000/`*

### 4. Frontend Setup (Next.js)

1.  **Navigate to the frontend folder:**
    ```bash
    cd frontend
    ```

2.  **Install Node dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    *The application will run at `http://localhost:3000/`*

---

## 📖 Usage Guide

### How to Post a Job
1.  **Register:** Go to `/register` and create a new account (Select Role: Recruiter).
2.  **Login:** Log in with your new credentials.
3.  **Post:** Navigate to "Post Job" in the navbar. Fill out the form.
4.  **Wait:** You will be redirected to the home page, but the job won't appear yet!

### How to Approve a Job (Admin)
1.  Go to `http://127.0.0.1:8000/admin/`.
2.  Log in with your **Superuser** account.
3.  Click on **Jobs**.
4.  Select the newly created job.
5.  Check the **"Is approved"** box and click **Save**.
6.  Refresh the frontend homepage to see the job.

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/jobs/` | List all approved jobs | No |
| `POST` | `/api/jobs/` | Create a new job | Yes (JWT) |
| `POST` | `/api/users/` | Register a new user | No |
| `POST` | `/api/token/` | Obtain Access/Refresh tokens | No |

---

## 🔮 Future Roadmap

* [ ] **Resume Uploads:** Integration with AWS S3 for file storage.
* [ ] **Email Notifications:** Automated emails to recruiters upon application.
* [ ] **Job Detail Page:** Individual pages for job descriptions and application forms.
* [ ] **Pagination:** Handling large lists of jobs.

---

Made with ❤️ by subham rana