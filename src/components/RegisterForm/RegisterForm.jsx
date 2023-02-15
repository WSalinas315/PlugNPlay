import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import './RegisterForm.css';
import Heading1 from '../Headings/Heading1';
import Heading3 from '../Headings/Heading3';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  // Actions upon submitting the registration form
  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    })
    history.push(`/survey/1`);
  }

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <Heading1>Register</Heading1>
      {errors.registrationMessage && (
        <Heading3 fontSx={{ color: 'red' }}>
          {errors.registrationMessage}
        </Heading3>
      )}
      <div className="formItem">
        <TextField
          id="outlined-basic"
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          variant="outlined"
        />
      </div>
      <div className="formItem">
        <TextField
          type="password"
          id="outlined-basic"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
        />
      </div>
      <div className="formItem">
        <Button
          sx={{ width: '150px' }}
          variant="contained"
          type="submit"
          name="submit">
            Register
          </Button>
      </div>
      <div className="formItem">
        <Button
          type="button"
          className="btn register-btn"
          onClick={() => {
            history.push('/login')
          }}
        >
          Back
        </Button>
      </div>
    </form>
  )
}

export default RegisterForm
