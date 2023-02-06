import { useSelector } from 'react-redux';

//These aren't used in the project, but are something you could use


//Custom Hook -- uses other hooks
export const useReduxStore = () => {
  //accesses the useSelector hook and gives back entire store
  return useSelector((store) => store);
};

export const useSurveyData = () => {
  return useSelector(store => store.survey.surveyResults)
}

export const useRecommendations = () => {
  return useSelector(store => store.games.recommendations)
}

/*
EXAMPLE FOR A SELECTOR THAT GETS SOMETHING SPECIFIC

const useUser = () => {
  return useSelector(store => store.user)
}
*/