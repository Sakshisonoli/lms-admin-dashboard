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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Article as ArticleIcon,
  School as SchoolIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard Analytics', icon: <DashboardIcon />, path: '/teacher/dashboard' },
  { text: 'Content', icon: <ArticleIcon />, path: '/teacher/content' },
  { text: 'Batches', icon: <SchoolIcon />, path: '/teacher/batches' },
  { text: 'Messages', icon: <MessageIcon />, path: '/teacher/messages' },
  { text: 'Notifications', icon: <NotificationsIcon />, path: '/teacher/notifications' },
];

function TeacherSidebar({ drawerWidth, mobileOpen, onDrawerToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile && onDrawerToggle) {
      onDrawerToggle();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            color: '#1d8cf8',
            fontWeight: 'bold',
            mb: 1,
          }}
        >
          Indian Army
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#9a9a9a',
            fontSize: '0.875rem',
          }}
        >
          Teacher Dashboard
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
                backgroundColor: location.pathname === item.path ? 'rgba(29, 140, 248, 0.1)' : 'transparent',
                border: location.pathname === item.path ? '1px solid #1d8cf8' : '1px solid transparent',
                '&:hover': {
                  backgroundColor: 'rgba(29, 140, 248, 0.05)',
                },
                py: 1.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? '#1d8cf8' : '#9a9a9a',
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
          onClick={handleLogout}
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
            primary="Logout"
            sx={{
              '& .MuiListItemText-primary': {
                color: '#9a9a9a',
                fontSize: '0.875rem',
              },
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #1e1e2f 0%, #232741 100%)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #1e1e2f 0%, #232741 100%)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default TeacherSidebar;