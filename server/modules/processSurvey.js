const { gameGenres, gameTags } = require("../constants/gameTags");
const survey = require("../constants/surveyResponseValues");

const { surveyScaleQuestions } = survey

const limitValue = (value) => {
  return value > 1 ? 1
    : value < -1 ? 1
      : value;
}

const roundToThreeDecimals = (float) => {
  return Math.round(float * 1000) / 1000
}

function processSurveyResults(surveyResObj) {

  let userGenreScores = [];
  let userTagScores = [];

  // loop over each answer
  // check if the value is a number or a boolean
  //      if number: loop over tags and adjust accordingly
  //      if boolean: custom solution.....

  const userSurveyResponse = surveyResObj
  let scoreCoefficient = 1;

  for (let i = 1; i <= Object.keys(userSurveyResponse).length; i++) {
    const answerScore = userSurveyResponse[i.toString()];

    console.log('answerScore:', answerScore)

    if (typeof answerScore === 'number') {

      const [questionObj] = surveyScaleQuestions.filter(q => q.id === i)

      const adjustmentValue = roundToThreeDecimals(answerScore * scoreCoefficient)

      const leftAdjustment = -adjustmentValue;
      const rightAdjustment = adjustmentValue;

      for (let genre of questionObj.genres.left) {
        userGenreScores = {
          ...userGenreScores,
          [genre]: (userGenreScores[genre] ?? 0) + limitValue(leftAdjustment)
        }
      }

      for (let genre of questionObj.genres.right) {
        userGenreScores = {
          ...userGenreScores,
          [genre]: (userGenreScores[genre] ?? 0) + limitValue(rightAdjustment)
        }
      }

      for (let tag of questionObj.tags.left) {
        userTagScores =
        {
          ...userTagScores,
          [tag]: (userTagScores[tag] ?? 0) + limitValue(leftAdjustment)
        }
      }

      for (let tag of questionObj.tags.right) {
        userTagScores =
        {
          ...userTagScores,
          [tag]: (userTagScores[tag] ?? 0) + limitValue(rightAdjustment)
        }
      }

    }

    // } else if (typeof question[i] === 'boolean') {

    // } else {
    //   // error
    //   return null;
    // }

  }
  return [userGenreScores, userTagScores]

}

const answer = processSurveyResults(
  {
    1: 0.75,
    2: 0.5,
    3: -0.25
  }
)

console.log(answer);