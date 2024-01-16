import axios from "axios";

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1ODIzODUyLCJpYXQiOjE3MDUzOTE4NTIsImp0aSI6Ijg4MzY4ODc3ZjBlNTQxZGJhZmZmZDk0ZTI5YmMzNWVlIiwidXNlcl9pZCI6NH0.uuVe67pWSHuxe7dxGY2haqZ37klBZBPJB-1-I8KZtAU";

const instance = axios.create({
  baseURL: "https://aibek-backender.org.kg",
  headers: {
    "Content-Type": "application/json",
    ...(access_token && { Authorization: `Bearer ${access_token}` }),
  },
});

export const signup = async (data) => {
  try {
    const response = await instance.post("/auth/register/", data);
    console.log("Successfully registered");
    return response.data;
  } catch (error) {
    console.log("Registration failed", error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await instance.post("/auth/login/", data);
    console.log("Successfully logged in");
    return response.data;
  } catch (error) {
    console.log("Login failed");
    throw error;
  }
};

export const addProduct = async (formData) => {
  try {
    const response = await instance.post(
      "/products/create-update-list/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(access_token && { Authorization: `Bearer ${access_token}` }),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in adding product");
    throw error;
  }
};

export const addUserInfo = async (formData) => {
  try {
    const response = await instance.put("/auth/profile-update/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(access_token && { Authorization: `Bearer ${access_token}` }),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await instance.post("/auth/token/refresh/", {
      refreshToken: refreshToken,
    });
    const newAccessToken = response.data.accessToken;
    // Handle store

    localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.log("Token refresh failed", error);
    throw error;
  }
};
