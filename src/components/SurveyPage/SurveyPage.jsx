import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSurveyData } from '../../hooks/storeHooks'

import SurveyQuestion from '../SurveyQuestion/SurveyQuestion'
import SurveyOptions from '../SurveyOptions/SurveyOptions'
import SurveyNextButton from '../SurveyNextButton/SurveyNextButton'
import SurveyPrevButton from '../SurveyPrevButton/SurveyPrevButton'
import './SurveyPage.css'

export default function SurveyPage() {
  const [page, setPage] = useState(1)
  const surveyData = useSurveyData();
  const dispatch = useDispatch();

  const nextPage = () => {
    console.log('in nextpage')
    if (page < 20) {
      setPage(page + 1)
    } else {
      dispatch({ type: 'SURVEY/POST_DATA', payload: surveyData })
    }
  }

  const prevPage = () => {
    setPage(page - 1)
  }

  const nextBtnText = () => {
    return page === 20 ? 'Submit' : 'Next'
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
        "16": 0.5,
        "17": 0.25,
        "18": 0,
        "19": 0,
        "20": 0,
        "21": "no",
        "22": "no"
    }
  })
    dispatch({ type: 'SURVEY/POST_DATA', payload: surveyData })
  }

  return (
    <section id="survey-body">
      <button
        onClick={autofill}
      >Click me to autofill & test</button>
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
