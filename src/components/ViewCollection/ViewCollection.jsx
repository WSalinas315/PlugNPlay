import * as React from "react";
import { Card, Tab, Box } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";

import Wishlist from "../CollectionWishlist/CollectionWishlist";
import Played from "../CollectionPlayed/CollectionPlayed";
import Glossary from "../CollectionGlossary/CollectionGlossary";
import './ViewCollection.css';

export default function Collection() {
  const [value, setValue] = React.useState("wishlist");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabPanelStyles = {
    width: "85vw",
    height: "calc(100vh - 200px)",
    p: "0.6rem",
    left: 0,
    right: 0,
    mx: "auto",
    position: "absolute",
    top: 110,
    overflowY: "scroll",
    overflowX: "hidden",

  };

  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ position: "relative", width: "100vw" }}>
          <TabList
            centered
            TabIndicatorProps={{
            style: { background: "#fff", height: "5px", bottom: "1px"}
            }}
            sx={{
              background: "#C02222",
              indicatorColor: "#000000",
              position: "fixed",
              top: 60,
              left: 0,
              right: 0,
              zIndex: 1,
              width: "100vw",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onChange={handleChange}
          >
            <Tab
            sx={{display: "flex",}}
              label="Wishlist"
              value="wishlist"
            />
            <Tab
            sx={{display: "flex",}}
              label="Played"
              value="played"
            />
            <Tab
            sx={{display: "flex",}}
              label="Glossary"
              value="glossary"
            />
          </TabList>
        </Box>
        <TabPanel value="wishlist" sx={tabPanelStyles}>
          <Box sx={{ pb: "20px" }}>
            <Wishlist />
          </Box>
        </TabPanel>

        <TabPanel value="played" sx={tabPanelStyles}>
          <Box sx={{ pb: "20px" }}>
            <Played />
          </Box>
        </TabPanel>

        <TabPanel value="glossary" sx={tabPanelStyles}>
          <Glossary />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
