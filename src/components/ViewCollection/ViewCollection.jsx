import * as React from "react";
import { Card, Tab, Box } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";

import Wishlist from "../CollectionWishlist/CollectionWishlist";
import Played from "../CollectionPlayed/CollectionPlayed";
import Glossary from "../CollectionGlossary/CollectionGlossary";

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
        <Box sx={{ position: "relative" }}>
          <TabList
            centered
            sx={{
              background: "#C02222",
              indicatorColor: "#000000",
              position: "fixed",
              top: 60,
              left: 0,
              right: 0,
              zIndex: 1,
              width: "calc(100vw- 20px)",
              justifyContent: "space-evenly",
            }}
            onChange={handleChange}
          >
            <Tab
              sx={{ padding: "0px 20px 0px" }}
              label="Wishlist"
              value="wishlist"
            />
            <Tab
              sx={{ padding: "0px 20px 0px" }}
              label="Played"
              value="played"
            />
            <Tab
              sx={{ padding: "0px 20px 0px" }}
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
