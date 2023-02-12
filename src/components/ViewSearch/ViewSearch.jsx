import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function ViewSearch() {

  // initialize dispatch
  const dispatch = useDispatch();

  // initialize history
  const history = useHistory();

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
    history.push(`/searchresults/${gameTitle}`);
  }

  const searchByGenre = () => {
    // Clear current search results
    dispatch({ type: 'GAME/CLEAR_SEARCH_RESULTS' });
    // Query RAWG by Genre
    dispatch({ type: 'RAWG/SEARCH_BY_GENRE', payload: gameGenre });
    history.push(`/searchresults/${gameGenre}`);
  }

  return (
    <>
    {/* Page Label */}
    <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "15px", fontWeight: "bold" }}>Search Games</Typography>

      {/* Search By Name */}
      <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>Search By Game Title</Typography>
      <FormControl fullWidth>
        <TextField
          required
          value={gameTitle}
          label="Title"
          variant="outlined"
          onChange={(event) => setGameTitle(event.target.value)}
        />
      </FormControl>

      {/* Renders a disabled button if no text is in the search by game title input field
          Renders a clickable button otherwise */}
      {gameTitle
        ?
        <Button variant="outlined" onClick={() => searchByName()} sx={{ padding: '10px'}}>Search</Button>
        :
        <Button variant="outlined" disabled sx={{ padding: '10px'}}>Search</Button>
      }
      <br />
      <br />

      {/* Search By Genre */}
      <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>Search By Genre</Typography>
      <FormControl fullWidth>
        <InputLabel id="genre">Genre</InputLabel>
        <Select
          required
          id="genre"
          label="Genre"
          value={gameGenre}
          onChange={(event) => setGameGenre(event.target.value)}
        >
          {genreList?.map((genre, i) => {
            return(<MenuItem key={i} value={genre.slug}>{genre.name}</MenuItem>)
          })}
        </Select>
      </FormControl>

      {/* Renders a disabled button if no text is in the search by game title input field
          Renders a clickable button otherwise */}
      {gameGenre
        ?
        <Button variant="outlined" onClick={() => searchByGenre()} sx={{ padding: '10px'}}>Search</Button>
        :
        <Button variant="outlined" disabled sx={{ padding: '10px'}}>Search</Button>
      }
    </>
  );
}
