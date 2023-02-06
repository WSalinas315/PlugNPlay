import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGameByID } from "../../hooks/storeHooks";
import { capitalizeFirst } from "../../helpers/words"
import Loading from "../Loading/Loading";

export default function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const game = useGameByID();

  useEffect(() => {
    dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: id });
  }, []);

  return game.name ? (
    <>
      <div>
        <h1>{game.name}</h1>
        <p>Genres:</p>
        <ul>
          {game.genres?.map(genre => <li>{genre.name}</li>)}
        </ul>
        <p>Tags:</p>
        <ul>
          {game.tags?.map(tag => <li>{capitalizeFirst(tag.name)}</li>)}
        </ul>
          {game.description_raw}
      </div>
    </>
  ) : <Loading />
}
