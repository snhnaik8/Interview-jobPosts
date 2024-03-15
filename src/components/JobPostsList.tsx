"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { RootState } from '@/redux/store';
import { fetchJobPosts } from '@/redux/reducer/jobPostsSlice';
import styles from './JobPostsList.module.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const JobPostsList: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state: RootState) => state.jobPosts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobPosts() as any);
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <Container>Loading...</Container>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Container> 
      <h1 style={{ padding: '20px' }}>Job Posts</h1>
      <div className={styles.jobPostsList}>
        {posts.map((post) => (
          <Link className={styles.cardLink} href={`/jobDetails/${post.id}`} key={post.id}>
            <div>
              <Card className={styles.jobCard}>
                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.title}>{post.jobTitle}</Card.Title>
                  <Card.Subtitle className={styles.subtitle}>{post.companyName}</Card.Subtitle>
                 <div className='mt-3'> <Button>Details</Button></div> 
                </Card.Body>
              </Card>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default JobPostsList;
