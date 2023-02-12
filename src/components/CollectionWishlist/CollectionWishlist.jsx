import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export default function Wishlist() {
  // initialize dispatch
  const dispatch = useDispatch();

  // Initialize history
  const history = useHistory();

  // fetches user's wishlist from database
  useEffect(() => {
    dispatch({ type: "USER/FETCH_WISHLIST" });
  }, []);

  // pull wishlist information from the store
  const wishlist = useSelector((store) => store.userLists.userWishlist);

  // Set current game and go to detailed page
  const viewDetailed = (game) => {
    dispatch({ type: "GAME/CLEAR_CURRENT" });
    dispatch({ type: "GAME/FETCH_CURRENT_GAME", payload: game.id });
    history.push(`/games/${game.id}`);
  };

  return (
    <>
      <ImageList cols={1} rowHeight={250} gap={20}>
        {wishlist?.map((item) => (
          <ImageListItem key={item.id} onClick={() => viewDetailed(item)}>
            <img
              src={item.background_image}
              srcSet={item.background_image}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.name}
              subtitle={item.released}
              position="top"
              sx={{ margin: "10px 10px 0px 10px" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
