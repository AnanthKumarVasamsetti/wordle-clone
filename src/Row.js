import React, { useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ReactCardFlip from "react-card-flip";
import Typography from "@material-ui/core/Typography";

var WORD_LENGTH = 5;
var RETRIES_LIMIT = 6;

var CURR_INDEX = 0;
var RETRY_INDEX = 0;
var answer = "BASIC";

var __css = {
  gridItem: {
    height: 58,
    width: 58,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "middle",
    fontWeight: "bold",
    fontSize: 34,
    backgroundColor: (theme) =>
      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  },

  gridItemBack: {
    height: 58,
    width: 58,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "middle",
    fontWeight: "bold",
    fontSize: 34,
    fontColor: "#fff",
    backgroundColor: "#fff"
  }
};

function getColValues(val) {
  var values = {};
  for (var i = 0; i < RETRIES_LIMIT; i++) {
    values[i] = {};
    for (var j = 0; j < WORD_LENGTH; j++) {
      values[i][j] = (val && val.length === 0) ? '' : val;
    }
  }
  return values;
}

function Row() {
  var [colValues, setCol] = useState(() => getColValues());
  var [flipValues, setFlip] = useState(() => getColValues());
  var [backColors, setBackColor] = useState(() => getColValues("#fff"));
  var currWord = ['', '', '', '', ''];

  //For listening keyboard events
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      var pressedKeyCode = event.keyCode;

      if (RETRY_INDEX === RETRIES_LIMIT) {
        return;
      }

      if (pressedKeyCode === 13 && CURR_INDEX === WORD_LENGTH) {
        //Click "Enter" for next row
        for (var i = 0; i < WORD_LENGTH; i++) {
          // eslint-disable-next-line no-loop-func
          setBackColor((prevState) => {
            var currColors = { ...prevState };
            if(answer.indexOf(currWord[i]) === -1) {
              currColors[RETRY_INDEX][i] = "#787C7E";
            } else if(answer.indexOf(currWord[i]) !== i) {
              currColors[RETRY_INDEX][i] = "#C9B458";
            } else {
              currColors[RETRY_INDEX][i] = "#6AAA64";
            }

            return currColors;
          });
          // eslint-disable-next-line no-loop-func
          setFlip((prevState) => {
            var currFlips = { ...prevState };
            currFlips[RETRY_INDEX][i] = true;
            return currFlips;
          });
        }
        RETRY_INDEX++;
        CURR_INDEX = 0;
        console.log("============> Word: " + currWord.join(''));
        currWord = ['', '', '', '', ''];
      } else {
        if (pressedKeyCode >= 65 && pressedKeyCode <= 90 && CURR_INDEX < WORD_LENGTH) {
          if (RETRY_INDEX < RETRIES_LIMIT) {
            setCol((prevState) => {
              var currState = { ...prevState };
              currState[RETRY_INDEX][CURR_INDEX] = event.key.toUpperCase();
              currWord[CURR_INDEX] = currState[RETRY_INDEX][CURR_INDEX];
              return currState;
            });
          }
          CURR_INDEX++;
        }
        //Backspace
        else if(pressedKeyCode === 8) { 
          if(CURR_INDEX === 0 || RETRY_INDEX >= RETRIES_LIMIT) {
            return;
          }
          
          CURR_INDEX--;

          setCol((prevState) => {
            var currState = { ...prevState };
            currState[RETRY_INDEX][CURR_INDEX] = '';
            currWord[CURR_INDEX] = '';
            currWord.pop();
            return currState;
          });
        }
      }
    });
  }, []);

  return (
    <>
      {Array.from(Array(RETRIES_LIMIT).keys()).map((row) => {
        return Array.from(Array(WORD_LENGTH).keys()).map((col) => {
          __css.gridItemBack = {...__css.gridItem, backgroundColor: backColors[row][col]};
          return (
            <Grid key={row + "," + col} item>
              <ReactCardFlip isFlipped={flipValues[row][col]} flipDirection="vertical">
                <Paper sx={__css.gridItem} variant="outlined" square>{colValues[row][col]}</Paper>
                <Paper sx={__css.gridItemBack} variant="outlined" square><Typography style={{color:"#fff",fontWeight: "bold",fontSize: 34}}>{colValues[row][col]}</Typography></Paper>
              </ReactCardFlip>
            </Grid>
          );
        });
      })}
    </>
  );
}

export default Row;
