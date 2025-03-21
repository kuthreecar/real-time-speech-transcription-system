import React, { useState, useEffect, useRef } from "react";
import { Container, Box, Button, Typography, Paper, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#000000', // Set background color to black
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff', // Set text color to white
    },
  },
});

function App() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [socket, setSocket] = useState(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTranscript((prev) => prev + " " + data.transcript);
    };
    setSocket(ws);
    return () => ws.close();
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);

    mediaRecorder.ondataavailable = (event) => {
      if (socket && event.data.size > 0) {
        socket.send(event.data);
      }
    };
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className="min-h-screen flex flex-col justify-center items-center">
          <Typography variant="h4" component="h1" gutterBottom align="center" style={{ color: theme.palette.text.primary }}>
            Real-Time Speech Transcription
          </Typography>
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              color={recording ? "secondary" : "primary"}
              onClick={recording ? stopRecording : startRecording}
              className={`mt-4 ${recording ? 'recording' : ''}`}
            >
              {recording ? "Stop Recording" : "Start Recording"}
            </Button>
          </Box>
          <Box mt={6} p={4} border={1} borderColor="grey.300" borderRadius={2} bgcolor="grey.800" boxShadow={1} width="100%">
            <Typography variant="h6" component="h2" gutterBottom align="center" style={{ color: theme.palette.text.primary }}>
              Transcript:
            </Typography>
            <TextField
              multiline
              fullWidth
              variant="outlined"
              value={transcript}
              InputProps={{
                style: { color: theme.palette.text.primary, height: '200px' },
              }}
              style={{ backgroundColor: theme.palette.background.default }}
            />
          </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;