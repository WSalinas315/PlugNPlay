import React, { Component } from 'react'
import { useEffect } from "react";
import Swipe from 'react-easy-swipe'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { useState } from 'react'
import SnackbarAlert from '../SnackbarAlert/SnackbarAlert'
import { useGameByID } from "../../hooks/storeHooks";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

/*
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
*/

export default function SwipeBox(props) {
  const [open, setOpen] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)
  const [severity, setSeverity] = useState('')
  const [message, setMessage] = useState('')
  const game = useGameByID();
  const dispatch = useDispatch();
  const history = useHistory();
  const [gameQueue, setGameQueue] = useState(0);
  /*
  useEffect(() => {
    dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: props.games[0]?.gameData.id });
  }, []);
  */

  // for dialog box
  const handleOpen = () => {
    setSnackOpen(false)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    dispatch({ type: "GAME/CLEAR_CURRENT" });
  }

  const handleSnackOpen = (severity, message) => {
    setSnackOpen(false)
    setSeverity(severity)
    setMessage(message)
    setSnackOpen(true)
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
          handleSnackOpen('success', `You swiped right on ${props.games[gameQueue].gameData.name}!`)
          setGameQueue(gameQueue + 1);
          //dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: props.games[gameQueue].gameData.id });
        } else {
          swipe = 'Down Swipe'
        }
      } else if (xPos > 0 && yPos < 0) {
        if (xPos > yPos * -1) {
          swipe = 'Right Swipe'
          handleSnackOpen('success', `You swiped right on ${props.games[gameQueue].gameData.name}!`)
          setGameQueue(gameQueue + 1);
          //dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: props.games[gameQueue].gameData.id });
        } else {
          swipe = 'Up Swipe'
          dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: props.games[gameQueue].gameData.id });
          handleOpen()
        }
      } else if (xPos < 0 && yPos > 0) {
        if (xPos * -1 > yPos) {
          swipe = 'Left Swipe'
          handleSnackOpen('error', `You swiped left on ${props.games[gameQueue].gameData.name}!`)
          setGameQueue(gameQueue + 1);
          //dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: props.games[gameQueue].gameData.id });
        } else {
          swipe = 'Down Swipe'
        }
      } else if (xPos < 0 && yPos < 0) {
        if (xPos > yPos) {
          swipe = 'Up Swipe'
          dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: props.games[gameQueue].gameData.id });
          handleOpen()

        } else {
          swipe = 'Left Swipe'
          handleSnackOpen('error', `You swiped left on ${props.games[gameQueue].gameData.name}!`)
          setGameQueue(gameQueue + 1);
          //dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: props.games[gameQueue].gameData.id });
        }
      } else {
        console.log("didn't make it into an if/else")
      }
      console.log('Swipe Direction:', swipe)
    }
    
   /*
    onSwipeLeft() {
      handleSnackOpen('error', 'You swiped left!')
      setGameQueue(gameQueue + 1);
      dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: props.games[gameQueue].gameData.id });

    }
    onSwipeRight() {
      handleSnackOpen('success', 'You swiped right!')
      setGameQueue(gameQueue + 1);
      dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: props.games[gameQueue].gameData.id });
    }
    onSwipeUp() {
      handleOpen()
    }
    */

    render() {
      // Styles the box to be rendered
      const boxStyle = {
        width: '80%',
        height: '300px',
        border: '1px solid black',
        background: '#ccc',
        padding: '20px',
        fontSize: '1em',
        margin: '20px',
        backgroundImage: `url(${props.games[gameQueue].gameData.background_image})`,
        objectFit: 'cover',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center center'
      }

      return (
        <div>
          <SnackbarAlert
            snackOpen={snackOpen}
            severity={severity}
            message={message}
            anchor={severity === 'error' ? 'left' : 'right'}
          />
          <Dialog
            open={open}
            /*TransitionComponent={Transition}*/
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            {game.name && <DialogTitle>{props.games[gameQueue]?.gameData.name}</DialogTitle>}
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
              {game.name && <div style={{fontWeight: 'bold', color: `${props.games[gameQueue]?.gameScore >= 0.7 ? 'green' : (props.games[gameQueue]?.gameScore >= 0.4 ? 'darkorange' : 'red')}`}}>{props.games[gameQueue]?.gameScore * 100 + '% Match'}</div>}
              {game.name ? (game.description_raw?.length > 200 ? game.description_raw?.substring(0,199) + '...' : game.description_raw) : 'Loading...'}<br />
              {game.name && <button onClick={() => history.push(`/games/${props.games[gameQueue]?.gameData.id}`)} className='btn'>Details</button>}
                {/*
              Released on: {props.games[0]?.gameData.released}<br/>
              {game.publishers[0] && 'Published by: ' + game.publishers[0]?.name}<br />
      {game.description_raw}<br/>*/}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Swipe
            onSwipeStart={this.onSwipeStart}
            onSwipeMove={this.onSwipeMove}
            onSwipeEnd={this.onSwipeEnd}
          >
            <div draggable="true" style={boxStyle}><span style={{backgroundColor: 'white'}}>{props.games[gameQueue].gameData.name}</span></div>
          </Swipe>
        </div>
      )
    }
  }

  // Return class for rendering
  return <SwipeContainer />
}
