import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "../../components/ui/Loading";
import type { User } from "../../app/types";
import { useCurrentUser } from "./useCurrentUser";

type ProtectedRouteProps = {
  role: User["role"];
};

// Solo deja pasar a quien tenga sesión y el rol pedido
export function ProtectedRoute({ role }: ProtectedRouteProps) {
  const { token, user, isLoading } = useCurrentUser();

  if (!token) return <Navigate to="/login" replace />;
  if (isLoading) return <Loading text="Comprobando sesión..." />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/" replace />;

  return <Outlet />;
}
