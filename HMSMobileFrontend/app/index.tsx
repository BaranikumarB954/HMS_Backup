import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { storage } from "@/utils/storage";
export default function Index() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await storage.getToken();

      if (token) {
        setIsLoggedIn(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return null;

  // 🔥 Redirect based on login
  if (isLoggedIn) {
    return <Redirect href="/patient/dashboard" />;
  }

  return <Redirect href="/auth/login" />;
}