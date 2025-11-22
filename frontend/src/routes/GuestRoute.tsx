import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const GuestRoute: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) return <div>Loading...</div>;

  // If user is logged in → send them to homepage
  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default GuestRoute;