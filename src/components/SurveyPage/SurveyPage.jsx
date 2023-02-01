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
  const dispatch = useDispatch();
  const surveyData = useSurveyData();

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
