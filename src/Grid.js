import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
        backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    }
};

function getGridItems() {
    var gridRow = [0, 1, 2, 3, 4].map((value) => (
        <Grid key={value} item>
            <Paper sx={__css.gridItem} variant="outlined" square/>
        </Grid>
    ));

    return gridRow;
}

export default function BasicGrid() {
    return (
        <Box sx={__css.box}>
            <Grid container spacing={0.5}>
                {getGridItems()}
                {getGridItems()}
                {getGridItems()}
                {getGridItems()}
                {getGridItems()}
                {getGridItems()}
            </Grid>
        </Box>
    );
}
