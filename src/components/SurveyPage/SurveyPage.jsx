import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSurveyData } from '../../hooks/storeHooks'
import { Button } from '@mui/material'
import { useEffect } from 'react'
import SurveyOptions from '../SurveyOptions/SurveyOptions'
import SurveyNextButton from '../SurveyNextButton/SurveyNextButton'
import SurveyPrevButton from '../SurveyPrevButton/SurveyPrevButton'
import './SurveyPage.css'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function SurveyPage() {
  const surveyData = useSurveyData();
  const dispatch = useDispatch();
  console.log(surveyData);
  const { id } = useParams();
  const history = useHistory();
  const surveyQuestion = useSelector((store) => store.survey.surveyQuestions)

  useEffect(() => {
    dispatch({ type: 'SURVEY/FETCH' });
}, []);

  const nextPage = () => {
    console.log('in nextpage')
    if (id < 17) {
      history.push('/survey/' + (Number(id) + 1));
    } else {
      dispatch({ type: 'SURVEY/POST_DATA', payload: surveyData })
    }
  }

  const prevPage = () => {
    history.push('/survey/' + (Number(id) - 1));
  }

  const nextBtnText = () => {
    return Number(id) === 17 ? 'Submit' : 'Next'
  }

  const autofill = () => {
    dispatch({
      type: 'SET_SURVEY_ANSWERS',
      payload: {
        "1": -0.25,
        "2": -0.5,
        "3": -1,
        "4": 0,
        "5": -0.25,
        "6": 0,
        "7": -0.25,
        "8": -0.25,
        "9": -0.75,
        "10": 0,
        "11": 0,
        "12": -0.25,
        "13": 0.5,
        "14": -0.25,
        "15": -0.25,
        "16": "no",
        "17": "no"
    }
  })
    dispatch({ type: 'SURVEY/POST_DATA', payload: surveyData })
  }

  return (
    <section id="survey-body">
      <Button
        onClick={autofill}
        size="small"
        sx={{ fontSize: "16px" }}
        variant="outlined"
      >Click me to autofill survey & test DATABASE post</Button>
      <h3>{surveyQuestion[Number(id) - 1]?.question}</h3>
      <h4>{surveyQuestion[Number(id) - 1]?.caption}</h4>
      <SurveyOptions page={id} />
      <div className="survey-previous-next">
        {id > 1 && (
          <div className="survey-btn" onClick={() => prevPage()}>
            {' '}
            <SurveyPrevButton />
          </div>
        )}
        <div className="survey-btn" onClick={() => nextPage()}>
          <SurveyNextButton text={nextBtnText()} />
        </div>
      </div>
    </section>
  )
}
