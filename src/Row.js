import React, { useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

var WORD_LENGTH = 5;
var CURR_INDEX = 0;

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

  //For listening keyboard events
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      var pressedKeyCode = event.keyCode;

      if (pressedKeyCode >= 65 && pressedKeyCode <= 90) {
        setCol((prevState) => {
          var currState = { ...prevState };
          currState[CURR_INDEX] = event.key.toUpperCase();
          return currState;
        });
        CURR_INDEX++;
      }
    });
  }, []);

  return (
    <>
      <Grid key={0} item>
        <Paper sx={__css.gridItem} variant="outlined" square>
          <div>{colValues[0]}</div>
        </Paper>
      </Grid>
      <Grid key={1} item>
        <Paper sx={__css.gridItem} variant="outlined" square>
          <div>{colValues[1]}</div>
        </Paper>
      </Grid>
      <Grid key={2} item>
        <Paper sx={__css.gridItem} variant="outlined" square>
          <div>{colValues[2]}</div>
        </Paper>
      </Grid>
      <Grid key={3} item>
        <Paper sx={__css.gridItem} variant="outlined" square>
          <div>{colValues[3]}</div>
        </Paper>
      </Grid>
      <Grid key={4} item>
        <Paper sx={__css.gridItem} variant="outlined" square>
          <div>{colValues[4]}</div>
        </Paper>
      </Grid>
    </>
  );
}

export default Row;
