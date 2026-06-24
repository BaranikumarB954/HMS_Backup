import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { signup } from "../../services/auth.service";
import { useRouter } from "expo-router";
import {styles} from '../../styles/registerScreen.styles';

export default function RegisterScreen() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const router = useRouter();

  const handleSignup = async () => {
    try {
      await signup(form);
      alert("Signup successful. Verify email.");
      router.replace("/auth/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <Input placeholder="First Name" onChangeText={(v: any) => setForm({ ...form, firstName: v })} />
        <Input placeholder="Last Name" onChangeText={(v: any) => setForm({ ...form, lastName: v })} />
        <Input placeholder="Email" onChangeText={(v: any) => setForm({ ...form, email: v })} />
        <Input placeholder="Phone" onChangeText={(v: any) => setForm({ ...form, phone: v })} />
        <Input placeholder="Password" secureTextEntry onChangeText={(v: any) => setForm({ ...form, password: v })} />

        <Button title="Sign Up" onPress={handleSignup} />
      </View>
    </ImageBackground>
  );
}
