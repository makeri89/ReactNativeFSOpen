import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

import { SignInContainer } from '../../components/SignIn';

describe('Sign in form', () => {
  it('calls the submit function correctly', async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(<SignInContainer onSubmit={onSubmit} />);

    act(() => {
      fireEvent.changeText(getByPlaceholderText('username'), 'kalle');
    });
    
    act(() => {
      fireEvent.changeText(getByPlaceholderText('password'), 'password');
    });
    
    act(() => {
      fireEvent.press(getByText('Sign in'));
    });
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password'
      });
    });
  });
});