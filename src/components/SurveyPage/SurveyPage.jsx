import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSurveyData } from '../../hooks/storeHooks'
import { useEffect } from 'react'
import SurveyOptions from '../SurveyOptions/SurveyOptions'
import SurveyNextButton from '../SurveyNextButton/SurveyNextButton'
import SurveyPrevButton from '../SurveyPrevButton/SurveyPrevButton'
import SurveyIntro from '../SurveyIntro/SurveyIntro'
import './SurveyPage.css'
import { useHistory, useParams } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import HelpIcon from '@mui/icons-material/Help';

export default function SurveyPage() {
  const surveyData = useSurveyData()
  const dispatch = useDispatch()
  console.log(surveyData)
  const { id } = useParams()
  const history = useHistory()
  const surveyQuestion = useSelector((store) => store.survey.surveyQuestions)
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    dispatch({ type: 'SURVEY/FETCH' })
  }, [])

  const nextPage = () => {
    console.log('in nextpage')
    if (id < 17) {
      history.push('/survey/' + (Number(id) + 1))
    } else {
      dispatch({ type: 'SURVEY/POST_DATA', payload: surveyData })
    }
  }

  const prevPage = () => {
    history.push('/survey/' + (Number(id) - 1))
  }

  const nextBtnText = () => {
    return Number(id) === 17 ? 'Submit' : 'Next'
  }

  return (
    <section id="survey-body">
      {Number(id) === 1 && <SurveyIntro />}

      <section id="survey-body-question">
        <h4>
          Question {id}: {surveyQuestion[Number(id) - 1]?.question}
        </h4>
        {id < 16 &&
        <div className="btn more-info" onClick={handleClickOpen}>
          <HelpIcon />More Info
        </div>}
      </section>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {surveyQuestion[Number(id) - 1]?.question}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {surveyQuestion[Number(id) - 1]?.caption}
          </DialogContentText>
        </DialogContent>
      </Dialog>
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
