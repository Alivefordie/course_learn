import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/Login';
import { AuthContext } from '../context/AuthContext';

const mockLogin = jest.fn();

const authContextValue = {
  login: mockLogin,
};

describe('Login component', () => {
  test('renders login form and buttons', () => {
    const { getByLabelText, getAllByText } = render(
      <Router>
        <AuthContext.Provider value={authContextValue}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    const usernameInput = getByLabelText('Username');
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = getByLabelText('Password');
    expect(passwordInput).toBeInTheDocument();

    const loginButton = getAllByText('Login')[1]; 
    expect(loginButton).toBeInTheDocument();
  });

  test('allows user to fill in credentials and submit form', async () => {
    const { getByLabelText, getAllByText } = render(
      <Router>
        <AuthContext.Provider value={authContextValue}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const loginButton = getAllByText('Login')[1]; 

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'testpassword');
    });
  });


});
