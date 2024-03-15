import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import JobDetailsPage from '@/components/JobDetailsPage';


const mockStore = configureStore([]);

describe('JobDetailsPage', () => {
  let store:any;
  const mockedJobDetails = {
    id: '1',
    companyName: 'Example Company',
    jobTitle: 'Software Engineer',
    aboutPosition: 'About this position',
    address: {
      street: '123 Main St',
      city: 'Example City',
      province: 'Example Province',
      postalCode: '12345',
    },
  };

  beforeEach(() => {
  
    store = mockStore({
      auth: { isLoggedIn: true },
      user: { appliedJobs: [] }, 
      jobPosts: { posts: [mockedJobDetails], status: 'idle', error: null },
    });
  });

  test('renders job details correctly', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <JobDetailsPage id="1" />
      </Provider>
    );


    expect(getByText('Job Details')).toBeInTheDocument();
    expect(getByText('Company Name:')).toBeInTheDocument();
    expect(getByText('Example Company')).toBeInTheDocument();
    expect(getByText('Job Title:')).toBeInTheDocument();
    expect(getByText('Software Engineer')).toBeInTheDocument();
    expect(getByText('About Position:')).toBeInTheDocument();
    expect(getByText('About this position')).toBeInTheDocument();
    expect(getByText('City:')).toBeInTheDocument();
    expect(getByText('Example City')).toBeInTheDocument();
    expect(getByText('Province:')).toBeInTheDocument();
    expect(getByText('Example Province')).toBeInTheDocument();
    expect(getByText('123 Main St')).toBeInTheDocument();

   
    expect(getByText('Apply Now')).toBeInTheDocument();
  });

  test('applies for job when Apply Now button is clicked', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <JobDetailsPage id="1" />
      </Provider>
    );

    // Simulate clicking on Apply Now button
    fireEvent.click(getByText('Apply Now'));


    await waitFor(() => {
      expect(getByText('Job Applied')).toBeInTheDocument();
      expect(getByText('You\'ve applied to Example Company to work as a Software Engineer.')).toBeInTheDocument();
    });
  });

 
});
