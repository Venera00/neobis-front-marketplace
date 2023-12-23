import axios from "axios";

const instance = axios.create({
  baseURL: "https://aibek-backender.org.kg",
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async (data) => {
  try {
    const response = await instance.post("/register/", data);
    console.log("Successfully registered");
    return response.data;
  } catch (error) {
    console.log("Registration failed", error);
  }
};

export const login = async (data) => {
  try {
    const response = await instance.post("/login/", data);
    console.log("Successfully logged in");
  } catch (error) {
    console.log("Login failed");
    throw error;
  }
};