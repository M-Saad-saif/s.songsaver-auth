# 🎵 SongSaver

**SongSaver** is a modern, full-stack web application that allows users to search, save, and manage their favorite songs. It features secure user authentication, personalized profiles, and a clean, responsive interface.

**Live Demo:** [s-songsaver-auth.vercel.app](https://s-songsaver-auth.vercel.app) | **GitHub:** [M-Saad-saif/s.songsaver-auth](https://github.com/M-Saad-saif/s.songsaver-auth)

---

## ✨ Features

### 🔐 **Secure User Authentication**
*   Complete user registration and login system.
*   Secure logout functionality.
*   Protected user profiles and saved songs.

### 🎶 **Song Management**
*   Search for songs using an integrated music API.
*   View and manage all your saved songs in one place.

### 👤 **User Profile**
*   Add profile picture.
*   Personalized user profile page.
*   Displays user information and saved song history.

### 🚀 **Modern Tech Stack**
*   **Frontend:** Built with React for a fast, dynamic user interface.
*   **Backend:** Node.js/Express server for API logic and security.
*   **Storage:** Integrated with Cloudinary for potential media management.
*   **Deployment:** Seamlessly deployed on Vercel.

---

## 🛠️ Tech Stack

*   **Frontend:** React, JavaScript (ES6+), CSS
*   **Backend:** Node.js, Express
*   **Database:** MongoDB - Atlas
*   **File Storage:** Cloudinary, Multer
*   **Authentication:** JWT
*   **Deployment:** Vercel (Frontend & Backend)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project running on your local machine.

### Prerequisites
*   **Node.js** (v16 or later) and **npm** installed.
*   A **Cloudinary** account for file storage (optional, if using upload features).
*   A **database** instance (MongoDB Atlas or similar) if applicable.

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/M-Saad-saif/s.songsaver-auth.git
    cd s.songsaver-auth
    ```

2.  **Install frontend dependencies**
    ```bash
    npm install
    ```

3.  **Install backend dependencies**
    ```bash
    cd backend
    npm install
    cd ..
    ```

4.  **Configure Environment Variables**
    *   In the `/backend` directory, create a `.env` file.
    *   Add your necessary keys (database URL, Cloudinary credentials, JWT secret, etc.):
    ```
    DATABASE_URL=your_database_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    JWT_SECRET=your_super_secret_jwt_key
    MONGODB_URL=your_url
    ```

### Running the Application

**Development Mode (Frontend):**
```bash
npm start
```
Runs the React app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

**Running the Backend Server:**
```bash
cd backend
node server.js
# or, if using nodemon for auto-restarts:
# nodemon server.js
```
The backend API will typically run on a port like `http://localhost:5000`.

**Build for Production:**
```bash
npm run build
```
Builds the app for production to the `build` folder, optimized for performance.

---

## 🌐 Deployment

This project is configured for easy deployment on **Vercel**.

### Vercel Deployment Settings (Based on `vercel.json`):
*   **Framework Preset:** `create-react-app`
*   **Build Command:** `npm run build`
*   **Output Directory:** `build`
*   **Install Command:** `npm install`

To deploy:
1.  Push your code to GitHub.
2.  Import the project in the [Vercel Dashboard](https://vercel.com/new).
3.  Add your environment variables in the project settings.
4.  Vercel will automatically deploy on every push to the main branch.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions to improve this project, please follow these steps:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request on GitHub.

---

## 👤 Author

**M Saad Saif**
*   GitHub: [@M-Saad-saif](https://github.com/M-Saad-saif)
*   Project Link: [https://github.com/M-Saad-saif/s.songsaver-auth](https://github.com/M-Saad-saif/s.songsaver-auth)

---
*📊 **Project Stats (as of Jan 16, 2026):** 42 Commits | Languages: JavaScript (76.4%), CSS (21.9%), HTML (1.7%)*
