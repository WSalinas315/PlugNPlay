import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, FormControl, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function SearchResults() {

  // initialize dispatch
  const dispatch = useDispatch();

  // fetches subtypes from database
  useEffect(() => {
    dispatch({ type: 'RAWG/FETCH_GENRE_LIST' });
  }, []);

  // Initialize local states for search criteria
  const [gameTitle, setGameTitle] = useState('');

  // initialize variables from store
  const genreList = useSelector(store => store.games.genreList.results);

  const searchByName = () => {
    // Clear current search results
    dispatch({ type: 'GAME/CLEAR_SEARCH_RESULTS' });
    // Query RAWG for titles using current input
    dispatch({ type: 'RAWG/SEARCH_BY_NAME', payload: gameTitle });
  }



  return (
    <>

    </>
  );
}
