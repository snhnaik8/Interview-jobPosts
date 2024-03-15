import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Mock Redux store
import { fetchJobPosts } from '@/redux/reducer/jobPostsSlice'; // Import the fetchJobPosts action creator
import JobPostsList from '@/components/JobPostsList';

// Mock the action creator
jest.mock('@/redux/reducer/jobPostsSlice', () => ({
  ...jest.requireActual('@/redux/reducer/jobPostsSlice'),
  fetchJobPosts: jest.fn(),
}));

const mockStore = configureStore([]);

describe('JobPostsList', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      jobPosts: {
        posts: [],
        status: 'idle',
        error: null,
      },
    });
  });

  test('renders job posts correctly', () => {
    render(
      <Provider store={store}>
        <JobPostsList />
      </Provider>
    );

  
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('dispatches fetchJobPosts action on component mount', () => {
    render(
      <Provider store={store}>
        <JobPostsList />
      </Provider>
    );

    expect(fetchJobPosts).toHaveBeenCalledTimes(1); 
    expect(fetchJobPosts).toHaveBeenCalledWith(); 
  });


});
