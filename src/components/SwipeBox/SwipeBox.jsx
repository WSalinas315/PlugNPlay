import React, { Component } from 'react'
import Swipe from 'react-easy-swipe'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { useState } from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SwipeBox() {
  const [open, setOpen] = useState(false)
  const [snackLeftOpen, setSnackLeftOpen] = useState(false)
  const [snackRightOpen, setSnackRightOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSnackLeftOpen = () => {
    handleSnackRightClose();
    setSnackLeftOpen(true)
  }
  const handleSnackRightOpen = () => {
    handleSnackLeftClose();
    setSnackRightOpen(true)
  }

  const handleSnackLeftClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackLeftOpen(false)
  }
  const handleSnackRightClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackRightOpen(false)
  }

  // X and Y position variables initialized to 0.
  // Note: useStates break the swipe functionality
  let xPos = 0
  let yPos = 0

  // String for console logging swipe direction. Not needed for app functionality
  let swipe = ''

  // SwipeContainer Class for creating the SwipeBox
  class SwipeContainer extends Component {
    // onSwipeStart function
    onSwipeStart(event) {
      console.log('Start swiping...', event)
    }

    // onSwipeMove logs the positional changes from the starting point and sets the X/Y position variables
    onSwipeMove(position, event) {
      // console.log(`Moved ${position.x} pixels horizontally`, event);
      // console.log(`Moved ${position.y} pixels vertically`, event);
      xPos = position.x
      yPos = position.y
    }

    // onSwipeEnd function calculates swipe direction and console logs the result
    // prop functions being passed into SwipeBox will be called at the appropriate points here
    onSwipeEnd(event) {
      console.log('End swiping...', event)
      if (xPos > 0 && yPos > 0) {
        if (xPos > yPos) {
          swipe = 'Right Swipe'
          handleSnackRightOpen();
        } else {
          swipe = 'Down Swipe'
        }
      } else if (xPos > 0 && yPos < 0) {
        if (xPos > yPos * -1) {
          swipe = 'Right Swipe'
          handleSnackRightOpen();
        } else {
          swipe = 'Up Swipe'
          handleOpen()
        }
      } else if (xPos < 0 && yPos > 0) {
        if (xPos * -1 > yPos) {
          swipe = 'Left Swipe'
          handleSnackLeftOpen();
        } else {
          swipe = 'Down Swipe'
        }
      } else if (xPos < 0 && yPos < 0) {
        if (xPos > yPos) {
          swipe = 'Up Swipe'
          handleOpen()
        } else {
          swipe = 'Left Swipe'
          handleSnackLeftOpen();
        }
      } else {
        console.log("didn't make it into an if/else")
      }
      console.log('Swipe Direction:', swipe)

      /*
      //handle swipe
      if (swipe === 'Left Swipe') {
        //snackbar
      } else if (swipe === 'Right Swipe') {
        //snackbar
      } else if (swipe === 'Up Swipe') {
        //dialog
        handleOpen();
      }
      */
    }

    render() {
      // Styles the box to be rendered
      const boxStyle = {
        width: '80%',
        height: '300px',
        border: '1px solid black',
        background: '#ccc',
        padding: '20px',
        fontSize: '3em',
        margin: '20px',
      }

      return (
        <>
          <Snackbar open={snackLeftOpen} autoHideDuration={6000} onClose={handleSnackLeftClose}>
            <Alert
              onClose={handleSnackLeftClose}
              severity="error"
              sx={{ width: '100%' }}
            >
              You swiped left!
            </Alert>
          </Snackbar>
          <Snackbar open={snackRightOpen} autoHideDuration={6000} onClose={handleSnackRightClose}>
            <Alert
              onClose={handleSnackRightClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              You swiped right!
            </Alert>
          </Snackbar>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{'Game name'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Description of the game that you swiped up on.
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Swipe
            onSwipeStart={this.onSwipeStart}
            onSwipeMove={this.onSwipeMove}
            onSwipeEnd={this.onSwipeEnd}
          >
            <div style={boxStyle}>It's Swipin' Time! 👆</div>
          </Swipe>
        </>
      )
    }
  }

  // Return class for rendering
  return <SwipeContainer />
}
