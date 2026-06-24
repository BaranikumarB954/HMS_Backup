import axios from "axios";
import { storage } from "../utils/storage";

export const getProfile = async () => {
  const token = await storage.getToken();

  return axios.get("/patient/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};