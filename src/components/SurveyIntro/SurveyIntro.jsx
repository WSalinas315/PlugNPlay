import './SurveyIntro.css';

import ParagraphText from '../ParagraphText/ParagraphText'
import Heading1 from '../Headings/Heading1';

export default function SurveyIntro() {
  return (
    <section id="survey-header">
      <Heading1>Welcome!</Heading1>
      <section id="survey-intro">
        <ParagraphText sx={{ m: '0.2rem' }}>
          Please complete this short survey to generate your personalized recommendations.
        </ParagraphText>
        <ParagraphText sx={{ m: '0.2rem' }}>There are no wrong answers!</ParagraphText>
      </section>
    </section>
  )
}
