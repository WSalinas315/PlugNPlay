import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Card, Typography } from '@mui/material';

export default function SearchResults() {

  // initialize dispatch
  const dispatch = useDispatch();

  // initialize history
  const history = useHistory();

  // initialize variables from store
  const searchResults = useSelector(store => store.games.searchResults.results);

  // View a detailed page for the game that is clicked on
  const viewDetails = (result) => {
    // Clear current search results
    dispatch({ type: 'GAME/CLEAR_CURRENT' });
    dispatch({ type: 'GAME/FETCH_CURRENT_GAME', payload: result.id });
    history.push(`/games/${result.id}`);
  }

  return (
    <div className='results-container'>
      <h1>Search Results</h1>
      {searchResults?.map(result => (
        <Card onClick={() => viewDetails(result)} sx={{border:'solid 1px'}}>
          <div className="two-column-grid">
            <div className="grid-left">
              <Typography variant='h5'>{result.name}</Typography>
              <Typography variant='body2'>{result.released}</Typography>
            </div>
            <img className="grid-right" src={result.background_image} height='75px' />
          </div>
        </Card>
      ))}
    </div>
  );
}
