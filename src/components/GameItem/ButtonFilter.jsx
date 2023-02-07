import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserLists } from "../../hooks/storeHooks";
import { GameListButton } from "./Buttons";

import { Button } from "@mui/material";

import {
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material";

export default function UserFunctions({ game }) {
  const dispatch = useDispatch();
  const { userIgnoreList, userPlayedList, userWishlist } = useUserLists();
  const playedIDs = userPlayedList?.map((item) => item.game_id);
  const ignoredIDs = userIgnoreList?.map((item) => item.game_id);
  const wishlistIDs = userWishlist?.map((item) => item.game_id);

  const getLists = () => {
    dispatch({ type: "USER/FETCH_ALL_LISTS" });
  };

  useEffect(getLists, []);

  const ButtonDisplay = () => {
    if (ignoredIDs?.includes(game.id)) {
      // user has ignored this game - show options to remove from ignore list, and add to played
      return (
        <div>
          <GameListButton gameID={game.id} list={"ignorelist"} action={"delete"} />
          <GameListButton gameID={game.id} list={"played_list"} action={"add"} />
          <GameListButton gameID={game.id} list={"wishlist"} action={"add"} />
        </div>
      );
    } else if (playedIDs?.includes(game.id)) {
      // user has played this game - show options to like & dislike, and to remove from played
      
      // TODO: Like and Dislike functionality
      
      return (
        <div>
          <Button startIcon={<ThumbUp />}>Like</Button>
          <Button startIcon={<ThumbDown />}>Dislike</Button>
          <GameListButton gameID={game.id} list={"played_list"} action={"delete"} />
        </div>
      );
    } else if (wishlistIDs?.includes(game.id)) {
      // user has wishlisted this game - show options to remove from wishlist and add to played
      return (
        <div>
          <GameListButton gameID={game.id} list={"wishlist"} action={"delete"} />
          <GameListButton gameID={game.id} list={"played_list"} action={"add"} />
        </div>
      );
    } else {
      // user has not interacted with this game - show all options
      return (
        <div>
          <GameListButton gameID={game.id} list={"wishlist"} action={"add"} />
          <GameListButton gameID={game.id} list={"played_list"} action={"add"} />
          <GameListButton gameID={game.id} list={"ignorelist"} action={"add"} />
        </div>
      );
    }
  };

  return (
    <div>
      <ButtonDisplay />
    </div>
  );
}
