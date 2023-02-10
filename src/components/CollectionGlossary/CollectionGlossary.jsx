import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GlossaryItem from "../CollectionGlossaryItem/CollectionGlossaryItem";
import { Card, Typography } from "@mui/material";
import Heading3 from "../Headings/Heading3";

export default function Glossary() {
  const dispatch = useDispatch();

  const [selectedTerm, setSelectedTerm] = useState("");

  const glossary = useSelector((store) => store.glossary.glossary);
  const terms = [];

  useEffect(() => {
    dispatch({ type: "GLOSSARY/FETCH" });
  }, []);

  /**
   *
   * @param {object} event This is the event listener from the Autocomplete component.
   * @param {string} value This is the glossary term from the drop down menu.
   */
  const handleChange = (event, value) => {
    console.log("Value is: ", value);
    setSelectedTerm(value);
    dispatch({
      type: "GLOSSARY/SET_ITEM",
      payload: value, //This is the term that is was clicked on from the drop down menu.
    });
  };

  return (
    <Card>
      <Box>
        <Heading3>
          Select a term from the dropdown to view a brief description.
        </Heading3>
        <Autocomplete
          options={glossary.map(({ term }) => term)}
          freeSolo //?This will allow suggestions based on input value.
          renderInput={(params) => (
            <TextField {...params} label="Search Tags" />
          )}
          onInputChange={handleChange}
        />
      </Box>
      <Box>{selectedTerm !== "" && <GlossaryItem term={selectedTerm} />}</Box>
    </Card>
  );
}
