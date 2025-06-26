import React, { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 1,
        p: 2,
        backgroundColor: '#fff',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
          },
        }}
      />
      <IconButton
        type="submit"
        color="primary"
        disabled={!message.trim() || disabled}
        sx={{
          backgroundColor: message.trim() && !disabled ? '#1976d2' : 'transparent',
          color: message.trim() && !disabled ? '#fff' : '#9e9e9e',
          '&:hover': {
            backgroundColor: message.trim() && !disabled ? '#1565c0' : 'transparent',
          },
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput; 