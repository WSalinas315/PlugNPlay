import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const history = useHistory();

  return (
    <div id="loginpage">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
