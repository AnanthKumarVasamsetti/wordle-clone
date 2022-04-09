import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Row from "./Row";

const __css = {
  box: {
    width: 320,
    height: 393,
    flexGrow: 1,
    //backgroundColor: 'primary.dark'
  },
};

function BasicGrid() {
  return (
    <>
      <Box sx={__css.box}>
        <Grid container spacing={0.5}>
          <Row/>
        </Grid>
      </Box>
    </>
  );
}

export default BasicGrid;
