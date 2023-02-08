import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserLists } from "../../hooks/storeHooks";
import { LikeDislikeButton, GameListButton } from "./Buttons";

export default function UserFunctions({ game }) {
  const dispatch = useDispatch();
  const { userIgnorelist, userPlayedList, userWishlist } = useUserLists();
  const ignoredIDs = userIgnorelist?.map((item) => item.id);
  const wishlistIDs = userWishlist?.map((item) => item.id);
  const playedIDs = userPlayedList?.map((item) => item.id);
  const liked = userPlayedList?.find((item) => item.id === game.id)?.liked

  const getLists = () => {
    dispatch({ type: "USER/FETCH_ALL_LISTS" });
  };

  useEffect(getLists, []);

  const ButtonDisplay = () => {
    if (ignoredIDs?.includes(game.id)) {
      // user has ignored this game - show options to remove from ignore list, and add to played
      return (
        <>
          <GameListButton gameID={game.id} list={"ignorelist"} action={"delete"} />
        </>
      );
    } else if (playedIDs?.includes(game.id)) {
      // user has played this game - show options to like & dislike, and to remove from played
      return (
        <>
          <LikeDislikeButton gameID={game.id} liked={liked} action={"like"} />
          <LikeDislikeButton gameID={game.id} liked={liked} action={"dislike"} />
          <GameListButton gameID={game.id} list={"playedlist"} action={"delete"} />
        </>
      );
    } else if (wishlistIDs?.includes(game.id)) {
      // user has wishlisted this game - show options to remove from wishlist and add to played
      return (
        <>
          <GameListButton gameID={game.id} list={"wishlist"} action={"delete"} />
          <GameListButton gameID={game.id} list={"playedlist"} action={"add"} />
        </>
      );
    } else {
      // user has not interacted with this game - show all options
      return (
        <>
          <GameListButton gameID={game.id} list={"wishlist"} action={"add"} />
          <GameListButton gameID={game.id} list={"playedlist"} action={"add"} />
          <GameListButton gameID={game.id} list={"ignorelist"} action={"add"} />
        </>
      );
    }
  };

  return (
    <div className="flex-buttons">
      <ButtonDisplay />
    </div>
  );
}
