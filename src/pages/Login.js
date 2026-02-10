import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  School as TeacherIcon,
  Person as StudentIcon,
} from '@mui/icons-material';

function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('admin');
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    // Store user type in localStorage
    localStorage.setItem('userType', userType);
    localStorage.setItem('isLoggedIn', 'true');
    
    // Navigate to appropriate dashboard
    if (userType === 'admin') {
      navigate('/admin/dashboard');
    } else if (userType === 'teacher') {
      navigate('/teacher/dashboard');
    } else if (userType === 'student') {
      navigate('/student/dashboard');
    }
  };

  const getRoleIcon = () => {
    switch (userType) {
      case 'admin':
        return <AdminIcon sx={{ fontSize: 64, color: '#e14eca' }} />;
      case 'teacher':
        return <TeacherIcon sx={{ fontSize: 64, color: '#1d8cf8' }} />;
      case 'student':
        return <StudentIcon sx={{ fontSize: 64, color: '#00d4aa' }} />;
      default:
        return <AdminIcon sx={{ fontSize: 64, color: '#e14eca' }} />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #1e1e2f 0%, #232741 100%)',
      }}
    >
      <Card sx={{ maxWidth: 450, width: '100%', m: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" sx={{ color: '#e14eca', fontWeight: 'bold', mb: 1 }}>
              Indian Army
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#9a9a9a' }}>
              Learning Management System
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            {getRoleIcon()}
          </Box>

          <form onSubmit={handleLogin}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Login As</InputLabel>
              <Select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                label="Login As"
              >
                <MenuItem value="admin">Super Admin</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Username"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              sx={{ mb: 2 }}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              sx={{ mb: 3 }}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#e14eca',
                '&:hover': { backgroundColor: '#c73aa8' },
                py: 1.5,
              }}
            >
              Login
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#9a9a9a' }}>
              Demo Credentials: Any username/password will work
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;