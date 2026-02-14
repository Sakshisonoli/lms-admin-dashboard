import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Avatar,
  Divider,
  Alert,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoIcon,
} from '@mui/icons-material';

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'Super Admin',
    email: 'admin@army.gov.in',
    role: 'Super Administrator',
    department: 'Administration',
    phone: '+91 98765 43210',
    joinDate: 'January 15, 2024',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    alert('Profile updated successfully!');
    setEditMode(false);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    console.log('Changing password');
    alert('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordMode(false);
  };

  return (
    <Box>
      <Box sx={{ mb: 2, pb: 2, borderBottom: '2px solid #FF8C00' }}>
        <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold' }}>
          My Profile & Settings (मेरी प्रोफ़ाइल और सेटिंग्स)
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#1f2937' }}>
                  Profile Information
                </Typography>
                {!editMode ? (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => setEditMode(true)}
                    sx={{ color: '#FF6B00' }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      startIcon={<SaveIcon />}
                      variant="contained"
                      onClick={handleSaveProfile}
                      sx={{
                        backgroundColor: '#3B5323',
                        '&:hover': { backgroundColor: '#00a085' },
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      startIcon={<CancelIcon />}
                      onClick={() => setEditMode(false)}
                      sx={{ color: '#6b7280' }}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    fullWidth
                    value={profileData.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Address"
                    fullWidth
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    fullWidth
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Role"
                    fullWidth
                    value={profileData.role}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Department"
                    fullWidth
                    value={profileData.department}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Join Date"
                    fullWidth
                    value={profileData.joinDate}
                    disabled
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Change Password Section */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#1f2937' }}>
                  Change Password
                </Typography>
                {!passwordMode && (
                  <Button
                    onClick={() => setPasswordMode(true)}
                    sx={{ color: '#c62020ff' }}
                  >
                    Change Password
                  </Button>
                )}
              </Box>

              {passwordMode ? (
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Current Password"
                        type="password"
                        fullWidth
                        value={passwordData.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        value={passwordData.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        helperText="Minimum 8 characters"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button
                      variant="contained"
                      onClick={handleChangePassword}
                      sx={{
                        backgroundColor: '#c62020ff',
                        '&:hover': { backgroundColor: '#a01818' },
                      }}
                    >
                      Update Password
                    </Button>
                    <Button
                      onClick={() => {
                        setPasswordMode(false);
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: '',
                        });
                      }}
                      sx={{ color: '#6b7280' }}
                    >
                      Cancel
                    </Button>
                  </Box>
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    You will be logged out after changing your password. Please login again with your new password.
                  </Alert>
                </Box>
              ) : (
                <Typography sx={{ color: '#6b7280' }}>
                  Click "Change Password" to update your password
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Picture & Quick Info */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    backgroundColor: '#c62020ff',
                    fontSize: '3rem',
                    margin: '0 auto',
                  }}
                >
                  {profileData.name.charAt(0)}
                </Avatar>
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#FF6B00',
                    color: '#1f2937',
                    '&:hover': { backgroundColor: '#1565c0' },
                    width: 36,
                    height: 36,
                  }}
                >
                  <PhotoIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
              <Typography variant="h6" sx={{ color: '#1f2937', mb: 1 }}>
                {profileData.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#FF6B00', mb: 3 }}>
                {profileData.role}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ textAlign: 'left', mt: 2 }}>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                  Email
                </Typography>
                <Typography variant="body2" sx={{ color: '#1f2937', mb: 2 }}>
                  {profileData.email}
                </Typography>
                
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                  Phone
                </Typography>
                <Typography variant="body2" sx={{ color: '#1f2937', mb: 2 }}>
                  {profileData.phone}
                </Typography>
                
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                  Department
                </Typography>
                <Typography variant="body2" sx={{ color: '#1f2937', mb: 2 }}>
                  {profileData.department}
                </Typography>
                
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                  Member Since
                </Typography>
                <Typography variant="body2" sx={{ color: '#1f2937' }}>
                  {profileData.joinDate}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;

