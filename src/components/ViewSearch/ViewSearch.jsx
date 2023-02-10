import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, FormControl, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function ViewSearch() {

  // initialize dispatch
  const dispatch = useDispatch();

  // fetches subtypes from database
  useEffect(() => {
    dispatch({ type: 'RAWG/FETCH_GENRE_LIST' });
  }, []);

  // Initialize local states for search criteria
  const [gameTitle, setGameTitle] = useState('');
  const [gameGenre, setGameGenre] = useState('');

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
      {/* <h1>Search Games</h1> */}

      {/* Search By Name */}
      <h3>Search By Game Title</h3>
      <FormControl fullWidth>
        <TextField
          required
          value={gameTitle}
          label="Title"
          variant="outlined"
          onChange={(event) => setGameTitle(event.target.value)}
        />
      </FormControl>
      {gameTitle
        ?
        <Button variant="outlined" onClick={() => searchByName()}>Search</Button>
        :
        <Button variant="outlined" disabled>Search</Button>
      }

      {/* Search By Genre */}
      <h3>Search By Genre</h3>
      <FormControl fullWidth>
        <InputLabel id="genre">Genre</InputLabel>
        <Select
          required
          id="genre"
          label="Genre"
          value={gameGenre}
          onChange={(event) => setGameGenre(event.target.value)}
          
        >
          {genreList.map((genre, i) => {
            return(<MenuItem key={i} value={genre.name}>{genre.name}</MenuItem>)
          })}
        </Select>
      </FormControl>
      {gameGenre ? <Button variant="outlined">Search</Button> : <Button variant="outlined" disabled>Search</Button>}


    </>
  );
}
