import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../src/hooks/useAuth";

export default function PatientLayout() {

  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="book-appointment" />
      <Stack.Screen name="appointment" />
    </Stack>
  );
}