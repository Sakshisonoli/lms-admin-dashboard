import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import TeacherSidebar from './components/TeacherSidebar';
import StudentSidebar from './components/StudentSidebar';
import TopBar from './components/TopBar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
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

// Protected Route Component
function ProtectedRoute({ children, allowedRole }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userType = localStorage.getItem('userType');

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && userType !== allowedRole) {
    return <Navigate to={`/${userType}/dashboard`} replace />;
  }

  return children;
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Dashboard /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/team" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Team /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/team/staff" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Staff /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/team/teachers" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Teachers /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/team/students" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Students /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/content" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Content /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/lessons" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Lessons /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/batches" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Batches /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/messages" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Messages /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/notifications" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Notifications /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/admin-activity" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><AdminActivity /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      {/* Teacher Routes */}
      <Route path="/teacher/dashboard" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><TeacherDashboard /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/teacher/content" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Content /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/teacher/batches" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Batches /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/teacher/messages" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Messages /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/teacher/notifications" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Notifications /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      {/* Student Routes */}
      <Route path="/student/dashboard" element={
        <ProtectedRoute allowedRole="student">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <StudentSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><StudentDashboard /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/student/content" element={
        <ProtectedRoute allowedRole="student">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <StudentSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Content /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/student/messages" element={
        <ProtectedRoute allowedRole="student">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <StudentSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Messages /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/student/notifications" element={
        <ProtectedRoute allowedRole="student">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <StudentSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#1e1e2f' }}>
              <TopBar onMenuClick={handleDrawerToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Notifications /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
