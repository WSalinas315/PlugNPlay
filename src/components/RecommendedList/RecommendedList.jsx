import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRecommendations } from "../../hooks/storeHooks";
import Loading from "../Loading/Loading";
import SwipeBox from "../SwipeBox/SwipeBox";
import { Card } from "@mui/material";
import Heading1 from "../Headings/Heading1";
import ParagraphText from "../ParagraphText/ParagraphText";

export default function RecommendedList() {
  const dispatch = useDispatch();
  const recommendations = useRecommendations();

  const clearGameData = () => dispatch({ type: "GAME/CLEAR_CURRENT" });

  const checkForRecs = (refresh = false) => {
    clearGameData();
    if (refresh || recommendations.length === 0) {
      // dispatch({ type: "RAWG/FETCH_RECOMMENDATIONS" })
    } else return;
  };

  useEffect(checkForRecs, []);

  return recommendations.length > 0 ? (
    <div className="center-on-page">
      <Card sx={{ border: "1px solid", borderColor: "#dddddd", py: "1.5rem" }}>
        <Heading1 sx={{ textAlign: "center" }}>Recommended for You</Heading1>
        <SwipeBox games={recommendations} />

        {JSON.stringify(recommendations[0].gameData.id)}
      </Card>
    </div>
  ) : (
    <Loading />
  );
}
