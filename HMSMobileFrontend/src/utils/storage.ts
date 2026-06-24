import * as SecureStore from "expo-secure-store";

export const storage = {
  // 🔥 ACCESS TOKEN
  setToken: async (token: string) => {
    await SecureStore.setItemAsync("accessToken", token);
  },

  getToken: async () => {
    return await SecureStore.getItemAsync("accessToken");
  },

  removeToken: async () => {
    await SecureStore.deleteItemAsync("accessToken");
  },

  // 🔥 REFRESH TOKEN
  setRefreshToken: async (token: string) => {
    await SecureStore.setItemAsync("refreshToken", token);
  },

  getRefreshToken: async () => {
    return await SecureStore.getItemAsync("refreshToken");
  },

  removeRefreshToken: async () => {
    await SecureStore.deleteItemAsync("refreshToken");
  },

  // 🔥 USER
  setUser: async (user: any) => {
    await SecureStore.setItemAsync("user", JSON.stringify(user));
  },

  getUser: async () => {
    const data = await SecureStore.getItemAsync("user");
    return data ? JSON.parse(data) : null;
  },

  clearAll: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("user");
  }
};