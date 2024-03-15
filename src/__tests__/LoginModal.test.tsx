import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginModal from '@/components/LoginModal';

describe('LoginModal', () => {
  test('renders correctly and calls onLogin handler with form data on form submission', () => {
  
    const mockOnLogin = jest.fn();

    
    const { getByLabelText, getByRole } = render(
      <LoginModal show={true} onHide={() => {}} onLogin={mockOnLogin} />
    );

  
    fireEvent.change(getByLabelText('User Name'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'testpassword' } });


    fireEvent.click(getByRole('button', { name: /login/i }));

  
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnLogin).toHaveBeenCalledWith('testuser', 'testpassword');
  });


});
