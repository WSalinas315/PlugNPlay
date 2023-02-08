import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { formatDate } from "../../helpers/dates";
import { useGameByID } from "../../hooks/storeHooks";
import { capitalizeFirst } from "../../helpers/words";
import Loading from "../Loading/Loading";
import UserButtons from './ButtonFilter'

import { Typography } from "@mui/material";

import './GameItem.css'

export default function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const game = useGameByID();
  const [ titleHidden, hideTitle ] = useState(false);

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

    const metacriticURL =
      game.metacritic_url !== "" ?
      game.metacritic_url :
      `https://www.metacritic.com/search/all/${game.slug.replaceAll("-", "%20")}/results`

    return game.metacritic ? (
      <a target="_blank" rel="noopener noreferrer" href={metacriticURL}>
        Rated {game.metacritic} on Metacritic
      </a>
    ) : '';
  };

  const GenreUL = () => {
    return (
      <ul>
        {game.genres.map((genre) => (
          <li>{genre.name}</li>
        ))}
      </ul>
    );
  };

  const GameSplashTitle = () => {

    const backgroundStyling = {
      backgroundImage: "url(" + game.background_image + ")",
    };

    const titleClass = titleHidden ? 'hidden-title' : '';

    return (
      <div
        style={backgroundStyling}
        onClick={() => hideTitle(!titleHidden) }
        className={`game-splash-container ${titleClass}`}>
        <Typography variant="h1">
          {game.name}
        </Typography>
      </div>
    );
  };

  return game.name ? (
    <>
      <div>
        <GameSplashTitle />
        <UserButtons game={game} />
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
      </div>
    </>
  ) : (
    <Loading />
  );
}
