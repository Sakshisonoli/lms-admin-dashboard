/*import React from 'react';
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

function TopBar({ handleDrawerToggle }) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        borderBottom: '1px solid #344675',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', pl: { xs: 1, sm: 1 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
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
            Super Admin Dashboard
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          <IconButton sx={{ color: '#9a9a9a' }}>
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

export default TopBar;*/

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
  Menu as MenuIcon,
} from '@mui/icons-material';

function TopBar({ handleDrawerToggle }) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        borderBottom: '1px solid #344675',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', pl: { xs: 1, sm: 1 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
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
            Super Admin Dashboard
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          <IconButton sx={{ color: '#9a9a9a' }}>
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