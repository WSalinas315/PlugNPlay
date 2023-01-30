import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import './LoginForm.css';
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
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div className='formItem'>
          <TextField id="outlined-basic" label="Username" value={username} onChange={(event) => setUsername(event.target.value)} variant="outlined" />
      </div>
      <div className='formItem'>
        <TextField type="password" id="outlined-basic" label="Password" value={password} onChange={(event) => setPassword(event.target.value)} variant="outlined" />
      </div>
      <div className='formItem'>
        <input className="btn login-btn" type="submit" name="submit" value="Log In" />
      </div>
      <div className='formItem'>
      <button
          type="button"
          className="btn register-btn"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
        </div>
    </form>
  );
}

export default LoginForm;
