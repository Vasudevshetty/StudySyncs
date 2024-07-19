# StudySyncs Frontend

![StudySyncs Logo](./public/img/logo-final-light.png)

Welcome to the frontend repository of StudySyncs! This application is developed to provide an organized platform for students to access their study materials and resources.

## 🚀 Hosted Application

[StudySyncs Frontend](https://studysyncs.netlify.app)

## 📂 Project Structure

```plaintext
client/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── pages/
│   │   ├── app/
│   │   │   ├── styles/
│   │   │   ├── AppPage.jsx
│   │   │   ├── Banner.jsx
│   │   │   ├── College.jsx
│   │   │   ├── ContentList.jsx
│   │   │   ├── Course.jsx
│   │   │   ├── Description.jsx
│   │   │   ├── FullPageLoader.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Semester.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── home/
│   │   │   ├── Features.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Operations.jsx
│   │   │   ├── Section.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Testimonials.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .eslintrc.cjs
├── .gitignore
├── firebaseConfig.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## 🛠️ Built With

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **Firebase**: A platform for hosting and storage solutions.
- **CSS Modules**: Scoped CSS for component-level styles.

## ⚙️ Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Vasudevshetty/StudySyncs.git
   cd StudySyncs/client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add environment variables:
   Create a `.env` file in the root of the project and add your Firebase configuration variables:

   ```plaintext
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Build for production:

   ```bash
   npm run build
   ```

## 🌟 Features

- Browse colleges, courses, and semesters
- View and download study materials
- Responsive design for various devices

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## 📄 License

This project is licensed under the MIT License.

```

```
