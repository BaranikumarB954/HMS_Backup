import { useEffect, useState } from "react";
import { storage } from "../utils/storage";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    const token = await storage.getToken(); // ✅ YOUR METHOD
    setIsAuthenticated(!!token);
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { isAuthenticated, loading };
};