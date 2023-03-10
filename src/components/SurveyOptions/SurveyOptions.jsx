import * as React from 'react'
import { styled, alpha, Box } from '@mui/system'
import SliderUnstyled, { sliderUnstyledClasses } from '@mui/base/SliderUnstyled'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel';
import './SurveyOptions.css';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FormControl } from '@material-ui/core'

export default function SurveyOptions(props) {
  const survey = useSelector((store) => store.survey.surveyResults);
  const currentQuestion = props.page;
  const currentScore = survey[currentQuestion - 1].score;
  const dispatch = useDispatch ();
  const { id } = useParams();
  const surveyQuestion = useSelector((store) => store.survey.surveyQuestions)

  // Styling for slider
  const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    300: '#66B2FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  }

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  }

  const StyledSlider = styled(SliderUnstyled)(
    ({ theme }) => `
    color: ${theme.palette.mode === 'light' ? blue[500] : blue[300]};
    height: 6px;
    width: 100%;
    padding: 16px 0;
    display: inline-block;
    position: relative;
    cursor: pointer;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
  
    &:hover {
      opacity: 1;
    }
  
    &.${sliderUnstyledClasses.disabled} { 
      pointer-events: none;
      cursor: default;
      color: ${theme.palette.mode === 'light' ? grey[300] : grey[600]};
      opacity: 0.5;
    }
  
    & .${sliderUnstyledClasses.rail} {
      display: block;
      position: absolute;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background-color: currentColor;
      opacity: 0.4;
    }
  
    & .${sliderUnstyledClasses.track} {
      display: block;
      position: absolute;
      height: 4px;
      border-radius: 2px;
      background-color: currentColor;
    }
  
    & .${sliderUnstyledClasses.thumb} {
      position: absolute;
      width: 16px;
      height: 16px;
      margin-left: -6px;
      margin-top: -6px;
      box-sizing: border-box;
      border-radius: 50%;
      outline: 0;
      border: 3px solid currentColor;
      background-color: #fff;
      :active,
      &.${sliderUnstyledClasses.focusVisible} {
        box-shadow: 0 0 0 0.25rem ${alpha(
          theme.palette.mode === 'light' ? blue[400] : blue[300],
          0.15,
        )};
      }
      & .label {
          background: unset;
          background-color: ${theme.palette.mode === 'light' ? blue[500] : blue[300]};
          width: 32px;
          height: 32px;
          padding: 0px;
          visibility: hidden;
          color: #fff;
          border-radius: 50% 50% 50% 0;
          position: absolute;
          transform: translate(-35%, -140%) rotate(-45deg) scale(0);
          transition: transform 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
      }
      :active .label {
          visibility: visible;
          transform: translate(-35%, -140%) rotate(-45deg) scale(1);
      }
      :active .value {
          transform: rotate(45deg);
          text-align: center;
      }
  
      &.${sliderUnstyledClasses.active} {
        box-shadow: 0 0 0 0.25rem ${alpha(
          theme.palette.mode === 'light' ? blue[200] : blue[300],
          0.3,
        )};
      }
    }
  
    & .${sliderUnstyledClasses.mark} {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 2px;
      background-color: currentColor;
      top: 50%;
      opacity: 0.7;
      transform: translateX(-50%);
    }
  
    & .${sliderUnstyledClasses.markActive} {
      background-color: #fff;
    }
  
    & .${sliderUnstyledClasses.markLabel} {
      font-family: IBM Plex Sans;
      font-size: 12px;
      position: absolute;
      top: 20px;
      transform: translateX(-50%);
      margin-top: 8px;
    }
  `,
  )

  // Label for slider
  const marks = [
    {
      value: -1,
      label: surveyQuestion[Number(id) - 1]?.label_left,
    },
    {
      value: -0.75,
      label: '',
    },
    {
      value: -0.5,
      label: '',
    },
    {
      value: -0.25,
      label: '',
    },
    {
      value: 0,
      label: '',
    },
    {
      value: 0.25,
      label: '',
    },
    {
      value: 0.5,
      label: '',
    },
    {
      value: 0.75,
      label: '',
    },
    {
      value: 1,
      label: surveyQuestion[Number(id) - 1]?.label_right,
    },
  ]
  function SliderValueLabel({ children }) {
    return (
      <span className="label">
        <div className="value">{children}</div>
      </span>
    );
  }

  // When value of slider/radio is changed
  const handleChange = (value) => {
    dispatch({type: 'SET_SURVEY_ANSWERS', payload: {id: Number(props.page), score: Number(value)}});
  }

  return (
    // pages 1-17 are slider questions
    // if page 18-20, show radio instead
    <>
      {/*<h3>Value: {currentScore}</h3>*/}
      <section id="survey-select">
        {props.page < 16 ? (
          <Box sx={{ width: 'calc(100% - 150px)' }}>
            <StyledSlider
              aria-label="Survey Question"
              value={currentScore}
              step={null}
              marks={marks}
              min={-1}
              max={1}
              onChangeCommitted={(_, value) => handleChange(value)}
              slots={{ valueLabel: SliderValueLabel }}
            />
          </Box>
        ) : (
          <FormControl>
          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            name="radio-buttons-group"
            value={currentScore}
            onChange={(_, value) => handleChange(value)}
          >
            <FormControlLabel value={1} control={<Radio sx={{
        '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
            {
                color: 'black',
            },
        '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
            color: 'red',
        },
    }} />} label="Yes" />
            <FormControlLabel value={-1} control={<Radio sx={{
        '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
            {
                color: 'black',
            },
        '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
            color: 'red',
        },
    }} />} label="No" />
          </RadioGroup>
          </FormControl>
        )}
      </section>
    </>
  )
}
