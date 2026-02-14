import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

function TopBar({ onMenuClick, onSearchClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  
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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    const userType = localStorage.getItem('userType') || 'admin';
    navigate(`/${userType}/profile`);
    handleProfileMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
    handleProfileMenuClose();
  };

  const handleNotificationClick = () => {
    const userType = localStorage.getItem('userType') || 'admin';
    navigate(`/${userType}/notifications`);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#2d5f3f',
        borderBottom: '3px solid #FF8C00',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', pl: 1, py: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ 
              mr: 2, 
              display: { md: 'none' },
              color: '#ffffff',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            {getDashboardTitle()}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
          <IconButton 
            onClick={onSearchClick}
            sx={{ color: '#ffffff', display: { xs: 'none', sm: 'inline-flex' } }}
          >
            <SearchIcon />
          </IconButton>
          
          <IconButton 
            onClick={handleNotificationClick}
            sx={{ color: '#ffffff' }}
          >
            <Badge 
              badgeContent={4} 
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#c62020ff',
                  color: '#ffffff',
                  fontWeight: 700,
                },
              }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton sx={{ color: '#ffffff', display: { xs: 'none', sm: 'inline-flex' } }}>
            <SettingsIcon />
          </IconButton>
          
          <Avatar
            onClick={handleProfileMenuOpen}
            sx={{
              width: { xs: 32, sm: 36 },
              height: { xs: 32, sm: 36 },
              backgroundColor: '#cf1e11ff',
              ml: { xs: 0.5, sm: 1 },
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 700,
              border: '2px solid #ffffff',
              '&:hover': {
                backgroundColor: '#c62020ff',
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease',
              },
            }}
          >
            A
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: '#ffffff',
                color: '#1f2937',
                mt: 1,
                minWidth: 200,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                border: '2px solid #e5e7eb',
              },
            }}
          >
            <MenuItem onClick={handleProfileClick}>
              <ListItemIcon>
                <PersonIcon sx={{ color: '#FF6B00' }} />
              </ListItemIcon>
              <ListItemText 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    fontWeight: 600,
                  } 
                }}
              >
                My Profile
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleProfileClick}>
              <ListItemIcon>
                <LockIcon sx={{ color: '#3B5323' }} />
              </ListItemIcon>
              <ListItemText 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    fontWeight: 600,
                  } 
                }}
              >
                Change Password
              </ListItemText>
            </MenuItem>
            <Divider sx={{ borderColor: '#e5e7eb', my: 1 }} />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: '#8b0000' }} />
              </ListItemIcon>
              <ListItemText 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    fontWeight: 600,
                  } 
                }}
              >
                Logout
              </ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;