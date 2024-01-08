import { combineReducers, createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: "",
  email: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setImage, setEmail } = profileSlice.actions;
export default profileSlice.reducer;
