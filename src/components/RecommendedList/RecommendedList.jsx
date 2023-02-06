import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRecommendations } from "../../hooks/storeHooks";

export default function RecommendedList() {
  const dispatch = useDispatch();
  const recommendations = useRecommendations();

  useEffect(() => {
    dispatch({ type: "RAWG/FETCH_RECOMMENDATIONS" });
  }, []);

  const ListItem = ({ gameData }) => {
    return (
      <div className="recommended">
        <a href={`/#/games/${gameData.id}`}>
          <div className="card">
            <h1>{gameData.name}</h1>
            <p>
              {gameData.genres.map(genre => genre.name + " ")}
            </p>
          </div>
        </a>
      </div>
    );
  };

  return (
    <>
    {/* {JSON.stringify(recommendations)} */}
      {recommendations
        .map((game) => {
          return <ListItem gameData={game.gameData} />;
        })
        .sort((a, b) => a.gameScore - b.gameScore)}
    </>
  );
}
