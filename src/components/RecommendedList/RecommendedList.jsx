// HOOK IMPORTS
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRecommendations } from "../../hooks/storeHooks";

// COMPONENT IMPORTS
import Loading from "../Loading/Loading";
import SwipeBox from "../SwipeBox/SwipeBox";
import Heading1 from "../Headings/Heading1";

// MUI IMPORTS
import { Card } from "@mui/material";


export default function RecommendedList() {
  const dispatch = useDispatch();
  const recommendations = useRecommendations();

  const clearGameData = () => dispatch({ type: "GAME/CLEAR_CURRENT" });

  // Fetch new recommendations if the recommendation queue is empty
  const checkForRecs = (refresh = false) => {
    clearGameData();

    // Only fetches new recommendations when explicitly asked, or if recommendations are empty
    if (refresh || recommendations.length === 0) {
      dispatch({ type: "RAWG/FETCH_RECOMMENDATIONS" })
    } else return;
  };

  useEffect(checkForRecs, []);

  const cardStyling = {
    border: "1px solid", borderColor: "#dddddd", py: "1.5rem", maxWidth: '100%'
  }

  return recommendations.length > 0 ? (
    <div className="center-on-page">
      <Card sx={cardStyling}>
        <Heading1 sx={{ textAlign: "center" }}>Recommended for You</Heading1>
        <SwipeBox games={recommendations} />
      </Card>
    </div>
  ) : (
    <Loading />
  );
}
