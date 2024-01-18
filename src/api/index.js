import axios from "axios";

const instance = axios.create({
  baseURL: "https://aibek-backender.org.kg",
  headers: {
    "Content-Type": "application/json",
  },
});

let refresh = false;

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("Refresh token:", refreshToken);

    if (error.response.status === 401 && !refresh) {
      refresh = true;

      try {
        const response = await instance.post("/auth/token/refresh/", {
          refresh: refreshToken,
        });

        if (response.status === 201) {
          const newAccessToken = response.data.access;
          localStorage.setItem("accessToken", newAccessToken);
          console.log("Access Token:", newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.log("Token refresh failed", refreshError);
        throw refreshError;
      } finally {
        refresh = false;
      }
    }

    return Promise.reject(error);
  }
);

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

    const { access, refresh, user } = response.data.tokens;

    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    console.log("Localstorage:", localStorage);

    return response.data;
  } catch (error) {
    console.log("Login failed");
    throw error;
  }
};

export const Logout = async (data) => {
  try {
    const response = await instance.post("/auth/logout/", data);
    localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (formData) => {
  try {
    // const accessToken = localStorage.getItem("accessToken");
    // console.log("Access token:", accessToken);

    const accessToken = localStorage.getItem("accessToken");

    const response = await instance.post(
      "/products/create-update-list/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const refreshResponse = await instance.post("/auth/token/refresh", {
          refresh: refreshToken,
        });

        if (refreshResponse.status === 201) {
          const newAccessToken = refreshResponse.data.access;
          localStorage.setItem("accessToken", newAccessToken);

          const retryResponse = await instance.post(
            "/products/create-update-list/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          return retryResponse.data;
        }
      } catch (refreshError) {
        console.log("token refresh failed:", refreshError);
        throw refreshError;
      }
    }
    console.log("Error in adding product");

    throw error;
  }
};

export const addUserInfo = async (formData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await instance.put("/auth/profile-update/", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error in updating user info", error);
    throw error;
  }
};

// export const refreshAccessToken = async (refreshToken) => {
//   try {
//     console.log("refresh token:", refreshToken);
//     const response = await instance.post("/auth/token/refresh/", {
//       refresh: refreshToken,
//     });

//     console.log("Token refresh response:", response);

//     const newAccessToken = response.data.tokens.access;

//     localStorage.setItem("accessToken", newAccessToken);

//     return newAccessToken;
//   } catch (error) {
//     console.log("Token refresh failed", error);

//     if (error.response) {
//       console.log("Response data:", error.response.data);
//       console.log("Response status:", error.response.status);
//       console.log("Response headers:", error.response.headers);
//     }

//     throw error;
//   }
// };
