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
      autoHideDuration={1000}
      onClose={handleSnackClose}
      anchorOrigin={{ vertical:'top', horizontal: props.anchor }}
      sx={{ height: "60%" }}
    >
      <Alert
        onClose={handleSnackClose}
        severity={props.severity}
        sx={{ maxWidth: '20%', display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center', textAlign:'center' }}
        
      >
        {props.message}
      </Alert>
    </Snackbar>
  )
}
