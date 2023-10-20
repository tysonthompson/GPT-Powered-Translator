import React, { useState } from 'react';
import './App.css';
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  Grid,
  Box,
} from '@mui/material';

function App() {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [textError, setTextError] = useState(false); // Add state for the text error

  const handleTranslate = async () => {
    if (text.trim() === '') {
      // If the text is empty or only contains whitespace, set the error state
      setTextError(true);
      return;
    }

    // If the text is not empty, clear the error state
    setTextError(false);

    try {
      const response = await fetch('http://localhost:5000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, target_language: targetLanguage }),
      });
      const data = await response.json();
      setTranslation(data.translation);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  return (
    <Container maxWidth="md" className="App">
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h4" gutterBottom>
          About This Project
        </Typography>
        <Typography variant="body1">
          This project is a simple text translation tool powered by GPT-3.
          You can enter text in the input field, select the target language, and
          click the "Translate" button to receive the translation.

          The backend of this project is implemented in Python using the Flask framework. It provides an API endpoint that receives text and target language as input, sends the request to the GPT-3 model, and returns the translation to the frontend.

          The frontend is built using React, a popular JavaScript library. It offers a user-friendly interface where you can input text and choose the target language. When you click "Translate," the frontend sends a request to the Python backend, which handles the translation process. The translated text is then displayed on the frontend.

          Together, this project demonstrates the integration of a Python backend with a React frontend to create a practical and user-friendly text translation tool.
        </Typography>
      </Paper>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h4" gutterBottom>
          GPT Powered Text Translator
        </Typography>
        <Typography variant="h6" gutterBottom>
          By Tyson Thompson
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              label="Enter text to translate"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              margin="normal"
              // Apply red border when textError is true
              error={textError}
              helperText={textError ? 'Text cannot be empty' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                fullWidth
                style={{ flex: 1, height: '40px', marginRight: '10px' }}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="German">German</MenuItem>
                <MenuItem value="Portuguese">Portuguese</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Dutch">Dutch</MenuItem>
                <MenuItem value="Russian">Russian</MenuItem>
                <MenuItem value="Arabic">Arabic</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
              </Select>
              <Button
                variant="contained"
                color="primary"
                onClick={handleTranslate}
                style={{ flex: 1, height: '40px' }}
              >
                Translate
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {translation && (
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Translation:
          </Typography>
          <Typography variant="body1">{translation}</Typography>
        </Paper>
      )}
    </Container>
  );
}

export default App;
