const { gameGenres, gameTags } = require("../constants/gameTags");
const survey = require("../constants/surveyResponseValues");

const { surveyScaleQuestions, surveyBooleanQuestions } = survey

const limitValue = (value) => {
  return Math.min(Math.max(value, -1), 1);
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

    if (typeof answerScore === 'number') {

      const [questionObj] = surveyScaleQuestions.filter(q => q.id === i)

      const adjustmentValue = roundToThreeDecimals(answerScore * scoreCoefficient)

      const leftAdjustment = -adjustmentValue;
      const rightAdjustment = adjustmentValue;

      for (let genre of questionObj.genres.left) {
        userGenreScores = {
          ...userGenreScores,
          [genre]: limitValue((userGenreScores[genre] ?? 0) + leftAdjustment)
        }
      }

      for (let genre of questionObj.genres.right) {
        userGenreScores = {
          ...userGenreScores,
          [genre]: limitValue((userGenreScores[genre] ?? 0) + rightAdjustment)
        }
      }

      for (let tag of questionObj.tags.left) {
        userTagScores =
        {
          ...userTagScores,
          [tag]: limitValue((userTagScores[tag] ?? 0) + leftAdjustment)
        }
      }

      for (let tag of questionObj.tags.right) {
        userTagScores =
        {
          ...userTagScores,
          [tag]: limitValue((userTagScores[tag] ?? 0) + rightAdjustment)
        }
      }

    } else if (typeof answerScore === 'string') {

      const [questionObj] = surveyBooleanQuestions.filter(q => q.id === i)

      if (answerScore === 'yes') {
        for (let tag of questionObj.tags.increase) {

          userTagScores = {
            ...userTagScores,
            [tag]: limitValue(roundToThreeDecimals((userTagScores[tag] ?? 0) + 0.5))
          }
        }

        for (let tag of questionObj.tags.decrease) {
          userTagScores.tag = -1
        }

      }

    } else {
      // error
      return null;
    }

  }
  return [userGenreScores, userTagScores]

}

const sampleAnswer = processSurveyResults(
  {
    1: -0.25,
    2: -0.5,
    3: -1,
    4: 0,
    5: -0.25,
    6: 0,
    7: -0.25,
    8: -0.25,
    9: -0.75,
    10: 0,
    11: 0,
    12: -0.25,
    13: 0.5,
    14: -0.25,
    15: -0.25,
    16: 0.5,
    17: 0.25,
    18: 0,
    19: 0,
    20: 0,
    21: "no",
    22: "no",
  }
)

module.exports = processSurveyResults;