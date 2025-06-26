import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import BlinkingDots from './BlinkingDots';
const ChatMessage = ({ message, isUser, isStreaming }) => {
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Paper
        elevation={0} // Changed from 1 to 0 to remove shadow
        sx={{
          px: 2,
          py: 1,
          fontSize: "14px",
          maxWidth: '320px',
          backgroundColor: isUser ? '#7bf1a8' : '#fff',
          borderRadius: isUser ? '12px 12px 0 12px' : '0px 12px 12px 12px',
          borderWidth: isUser ? '' : "2px",
          borderColor: isUser ? '' : "#5cc37e",
          borderStyle: isUser ? '' : "solid",
          opacity: isStreaming ? 0.8 : 1,
          transition: 'opacity 0.3s ease',
          position: 'relative',
       
        }}
      >
        <Typography
          variant="body1"
          component="div"
          sx={{
            whiteSpace: 'pre-wrap',
            minHeight: '20px', // Ensures empty messages have height
            fontSize:'14px',
            fontFamily:"Rubik"
          }}
        >
          {message} {isStreaming && <BlinkingDots/>}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatMessage; 