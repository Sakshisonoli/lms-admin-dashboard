import React from 'react';
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

const drawerWidth = 320;

function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#1e1e2f',
        }}
      >
        <TopBar />
        <Box sx={{ p: 1, pl: 2 }}>
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