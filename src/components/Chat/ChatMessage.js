import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

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
        elevation={1}
        sx={{
          p: 2,
          maxWidth: '70%',
          backgroundColor: isUser ? '#e3f2fd' : '#f5f5f5',
          borderRadius: isUser ? '20px 20px 0 20px' : '20px 20px 20px 0',
          opacity: isStreaming ? 0.8 : 1,
          transition: 'opacity 0.3s ease',
          position: 'relative',
          '&::after': isStreaming ? {
            content: '""',
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            width: '8px',
            height: '8px',
            backgroundColor: '#1976d2',
            borderRadius: '50%',
            animation: 'pulse 1s infinite'
          } : {},
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(0.8)',
              opacity: 0.5,
            },
            '100%': {
              transform: 'scale(1.2)',
              opacity: 0,
            },
          },
        }}
      >
        <Typography 
          variant="body1" 
          component="div" 
          sx={{ 
            whiteSpace: 'pre-wrap',
            minHeight: '20px', // Ensures empty messages have height
          }}
        >
          {message}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatMessage; 