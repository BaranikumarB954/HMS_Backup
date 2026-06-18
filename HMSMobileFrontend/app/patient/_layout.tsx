import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../src/hooks/useAuth";

export default function PatientLayout() {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/auth/login");
    }
  }, [token, loading]);

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