import { useDispatch } from "react-redux";
import { useRecommendations } from "../../hooks/storeHooks";
import { Button, IconButton } from "@mui/material";

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

const buttonProps = {
  variant: 'outlined',
  color: 'primary',
  size: 'small',
}

export const LikeDislikeButton = ({ gameID, liked, action }) => {
  const dispatch = useDispatch();

  const Icon = () => {
    if (liked === 1) {
      return action === 'like'
        ? <ThumbUp color="success" sx={{ transform: 'scale(1.2)' }} />
        : <ThumbDownOffAlt color="neutral" />
    } else
    if (liked === -1) {
      return action === 'like'
        ? <ThumbUpOffAlt color="neutral" />
        : <ThumbDown color="primary" sx={{ transform: 'scale(1.2)' }} />
    }
    else {
      return action === 'like'
      ? <ThumbUpOffAlt color="neutral" />
      : <ThumbDownOffAlt color="neutral" />
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
      <IconButton {...buttonProps} variant="contained" onClick={handleClick}>
        <Icon />
      </IconButton>
    </>
  );
};

export const GameListButton = ({ gameID, list, action }) => {
  const dispatch = useDispatch();
  const recommendations = useRecommendations();

  const handleClick = () => {
    console.log("posting data for gameid", gameID);
    dispatch({
      type: `USER/${list.toUpperCase()}/${action.toUpperCase()}`,
      payload: gameID,
    });
    if(gameID == recommendations[0].gameData.id){
      recommendations.shift();
      dispatch({ type: 'GAME/SWIPE_SKIP', payload: recommendations });
    }
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
      <Button {...buttonProps} onClick={handleClick} startIcon={icon}>
        {text}
      </Button>
    </>
  );
};
