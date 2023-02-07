import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { formatDate } from "../../helpers/dates";
import { useGameByID } from "../../hooks/storeHooks";
import { capitalizeFirst } from "../../helpers/words";
import Loading from "../Loading/Loading";

export default function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const game = useGameByID();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: id });
  }, []);

  const YoutubeLink = () => {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.youtube.com/results?search_query=${game.slug.replaceAll(
          "-",
          "+"
        )}+game+trailer`}
      >
        Check out some trailers
      </a>
    );
  };

  const MetacriticLink = () => {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={game.metacritic_url}
      >
        Rated {game.metacritic} on Metacritic
      </a>
    )
  }

  const GenreUL = () => {
    return (
      <ul>
        {game.genres.map((genre) => (
          <li>{genre.name}</li>
        ))}
      </ul>
    );
  };

  return game.name ? (
    <>
      <div>
        <h1>{game.name}</h1>
        <p>
          <MetacriticLink />
        </p>
        <p>
          <YoutubeLink />
        </p>
        <p>Genres:</p>
        <GenreUL />
        <p>Tags:</p>
        <ul>
          {game.tags.map((tag) => (
            <li>{capitalizeFirst(tag.name)}</li>
          ))}
        </ul>
        <p>Available for:</p>
        <ul>
          {game.platforms.map(({ platform }) => (
            <li>{platform.name}</li>
          ))}
        </ul>
        <p>Released {formatDate(game.released)}</p>
        <p>{game.description_raw}</p>
        <img src={game.background_image} />
      </div>
    </>
  ) : (
    <Loading />
  );
}
