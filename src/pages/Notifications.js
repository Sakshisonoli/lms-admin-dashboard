import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Send as SendIcon,
} from '@mui/icons-material';

function Notifications() {
  const [openDialog, setOpenDialog] = useState(false);
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
      message: 'Advanced Mathematics course is now available for enrollment.',
      type: 'info',
      audience: 'Students',
      time: '5 hours ago',
      status: 'sent',
      recipients: 1234,
    },
    {
      id: 3,
      title: 'Assignment Deadline Reminder',
      message: 'Physics assignment deadline is approaching. Submit by Friday.',
      type: 'warning',
      audience: 'Batch A',
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

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return <WarningIcon sx={{ color: '#ff8a00' }} />;
      case 'error':
        return <ErrorIcon sx={{ color: '#fd5d93' }} />;
      case 'success':
        return <CheckCircleIcon sx={{ color: '#00d4aa' }} />;
      case 'info':
      default:
        return <InfoIcon sx={{ color: '#1d8cf8' }} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning':
        return '#ff8a00';
      case 'error':
        return '#fd5d93';
      case 'success':
        return '#00d4aa';
      case 'info':
      default:
        return '#1d8cf8';
    }
  };

  const handleCreateNotification = () => {
    console.log('Creating notification:', newNotification);
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
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    pending: notifications.filter(n => n.status === 'pending').length,
    totalRecipients: notifications.reduce((sum, n) => sum + n.recipients, 0),
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
          Notifications & Alerts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            backgroundColor: '#e14eca',
            '&:hover': { backgroundColor: '#c73aa8' },
          }}
        >
          Create Notification
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#1d8cf8', fontWeight: 'bold' }}>
                {stats.total}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Total Notifications
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#00d4aa', fontWeight: 'bold' }}>
                {stats.sent}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Sent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#ff8a00', fontWeight: 'bold' }}>
                {stats.pending}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#e14eca', fontWeight: 'bold' }}>
                {stats.totalRecipients.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Total Recipients
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Notifications List */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
            Recent Notifications
          </Typography>
          <List>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    borderRadius: '8px',
                    mb: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.02)',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: 'transparent' }}>
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                          {notification.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={notification.type}
                            size="small"
                            sx={{
                              backgroundColor: getNotificationColor(notification.type),
                              color: '#ffffff',
                              textTransform: 'capitalize',
                            }}
                          />
                          <IconButton size="small" sx={{ color: '#1d8cf8' }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small" sx={{ color: '#fd5d93' }}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ color: '#9a9a9a', mb: 1 }}>
                          {notification.message}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ color: '#9a9a9a' }}>
                            Sent to {notification.audience} • {notification.recipients} recipients • {notification.time}
                          </Typography>
                          <Chip
                            label={notification.status}
                            size="small"
                            color={notification.status === 'sent' ? 'success' : 'warning'}
                          />
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider sx={{ borderColor: '#344675' }} />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Create Notification Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: '#27293d', color: '#ffffff' },
        }}
      >
        <DialogTitle>Create New Notification</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notification Title"
                value={newNotification.title}
                onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
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
              <FormControl fullWidth>
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
                  />
                }
                label="Schedule for later"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#9a9a9a' }}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateNotification}
            variant="contained"
            startIcon={<SendIcon />}
            sx={{
              backgroundColor: '#e14eca',
              '&:hover': { backgroundColor: '#c73aa8' },
            }}
          >
            Send Notification
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Notifications;