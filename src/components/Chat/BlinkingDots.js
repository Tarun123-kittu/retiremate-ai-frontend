import React from 'react';
import { Box } from '@mui/material';

const BlinkingDots = () => {
  return (
    <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      <Box className="dot one" />
      <Box className="dot two" />
      <Box className="dot three" />

      <style>
        {`
          .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #1976d2;
            opacity: 0;
            animation: blink 1.2s infinite;
          }

          .one {
            animation-delay: 0s;
          }

          .two {
            animation-delay: 0.2s;
          }

          .three {
            animation-delay: 0.4s;
          }

          @keyframes blink {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
};

export default BlinkingDots;
