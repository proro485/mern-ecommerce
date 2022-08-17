import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

interface UserState {
  user: User | {};
}

const initialState: UserState = {
  user: {},
};

const userSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: User | {} }) => {
      state.user = payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
