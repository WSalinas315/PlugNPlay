import { useDispatch } from "react-redux";
import { useUserLists } from "../../hooks/storeHooks";

import {
  Button,
} from "@mui/material";
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

export default function UserFunctions({ game }) {
  const { userIgnoreList, userPlayedList, userWishlist } = useUserLists();

  const ButtonDisplay = () => {
    if (userIgnoreList?.includes(game)) {
      // user has ignored this game - show options to remove from ignore list, and add to played
      return (
        <div>
          <Button startIcon={<Block />}>Ignore</Button>
          <Button startIcon={<PlaylistAdd />}>Add to Played</Button>
          <Button startIcon={<StarBorder />}>Add to Wishlist</Button>
        </div>
      );
    } else if (userPlayedList?.includes(game)) {
      // user has played this game - show options to like & dislike, and to remove from played
      return (
        <div>
          <Button startIcon={<ThumbUp />}>Like</Button>
          <Button startIcon={<ThumbDown />}>Dislike</Button>
          <Button startIcon={<PlaylistRemove />}>Remove from Played</Button>
        </div>
      );
    } else if (userWishlist?.includes(game)) {
      // user has wishlisted this game - show options to remove from wishlist and add to played
      return (
        <div>
          <Button startIcon={<Star />}>Remove from Wishlist</Button>
          <Button startIcon={<PlaylistAdd />}>Add to Played</Button>
        </div>
      );
    } else {
      // user has not interacted with this game - show all options
      return (
        <div>
          <Button startIcon={<StarBorder />}>Add to Wishlist</Button>
          <Button startIcon={<PlaylistAdd />}>Add to Played</Button>
          <Button startIcon={<Block />}>Ignore</Button>
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
