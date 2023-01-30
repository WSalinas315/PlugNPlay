import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import './RegisterForm.css'

function RegisterForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const errors = useSelector((store) => store.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  const registerUser = (event) => {
    event.preventDefault()

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    })
  } // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
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
        <input
          className="btn login-btn"
          type="submit"
          name="submit"
          value="Register"
        />
      </div>
      <div className="formItem">
        <button
          type="button"
          className="btn register-btn"
          onClick={() => {
            history.push('/login')
          }}
        >
          Back
        </button>
      </div>
    </form>
  )
}

export default RegisterForm
