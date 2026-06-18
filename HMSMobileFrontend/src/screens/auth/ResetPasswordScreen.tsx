import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { resetPassword } from "../../services/auth.service";

export default function ResetPasswordScreen({ route }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  // 🔥 Handle deep link (web → app redirect)
  useEffect(() => {
    const getUrl = async () => {
      const url = await Linking.getInitialURL();

      if (url) {
        const { queryParams } = Linking.parse(url);

        if (queryParams?.token) setToken(queryParams.token as string);
        if (queryParams?.email) setEmail(queryParams.email as string);
      }
    };

    getUrl();
  }, []);

  // 🔥 Fallback (if navigated manually)
  useEffect(() => {
    if (route?.params?.token) {
      setToken(route.params.token);
    }
  }, [route]);

  const handleReset = async () => {
    if (!email || !password || !token) {
      alert("All fields are required");
      return;
    }

    try {
      await resetPassword(token, { email, password });
      alert("Password updated successfully");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Reset failed");
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="New Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Optional: show token (debug only) */}
        {/* <Text style={{ fontSize: 10 }}>{token}</Text> */}

        <Button title="Reset Password" onPress={handleReset} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    margin: 20,
    backgroundColor: "#ffffffcc",
    padding: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
});