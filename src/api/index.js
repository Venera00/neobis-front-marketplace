import axios from "axios";

const instance = axios.create({
  baseURL: "https://aibek-backender.org.kg",
  headers: {
    "Content-Type": "application/json",
  },
});

// instance.interceptors.request.use(
//   async (config) => {
//     const csrfToken = localStorage.getItem("csrftoken");

//     if (csrfToken) {
//       config.headers["X-CSRFToken"] = csrfToken;
//     }

//     console.log("localStorage:", localStorage);

//     const accessToken = localStorage.getItem("accessToken");
//     console.log("access token:", accessToken);

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       console.log(error);
//       throw error;
//     }

//     return Promise.reject(error);
//   }
// );

let refresh = false;

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      const response = await instance.post("/auth/token/refresh/", {
        refresh: refreshToken,
      });

      const accessToken = localStorage.getItem("accessToken");

      if (response.status === 201) {
        instance.headers.Authorization = `Bearer ${accessToken}`;

        return instance(error.config);
      }
    }
    refresh = false;
    return error;
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

    // const accessToken = response.data.tokens?.access;

    // localStorage.setItem("accessToken", accessToken);

    console.log("Successfully logged in");
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
    localStorage.removeItem("refreshToken");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (formData) => {
  try {
    // const accessToken = localStorage.getItem("accessToken");
    // console.log("Access token:", accessToken);

    const response = await instance.post(
      "/products/create-update-list/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
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
