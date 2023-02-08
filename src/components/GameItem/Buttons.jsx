import { useDispatch } from "react-redux";

import { Button } from "@mui/material";

import {
  Block,
  Star,
  StarBorder,
  PlaylistAdd,
  PlaylistRemove,
  PlaylistAddCheck,
  ThumbUp,
  ThumbDown,
  ThumbDownOffAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";

export const LikeDislikeButton = ({ gameID, liked, action }) => {
  const dispatch = useDispatch();

  const getIcon = () => {
    if (liked === 1) {
      return action === 'like' ? <ThumbUp /> : <ThumbDownOffAlt />
    } else
    if (liked === -1) {
      return action === 'like' ? <ThumbUpOffAlt /> : <ThumbDown />
    }
    else {
      return action === 'like' ? <ThumbUpOffAlt /> : <ThumbDownOffAlt />
    }
  }

  const handleClick = () => {
    let newLike;
    if (action === 'like') {
      newLike = liked === 1 ? 0 : 1
    } else {
      newLike = liked === -1 ? 0 : -1
    }
    dispatch({
      type: 'USER/PLAYEDLIST/HANDLE_LIKE',
      payload: {
        liked: newLike,
        gameID
      } })
  }

  return (
    <>
      <Button startIcon={getIcon()} onClick={handleClick} />
      {JSON.stringify(liked)}
    </>
  );
};

export const GameListButton = ({ gameID, list, action }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("posting data for gameid", gameID);
    dispatch({
      type: `USER/${list.toUpperCase()}/${action.toUpperCase()}`,
      payload: gameID,
    });
  };

  const icon = {
    wishlist: {
      add: <StarBorder />,
      delete: <Star />,
    },
    playedlist: {
      add: <PlaylistAdd />,
      delete: <PlaylistRemove />,
    },
    ignorelist: {
      add: <Block />,
      delete: <Block />,
    },
  }[list][action];

  const text = {
    wishlist: {
      add: "Add To Wishlist",
      delete: "Remove from Wishlist",
    },
    playedlist: {
      add: "Add to Played",
      delete: "Remove from Played",
    },
    ignorelist: {
      add: "Ignore",
      delete: "Remove from Ignored",
    },
  }[list][action];

  return (
    <>
      <Button onClick={handleClick} startIcon={icon}>
        {text}
      </Button>
    </>
  );
};
