import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { storage } from "../../utils/storage";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { login } from "../../services/auth.service";

export default function LoginScreen() {
  const router = useRouter(); // ✅ correct

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    const res = await login({ email, password });

    const apiRes = res.data;

    if (!apiRes.success) {
      alert(apiRes.message);
      return;
    }

    const { token, roleName } = apiRes.data;

    if (roleName !== "PATIENT") {
      alert("Access denied: Not a patient");
      return;
    }

    await storage.setToken(token);
    await storage.setUser(apiRes.data);

    router.replace("/patient/dashboard");

  } catch (err: any) {
    alert(err.message || "Login failed");
  }
};

  return (
    <ImageBackground
      source={require("../../../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>

        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* ✅ FIXED */}
        <Text
          style={styles.link}
          onPress={() => router.push("/auth/forgot-password")}
        >
          Forgot Password?
        </Text>

        <Button title="Login" onPress={handleLogin} />

        {/* ✅ FIXED */}
        <Text
          style={styles.link}
          onPress={() => router.push("/auth/register")}
        >
          Create Account
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: "center" },
  container: {
    margin: 20,
    backgroundColor: "#ffffffcc",
    padding: 20,
    borderRadius: 15,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  link: { color: "#007bff", marginTop: 10 },
});