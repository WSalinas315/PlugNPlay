import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { useSurveyData } from "../../hooks/storeHooks";

import SurveyOptions from "../SurveyOptions/SurveyOptions";
import SurveyIntro from "../SurveyIntro/SurveyIntro";

import "./SurveyPage.css";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, LinearProgress } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

import Heading3 from "../Headings/Heading3";

export default function SurveyPage() {
  const surveyData = useSurveyData();
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const surveyQuestion = useSelector((store) => store.survey.surveyQuestions);

  // For the 'More info' dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Fetch survey data
  useEffect(() => {
    dispatch({ type: "SURVEY/FETCH" });
  }, []);

  // Survey progress
  const progress = () => {
    return Math.round(((id - 1) / surveyQuestion.length) * 100)
  }


  // For changing pages
  const nextPage = () => {
    console.log("in nextpage");
    if (id < 17) {
      history.push("/survey/" + (Number(id) + 1));
    } else {
      dispatch({ type: "SURVEY/POST_DATA", payload: surveyData });
      history.push("/user");
    }
  };

  const prevPage = () => {
    history.push("/survey/" + (Number(id) - 1));
  };

  const buttonStyles = {
    px: "1.2rem",
  };

  // Buttons for navigation

  const SurveyPrevButton = () => {
    return id > 1 ? (
      <Button variant="outlined" sx={buttonStyles} onClick={() => prevPage()}>
        Previous
      </Button>
    ) : (
      ""
    );
  };

  const SurveyNextButton = () => {
    return (
      <Button
        variant={Number(id) === 17 ? "contained" : "outlined"}
        sx={buttonStyles}
        onClick={() => nextPage()}
      >
        {Number(id) === 17 ? "Submit" : "Next"}
      </Button>
    );
  };

  const MoreInfoButton = () => {
    return id < 16 ? (
      <Button
        sx={buttonStyles}
        variant="contained"
        color="primary"
        startIcon={<HelpIcon />}
        onClick={handleClickOpen}
      >
        More Info
      </Button>
    ) : (
      ""
    );
  };

  // Autofill for presentation demonstration

  const surveyAutofill = () => {
    history.push("/survey/17");
    dispatch({
      type: "AUTOFILL_SURVEY",
      payload: [
        {
          id: 1,
          score: -0.5,
        },
        {
          id: 2,
          score: -0.75,
        },
        {
          id: 3,
          score: -0.75,
        },
        {
          id: 4,
          score: 0.25,
        },
        {
          id: 5,
          score: -0.25,
        },
        {
          id: 6,
          score: -0.5,
        },
        {
          id: 7,
          score: -0.5,
        },
        {
          id: 8,
          score: -0.75,
        },
        {
          id: 9,
          score: 0,
        },
        {
          id: 10,
          score: 0.5,
        },
        {
          id: 11,
          score: 0,
        },
        {
          id: 12,
          score: -0.25,
        },
        {
          id: 13,
          score: 0.25,
        },
        {
          id: 14,
          score: -0.5,
        },
        {
          id: 15,
          score: 0.25,
        },
        {
          id: 16,
          score: -1,
        },
        {
          id: 17,
          score: -1,
        },
      ],
    });
  };

  return (
    <section id="survey-body">
      <SurveyIntro />

      <section id="survey-body-question">
        <div onClick={surveyAutofill}>
          {/* onClick for DEMO PURPOSES ONLY */}
          <Heading3>Question {id}:</Heading3>
          <Heading3 fontSx={{ fontWeight: 400 }}>
            {surveyQuestion[Number(id) - 1]?.question}
          </Heading3>
        </div>
        <MoreInfoButton />

        <SurveyOptions page={id} />
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
        <DialogContent sx={{ mb: "1.2rem" }}>
          <DialogContentText id="alert-dialog-description">
            {surveyQuestion[Number(id) - 1]?.caption}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <div className="survey-previous-next">
        <SurveyPrevButton />
        <SurveyNextButton />
      </div>
      <Box sx={{ width: "90%", mt: "1.2rem", mx: "auto" }}>
        <LinearProgress variant="determinate" value={progress()} />
      </Box>
    </section>
  );
}
