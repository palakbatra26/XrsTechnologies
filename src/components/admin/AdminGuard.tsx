import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAdminAuth } from "./admin-auth";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    setIsAuthed(getAdminAuth());
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  if (!isAuthed) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
