# Developer Directory: Full-Stack MERN Application

A clean and efficient full-stack developer management platform built with the MERN stack (MongoDB, Express.js, React, Node.js), allowing users to add developers, filter by role, and search by tech stack through a responsive modern UI.

---

## 📍 Live Demo 

| Live Application |
|------------------|
| *(Add deployed link)* | 

---

## 📸 Application Preview

### Add Developer Form
![Developer Form](frontend/screenshots/form.png)

### Developer List
![Developer List](frontend/screenshots/developer-list.png)

### Search & Filter
![Search Filter](frontend/screenshots/search-filter.png)


---

## ✨ Key Features

**Add Developer Profiles:** Add name, role, tech stack, and experience.

**Search & Filter:** Search by tech stack & filter by role.

**Responsive UI:** Tailwind-based modern design.

**REST API:** Backend built with Express.js and MongoDB.

**Clean Architecture:** Controllers, routes, models, utilities.

**Smooth Frontend:** React + Vite with clean reusable components.

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | React, Vite, Tailwind CSS, Axios, React Hot Toast |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Utilities | ApiResponse, ApiError, asyncHandler |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or later)
- MongoDB Atlas or local MongoDB
- Git installed

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/developer-directory.git
cd developer-directory
2. Backend Setup
bash
Copy code
cd backend
npm install
touch .env
npm start
Add to .env:

ini
Copy code
MONGO_URI=your-mongodb-uri
PORT=5000
3. Frontend Setup
bash
Copy code
cd frontend
npm install
touch .env
npm run dev
Add to .env:

ini
Copy code
VITE_API_URL=http://localhost:5000
Your application is now running:

Frontend: http://localhost:5173

Backend API: http://localhost:5000

🤝 Contributing
Fork the repo

Create a branch (git checkout -b feature/NewFeature)

Commit changes (git commit -m "Add NewFeature")

Push (git push origin feature/NewFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License.

👨‍💻 Connect with Me
GitHub: https://github.com/OmVerma420

LinkedIn: https://linkedin.com/in/om-verma


Made using the MERN Stack