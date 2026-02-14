import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Avatar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Send as SendIcon,
  Notifications as NotificationsIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

function Notifications() {
  const { userContext } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    audience: 'all',
    scheduled: false,
  });

  const notifications = [
    {
      id: 1,
      title: 'System Maintenance Scheduled',
      message: 'The system will be under maintenance on Sunday from 2 AM to 6 AM.',
      type: 'warning',
      audience: 'All Users',
      time: '2 hours ago',
      status: 'sent',
      recipients: 2847,
    },
    {
      id: 2,
      title: 'New Course Available',
      message: 'Advanced Tactical Operations course is now available for enrollment.',
      type: 'info',
      audience: 'Students',
      time: '5 hours ago',
      status: 'sent',
      recipients: 1234,
    },
    {
      id: 3,
      title: 'Training Deadline Reminder',
      message: 'Combat training assessment deadline is approaching. Submit by Friday.',
      type: 'warning',
      audience: 'Commando',
      time: '1 day ago',
      status: 'sent',
      recipients: 45,
    },
    {
      id: 4,
      title: 'Welcome New Students',
      message: 'Welcome to KLP LMS! Complete your profile to get started.',
      type: 'success',
      audience: 'New Students',
      time: '2 days ago',
      status: 'sent',
      recipients: 23,
    },
    {
      id: 5,
      title: 'Server Error Alert',
      message: 'Critical server error detected. Technical team has been notified.',
      type: 'error',
      audience: 'Admin Team',
      time: '3 days ago',
      status: 'sent',
      recipients: 5,
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.audience.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleOpenCreate = () => {
    setDialogMode('create');
    setNewNotification({
      title: '',
      message: '',
      type: 'info',
      audience: 'all',
      scheduled: false,
    });
    setOpenDialog(true);
  };

  const handleOpenEdit = (notification) => {
    setDialogMode('edit');
    setNewNotification({
      title: notification.title,
      message: notification.message,
      type: notification.type,
      audience: notification.audience,
      scheduled: false,
    });
    setOpenDialog(true);
  };

  const handleDeleteClick = (notification) => {
    setNotificationToDelete(notification);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting notification:', notificationToDelete);
    alert(`Notification "${notificationToDelete.title}" deleted successfully!`);
    setDeleteDialog(false);
    setNotificationToDelete(null);
  };

  const handleCreateNotification = () => {
    console.log(dialogMode === 'create' ? 'Creating notification:' : 'Updating notification:', newNotification);
    alert(`Notification ${dialogMode === 'create' ? 'created' : 'updated'} successfully!`);
    setOpenDialog(false);
    setNewNotification({
      title: '',
      message: '',
      type: 'info',
      audience: 'all',
      scheduled: false,
    });
  };

  const stats = {
    total: filteredNotifications.length,
    sent: filteredNotifications.filter(n => n.status === 'sent').length,
    pending: filteredNotifications.filter(n => n.status === 'pending').length,
    totalRecipients: filteredNotifications.reduce((sum, n) => sum + n.recipients, 0),
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: '2px solid #FF8C00' }}>
        <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold' }}>
          Notifications & Alerts (सूचनाएं और अलर्ट)
        </Typography>
        {userContext.userType !== 'student' && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
            sx={{
              backgroundColor: '#c62020ff',
              color: '#ffffff',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              py: 1,
              '&:hover': { 
                backgroundColor: '#a01818',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              },
            }}
          >
            Create Notification (सूचना बनाएं)
          </Button>
        )}
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={userContext.userType === 'student' ? 4 : 3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#0b1f3a', mr: 2 }}>
                  <NotificationsIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#0b1f3a', fontWeight: 'bold' }}>
                    {stats.total}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Total Notifications
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {userContext.userType !== 'student' && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ backgroundColor: '#3B5323', mr: 2 }}>
                    <SendIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ color: '#3B5323', fontWeight: 'bold' }}>
                      {stats.sent}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      Sent
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={userContext.userType === 'student' ? 4 : 3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#FF8C00', mr: 2 }}>
                  <ScheduleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF8C00', fontWeight: 'bold' }}>
                    {stats.pending}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Pending
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={userContext.userType === 'student' ? 4 : 3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#c62020ff', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#c62020ff', fontWeight: 'bold' }}>
                    {stats.totalRecipients.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Total Recipients
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Notifications List */}
      <Card>
        <CardContent>
          {/* Search and Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 300, flexGrow: 1 }}
            />
            
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Type"
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="info">Info</MenuItem>
                <MenuItem value="warning">Warning</MenuItem>
                <MenuItem value="success">Success</MenuItem>
                <MenuItem value="error">Error</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography variant="h6" sx={{ color: '#1f2937', mb: 3 }}>
            Recent Notifications ({filteredNotifications.length})
          </Typography>
          <Box>
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id}
                sx={{ 
                  mb: 2,
                  backgroundColor: '#1d1dabff',
                  border: 'none',
                  borderLeft: `4px solid #FF8C00`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Content */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600, pr: 2 }}>
                          {notification.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexShrink: 0 }}>
                          {userContext.userType !== 'student' && (
                            <IconButton 
                              size="small" 
                              onClick={() => handleOpenEdit(notification)}
                              sx={{ 
                                color: '#9ca3af',
                                '&:hover': { color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.1)' },
                                width: 28,
                                height: 28,
                              }}
                            >
                              <EditIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                          )}
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteClick(notification)}
                            sx={{ 
                              color: '#9ca3af',
                              '&:hover': { color: '#c62020ff', backgroundColor: 'rgba(255,255,255,0.1)' },
                              width: 28,
                              height: 28,
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" sx={{ color: '#e5e7eb', mb: 1.5, lineHeight: 1.6 }}>
                        {notification.message}
                      </Typography>
                      
                      <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                        {notification.audience} • {notification.recipients} recipients • {notification.time}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Create/Edit Notification Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: '#1d1dabff', color: '#ffffff' },
        }}
      >
        <DialogTitle sx={{ color: '#ffffff' }}>
          {dialogMode === 'create' ? 'Create New Notification' : 'Edit Notification'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notification Title"
                value={newNotification.title}
                onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#ffffff' },
                  '& .MuiInputLabel-root': { color: '#9ca3af' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Message"
                value={newNotification.message}
                onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#ffffff' },
                  '& .MuiInputLabel-root': { color: '#9ca3af' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{
                '& .MuiOutlinedInput-root': { color: '#ffffff' },
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' },
                '& .MuiSvgIcon-root': { color: '#9ca3af' }
              }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newNotification.type}
                  onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
                  label="Type"
                >
                  <MenuItem value="info">Info</MenuItem>
                  <MenuItem value="warning">Warning</MenuItem>
                  <MenuItem value="success">Success</MenuItem>
                  <MenuItem value="error">Error</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{
                '& .MuiOutlinedInput-root': { color: '#ffffff' },
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' },
                '& .MuiSvgIcon-root': { color: '#9ca3af' }
              }}>
                <InputLabel>Audience</InputLabel>
                <Select
                  value={newNotification.audience}
                  onChange={(e) => setNewNotification({ ...newNotification, audience: e.target.value })}
                  label="Audience"
                >
                  <MenuItem value="all">All Users</MenuItem>
                  <MenuItem value="students">Students</MenuItem>
                  <MenuItem value="teachers">Teachers</MenuItem>
                  <MenuItem value="staff">Office Staff</MenuItem>
                  <MenuItem value="admins">Admins</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newNotification.scheduled}
                    onChange={(e) => setNewNotification({ ...newNotification, scheduled: e.target.checked })}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#c62020ff',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#c62020ff',
                      },
                    }}
                  />
                }
                label="Schedule for later"
                sx={{ 
                  color: '#ffffff',
                  '& .MuiFormControlLabel-label': { color: '#ffffff' }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#1d1dabff', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button 
            onClick={() => setOpenDialog(false)} 
            sx={{ 
              color: '#e5e7eb',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Cancel (रद्द करें)
          </Button>
          <Button
            onClick={handleCreateNotification}
            variant="contained"
            startIcon={<SendIcon />}
            disabled={!newNotification.title || !newNotification.message || !newNotification.type || !newNotification.audience}
            sx={{
              backgroundColor: '#c62020ff',
              color: '#ffffff',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              py: 1,
              '&:hover': { 
                backgroundColor: '#a01818',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              },
              '&:disabled': { backgroundColor: '#6b7280', color: '#9ca3af' },
            }}
          >
            {dialogMode === 'create' ? 'Send Notification (सूचना भेजें)' : 'Update Notification (सूचना अपडेट करें)'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        PaperProps={{
          sx: { backgroundColor: '#1d1dabff', color: '#ffffff' },
        }}
      >
        <DialogTitle sx={{ color: '#ffffff', mb: 2 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#e5e7eb' }}>
            Are you sure you want to delete notification <strong>"{notificationToDelete?.title}"</strong>?
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            This action cannot be undone. All recipients will no longer see this notification.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#1d1dabff', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button 
            onClick={() => setDeleteDialog(false)} 
            sx={{ 
              color: '#e5e7eb',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Cancel (रद्द करें)
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            sx={{
              backgroundColor: '#c62020ff',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#a01818' },
            }}
          >
            Delete Notification (सूचना हटाएं)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Notifications;

