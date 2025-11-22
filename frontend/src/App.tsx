import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/homepage/HomePage';
import ClassPage from './pages/classes/ClassPage';
import ClassDetailsPage from './pages/classes/ClassDetailsPage';
import MainLayout from './layouts/MainLayout';


function App() {

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
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
