import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface JobPost {
  id: string;
  companyName: string;
  jobTitle: string;
  aboutPosition: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

interface JobPostsState {
  posts: JobPost[];
  selectedJobDetails: JobPost | null; // New state to hold the selected job details
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchJobPosts = createAsyncThunk<JobPost[]>('jobPosts/fetchJobPosts', async () => {
  try {
    const response = await axios.get<JobPost[]>('/db.json');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch job posts.');
  }
});

export const fetchJobDetailsById = createAsyncThunk<JobPost, string>(
  'jobPosts/fetchJobDetailsById',
  async (id: string) => {
    try {
      const response = await axios.get<JobPost[]>(`/db.json?id=${id}`);
      return response.data[0]; 
    } catch (error) {
      throw new Error('Failed to fetch job details.');
    }
  }
);

const initialState: JobPostsState = {
  posts: [],
  selectedJobDetails: null,
  status: 'idle',
  error: null,
};


const jobPostsSlice = createSlice({
  name: 'jobPosts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchJobPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(fetchJobDetailsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobDetailsById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedJobDetails = action.payload;
      })
      .addCase(fetchJobDetailsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default jobPostsSlice.reducer;
