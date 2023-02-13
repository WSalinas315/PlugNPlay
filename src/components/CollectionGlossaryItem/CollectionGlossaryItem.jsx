import React from "react";
import { useSelector } from "react-redux";

import ParagraphText from "../ParagraphText/ParagraphText";

export default function GlossaryItem(prop) {

  const user = useSelector((store) => store.user);
  const glossary = useSelector((store) => store.glossary.glossary);
  const term = glossary.filter((object) => object.term == prop.term);

  return (
    <div>
      <ParagraphText children={term[0].description} />
      <img src={term[0].img_path} />
    </div>
  );
} // end function
