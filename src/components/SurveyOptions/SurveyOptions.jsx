import * as React from 'react'
import { styled, alpha, Box } from '@mui/system'
import SliderUnstyled, { sliderUnstyledClasses } from '@mui/base/SliderUnstyled'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';
import './SurveyOptions.css';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function SurveyOptions(props) {
  const [sliderValue, setSliderValue] = useState(0);
  const survey = useSelector((store) => store.survey.surveyResults);
  const currentQuestion = 'q' + props.page;
  const dispatch = useDispatch ();

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

  const leftLabel = (page) => {
    switch (page) {
      case 1:
        return 'A Single Character'
      case 2:
        return 'For Myself'
      case 3:
        return 'Work Together'
      case 4:
        return 'Easy'
      case 5:
        return 'Short'
      case 6:
        return '2D'
      case 7:
        return 'Cartoony'
      case 8:
        return 'I love Retro'
      case 9:
        return 'Fantasy'
      case 10:
        return 'Immersive'
      case 11:
        return 'Defeating an Enemy'
      case 12:
        return 'Fast-paced'
      case 13:
        return 'Repeat Activities'
      case 14:
        return 'I feel powerful'
      case 15:
        return 'Practical skills'
      case 16:
        return 'Top Player'
      case 17:
        return 'Relaxed'
      case 18:
        return 'Yes, I like dark themes'
      default:
        return ''
    }
  }

  const rightLabel = (page) => {
    switch (page) {
      case 1:
        return 'A Simulation'
      case 2:
        return 'With Friends'
      case 3:
        return 'Compete Against Each Other'
      case 4:
        return 'Challenging'
      case 5:
        return 'Long'
      case 6:
        return '3D'
      case 7:
        return 'Realistic'
      case 8:
        return 'I prefer Modern'
      case 9:
        return 'Reality'
      case 10:
        return 'Observe from Afar'
      case 11:
        return 'Solving a Puzzle'
      case 12:
        return 'Slower'
      case 13:
        return 'A Definitive Ending'
      case 14:
        return 'I must beat the odds'
      case 15:
        return 'Heroic skills'
      case 16:
        return '100% Completion'
      case 17:
        return 'Excited'
      case 18:
        return 'No dark themes'
      default:
        return ''
    }
  }

  const marks = [
    {
      value: -1,
      label: leftLabel(props.page),
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
      label: rightLabel(props.page),
    },
  ]
  function SliderValueLabel({ children }) {
    return (
      <span className="label">
        <div className="value">{children}</div>
      </span>
    );
  }

  const handleChange = (value) => {
    let questionNum = 'q' + props.page;
    setSliderValue(value);
    dispatch({type: 'SET_SURVEY_ANSWERS', payload: {[questionNum]: value}});
  }

  const handleChangeRadio = (value) => {
    let questionNum = 'q' + props.page;
    dispatch({type: 'SET_SURVEY_ANSWERS', payload: {[questionNum]: value}});
  }

  return (
    // pages 1-17 are slider questions
    // if page 18-20, show checkbox instead
    <>
      <h3>Value: {survey[currentQuestion]}</h3>
      <section id="survey-select">
        {props.page < 19 ? (
          <Box sx={{ width: 'calc(100% - 150px)' }}>
            <StyledSlider
              aria-label="Survey Question"
              defaultValue={survey[currentQuestion]}
              step={null}
              marks={marks}
              min={-1}
              max={1}
              /*onChange={(_, value) => setSliderValue(value)}*/
              onChangeCommitted={(_, value) => handleChange(value)}
              slots={{ valueLabel: SliderValueLabel }}
            />
          </Box>
        ) : (
          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            name="radio-buttons-group"
            defaultValue='no'
            onChange={(_, value) => handleChangeRadio(value)}
          >
            <FormControlLabel value="yes" control={<Radio sx={{
        '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
            {
                color: 'black',
            },
        '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
            color: 'red',
        },
    }} />} label="Yes" />
            <FormControlLabel value="no" control={<Radio sx={{
        '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
            {
                color: 'black',
            },
        '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
            color: 'red',
        },
    }} />} label="No" />
          </RadioGroup>
        )}
      </section>
    </>
  )
}
