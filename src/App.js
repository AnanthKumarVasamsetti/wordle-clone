import './App.css';
import Box from '@mui/material/Box';
import Grid from './Grid';

const __css = {
  header: {
    height: 50,
    borderBottom: 1
  }
};

function App() {
  return (
    <div className="App">
      <Box sx={__css.header}></Box>
      <div className='Outer-grid'>
        <Grid />
      </div>
    </div>
  );
}

export default App;