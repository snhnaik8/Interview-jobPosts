"use client";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import LoginModal from './LoginModal';
import styles from './Header.module.css';
import { login, logout } from '@/redux/reducer/authSlice'; // Import login and logout actions
import { RootState } from '@/redux/store';


export default function Header() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const loggedInUser = useSelector((state: RootState) => state.auth.loggedInUser); // Access loggedInUser from Redux store

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleLogin = (username: string, password: string) => {
    dispatch(login(username)); // Dispatch login action with username
    setShowModal(false);
  };

  const handleLogout = () => {
    console.log('Logging out');
    // For demonstration, removing the username and password from localStorage and othe stoarages
    localStorage.removeItem('authState');
    localStorage.removeItem('appliedJobs');
    dispatch(logout()); // Dispatch logout action
  
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" data-bs-theme="light">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="/images/WaybleRGBLogo.png"
              alt="Your Logo"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className={`ms-auto ${styles.navLinks}`}>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              {isLoggedIn ? (
                <Nav.Link>{loggedInUser}</Nav.Link>
              ) : (
                <Button variant="warning" onClick={() => setShowModal(true)}>Login</Button>
              )}
            </Nav>
          </Navbar.Collapse>
          {isLoggedIn && (
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
          )}
        </Container>
      </Navbar>
      <LoginModal show={showModal} onHide={() => setShowModal(false)} onLogin={handleLogin} />
    </div>
  );
}
