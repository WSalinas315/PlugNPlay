import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserLists } from "../../hooks/storeHooks";
import { LikeDislikeButton, GameListButton } from "./Buttons";

export default function UserFunctions({ game }) {
  const dispatch = useDispatch();
  const { userIgnorelist, userPlayedList, userWishlist } = useUserLists();
  const ignoredIDs = userIgnorelist?.map((item) => item.game_id);
  const wishlistIDs = userWishlist?.map((item) => item.game_id);
  const playedIDs = userPlayedList?.map((item) => item.game_id);
  const liked = userPlayedList?.find((item) => item.game_id === game.id)?.liked

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
          <GameListButton gameID={game.id} list={"playedlist"} action={"add"} />
          <GameListButton gameID={game.id} list={"wishlist"} action={"add"} />
        </div>
      );
    } else if (playedIDs?.includes(game.id)) {
      // user has played this game - show options to like & dislike, and to remove from played
      
      // TODO: Like and Dislike functionality
      
      return (
        <div>
          <LikeDislikeButton gameID={game.id} liked={liked} action={"like"} />
          <LikeDislikeButton gameID={game.id} liked={liked} action={"dislike"} />
          <GameListButton gameID={game.id} list={"playedlist"} action={"delete"} />
        </div>
      );
    } else if (wishlistIDs?.includes(game.id)) {
      // user has wishlisted this game - show options to remove from wishlist and add to played
      return (
        <div>
          <GameListButton gameID={game.id} list={"wishlist"} action={"delete"} />
          <GameListButton gameID={game.id} list={"playedlist"} action={"add"} />
        </div>
      );
    } else {
      // user has not interacted with this game - show all options
      return (
        <div>
          <GameListButton gameID={game.id} list={"wishlist"} action={"add"} />
          <GameListButton gameID={game.id} list={"playedlist"} action={"add"} />
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
