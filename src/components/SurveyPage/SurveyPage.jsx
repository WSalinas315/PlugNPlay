import SurveyQuestion from "../SurveyQuestion/SurveyQuestion";
import SurveyOptions from "../SurveyOptions/SurveyOptions";
import { useState } from "react";
import SurveyNextButton from "../SurveyNextButton/SurveyNextButton";
import SurveyPrevButton from "../SurveyPrevButton/SurveyPrevButton";

export default function SurveyPage(){
  const [page, setPage] = useState(1);

  const nextPage = () => {
    console.log('in nextpage')
    if (page < 20){
      setPage(page + 1);
    } else {
      //handle submitting
    }
  }

  const prevPage = () => {
    setPage(page - 1);
  }

  const nextBtnText = () => {
    return page === 20 ? 'Submit' : 'Next';
  }

  return (
  <>
  <SurveyQuestion page={page}/>
  <SurveyOptions page={page}/>
  {page > 1 && <div onClick={() => prevPage()}> <SurveyPrevButton /></div>}
  <div onClick={() => nextPage()}><SurveyNextButton text={nextBtnText()}/></div>
  </>)
}