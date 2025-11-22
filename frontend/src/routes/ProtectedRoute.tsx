import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/sign-in" replace />;

  return <Outlet />;
};

export default ProtectedRoute;