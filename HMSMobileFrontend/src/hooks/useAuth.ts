import { useEffect, useState } from "react";
import { storage } from "../utils/storage";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const checkAuth = async () => {
    const storedToken = await storage.getToken();
    setToken(storedToken);
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { token, loading };
};