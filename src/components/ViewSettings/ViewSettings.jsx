import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Card, Button, IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";

import Heading1 from "../Headings/Heading1";
import Heading3 from "../Headings/Heading3";
import ParagraphText from "../ParagraphText/ParagraphText";

export default function ViewSettings() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [ imgUrlIn, setImgUrl ] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'USER/EDIT_PROFILE_PICTURE', payload: { imgPath: imgUrlIn } })
    history.push('/profile');
  };

  return (
    <div>
      <Card sx={{ border: '1px solid #dddddd' }}>
        <div className="corner-buttons">
          <IconButton
            onClick={() => history.goBack()}
          >
            <Close sx={{ mt: '5px', ml: '5px'}} />
          </IconButton>
        </div>
        <Heading1 sx={{ textAlign: 'center', my: '1rem' }}>Settings</Heading1>
        <form onSubmit={handleSubmit}>
          <Heading3 sx={{ mt: "1rem", mb: "0.5rem", ml: '20px' }}>
            Edit Profile Picture
          </Heading3>
          <TextField
            sx={{ width: "calc(100% - 1rem)", mx: '0.5rem', mb: "0.2rem" }}
            className="grid-right"
            value={imgUrlIn}
            onChange={(e) => setImgUrl(e.target.value)}
            label="Profile Picture URL"
          />
          <ParagraphText sx={{ ml: '20px', mb: '1rem' }} newVariant="detail">
            Leave blank to use default.
          </ParagraphText>
          <div align="center">
            <Button
              sx={{ px: '1.2rem', m: "0.3rem" }}
              variant="outlined"
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
