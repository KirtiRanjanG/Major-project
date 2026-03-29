import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ token, children }) {
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

