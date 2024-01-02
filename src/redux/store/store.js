import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/reducers";

const store = configureStore({
  reducer: rootReducer,

  //   reducer: {
  //     profile,
  //     products,
  //   },
  devTools: true,
});

export default store;
