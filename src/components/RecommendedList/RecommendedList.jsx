import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRecommendations } from "../../hooks/storeHooks";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import SwipeBox from "../SwipeBox/SwipeBox";
import { Card } from "@material-ui/core";
import Heading1 from "../Headings/Heading1";
import ParagraphText from "../ParagraphText/ParagraphText";

export default function RecommendedList() {
  const dispatch = useDispatch();
  const recommendations = useRecommendations();

  const checkForRecs = (refresh = false) => {
    dispatch({ type: "GAME/CLEAR_CURRENT" });
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

  const Bold = ({children}) => {
    return <span style={{ fontWeight: 800 }}>{children}</span>
  }

  return recommendations.length > 0 ? (
      <Card sx={{ textAlign: 'center', px: '10px' }}>
        <Heading1>Your Recommendations</Heading1>
        <SwipeBox games={recommendations} />
        <ParagraphText>
          Swipe <Bold>right</Bold> to add a game to your wishlist.
        </ParagraphText>
        <ParagraphText>
          Swipe <Bold>up</Bold> to view more details.
        </ParagraphText>
        <ParagraphText>
          Swipe <Bold>left</Bold> to skip a game.
        </ParagraphText>
      </Card>
  ) : (
    <Loading />
  );
}
