import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { useUser } from '../context/UserContext';
import { userAPI, authAPI } from '../services/api';
import {
  Box, Typography, Card, CardContent, Grid, Button, TextField,
  Avatar, Divider, Alert, IconButton, CircularProgress, Snackbar,
} from '@mui/material';
import {
  Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon, PhotoCamera as PhotoIcon,
} from '@mui/icons-material';

function Profile() {
  const { userContext } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [profileData, setProfileData] = useState({
    name: '', email: '', role: '', department: '', phone: '', joinDate: '',
    assignedBatches: '', specialization: '', enrollmentId: '', batch: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '', newPassword: '', confirmPassword: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getProfile();
        const u = res.user;
        setProfileData({
          name: u.name || '',
          email: u.email || '',
          role: u.role === 'admin' ? 'Super Administrator' : u.role === 'teacher' ? 'Instructor' : 'Trainee',
          department: userContext.userType === 'student' ? (userContext.assignedBatch || '') : 'Administration',
          phone: u.phone || '',
          joinDate: new Date(u.joinDate || u.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
          assignedBatches: userContext.assignedBatches?.join(', ') || '',
          specialization: '',
          enrollmentId: '',
          batch: userContext.assignedBatch || '',
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      await userAPI.updateProfile({ name: profileData.name, phone: profileData.phone });
      setEditMode(false);
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally { setSaving(false); }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({ open: true, message: 'New passwords do not match!', severity: 'error' }); return;
    }
    if (passwordData.newPassword.length < 8) {
      setSnackbar({ open: true, message: 'Password must be at least 8 characters!', severity: 'error' }); return;
    }
    try {
      setSaving(true);
      await authAPI.changePassword({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordMode(false);
      setSnackbar({ open: true, message: 'Password changed! Please login again.', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally { setSaving(false); }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress sx={{ color: '#c62020ff' }} /></Box>;
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader title="My Profile & Settings (मेरी प्रोफ़ाइल और सेटिंग्स)" />

      <Snackbar open={snackbar.open} autoHideDuration={4000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Grid container spacing={3}>
        {/* Profile Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#1f2937' }}>Profile Information</Typography>
                {!editMode ? (
                  <Button startIcon={<EditIcon />} onClick={() => setEditMode(true)} sx={{ color: '#FF6B00' }}>
                    Edit Profile
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button startIcon={saving ? null : <SaveIcon />} variant="contained" onClick={handleSaveProfile} disabled={saving}
                      sx={{ backgroundColor: '#3B5323', '&:hover': { backgroundColor: '#2d4a1e' } }}>
                      {saving ? <CircularProgress size={20} color="inherit" /> : 'Save'}
                    </Button>
                    <Button startIcon={<CancelIcon />} onClick={() => setEditMode(false)} sx={{ color: '#6b7280' }}>
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField label="Full Name" fullWidth value={profileData.name} disabled={!editMode}
                    onChange={(e) => setProfileData(p => ({ ...p, name: e.target.value }))} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email Address" fullWidth value={profileData.email} disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Phone Number" fullWidth value={profileData.phone} disabled={!editMode}
                    onChange={(e) => setProfileData(p => ({ ...p, phone: e.target.value }))} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Role" fullWidth value={profileData.role} disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label={userContext.userType === 'student' ? 'Batch' : 'Department'}
                    fullWidth value={profileData.department} disabled />
                </Grid>
                {userContext.userType === 'teacher' && profileData.assignedBatches && (
                  <Grid item xs={12}>
                    <TextField label="Assigned Batches" fullWidth value={profileData.assignedBatches} disabled />
                  </Grid>
                )}
                {userContext.userType === 'student' && profileData.enrollmentId && (
                  <Grid item xs={12}>
                    <TextField label="Enrollment ID" fullWidth value={profileData.enrollmentId} disabled />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField label={userContext.userType === 'student' ? 'Enrollment Date' : 'Join Date'}
                    fullWidth value={profileData.joinDate} disabled />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#1f2937' }}>Change Password</Typography>
                {!passwordMode && (
                  <Button onClick={() => setPasswordMode(true)} sx={{ color: '#c62020ff' }}>
                    Change Password
                  </Button>
                )}
              </Box>

              {passwordMode ? (
                <Box>
                  <Grid container spacing={2}>
                    {[
                      ['currentPassword', 'Current Password'],
                      ['newPassword', 'New Password'],
                      ['confirmPassword', 'Confirm New Password'],
                    ].map(([field, label]) => (
                      <Grid item xs={12} key={field}>
                        <TextField label={label} type="password" fullWidth value={passwordData[field]}
                          onChange={(e) => setPasswordData(p => ({ ...p, [field]: e.target.value }))}
                          helperText={field === 'newPassword' ? 'Minimum 8 characters' : ''} />
                      </Grid>
                    ))}
                  </Grid>
                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button variant="contained" onClick={handleChangePassword} disabled={saving}
                      sx={{ backgroundColor: '#c62020ff', '&:hover': { backgroundColor: '#a01818' } }}>
                      {saving ? <CircularProgress size={20} color="inherit" /> : 'Update Password'}
                    </Button>
                    <Button onClick={() => { setPasswordMode(false); setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); }}
                      sx={{ color: '#6b7280' }}>
                      Cancel
                    </Button>
                  </Box>
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    You will be logged out after changing your password.
                  </Alert>
                </Box>
              ) : (
                <Typography sx={{ color: '#6b7280' }}>Click "Change Password" to update your password</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar sx={{ width: 120, height: 120, backgroundColor: '#c62020ff', fontSize: '3rem', margin: '0 auto' }}>
                  {profileData.name.charAt(0)}
                </Avatar>
                <IconButton sx={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FF6B00',
                  color: '#ffffff', width: 36, height: 36, '&:hover': { backgroundColor: '#e65c00' } }}>
                  <PhotoIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
              <Typography variant="h6" sx={{ color: '#1f2937', mb: 1 }}>{profileData.name}</Typography>
              <Typography variant="body2" sx={{ color: '#FF6B00', mb: 3 }}>{profileData.role}</Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ textAlign: 'left', mt: 2 }}>
                {[
                  ['Email', profileData.email],
                  ['Phone', profileData.phone || 'Not set'],
                  [userContext.userType === 'student' ? 'Batch' : 'Department', profileData.department],
                  [userContext.userType === 'student' ? 'Enrolled Since' : 'Member Since', profileData.joinDate],
                ].map(([label, value]) => (
                  <Box key={label} sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>{label}</Typography>
                    <Typography variant="body2" sx={{ color: '#1f2937' }}>{value}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
