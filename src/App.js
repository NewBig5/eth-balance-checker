import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ValidatorAnalyzer from './components/ValidatorAnalyzer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#61dafb',
    },
    background: {
      default: '#282c34',
      paper: '#1a1d24',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ValidatorAnalyzer />
    </ThemeProvider>
  );
}

export default App;
