import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet
} from "react-native";
import { BlurView } from "expo-blur";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { profileMainStyles as styles } from "../../styles/profileMain.styles";
import { storage } from "../../utils/storage";
import BottomNav from "@/src/components/common/BottomNav";
import { changePassword } from "../../services/auth.service";
import { getPatientProfile } from "../../services/profile.service"; // ✅ ADDED

export default function ProfileScreen() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔥 USER STATE
  const [user, setUser] = useState<any>({});

  // 🔥 ERROR STATES
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // ✅ FETCH PROFILE DATA
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getPatientProfile();
      setUser(res.user); // ✅ IMPORTANT
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ INITIALS FUNCTION
  const getInitials = () => {
    return `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`;
  };

  // 🔥 LOGOUT
  const handleLogout = async () => {
    try {
      const refreshToken = await storage.getRefreshToken();

      if (refreshToken) {
        await fetch("http://10.0.2.2:5000/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (e) {
      console.log("Logout error", e);
    }

    await storage.clearAll();
    router.replace("/auth/login");
  };

  // 🔥 CHANGE PASSWORD
  const handleSavePassword = async () => {
    setNewPasswordError("");
    setConfirmPasswordError("");

    let valid = true;

    if (!newPassword) {
      setNewPasswordError("Password is required");
      valid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordError("Minimum 6 characters required");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm your password");
      valid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    }

    if (!valid) return;

    try {
      await changePassword(newPassword);

      // 🔥 FORCE LOGOUT AFTER PASSWORD CHANGE
      await storage.clearAll();
      router.replace("/auth/login");
    } catch (err: any) {
      setNewPasswordError(err.message || "Error updating password");
    }
  };

  return (
    <View style={styles.container}>

      {/* 🔹 USER CARD */}
      <View style={styles.userCard}>
        <View style={styles.userLeft}>

          {/* ✅ DYNAMIC AVATAR */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </View>

          <View>
            <Text style={styles.name}>Welcome</Text>

            {/* ✅ DYNAMIC NAME */}
            <Text style={styles.username}>
              {user?.firstName} {user?.lastName}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* 🔹 MENU */}
      <View style={styles.menuContainer}>

        {/* USER PROFILE */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/patient/edit-profile")}
        >
          <View style={styles.menuLeft}>
            <Ionicons name="person-outline" size={20} />
            <Text style={styles.menuText}>User Profile</Text>
          </View>
          <Feather name="chevron-right" size={20} />
        </TouchableOpacity>

        {/* CHANGE PASSWORD */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setShowModal(true)}
        >
          <View style={styles.menuLeft}>
            <Ionicons name="lock-closed-outline" size={20} />
            <Text style={styles.menuText}>Change Password</Text>
          </View>
          <Feather name="chevron-right" size={20} />
        </TouchableOpacity>

        {/* ABOUT US */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/patient/about")}
        >
          <View style={styles.menuLeft}>
            <Ionicons name="information-circle-outline" size={20} />
            <Text style={styles.menuText}>About Us</Text>
          </View>
          <Feather name="chevron-right" size={20} />
        </TouchableOpacity>

      </View>

      {/* 🔥 MODAL */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.overlay}>

          <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />

          <TouchableOpacity
            style={styles.closeArea}
            onPress={() => setShowModal(false)}
          />

          <View style={styles.modalContainer}>
            <View style={styles.dragBar} />

            <Text style={styles.modalTitle}>Change Password</Text>

            <TextInput
              placeholder="New Password"
              secureTextEntry
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            {newPasswordError ? (
              <Text style={styles.errorText}>{newPasswordError}</Text>
            ) : null}

            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}

            <TouchableOpacity style={styles.button} onPress={handleSavePassword}>
              <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>

      <BottomNav />
    </View>
  );
}