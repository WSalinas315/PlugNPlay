import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RecommendedList from '../RecommendedList/RecommendedList';
import SwipeBox from '../SwipeBox/SwipeBox';

import './ViewRecommended.css'

export default function ViewRecommendation() {

  // Initialize dispatch
  const dispatch = useDispatch();

  return (
    <>
      {/* Placeholder text */}
      {/*<h1>🎮 RECOMMENDATION 🕹 VIEW</h1>*/}
      <br />

      <RecommendedList />

      {/* I think props for the functions to call on different swipe directions will need
      to be passed down into the SwipeBox component */}
      {/* <SwipeBox /> */}

    </>
  )
}