import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function PageHeader({ title, buttonText, buttonIcon, onButtonClick, showButton = true }) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
        mb: 3, 
        pb: 2, 
        borderBottom: '2px solid #FF8C00' 
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          color: '#1f2937', 
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
        }}
      >
        {title}
      </Typography>
      {showButton && buttonText && (
        <Button
          variant="contained"
          startIcon={buttonIcon}
          onClick={onButtonClick}
          sx={{
            backgroundColor: '#c62020ff',
            color: '#ffffff',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
            width: { xs: '100%', sm: 'auto' },
            '&:hover': { 
              backgroundColor: '#a01818',
            },
          }}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
}

export default PageHeader;
