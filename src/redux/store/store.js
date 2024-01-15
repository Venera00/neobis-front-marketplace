import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import profileReducer from "../reducers/reducers";

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },

  // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk],
  // devTools: process.env.NODE_ENV !== "production",
});

export default store;
