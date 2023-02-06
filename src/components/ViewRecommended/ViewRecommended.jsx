import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SwipeBox from '../SwipeBox/SwipeBox';

export default function ViewRecommendation() {

  // Initialize dispatch
  const dispatch = useDispatch();

  // Fetch game recommendations
  useEffect(() => {
    dispatch({ type: 'RAWG/FETCH_RECOMMENDATIONS' });
  }, []);

  return (
    <>
      {/* Placeholder text */}
      <h1>🎮 RECOMMENDATION 🕹 VIEW</h1>
      <br />

      {/* I think props for the functions to call on different swipe directions will need
      to be passed down into the SwipeBox component */}
      <SwipeBox />

    </>
  )
}