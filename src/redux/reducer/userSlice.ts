
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  appliedJobs: string[];
}

const initialState: UserState = {
  appliedJobs: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    applyJob(state, action) {
      state.appliedJobs.push(action.payload);
    },
  },
});

export const { applyJob } = userSlice.actions;

export default userSlice.reducer;
