import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { formatDate } from "../../helpers/dates";
import { useGameByID } from "../../hooks/storeHooks";
import { capitalizeFirst } from "../../helpers/words";
import Loading from "../Loading/Loading";
import UserButtons from "./ButtonFilter";
import MetacriticBadge from "../MetacriticBadge/MetacriticBadge";
import ParagraphText from "../ParagraphText/ParagraphText";

import { Card, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

import "./GameItem.css";
import Heading2 from "../Headings/Heading2";

export default function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const game = useGameByID();
  const [titleHidden, hideTitle] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: id });
  }, []);

  // SEARCH YOUTUBE FOR TRAILERS
  const YoutubeLink = () => {
    return (
      <div>
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
      </div>
    );
  };

  // METACRITIC BADGE & LINK
  const MetacriticLink = () => {
    const metacriticURL =
      game.metacritic_url !== ""
        ? game.metacritic_url
        : `https://www.metacritic.com/search/all/${game.slug.replaceAll(
            "-",
            "%20"
          )}/results`;

    return game.metacritic ? (
      <MetacriticBadge score={game.metacritic} link={metacriticURL} />
    ) : (
      ""
    );
  };

  // LIST GENRES
  const Genres = (props) => {
    return (
      <Typography variant="h3" {...props}>
        {game.genres.map((genre) => genre.name).join(", ")}
      </Typography>
    );
  };

  // LIST TAGS
  const Tags = (props) => {
    return (
      <ParagraphText newVariant="detail">
        {"Tags: "}
        {game.tags.map((tag) => capitalizeFirst(tag.name)).join(", ")}
      </ParagraphText>
    );
  };

  // LIST PLATFORMS
  const Platforms = (props) => {
    return (
      <ParagraphText>
        {"Platforms: "}
        <ul>
          {game.platforms.map(({ platform }) => (
            <li>{platform.name}</li>
          ))}
        </ul>
      </ParagraphText>
    );
  };

  // SPLASH PAGE, TITLE, CLOSE BUTTON
  const GameSplashTitle = () => {
    const history = useHistory();

    const backgroundStyling = {
      backgroundImage: "url(" + game.background_image + ")",
    };

    const titleClass = titleHidden ? "hidden-title" : "";

    return (
      <>
        <div
          style={backgroundStyling}
          onClick={() => hideTitle(!titleHidden)}
          className={`game-splash-container ${titleClass}`}
        >
          <Heading2 className="title">{game.name}</Heading2>
          <div className="close-button">
            <IconButton
              onClick={() => history.goBack()}
              sx={{ color: "#ffffff", p: 0.5 }}
            >
              <Close />
            </IconButton>
          </div>
        </div>
      </>
    );
  };

  /*
    COMPONENT EXPORT
  */
  return game.name ? (
    <>
      <Card sx={{ border: "1px solid", borderColor: "#dddddd" }}>
        <GameSplashTitle />
        <div className="two-column-grid">
          <Genres className="grid-left" />
          <div className="grid-right">
            <MetacriticLink />
          </div>
        </div>
        <UserButtons game={game} />
        <YoutubeLink />
        <Tags />
        <Platforms />
        <ParagraphText children={`Released ${formatDate(game.released)}`} />
        <ParagraphText children={game.description_raw} />
      </Card>
      <div className="foot-spacer" />
    </>
  ) : (
    <Loading />
  );
}
