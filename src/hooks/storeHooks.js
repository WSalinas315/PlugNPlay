import { useSelector } from 'react-redux';

export const useReduxStore = () => {
  return useSelector((store) => store);
};

export const useSurveyData = () => {
  return useSelector(store => store.survey.surveyResults)
}

export const useRecommendations = () => {
  return useSelector(store => store.games.recommendations)
}

export const useGameByID = () => {
  return useSelector(store => store.games.currentlyViewedGame)
}