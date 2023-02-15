// ==========================================================================================
// PROCESS SURVEY RESULTS
// ==========================================================================================

// limits value to three decimal points, between 1 and -1
const limitValue = (value) => {
  return Math.min(
      Math.max(
        Math.round(value * 1000) / 1000, -1
      ), 1
  );
}

// IDs of boolean questions
//* this is hard-coded for now. could perhaps add an identifier to DB entries in the future.
const booleanQuestionIDs = [ 16, 17 ]

function processSurveyResults(surveyQuestions, surveyResults) {

  let userGenreScores = [];
  let userTagScores = [];

  // (OPTIONAL) Modify this to adjust weighting of user scores globally
  const scoreCoefficient = 1;

  // MAIN LOGIC LOOP
  for (let result of surveyResults) {
    // "result" is an object: { id, score }.  
    
    const question = surveyQuestions.find(q => q.id === result.id)
    // "question" is an object with many properties related to the survey questions.
    // For this function, we are only concerned with question.genre_left/right,
    // and question.tags_left/right.

    let leftAdjustment;
    let rightAdjustment;

    // Boolean questions are about subject matter the user wants to avoid
    // if current question is one of these booleans, we will set hard limits:
    if (booleanQuestionIDs.includes(question.id)) {
      // if user answers "yes" to avoiding certain content (value of 1),
      // left-side genres & tags get a moderate bump, and right-side is tanked.
      // if answer is "no", there is no change.
      leftAdjustment = result.score === 1 ? 0.5 : 0
      rightAdjustment = result.score === 1 ? -1 : 0
    } else {
      // for all other questions, we will use the score from the survey,
      // multiplied by the score coefficient
      leftAdjustment = -(result.score * scoreCoefficient);
      rightAdjustment = result.score * scoreCoefficient;
    }

    // Loop over genres and make score adjustments
    for (const genre of question.genres_left) {
      userGenreScores[genre] = 
        limitValue((userGenreScores[genre] ?? 0) + leftAdjustment)
    }
    for (const genre of question.genres_right) {
      userGenreScores[genre] = 
        limitValue((userGenreScores[genre] ?? 0) + rightAdjustment)
    }
    
    // Same thing for the tags
    for (const tag of question.tags_left) {
      userTagScores[tag] = 
        limitValue((userTagScores[tag] ?? 0) + leftAdjustment)
    }
    for (const tag of question.tags_right) {
      userTagScores[tag] = 
        limitValue((userTagScores[tag] ?? 0) + rightAdjustment)
    }
  } // end logic loop

  return [userGenreScores, userTagScores]
}

module.exports = { processSurveyResults };