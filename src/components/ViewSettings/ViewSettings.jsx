import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Button, TextField } from "@mui/material";

import Heading1 from "../Headings/Heading1";
import Heading3 from "../Headings/Heading3";

export default function ViewSettings() {
  const [newItem, setNewItem] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // write reducer, saga, and PUT route to db
  };

  return (
    <div>
      <Card sx={{ margin: '0 auto', width: '80vw' }}>
        <Heading1>Settings</Heading1>
        <form onSubmit={handleSubmit}>
          <Heading3 sx={{ mt: "1rem", mb: "0.5rem" }}>
            Edit Profile Picture
          </Heading3>
          <TextField
            sx={{ width: "100%", mb: "1rem" }}
            className="grid-right"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            label="Profile Picture URL"
          />
          <div align="center">
            <Button
              sx={{ width: "70%", m: "0.3rem" }}
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
