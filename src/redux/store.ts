import { configureStore, combineReducers } from '@reduxjs/toolkit';
import jobPostsReducer from './reducer/jobPostsSlice';
import authReducer from './reducer/authSlice';
import userReducer from './reducer/userSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  jobPosts: jobPostsReducer,
});



const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;