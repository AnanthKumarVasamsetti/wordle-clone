import React, { useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

var WORD_LENGTH = 5;
var RETRIES_LIMIT = 6;

var CURR_INDEX = 0;
var RETRY_INDEX = 0;

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
  for (var i = 0; i < RETRIES_LIMIT; i++) {
    values[i] = {};
    for (var j = 0; j < WORD_LENGTH; j++) {
      values[i][j] = "";
    }
  }
  return values;
}

function Row() {
  var [colValues, setCol] = useState(() => getColValues());

  //For listening keyboard events
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      var pressedKeyCode = event.keyCode;

      if (pressedKeyCode === 13 && CURR_INDEX === WORD_LENGTH) {
        RETRY_INDEX++;
        CURR_INDEX = 0;
      } else {
        if (pressedKeyCode >= 65 && pressedKeyCode <= 90 && CURR_INDEX < WORD_LENGTH) {
          if (RETRY_INDEX < RETRIES_LIMIT) {
            setCol((prevState) => {
              var currState = { ...prevState };
              currState[RETRY_INDEX][CURR_INDEX] = event.key.toUpperCase();
              return currState;
            });
          }
          CURR_INDEX++;
        }
      }
    });
  }, []);

  return (
    <>
      {Array.from(Array(RETRIES_LIMIT).keys()).map((row) => {
        return Array.from(Array(WORD_LENGTH).keys()).map((col) => {
          return (
            <Grid key={row + "," + col} item>
              <Paper sx={__css.gridItem} variant="outlined" square>
                <div>{colValues[row][col]}</div>
              </Paper>
            </Grid>
          );
        });
      })}
    </>
  );
}

export default Row;
