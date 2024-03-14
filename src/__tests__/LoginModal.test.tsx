/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginModal  from '../components/LoginModal';

describe('LoginModal component', () => {
  const onHideMock = jest.fn();
  const onLoginMock = jest.fn();

  const defaultProps: any = {
    show: true,
    onHide: onHideMock,
    onLogin: onLoginMock,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the modal when show prop is true', () => {
    render(<LoginModal {...defaultProps} />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('does not render the modal when show prop is false', () => {
    render(<LoginModal {...defaultProps} show={false} />);
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  test('calls onLogin function with username and password when form is submitted', () => {
    render(<LoginModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByText('Login'));

    expect(onLoginMock).toHaveBeenCalledWith('testuser', 'testpassword');
  });

  test('calls onHide function when modal is closed', () => {
    render(<LoginModal {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onHideMock).toHaveBeenCalled();
  });
});
