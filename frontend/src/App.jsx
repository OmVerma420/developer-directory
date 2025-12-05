import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Developers from "./pages/Developer.jsx";
import DeveloperProfile from "./pages/DeveloperProfile.jsx";
import EditDeveloper from "./pages/EditDeveloper.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import AddDeveloper from "./pages/AddDeveloper";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-center" />

      <Routes>

        <Route path="/" element={<Navigate to="/developers" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/developers"
          element={
            <ProtectedRoute>
              <Developers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/developers/:id"
          element={
            <ProtectedRoute>
              <DeveloperProfile />
            </ProtectedRoute>
          }
        />
        <Route
  path="/developers/add"
  element={
    <ProtectedRoute>
      <AddDeveloper />
    </ProtectedRoute>
  }
/>


        <Route
          path="/developers/edit/:id"
          element={
            <ProtectedRoute>
              <EditDeveloper />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<p>404 Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}
