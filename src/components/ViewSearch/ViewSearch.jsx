import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Button, FormControl, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ViewSearch() {

  // initialize dispatch
  const dispatch = useDispatch();

  // 
  useEffect(() => {
    //dispatch({ type: 'USER/FETCH_PLAYED_LIST' });
  }, []);

  // Initialize local state
  const [gameTitle, setGameTitle] = useState('');
  const [gameGenre, setGameGenre] = useState('');

  return (
    <>
      <h1>SEARCH THE STUFF</h1>

      {/* Search By Name */}
      <h3>Search By Game Title</h3>
      <FormControl>
        <TextField
          required
          value={gameTitle}
          label="Title"
          variant="outlined"
          onChange={(event) => setGameTitle(event.target.value)}
          size="small"
        />
      </FormControl>
      {gameTitle ? <Button variant="outlined">Search</Button> : <Button variant="outlined" disabled>Search</Button>}

      {/* Search By Genre */}
      {/* <h3>Search By Genre</h3>
      <FormControl>
        <TextField
          required
          value={gameGenre}
          label="Genre"
          variant="outlined"
          onChange={(event) => setGameGenre(event.target.value)}
          size="small"
        />
      </FormControl>
      {gameGenre ? <Button variant="outlined">Search</Button> : <Button variant="outlined" disabled>Search</Button>} */}


    </>
  );
}
