import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import axios from 'axios';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const userId = 'user123'; // In a real app, this would come from authentication

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    try {
      setIsLoading(true);
      // Add user message immediately
      setMessages(prev => [...prev, { text: message, isUser: true }]);

      // Add an empty assistant message that will be updated
      setMessages(prev => [...prev, { text: '', isUser: false, isStreaming: true }]);

      // Prepare for streaming response
      const response = await fetch('https://test-api.retiremate.com/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, message }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        lines.forEach(line => {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(5));
              if (data.type === 'delta' && data.content) {
                assistantMessage += data.content;
                // Update only the last assistant message
                setMessages(prev => {
                  const newMessages = [...prev];
                  for (let i = newMessages.length - 1; i >= 0; i--) {
                    if (!newMessages[i].isUser) {
                      newMessages[i] = {
                        text: assistantMessage,
                        isUser: false,
                        isStreaming: true
                      };
                      break;
                    }
                  }
                  return newMessages;
                });
              } else if (data.type === 'end') {
                // Mark the message as complete when streaming ends
                setMessages(prev => {
                  const newMessages = [...prev];
                  for (let i = newMessages.length - 1; i >= 0; i--) {
                    if (!newMessages[i].isUser) {
                      newMessages[i] = {
                        text: assistantMessage,
                        isUser: false,
                        isStreaming: false
                      };
                      break;
                    }
                  }
                  return newMessages;
                });
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: '80vh',
        maxWidth: '800px',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: '#1976d2',
          color: 'white',
        }}
      >
        <Typography variant="h6">Chat with Assistant</Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          backgroundColor: '#fafafa',
        }}
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isUser={message.isUser}
            isStreaming={message.isStreaming}
          />
        ))}
        {isLoading && !messages.find(m => m.isStreaming) && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              my: 2,
            }}
          >
            <CircularProgress size={20} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </Paper>
  );
};

export default ChatContainer; 