import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useState } from 'react'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SnackbarAlert(props) {
  const [snackOpen, setSnackOpen] = useState(props.snackOpen)
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackOpen(false)
  }

  return (
    <Snackbar
      open={snackOpen}
      autoHideDuration={6000}
      onClose={handleSnackClose}
    >
      <Alert
        onClose={handleSnackClose}
        severity={props.severity}
        sx={{ width: '100%' }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  )
}
