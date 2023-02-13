import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";

import { formatDate } from '../../helpers/dates'
import Loading from "../Loading/Loading";
import Heading1 from "../Headings/Heading1";
import Heading2 from "../Headings/Heading2";

export default function SearchResults() {
  // initialize dispatch
  const dispatch = useDispatch();

  // initialize history
  const history = useHistory();

  // initialize variables from store
  const searchResults = useSelector(
    (store) => store.games.searchResults.results
  );

  // View a detailed page for the game that is clicked on
  const viewDetails = (result) => {
    dispatch({ type: "GAME/CLEAR_CURRENT" });
    dispatch({ type: "GAME/FETCH_CURRENT_GAME", payload: result.id });
    history.push(`/games/${result.id}`);
  };

  return (
    <div className="results-container">
      {/* Page Label */}
      <Box sx={{ py: "0.6rem" }}>
        <Heading1 sx={{ textAlign: "center" }}>Search Results</Heading1>
      </Box>

      {searchResults ? (
        searchResults.map((result) => (
          // Results Card
          <Card
            onClick={() => viewDetails(result)}
            sx={{ border: "solid 1px", marginTop: "10px" }}
          >
            <div className="two-column-grid">
              <div className="grid-left">
                {/* Game Name */}
                <Heading2 fontSx={{ fontWeight: '400' }}>{result.name}</Heading2>
                {/* Game Release Date */}
                <Typography variant="body2">Released {formatDate(result.released)}</Typography>
              </div>
              {/* Game Image */}
              <img
                className="grid-right"
                src={result.background_image}
                height="65px"
              />
            </div>
          </Card>
        ))
      ) : (
        <Loading />
      )}
      <div className="foot-spacer" />
    </div>
  );
}
