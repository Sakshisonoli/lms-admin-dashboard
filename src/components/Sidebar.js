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
  Collapse,
  TextField,
  InputAdornment,
  IconButton,
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
  ExpandLess,
  ExpandMore,
  Group as GroupIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard Analytics (डैशबोर्ड विश्लेषण)', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { 
    text: 'Team (टीम)', 
    icon: <PeopleIcon />, 
    path: '/admin/team',
    hasSubmenu: true,
    submenu: [
      { text: 'Staff (कर्मचारी)', path: '/admin/team/staff' },
      { text: 'Teachers (शिक्षक)', path: '/admin/team/teachers' },
      { text: 'Students (छात्र)', path: '/admin/team/students' },
    ]
  },
  { text: 'Content Management (सामग्री प्रबंधन)', icon: <ArticleIcon />, path: '/admin/content' },
  { text: 'Batch Management (बैच प्रबंधन)', icon: <SchoolIcon />, path: '/admin/batches' },
  { text: 'Messages (संदेश)', icon: <MessageIcon />, path: '/admin/messages' },
  { text: 'Notifications (सूचनाएं)', icon: <NotificationsIcon />, path: '/admin/notifications' },
  { text: 'Admin Activity (व्यवस्थापक गतिविधि)', icon: <AdminIcon />, path: '/admin/admin-activity' },
];

function Sidebar({ drawerWidth, mobileOpen, onDrawerToggle, searchOpen, onSearchClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openTeam, setOpenTeam] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavigation = (path) => {
    navigate(path);
    if (onDrawerToggle && mobileOpen) {
      onDrawerToggle();
    }
  };

  const handleTeamClick = () => {
    setOpenTeam(!openTeam);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
  };

  // Filter menu items based on search term
  const filterMenuItems = (items) => {
    if (!searchTerm) return items;
    
    return items.filter(item => {
      const matchesMain = item.text.toLowerCase().includes(searchTerm.toLowerCase());
      if (item.hasSubmenu) {
        const matchesSubmenu = item.submenu.some(sub => 
          sub.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchesMain || matchesSubmenu;
      }
      return matchesMain;
    });
  };

  const filteredMenuItems = filterMenuItems(menuItems);

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
          alt="Indian Army Logo"
          sx={{
            width: '120px',
            height: '110px',
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
          INDIAN ARMY (भारतीय सेना)
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
          SUPER ADMIN DASHBOARD (सुपर व्यवस्थापक डैशबोर्ड)
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
          <React.Fragment key={item.text}>
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={item.hasSubmenu ? handleTeamClick : () => handleNavigation(item.path)}
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
                {item.hasSubmenu && (
                  openTeam ? <ExpandLess sx={{ color: 'rgba(255, 255, 255, 0.8)' }} /> : <ExpandMore sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                )}
              </ListItemButton>
            </ListItem>
            
            {item.hasSubmenu && (
              <Collapse in={openTeam} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu.map((subItem) => (
                    <ListItem key={subItem.text} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemButton
                        onClick={() => handleNavigation(subItem.path)}
                        sx={{
                          borderRadius: '6px',
                          borderLeft: location.pathname === subItem.path ? '4px solid #FF8C00' : '4px solid transparent',
                          backgroundColor: 'transparent',
                          '&:hover': {
                            backgroundColor: 'rgba(33, 150, 243, 0.15)',
                          },
                          py: 1,
                          pl: location.pathname === subItem.path ? 5 : 5.5,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: location.pathname === subItem.path ? '#FFB84D' : 'rgba(255, 255, 255, 0.8)',
                            minWidth: 30,
                          }}
                        >
                          <GroupIcon sx={{ fontSize: 18 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={subItem.text}
                          sx={{
                            '& .MuiListItemText-primary': {
                              color: location.pathname === subItem.path ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                              fontWeight: location.pathname === subItem.path ? 700 : 500,
                              fontSize: '0.8125rem',
                              letterSpacing: '0.3px',
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
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
            primary="Login/Logout (लॉगिन/लॉगआउट)"
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
          keepMounted: true, // Better mobile performance
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

export default Sidebar;