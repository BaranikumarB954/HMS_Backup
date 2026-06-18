import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { forgotPassword } from "../../services/auth.service";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const handleForgot = async () => {
    try {
      await forgotPassword(email);
      alert("Check your email for reset password");
    } catch (err: any) {
      alert("Error sending email");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Input placeholder="Enter Email" value={email} onChangeText={setEmail} />
      <Button title="Send Reset Link" onPress={handleForgot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 20 }
});