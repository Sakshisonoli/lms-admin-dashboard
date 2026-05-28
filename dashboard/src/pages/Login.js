import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { authAPI } from '../services/api';
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
  Alert,
  CircularProgress,
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authAPI.login(credentials.username, credentials.password, userType);
      const { token, user } = res;

      // Store token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', user._id);

      // Update user context with real data
      updateUserContext({
        userType,
        userId: user._id,
        name: user.name,
        email: user.email,
        assignedBatch: user.assignedBatch || null,
        assignedBatches: user.assignedBatches || [],
      });

      if (userType === 'admin') navigate('/admin/dashboard');
      else if (userType === 'teacher') navigate('/teacher/dashboard');
      else navigate('/student/dashboard');

    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
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
            alt="The Junior Leaders Wing (JLW) Logo"
            sx={{
              width: '80px',
              height: '80px',
              flexShrink: 0,
              filter: 'drop-shadow(0 0 2px #000000) drop-shadow(0 0 2px #000000) drop-shadow(0 0 3px #000000)',
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
              THE JUNIOR LEADERS WING (JLW)
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
            Welcome to The Junior Leaders Wing (JLW) Learning Management System. Please select your role and enter credentials to access the portal.
          </Typography>

          <Box sx={{ textAlign: 'center', mb: 2 }}>
            {getRoleIcon()}
          </Box>

          <form onSubmit={handleLogin}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
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
              disabled={loading}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'ENTER PORTAL'}
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
