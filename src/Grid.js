import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Row from "./Row";

const __css = {
  box: {
    width: 320,
    height: 393,
    flexGrow: 1,
    //backgroundColor: 'primary.dark'
  },
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

var noOfColumns = 5;
var noOfTries = 6;

function getGridItems(index, currState, handlerFunction) {
  var gridRow = Array.from(Array(noOfColumns).keys()).map((value) => (
    <Grid key={value} item>
      <Paper sx={__css.gridItem} variant="outlined" square>
        <div key={index.toString + value.toString} onKeyDown={handlerFunction(index, value)}>{currState[value]}</div>
      </Paper>
    </Grid>
  ));

  return gridRow;
}

function getGridStates() {
  var i, j;
  var state = {};

  for(i = 0; i < noOfTries; i++) {
    for(j = 0; j < noOfColumns; j++) {
      if(!state[i]) {
        state[i] = {};
      }
      state[i][j] = '';
    }
  }

  return state;
}

function BasicGrid() {

  var [gridItemState, setGridItemState] = useState(() => getGridStates());

  function onKeyDownHandler(event, row, col) {
    setGridItemState((prevState) => {
      //return {...prevState, gridItemState[row][col]: event.keyCode};
    });
  }
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
