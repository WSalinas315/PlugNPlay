import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button, TextField } from '@mui/material';
import './LoginForm.css';

import Heading1 from '../Headings/Heading1';
import Heading2 from '../Headings/Heading2';
import Heading3 from '../Headings/Heading3';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <Heading1>Log In</Heading1>
      {errors.loginMessage && (
        <Heading3 className="alert" role="alert">
          {errors.loginMessage}
        </Heading3>
      )}
      <div className='formItem'>
          <TextField id="outlined-basic" label="Username" value={username} onChange={(event) => setUsername(event.target.value)} variant="outlined" />
      </div>
      <div className='formItem'>
        <TextField type="password" id="outlined-basic" label="Password" value={password} onChange={(event) => setPassword(event.target.value)} variant="outlined" />
      </div>
      <div className='formItem'>
        <Button sx={{ width: '150px' }} variant="contained" type="submit" name="submit">
          Log In
        </Button>
      </div>
      <div className='formItem'>
      <Button
          type="button"
          className="btn register-btn"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
        </div>
    </form>
  );
}

export default LoginForm;
