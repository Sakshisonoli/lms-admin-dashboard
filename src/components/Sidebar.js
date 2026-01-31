import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  School as SchoolIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  AdminPanelSettings as AdminIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard Analytics', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Team', icon: <PeopleIcon />, path: '/team' },
  { text: 'Content', icon: <ArticleIcon />, path: '/content' },
  { text: 'Batches', icon: <SchoolIcon />, path: '/batches' },
  { text: 'Messages', icon: <MessageIcon />, path: '/messages' },
  { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  { text: 'Admin Activity', icon: <AdminIcon />, path: '/admin-activity' },
];

function Sidebar({ drawerWidth }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #1e1e2f 0%, #232741 100%)',
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            color: '#e14eca',
            fontWeight: 'bold',
            mb: 1,
          }}
        >
          KLP LMS
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#9a9a9a',
            fontSize: '0.875rem',
          }}
        >
          Super Admin Dashboard
        </Typography>
      </Box>
      
      <Divider sx={{ borderColor: '#344675', mx: 2 }} />
      
      <List sx={{ px: 2, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: '12px',
                backgroundColor: location.pathname === item.path ? 'rgba(225, 78, 202, 0.1)' : 'transparent',
                border: location.pathname === item.path ? '1px solid #e14eca' : '1px solid transparent',
                '&:hover': {
                  backgroundColor: 'rgba(225, 78, 202, 0.05)',
                },
                py: 1.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? '#e14eca' : '#9a9a9a',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: location.pathname === item.path ? '#ffffff' : '#9a9a9a',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    fontSize: '0.875rem',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ borderColor: '#344675', mb: 2 }} />
        <ListItemButton
          sx={{
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: 'rgba(253, 93, 147, 0.05)',
            },
            py: 1.5,
          }}
        >
          <ListItemIcon sx={{ color: '#fd5d93', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Login/Logout"
            sx={{
              '& .MuiListItemText-primary': {
                color: '#9a9a9a',
                fontSize: '0.875rem',
              },
            }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}

export default Sidebar;