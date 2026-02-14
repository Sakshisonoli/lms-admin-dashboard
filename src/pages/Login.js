import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
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
  const { updateUserContext } = useUser();
  const [userType, setUserType] = useState('admin');
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Create user context based on role
    let userContext = {
      userType,
      userId: 1,
      name: '',
      email: '',
      assignedBatch: null,
      assignedBatches: [],
    };
    
    if (userType === 'admin') {
      userContext.name = 'Admin User';
      userContext.email = 'admin@army.gov.in';
    } else if (userType === 'teacher') {
      userContext.name = 'Dr. Rajesh Kumar';
      userContext.email = 'rajesh.kumar@army.gov.in';
      userContext.assignedBatches = ['Commando', 'Platoon Commander']; // Teacher's assigned batches
    } else if (userType === 'student') {
      userContext.name = 'Rahul Sharma';
      userContext.email = 'rahul.sharma@student.army.gov.in';
      userContext.assignedBatch = 'Commando'; // Student's batch
    }
    
    // Update user context
    updateUserContext(userContext);
    
    // Store in localStorage
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
        return <AdminIcon sx={{ fontSize: 72, color: '#FF6B00' }} />;
      case 'teacher':
        return <TeacherIcon sx={{ fontSize: 72, color: '#3B5323' }} />;
      case 'student':
        return <StudentIcon sx={{ fontSize: 72, color: '#0b1f3a' }} />;
      default:
        return <AdminIcon sx={{ fontSize: 72, color: '#FF6B00' }} />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#3a1b0bff',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("https://cdn.magicdecor.in/com/2024/07/16181758/Braveheart-Horizon-Indian-Army-Wallpaper-Mural-710x448.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.65) 50%, rgba(0, 0, 0, 0.70) 100%)',
          zIndex: 1,
        },
      }}
    >
      <Card 
        sx={{ 
          maxWidth: 420, 
          width: '100%', 
          m: 2,
          position: 'relative',
          zIndex: 2,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Green Header Bar */}
        <Box
          sx={{
            backgroundColor: '#2d5f3f',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            component="img"
            src="/images/IndianArmyLogo.png"
            alt="Indian Army Logo"
            sx={{
              width: '50px',
              height: '50px',
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography
              sx={{
                color: '#ffffff',
                fontSize: '1.25rem',
                fontWeight: 900,
                letterSpacing: '1.5px',
                lineHeight: 1.2,
                fontFamily: '"Roboto", "Arial", sans-serif',
              }}
            >
              INDIAN ARMY
            </Typography>
            <Typography
              sx={{
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                marginTop: '2px',
                fontFamily: '"Roboto", "Arial", sans-serif',
              }}
            >
              GOVERNMENT OF INDIA
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Typography
            sx={{
              color: '#374151',
              fontSize: '0.85rem',
              fontWeight: 500,
              mb: 1.5,
              textAlign: 'left',
              lineHeight: 1.5,
            }}
          >
            Welcome to Indian Army Learning Management System. Please select your role and enter credentials to access the portal.
          </Typography>

          <Box sx={{ textAlign: 'center', mb: 2 }}>
            {getRoleIcon()}
          </Box>

          <form onSubmit={handleLogin}>
            <FormControl 
              fullWidth 
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                    borderWidth: '1px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2d5f3f',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root': {
                  display: 'none',
                },
              }}
            >
              <Select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                displayEmpty
              >
                <MenuItem value="admin">Super Admin</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                    borderWidth: '1px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2d5f3f',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root': {
                  display: 'none',
                },
              }}
              required
            />

            <TextField
              fullWidth
              placeholder="Password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              sx={{ 
                mb: 2.5,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                    borderWidth: '1px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2d5f3f',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root': {
                  display: 'none',
                },
              }}
              required
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#df2013ff',
                color: '#ffffff',
                py: 1.25,
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                borderRadius: '6px',
                boxShadow: 'none',
                transition: 'all 0.2s ease',
                '&:hover': { 
                  backgroundColor: '#bc1c1cff',
                  boxShadow: '0 4px 12px rgba(193, 105, 79, 0.3)',
                },
              }}
            >
              ENTER PORTAL
            </Button>
          </form>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem', fontWeight: 500 }}>
              Authorized Personnel Access Only
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
