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

export const LikeDislikeButton = ({ gameID, action }) => {

  const icon = action === "like" ? (
    <ThumbUp />
  ) : (
    <ThumbDown />
  )

  return (
    <Button startIcon={icon} />
  )
}

export const GameListButton = ({ gameID, list, action }) => {
  
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log('posting data for gameid', gameID)
    dispatch({ type: `USER/${list.toUpperCase()}/${action.toUpperCase()}`, payload: gameID });
  };

  console.log(action, typeof action)

  const icon = {
      'wishlist': {
        'add': <StarBorder />,
        'delete': <Star />
      },
      'playedlist': {
        'add': <PlaylistAdd />,
        'delete': <PlaylistRemove />
      },
      'ignorelist': {
        'add': <Block />,
        'delete': <Block />
      } 
    }[list][action]

  const text = {
      'wishlist': {
        'add': 'Add To Wishlist',
        'delete': 'Remove from Wishlist'
      },
      'playedlist': {
        'add': 'Add to Played',
        'delete': 'Remove from Played'
      },
      'ignorelist': {
        'add': 'Ignore',
        'delete': 'Remove from Ignored'
      } 
    }[list][action]

  return (
    <Button
      onClick={handleClick}
      startIcon={icon}
    >
      {text}
    </Button>
  )

}
