import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  appliedJobs: string[];
}

const initialState: UserState = {
  appliedJobs: JSON.parse(localStorage.getItem('appliedJobs') || "[]"),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    applyJob(state, action) {
      state.appliedJobs.push(action.payload);
      localStorage.setItem('appliedJobs', JSON.stringify(state.appliedJobs));
    },
  },
});

export const { applyJob } = userSlice.actions;

export default userSlice.reducer;
