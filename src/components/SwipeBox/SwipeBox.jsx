import React, { Component } from "react";
import { useState } from "react";

import Swipe from "react-easy-swipe";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Close, OpenInBrowser, StarBorder } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  autocompleteClasses,
} from "@mui/material";

import SnackbarAlert from "../SnackbarAlert/SnackbarAlert";
import ParagraphText from "../ParagraphText/ParagraphText";
import Heading2 from "../Headings/Heading2";
import { useGameByID } from "../../hooks/storeHooks";

import "./SwipeBox.css";

export default function SwipeBox(props) {
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const game = useGameByID();
  const dispatch = useDispatch();
  const history = useHistory();
  const [gameQueue, setGameQueue] = useState(0);
  const thisGame = props.games[gameQueue];

  // for dialog box
  const handleOpen = () => {
    setSnackOpen(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: "GAME/CLEAR_CURRENT" });
  };

  const handleSnackOpen = (severity, message) => {
    setSnackOpen(false);
    setSeverity(severity);
    setMessage(message);
    setSnackOpen(true);
  };

  // X and Y position variables initialized to 0.
  // Note: useStates break the swipe functionality
  let xPos = 0;
  let yPos = 0;

  // String for console logging swipe direction. Not needed for app functionality
  let swipe = "";

  // SwipeContainer Class for creating the SwipeBox
  class SwipeContainer extends Component {
    // onSwipeStart function
    onSwipeStart(event) {
      console.log("Start swiping...", event);
    }

    // onSwipeMove logs the positional changes from the starting point and sets the X/Y position variables
    onSwipeMove(position, event) {
      // console.log(`Moved ${position.x} pixels horizontally`, event);
      // console.log(`Moved ${position.y} pixels vertically`, event);
      xPos = position.x;
      yPos = position.y;
    }

    addToWishlist() {
      dispatch({
        type: "USER/WISHLIST/ADD",
        payload: thisGame.gameData.id,
      });
      handleSnackOpen("success", `${thisGame.gameData.name} added to wishlist`);
      props.games.shift();
      dispatch({ type: "GAME/SWIPE_WISHLIST", payload: props.games });
    }

    skipThisGame() {
      handleSnackOpen("error", `${thisGame.gameData.name} skipped`);
      props.games.shift();
      dispatch({ type: "GAME/SWIPE_SKIP", payload: props.games });
    }

    moreDetails() {
      dispatch({
        type: "RAWG/FETCH_CURRENT_GAME",
        payload: thisGame.gameData.id,
      });
      handleOpen();
    }

    // onSwipeEnd function calculates swipe direction and console logs the result
    // prop functions being passed into SwipeBox will be called at the appropriate points here
    onSwipeEnd(event) {
      console.log("End swiping...", event);
      if (xPos > 0 && yPos > 0) {
        if (xPos > yPos) {
          swipe = "Right Swipe";
          dispatch({
            type: "USER/WISHLIST/ADD",
            payload: thisGame.gameData.id,
          });
          handleSnackOpen(
            "success",
            `${thisGame.gameData.name} added to wishlist`
          );
          props.games.shift();
          dispatch({ type: "GAME/SWIPE_WISHLIST", payload: props.games });
        } else {
          swipe = "Down Swipe";
        }
      } else if (xPos > 0 && yPos < 0) {
        if (xPos > yPos * -1) {
          swipe = "Right Swipe";
          dispatch({
            type: "USER/WISHLIST/ADD",
            payload: thisGame.gameData.id,
          });
          handleSnackOpen(
            "success",
            `${thisGame.gameData.name} added to wishlist`
          );
          props.games.shift();
          dispatch({ type: "GAME/SWIPE_WISHLIST", payload: props.games });
        } else {
          swipe = "Up Swipe";
          dispatch({
            type: "RAWG/FETCH_CURRENT_GAME",
            payload: thisGame.gameData.id,
          });
          handleOpen();
        }
      } else if (xPos < 0 && yPos > 0) {
        if (xPos * -1 > yPos) {
          swipe = "Left Swipe";
          handleSnackOpen("error", `Skipped ${thisGame.gameData.name}`);
          props.games.shift();
          dispatch({ type: "GAME/SWIPE_SKIP", payload: props.games });
        } else {
          swipe = "Down Swipe";
        }
      } else if (xPos < 0 && yPos < 0) {
        if (xPos > yPos) {
          swipe = "Up Swipe";
          dispatch({
            type: "RAWG/FETCH_CURRENT_GAME",
            payload: thisGame.gameData.id,
          });
          handleOpen();
        } else {
          swipe = "Left Swipe";
          handleSnackOpen("error", `Skipped ${thisGame.gameData.name}`);
          props.games.shift();
          dispatch({ type: "GAME/SWIPE_SKIP", payload: props.games });
        }
      } else {
        console.log("didn't make it into an if/else");
      }
      console.log("Swipe Direction:", swipe);
    }

    render() {
      // Styles the box to be rendered
      const boxStyle = {
        position: "relative",
        aspectRatio: "1/1",
        height: "300px",
        border: "1px solid black",
        background: "#ccc",
        padding: "20px",
        fontSize: "1em",
        margin: "20px",
        backgroundImage: `url(${thisGame.gameData.background_image})`,
        objectFit: "cover",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      };

      const buttonBoxStyle = {
        display: "grid",
        placeItems: "center",
      };

      const buttonStyle = {
        px: "2rem",
      };

      const swiper = new SwipeContainer();

      return (
        <div>
          <SnackbarAlert
            snackOpen={snackOpen}
            severity={severity}
            message={message}
            anchor={severity === "error" ? "left" : "right"}
          />
          <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            {game.name ? (
              <>
                <DialogTitle>{thisGame?.gameData.name}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <div
                      style={{
                        fontWeight: "bold",
                        color: `${
                          thisGame?.gameScore >= 0.7
                            ? "green"
                            : thisGame?.gameScore >= 0.4
                            ? "darkorange"
                            : "red"
                        }`,
                      }}
                    >
                      {Number((thisGame?.gameScore * 100).toFixed(1)) +
                        "% Match"}
                    </div>
                    <ParagraphText>
                      {game.description_raw?.length > 200
                        ? game.description_raw?.substring(0, 199) + "..."
                        : game.description_raw}
                    </ParagraphText>
                    <div style={buttonBoxStyle}>
                      <Button
                        sx={buttonStyle}
                        onClick={() =>
                          history.push(`/games/${thisGame?.gameData.id}`)
                        }
                        variant="outlined"
                      >
                        Details
                      </Button>
                    </div>
                  </DialogContentText>
                </DialogContent>
              </>
            ) : (
              <DialogContent>
                <DialogContentText children={"Loading..."} />
              </DialogContent>
            )}
          </Dialog>
          <Swipe
            onSwipeStart={this.onSwipeStart}
            onSwipeMove={this.onSwipeMove}
            onSwipeEnd={this.onSwipeEnd}
          >
            <div
              onClick={() => history.push(`/games/${thisGame?.gameData.id}`)}
              draggable="true"
              style={boxStyle}
            >
              <span class="game-splash-title">{thisGame.gameData.name}</span>
            </div>
          </Swipe>

          <div className="flex-row">
            {/* left swipe to skip */}
            <IconButton onClick={this.skipThisGame} color="primary">
              <Close />
            </IconButton>

            {/* up swipe to see more details */}
            <IconButton onClick={this.moreDetails} color="primary">
              <OpenInBrowser />
            </IconButton>

            {/* right swipe to wishlist */}
            <IconButton onClick={this.addToWishlist} color="primary">
              <StarBorder />
            </IconButton>
          </div>
        </div>
      );
    }
  }

  // Return class for rendering
  return <SwipeContainer />;
}
