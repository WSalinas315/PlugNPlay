import { gameGenres, gameTags } from "../constants/gameTags";
import { surveyScaleQuestions, surveyBooleanQuestions } from "../constants/surveyResponseValues";

export function processSurveyResults(userSurveyResponse) {
  // 22 questions
  // qs 1 - 20 are answered on a scale of -1 to 1
  
  // loop over each answer
  // check if the value is a number or a boolean
  //      if number: if negative, add to left value and subtract from right
  //                 if positive, add to right value and subtract from left
  //      if boolean: custom solution.....

  for (let question of userSurveyResponse) {



  }



}