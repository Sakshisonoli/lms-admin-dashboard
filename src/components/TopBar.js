import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Avatar,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

function TopBar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        borderBottom: '1px solid #344675',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{
            color: '#ffffff',
            fontWeight: 600,
          }}
        >
          Super Admin Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton sx={{ color: '#9a9a9a' }}>
            <SearchIcon />
          </IconButton>
          
          <IconButton sx={{ color: '#9a9a9a' }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton sx={{ color: '#9a9a9a' }}>
            <SettingsIcon />
          </IconButton>
          
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: '#e14eca',
              ml: 1,
            }}
          >
            A
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;