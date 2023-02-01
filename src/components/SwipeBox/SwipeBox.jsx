import React, { Component } from 'react';
import Swipe from 'react-easy-swipe';

export default function SwipeBox() {

  // X and Y position variables initialized to 0. 
  // Note: useStates break the swipe functionality
  let xPos = 0;
  let yPos = 0;

  // String for console logging swipe direction. Not needed for app functionality
  let swipe = '';

  // SwipeContainer Class for creating the SwipeBox
  class SwipeContainer extends Component {

    // onSwipeStart function
    onSwipeStart(event) {
      console.log('Start swiping...', event);
    }
    
    // onSwipeMove logs the positional changes from the starting point and sets the X/Y position variables
    onSwipeMove(position, event) {
      console.log(`Moved ${position.x} pixels horizontally`, event);
      console.log(`Moved ${position.y} pixels vertically`, event);
      xPos = position.x;
      yPos = position.y;
    }

    // onSwipeEnd function calculates swipe direction and console logs the result
    // prop functions being passed into SwipeBox will be called at the appropriate points here
    onSwipeEnd(event) {
      console.log('End swiping...', event);
      if(xPos > 0 && yPos > 0){
        if(xPos > yPos){
          swipe = 'Right Swipe';
        } else {
          swipe = 'Down Swipe';
        }
      } 
      else if(xPos > 0 && yPos < 0){
        if(xPos > (yPos*-1)){
          swipe = 'Right Swipe';
        } else {
          swipe = 'Up Swipe';
        }
      }
      else if(xPos < 0 && yPos > 0){
        if((xPos*-1) > yPos){
          swipe = 'Left Swipe';
        } else {
          swipe = 'Down Swipe';
        }
      }
      else if(xPos < 0 && yPos < 0){
        if(xPos > yPos){
          swipe = 'Up Swipe';
        } else {
          swipe = 'Left Swipe';
        }
      } else {
        console.log("didn't make it into an if/else")
      }
      console.log('Swipe Direction:', swipe);
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
        margin: '20px'
      };

      return (
        <Swipe
          onSwipeStart={this.onSwipeStart}
          onSwipeMove={this.onSwipeMove}
          onSwipeEnd={this.onSwipeEnd}>
          <div style={boxStyle}>It's Swipin' Time! 👆</div>
        </Swipe>
      );
    }
  }

  // Return class for rendering
  return (
    <SwipeContainer />
  )
}