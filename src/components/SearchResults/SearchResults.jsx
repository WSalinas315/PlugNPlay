import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import Loading from "../Loading/Loading";

export default function SearchResults() {

  // initialize dispatch
  const dispatch = useDispatch();

  // initialize history
  const history = useHistory();

  // initialize variables from store
  const searchResults = useSelector(store => store.games.searchResults.results);

  // View a detailed page for the game that is clicked on
  const viewDetails = (result) => {
    dispatch({ type: 'GAME/CLEAR_CURRENT' });
    dispatch({ type: 'GAME/FETCH_CURRENT_GAME', payload: result.id });
    history.push(`/games/${result.id}`);
  }

  return (
    <div className='results-container'>
      {/* Page Label */}
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "15px", fontWeight: "bold" }}>Search Results</Typography>

      {searchResults ? searchResults.map(result => (
        // Results Card
        <Card onClick={() => viewDetails(result)} sx={{ border: 'solid 1px', marginTop: '10px' }}>
          <div className="two-column-grid">
            <div className="grid-left">
              {/* Game Name */}
              <Typography variant='h5'>{result.name}</Typography>
              {/* Game Release Date */}
              <Typography variant='body2'>{result.released}</Typography>
            </div>
            {/* Game Image */}
            <img className="grid-right" src={result.background_image} height='65px' />
          </div>
        </Card>
      ))
        :
        <Loading />
      }
      <div className='foot-spacer'></div>
    </div>
  );
}
