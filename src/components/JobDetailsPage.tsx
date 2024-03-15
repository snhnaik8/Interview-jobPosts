"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchJobDetailsById } from '@/redux/reducer/jobPostsSlice';
import { applyJob } from '@/redux/reducer/userSlice';
import Button from 'react-bootstrap/Button';
import LoginModal from './LoginModal';
import Modal from 'react-bootstrap/Modal';
import { login } from '@/redux/reducer/authSlice';
import Container from 'react-bootstrap/Container';
import styles from './JobDetailsPage.module.css';

interface Props {
  id: string;
}

const JobDetailsPage: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const appliedJobs = useSelector((state: RootState) => state.user.appliedJobs);
  const jobDetails = useSelector((state: RootState) => state.jobPosts.posts.find(post => post.id === id));
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showAppliedDialog, setShowAppliedDialog] = useState<boolean>(false);
  const isJobAlreadyApplied = appliedJobs.includes(id); // Check if the job is already applied
  console.log("appliedJobs", appliedJobs as any);
  useEffect(() => {
    if (!jobDetails) {
      dispatch(fetchJobDetailsById(id) as any);
    }
  }, [id, dispatch, jobDetails]);

  const handleApplyNow = () => {
    if (isLoggedIn) {
      if (!isJobAlreadyApplied) {
        dispatch(applyJob(id));
        setShowAppliedDialog(true);
      } else {
        setShowAppliedDialog(true);
      }
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogin = (username: string, password: string) => {
    console.log('Logging in with:', username, password);
    localStorage.setItem('loggedInUser', JSON.stringify({ username, password }));
    dispatch(applyJob(id));
    setShowLoginModal(false);
    setShowAppliedDialog(true);
    dispatch(login(username));

  };

  return (
    <Container>
      <div>
        {jobDetails && (
          <>
            <h1>Job Details</h1>
            <p><span className={styles.jobDetailItem}>Company Name:</span> {jobDetails.companyName}</p>
            <p><span className={styles.jobDetailItem}>Job Title:</span> {jobDetails.jobTitle}</p>
            <p><span className={styles.jobDetailItem}>About Position:</span> {jobDetails.aboutPosition}</p>
            {!isLoggedIn && (
              <>
                <p><span className={styles.jobDetailItem}>City:</span> {jobDetails.address.city}, <span className={styles.jobDetailItem}>Province:</span> {jobDetails.address.province}</p>
              </>
            )}
            {isLoggedIn && (
              <>
                <p><span className={styles.jobDetailItem}>Address:</span> {jobDetails.address.street}</p>
                <p><span className={styles.jobDetailItem}>City:</span> {jobDetails.address.city}, <span className={styles.jobDetailItem}>Province:</span> {jobDetails.address.province}, {jobDetails.address.postalCode}</p>
              </>
            )}

            {!isJobAlreadyApplied && (
              <Button onClick={handleApplyNow}>Apply Now</Button>
            )}

            {isJobAlreadyApplied && (
              <Button disabled>Already Applied</Button>
            )}
          </>
        )}
        {/* Login Modal */}
        <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} onLogin={handleLogin} />
        {/* Applied Dialog */}
        <Modal show={showAppliedDialog} onHide={() => setShowAppliedDialog(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Job Applied</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You've applied to {jobDetails?.companyName} to work as a {jobDetails?.jobTitle}.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAppliedDialog(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default JobDetailsPage;

