import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import axios from 'axios';
import { Logo } from '../../svgFiles/Logo';
import { useNavigate } from 'react-router-dom';
const ChatContainer = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  // const userId = 'user123'; // In a real app, this would come from authentication

   const [userId] = useState(() => `user_${Math.floor(Math.random() * 1000000)}`);
console.log(userId,"userId--->");

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
  <Box display="flex" justifyContent="center" sx={{height:"100vh",paddingLeft:"10px",paddingRight:"10px"}} >
      <Paper
        elevation={0}
        sx={{
          height: '98vh',
          maxWidth: '572px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          border: "2px solid green",
          width: "100%",
          borderRadius:"10px"
        }}
      >
        <Box
         elevation={3}
          sx={{
            p: 2,
            backgroundColor: '#fff',
            color: 'white',
            borderTopLeftRadius:"8px",
            borderTopRightRadius:"8px",
          }}
        >
           <Logo  className="logoSvg" onClick={()=> navigate('/')} sx={{color:"#000"}}/>
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
    </Box>

  );
};

export default ChatContainer; 