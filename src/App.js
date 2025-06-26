import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import ChatContainer from './components/Chat/ChatContainer';

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <ChatContainer />
      </Container>
    </>
  );
}

export default App;
