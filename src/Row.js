import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

var WORD_LENGTH = 5;

const __css = {
  gridItem: {
    height: 58,
    width: 58,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "middle",
    backgroundColor: (theme) =>
      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  },
};

function getColValues() {
  var values = {};

  for (var i = 0; i < WORD_LENGTH; i++) {
    values[i] = "";
  }

  return values;
}
function Row() {
  var [colValues, setCol] = useState(() => getColValues());

  return Array.from(Array(WORD_LENGTH).keys()).map((value) => (
    <>
      <Grid key={'index_'+ value} item>
        <Paper sx={__css.gridItem} variant="outlined" square>
          <div>{colValues[value]}</div>
        </Paper>
      </Grid>
    </>
  ));
}

export default Row;
