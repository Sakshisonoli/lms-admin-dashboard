import React from 'react';
import { useLocation } from 'react-router-dom';
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
  Menu as MenuIcon,
} from '@mui/icons-material';

function TopBar({ onMenuClick }) {
  const location = useLocation();
  
  // Determine dashboard title based on current route
  const getDashboardTitle = () => {
    if (location.pathname.startsWith('/admin')) {
      return 'Super Admin Dashboard';
    } else if (location.pathname.startsWith('/teacher')) {
      return 'Teacher Dashboard';
    } else if (location.pathname.startsWith('/student')) {
      return 'Student Dashboard';
    }
    return 'Dashboard';
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        borderBottom: '1px solid #344675',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', pl: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ 
              mr: 2, 
              display: { md: 'none' },
              color: '#9a9a9a',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              color: '#ffffff',
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            {getDashboardTitle()}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          <IconButton sx={{ color: '#9a9a9a', display: { xs: 'none', sm: 'inline-flex' } }}>
            <SearchIcon />
          </IconButton>
          
          <IconButton sx={{ color: '#9a9a9a' }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton sx={{ color: '#9a9a9a', display: { xs: 'none', sm: 'inline-flex' } }}>
            <SettingsIcon />
          </IconButton>
          
          <Avatar
            sx={{
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              backgroundColor: '#e14eca',
              ml: { xs: 0.5, sm: 1 },
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