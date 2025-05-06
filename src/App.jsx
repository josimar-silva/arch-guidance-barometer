import { Barometer, ArchitectForm } from './components/barometer';
import useBarometerScore from './hooks/useBarometerScore';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './App.css'

function App() {
  const { score, calculateScore, getArchitectType } = useBarometerScore();

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        <Typography variant="h4" component="h1" fontWeight={700} textAlign="center" gutterBottom>
          Architect Guidance Barometer
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" mb={2}>
          Determine the appropriate level of architectural guidance for your development team
        </Typography>
        <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, width: '100%', mb: 2, display: 'flex', justifyContent: 'center' }}>
          <Barometer 
            score={score} 
            architectType={getArchitectType(score)} 
          />
        </Paper>
        <Paper elevation={1} sx={{ p: { xs: 2, sm: 3 }, width: '100%' }}>
          <ArchitectForm onSubmit={calculateScore} />
        </Paper>
        <Typography variant="caption" color="text.disabled" align="center" mt={4}>
          Based on "Fundamentals of Software Architecture" by Mark Richards and Neal Ford
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
