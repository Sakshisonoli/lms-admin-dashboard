import React, { useState } from 'react';
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
  useMediaQuery,
  useTheme,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  ExitToApp as LogoutIcon,
  Description as DocumentIcon,
  QuestionAnswer as QueryIcon,
  School as TrainerIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard (डैशबोर्ड)', icon: <DashboardIcon />, path: '/student/dashboard' },
  { text: 'My Documents (मेरे दस्तावेज़)', icon: <DocumentIcon />, path: '/student/my-documents' },
  { text: 'My Queries (मेरे प्रश्न)', icon: <QueryIcon />, path: '/student/my-queries' },
  { text: 'My Trainers (मेरे प्रशिक्षक)', icon: <TrainerIcon />, path: '/student/my-trainers' },
  { text: 'Messages (संदेश)', icon: <MessageIcon />, path: '/student/messages' },
  { text: 'Notifications (सूचनाएं)', icon: <NotificationsIcon />, path: '/student/notifications' },
  { text: 'My Profile (मेरी प्रोफ़ाइल)', icon: <PersonIcon />, path: '/student/profile' },
];

function StudentSidebar({ drawerWidth, mobileOpen, onDrawerToggle, searchOpen, onSearchClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter menu items based on search term
  const filteredMenuItems = searchTerm
    ? menuItems.filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase()))
    : menuItems;

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box 
        sx={{ 
          p: 3, 
          textAlign: 'center', 
          borderBottom: '2px solid #FF8C00',
          background: 'linear-gradient(180deg, #2d5f3f 0%, #3d7f5f 100%)',
        }}
      >
        <Box
          component="img"
          src="/images/IndianArmyLogo.png"
          alt="The Junior Leaders Wing (JLW) Logo"
          sx={{
            width: '120px',
            height: '120px',
            margin: '0 auto 16px',
            display: 'block',
          }}
        />
        <Typography
          variant="h5"
          sx={{
            color: '#FF8C00',
            fontWeight: 900,
            mb: 0.5,
            letterSpacing: '1.5px',
            fontSize: '1.25rem',
          }}
        >
          THE JUNIOR LEADERS WING (JLW) (जूनियर लीडर्स विंग)
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#ffffff',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          STUDENT DASHBOARD (छात्र डैशबोर्ड)
        </Typography>
      </Box>
      
      {/* Search Box */}
      {searchOpen && (
        <Box sx={{ px: 2, pt: 2 }}>
          <TextField
            fullWidth
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton 
                    size="small" 
                    onClick={() => setSearchTerm('')}
                    sx={{ color: '#9ca3af' }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                '&.Mui-focused fieldset': { borderColor: '#FF8C00' },
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#9ca3af',
                opacity: 1,
              },
            }}
          />
        </Box>
      )}
      
      <List sx={{ px: 2, pt: 2, flex: 1 }}>
        {filteredMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: '6px',
                borderLeft: location.pathname === item.path ? '4px solid #FF8C00' : '4px solid transparent',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.15)',
                },
                py: 1.5,
                pl: location.pathname === item.path ? 1.5 : 2,
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? '#FFB84D' : 'rgba(255, 255, 255, 0.8)',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: location.pathname === item.path ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                    fontWeight: location.pathname === item.path ? 700 : 500,
                    fontSize: '0.875rem',
                    letterSpacing: '0.3px',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, borderTop: '2px solid #2d5f3f', backgroundColor: '#c62020ff' }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: '6px',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            },
            py: 1.5,
          }}
        >
          <ListItemIcon sx={{ color: '#ffffff', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout (लॉगआउट)"
            sx={{
              '& .MuiListItemText-primary': {
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.3px',
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
            backgroundColor: '#2d5f3f',
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
            backgroundColor: '#2d5f3f',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default StudentSidebar;