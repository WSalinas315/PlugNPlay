import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSurveyData } from '../../hooks/storeHooks'
import { Button } from '@mui/material'
import { useEffect } from 'react'
import SurveyOptions from '../SurveyOptions/SurveyOptions'
import SurveyNextButton from '../SurveyNextButton/SurveyNextButton'
import SurveyPrevButton from '../SurveyPrevButton/SurveyPrevButton'
import SurveyIntro from "../SurveyIntro/SurveyIntro";
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

  return (
    <section id="survey-body">
      {Number(id) === 1 && <SurveyIntro />}

      <h4>{surveyQuestion[Number(id) - 1]?.question}</h4>
      <p>{surveyQuestion[Number(id) - 1]?.caption}</p>
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
