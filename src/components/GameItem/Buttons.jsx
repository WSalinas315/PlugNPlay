// HOOK IMPORTS
import { useDispatch } from "react-redux";
import { useRecommendations } from "../../hooks/storeHooks";

// MUI IMPORTS
import { Button, IconButton } from "@mui/material";
import {
  Block,
  Star,
  StarBorder,
  PlaylistAdd,
  PlaylistRemove,
  ThumbUp,
  ThumbDown,
  ThumbDownOffAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";

// BUTTON STYLING
const buttonProps = {
  variant: 'outlined',
  color: 'primary',
  size: 'small',
}

// LIKE/DISLIKE BUTTON
export const LikeDislikeButton = ({ gameID, liked, action }) => {
  const dispatch = useDispatch();

  // Shows thumbs up/down & highlight based on status of the game
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

  // Like/unlike logic (also supports toggling)
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
      <IconButton variant="contained" onClick={handleClick}>
        <Icon />
      </IconButton>
    </>
  );
};

// "ADD/REMOVE FROM LIST" BUTTON
export const GameListButton = ({ gameID, list, action }) => {
  const dispatch = useDispatch();
  const recommendations = useRecommendations();

  const handleClick = () => {
    console.log("posting data for gameid", gameID);

    // Sends dispatch action based on button and list
    dispatch({
      type: `USER/${list.toUpperCase()}/${action.toUpperCase()}`,
      payload: gameID,
    });

    // Removes game from swipe list
    if(gameID == recommendations[0].gameData.id){
      recommendations.shift();
      dispatch({ type: 'GAME/SWIPE_SKIP', payload: recommendations });
    }
  };

  // Determines icon for button based on list & action
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

  // Determines text for button based on list & action
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
      <Button variant="outlined" onClick={handleClick} startIcon={icon}>
        {text}
      </Button>
    </>
  );
};
