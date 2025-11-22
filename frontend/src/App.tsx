import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/homepage/HomePage';
import ClassPage from './pages/classes/ClassPage';
import ClassDetailsPage from './pages/classes/ClassDetailsPage';
import MainLayout from './layouts/MainLayout';
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";


function App() {
   const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthProvider>
      <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/classes" element={<ClassPage />} />
          <Route path="/class/:id" element={<ClassDetailsPage />} />
        </Route>
      </Route>

      <Route element={<GuestRoute />}>
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
      </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
