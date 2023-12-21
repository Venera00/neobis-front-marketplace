import axios from "axios";

const instance = axios.create({
  baseURL: "https://aibek-backender.org.kg",
  headers: {
    "Content-Type": "application/json",
  },
});
