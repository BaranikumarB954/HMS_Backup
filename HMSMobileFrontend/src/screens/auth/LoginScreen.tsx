import { View, Text, ImageBackground } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { storage } from "../../utils/storage";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { login } from "../../services/auth.service";
import { styles } from "../../styles/loginScreen.styles";

export default function LoginScreen() {
  const router = useRouter();

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

      const { accessToken, refreshToken, roleName, user } = apiRes.data;

      if (roleName !== "PATIENT") {
        alert("Access denied: Not a patient");
        return;
      }

      // ✅ STORE TOKENS
      await storage.setToken(accessToken);          // 🔥 FIXED
      await storage.setRefreshToken(refreshToken);

      // ✅ STORE USER (optional but recommended)
      if (user) {
        await storage.setUser(user);
      }

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

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text
          style={styles.link}
          onPress={() => router.push("/auth/forgot-password")}
        >
          Forgot Password?
        </Text>

        <Button title="Login" onPress={handleLogin} />

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