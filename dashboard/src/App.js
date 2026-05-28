import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { UserProvider } from './context/UserContext';
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
import Batches from './pages/Batches';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import AdminActivity from './pages/AdminActivity';
import DocumentViewer from './pages/DocumentViewer';
import Profile from './pages/Profile';
import MyStudents from './pages/MyStudents';
import StudentQueries from './pages/StudentQueries';
import MyDocuments from './pages/MyDocuments';
import MyQueries from './pages/MyQueries';
import MyTrainers from './pages/MyTrainers';

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
  const [searchOpen, setSearchOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Login />} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Dashboard /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/team" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Team /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/team/staff" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Staff /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/team/teachers" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Teachers /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/team/students" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Students /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/content" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Content /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      
      <Route path="/admin/batches" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Batches /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/messages" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Messages /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/notifications" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Notifications /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/admin-activity" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><AdminActivity /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/document/:id" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><DocumentViewer /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/profile" element={
        <ProtectedRoute allowedRole="admin">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Profile /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      {/* Teacher Routes */}
      <Route path="/teacher/dashboard" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><TeacherDashboard /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/teacher/content" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Content /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/teacher/batches" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Batches /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/teacher/messages" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Messages /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/teacher/notifications" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Notifications /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/teacher/my-students" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><MyStudents /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/teacher/student-queries" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><StudentQueries /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/teacher/profile" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Profile /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/teacher/document/:id" element={
        <ProtectedRoute allowedRole="teacher">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <TeacherSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><DocumentViewer /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      {/* Student Routes */}
      <Route path="/student/dashboard" element={
        <ProtectedRoute allowedRole="student">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <StudentSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><StudentDashboard /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/student/content" element={
        <ProtectedRoute allowedRole="student">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <StudentSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Content /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/student/messages" element={
        <ProtectedRoute allowedRole="student">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <StudentSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Messages /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/student/notifications" element={
        <ProtectedRoute allowedRole="student">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <StudentSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Notifications /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/student/my-documents" element={
        <ProtectedRoute allowedRole="student">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <StudentSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><MyDocuments /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/student/my-queries" element={
        <ProtectedRoute allowedRole="student">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <StudentSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><MyQueries /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/student/my-trainers" element={
        <ProtectedRoute allowedRole="student">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <StudentSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><MyTrainers /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/student/profile" element={
        <ProtectedRoute allowedRole="student">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <StudentSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><Profile /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      
      <Route path="/student/document/:id" element={
        <ProtectedRoute allowedRole="student">
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <StudentSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} searchOpen={searchOpen} />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', backgroundColor: '#f5f7fa' }}>
              <TopBar onMenuClick={handleDrawerToggle} onSearchClick={handleSearchToggle} />
              <Box sx={{ p: { xs: 1, sm: 2 } }}><DocumentViewer /></Box>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
      </Routes>
    </UserProvider>
  );
}

export default App;

