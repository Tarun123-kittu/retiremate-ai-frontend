import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from 'react-router-dom';

const ChatInput = ({ onSendMessage, disabled }) => {

  const { state } = useLocation()
  console.log(state, "state");
  const [message, setMessage] = useState('');
  const [inti, setin] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };
  useEffect(() => {
    if (state?.title) {

      setin(state?.title)
    }
  }, [state?.title])
  useEffect(() => {
    if (inti) {

      onSendMessage(inti)
    }
  }, [inti])

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
        borderRadius:'10px'
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
            fontSize:"14px"
          },
        }}
      />
      <IconButton
        type="submit"
        color="primary"
        disabled={!message.trim() || disabled}
        sx={{
          '&:hover': {
            backgroundColor: message.trim() && !disabled ? 'transparent' : 'transparent',
          },
        }} 
      >
        <SendIcon  sx={{
          // colo: message.trim() && !disabled ? '#1976d2' : 'transparent',
          color: message.trim() && !disabled ? '#5cc37e' : '#9e9e9e',
        
        }} />
      </IconButton>
    </Box>
  );
};

export default ChatInput; 