import { useAuth } from "../Context/useAuth";
import { useLocation } from "react-router-dom";
import { LoginGate } from "./LoginGate";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <LoginGate redirectTo={location.pathname}>
        {children}
      </LoginGate>
    );
  }

  return children;
};