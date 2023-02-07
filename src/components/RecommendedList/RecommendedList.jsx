import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRecommendations } from "../../hooks/storeHooks";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import SwipeBox from "../SwipeBox/SwipeBox";

export default function RecommendedList() {
  const dispatch = useDispatch();
  const recommendations = useRecommendations();

  const checkForRecs = (refresh = false) => {
    if (refresh || recommendations.length === 0) {
      dispatch({ type: "RAWG/FETCH_RECOMMENDATIONS" })
    } else return;
  }

  const clearGameData = () => dispatch({ type: 'GAME/CLEAR_CURRENT' })

  useEffect(checkForRecs, []);
  
  const ListItem = ({ gameData }) => {
    return (
      <div className="recommended">
        <Link to={`/games/${gameData.id}`} onClick={clearGameData} >
          <div className="card">
            <h2>{gameData.name}</h2>
            <p>{gameData.genres.map((genre) => genre.name + " ")}</p>
          </div>
        </Link>
      </div>
    );
  };

  return recommendations.length > 0 ? (
    <>
      <SwipeBox games={recommendations} />
      {/*
      {recommendations
        .map((game) => {
          return <ListItem gameData={game.gameData} />;
        })
        .sort((a, b) => a.gameScore - b.gameScore)}
      */}
    </>
  ) : (
    <Loading />
  );
}
