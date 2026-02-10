/*import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import Staff from './pages/Staff';
import Teachers from './pages/Teachers';
import Students from './pages/Students';
import Content from './pages/Content';
import Lessons from './pages/Lessons';
import Batches from './pages/Batches';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import AdminActivity from './pages/AdminActivity';

const drawerWidth = 240;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar 
        drawerWidth={drawerWidth} 
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#1e1e2f',
          overflow: 'auto',
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <TopBar handleDrawerToggle={handleDrawerToggle} />
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/staff" element={<Staff />} />
            <Route path="/team/teachers" element={<Teachers />} />
            <Route path="/team/students" element={<Students />} />
            <Route path="/content" element={<Content />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/batches" element={<Batches />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/admin-activity" element={<AdminActivity />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;*/

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import Staff from './pages/Staff';
import Teachers from './pages/Teachers';
import Students from './pages/Students';
import Content from './pages/Content';
import Lessons from './pages/Lessons';
import Batches from './pages/Batches';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import AdminActivity from './pages/AdminActivity';

const drawerWidth = 240;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar 
        drawerWidth={drawerWidth} 
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#1e1e2f',
          overflow: 'auto',
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <TopBar handleDrawerToggle={handleDrawerToggle} />
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/staff" element={<Staff />} />
            <Route path="/team/teachers" element={<Teachers />} />
            <Route path="/team/students" element={<Students />} />
            <Route path="/content" element={<Content />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/batches" element={<Batches />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/admin-activity" element={<AdminActivity />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;