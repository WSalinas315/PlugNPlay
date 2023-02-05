import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSurveyData } from '../../hooks/storeHooks'
import { Button } from '@mui/material'

import SurveyQuestion from '../SurveyQuestion/SurveyQuestion'
import SurveyOptions from '../SurveyOptions/SurveyOptions'
import SurveyNextButton from '../SurveyNextButton/SurveyNextButton'
import SurveyPrevButton from '../SurveyPrevButton/SurveyPrevButton'
import './SurveyPage.css'

export default function SurveyPage() {
  const [page, setPage] = useState(1)
  const surveyData = useSurveyData();
  const dispatch = useDispatch();
  console.log(surveyData);

  const nextPage = () => {
    console.log('in nextpage')
    if (page < 17) {
      setPage(page + 1)
    } else {
      dispatch({ type: 'SURVEY/POST_DATA', payload: surveyData })
    }
  }

  const prevPage = () => {
    setPage(page - 1)
  }

  const nextBtnText = () => {
    return page === 17 ? 'Submit' : 'Next'
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
      <SurveyQuestion page={page} />
      <SurveyOptions page={page} />
      <div className="survey-previous-next">
        {page > 1 && (
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
