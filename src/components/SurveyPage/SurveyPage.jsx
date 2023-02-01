import SurveyQuestion from '../SurveyQuestion/SurveyQuestion'
import SurveyOptions from '../SurveyOptions/SurveyOptions'
import { useState } from 'react'
import SurveyNextButton from '../SurveyNextButton/SurveyNextButton'
import SurveyPrevButton from '../SurveyPrevButton/SurveyPrevButton'
import './SurveyPage.css'
import { useDispatch, useSelector } from 'react-redux'

export default function SurveyPage() {
  const [page, setPage] = useState(1)
  const survey = useSelector((store) => store.survey.surveyResults);
  const dispatch = useDispatch();

  const nextPage = () => {
    console.log('in nextpage')
    if (page < 20) {
      setPage(page + 1)
    } else {
      //handle submitting
      dispatch({type: 'SUBMIT_SURVEY', payload: survey})
    }
  }

  const prevPage = () => {
    setPage(page - 1)
  }

  const nextBtnText = () => {
    return page === 20 ? 'Submit' : 'Next'
  }

  return (
    <>
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
    </>
  )
}
