import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../reducers/reducers";

const store = configureStore({
  reducer: {
    profile: profileReducer,

    devTools: true,
  },
});

export default store;
