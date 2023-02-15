// HOOK IMPORTS
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI IMPORTS
import { Button, Card, FormControl, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

// COMPONENT IMPORTS
import MenuItem from "@mui/material/MenuItem";
import Heading1 from "../Headings/Heading1";
import Heading3 from "../Headings/Heading3";

export default function ViewSearch() {
  // initialize dispatch
  const dispatch = useDispatch();

  // initialize history
  const history = useHistory();

  // fetches subtypes from database
  useEffect(() => {
    dispatch({ type: "RAWG/FETCH_GENRE_LIST" });
  }, []);

  // Initialize local states for search criteria
  const [gameTitle, setGameTitle] = useState("");
  const [gameGenre, setGameGenre] = useState("");

  // initialize variables from store
  const genreList = useSelector((store) => store.games.genreList.results);

  const searchByName = () => {
    // Clear current search results
    dispatch({ type: "GAME/CLEAR_SEARCH_RESULTS" });
    // Query RAWG for titles using current input
    dispatch({ type: "RAWG/SEARCH_BY_NAME", payload: gameTitle });
    history.push(`/searchresults/${gameTitle}`);
  };

  const searchByGenre = () => {
    // Clear current search results
    dispatch({ type: "GAME/CLEAR_SEARCH_RESULTS" });
    // Query RAWG by Genre
    dispatch({ type: "RAWG/SEARCH_BY_GENRE", payload: gameGenre });
    history.push(`/searchresults/${gameGenre}`);
  };

  return (
    <div>
      <Card sx={{ border: "1px solid #dddddd" }}>
        {/* Page Label */}
        <Heading1 sx={{ textAlign: "center", my: "1rem" }}>
          Search Games
        </Heading1>

        {/* Search By Name */}
        <Heading3 sx={{ ml: "20px", mt: '1.2rem' }}>By Game Title</Heading3>
        <div className="two-column-grid">
          <div className="grid-left">
            <FormControl fullWidth>
              <TextField
                required
                value={gameTitle}
                label="Title"
                variant="outlined"
                onChange={(event) => setGameTitle(event.target.value)}
              />
            </FormControl>
          </div>

          {/* Search button for search by name */}
          <div className="grid-right">
            <Button
              variant="outlined"
              disabled={!gameTitle}
              onClick={() => searchByName()}
              sx={{ p: "10px" }}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Search By Genre */}
        <Heading3 sx={{ ml: "20px", mt: "1.2rem" }}>By Genre</Heading3>
        <div className="two-column-grid">
          <div className="grid-left">
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
                  return (
                    <MenuItem key={i} value={genre.slug}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          {/* Search button for search by genre */}
          <div className="grid-right">
            <Button
              variant="outlined"
              disabled={!gameGenre}
              onClick={() => searchByGenre()}
              sx={{ padding: "10px" }}
            >
              Search
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
