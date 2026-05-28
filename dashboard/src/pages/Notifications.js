import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import PageHeader from '../components/PageHeader';
import { notificationAPI } from '../services/api';
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
  CircularProgress,
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
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [newNotification, setNewNotification] = useState({
    title: '', message: '', type: 'Info', targetRole: 'all', scheduled: false,
  });

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationAPI.getAll();
      setNotifications(res.data.map(n => ({
        id: n._id,
        title: n.title,
        message: n.message,
        type: n.type?.toLowerCase(),
        audience: n.targetRole,
        time: new Date(n.createdAt).toLocaleDateString(),
        status: 'sent',
        recipients: n.readBy?.length || 0,
        isRead: n.readBy?.includes(userContext.userId),
      })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotifications(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredNotifications = notifications.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || n.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleOpenCreate = () => {
    setDialogMode('create');
    setNewNotification({ title: '', message: '', type: 'Info', targetRole: 'all', scheduled: false });
    setError(''); setOpenDialog(true);
  };

  const handleOpenEdit = (notification) => {
    setDialogMode('edit');
    setEditingId(notification.id);
    setNewNotification({ title: notification.title, message: notification.message,
      type: notification.type, targetRole: notification.audience, scheduled: false });
    setError(''); setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (userContext.userType === 'admin') {
        await notificationAPI.remove(notificationToDelete.id);
      } else {
        // Teachers and students dismiss (hide from their list only)
        await notificationAPI.dismiss(notificationToDelete.id);
      }
      await fetchNotifications();
      setDeleteDialog(false); setNotificationToDelete(null);
    } catch (err) { setError(err.message); }
  };

  const handleMarkRead = async (id) => {
    try {
      await notificationAPI.markRead(id);
      await fetchNotifications();
    } catch (err) { console.error(err); }
  };

  const handleCreateNotification = async () => {
    try {
      setSaving(true); setError('');
      if (dialogMode === 'edit' && editingId) {
        await notificationAPI.update(editingId, newNotification);
      } else {
        await notificationAPI.create(newNotification);
      }
      await fetchNotifications();
      setOpenDialog(false);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    pending: notifications.filter(n => n.status === 'pending').length,
    unread: notifications.filter(n => !n.isRead).length,
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader
        title="Notifications & Alerts (सूचनाएं और अलर्ट)"
        buttonText="Create Notification (सूचना बनाएं)"
        buttonIcon={<AddIcon />}
        onButtonClick={handleOpenCreate}
        showButton={userContext.userType === 'admin'}
      />

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
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
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#c62020ff', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#c62020ff', fontWeight: 'bold' }}>
                    {stats.unread}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Unread
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {userContext.userType === 'admin' && (
          <>
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
            <Grid item xs={12} sm={6} md={3}>
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
          </>
        )}
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
                <MenuItem value="general">General</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography variant="h6" sx={{ color: '#1f2937', mb: 3 }}>
            Recent Notifications ({filteredNotifications.length})
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress sx={{ color: '#c62020ff' }} /></Box>
          ) : (
          <Box>
            {filteredNotifications.length === 0 ? (
              <Typography sx={{ color: '#6b7280', textAlign: 'center', py: 4 }}>No notifications found</Typography>
            ) : filteredNotifications.map((notification) => (
              <Card 
                key={notification.id}
                onClick={() => !notification.isRead && handleMarkRead(notification.id)}
                sx={{ 
                  mb: 2,
                  backgroundColor: '#1d1dabff',
                  border: 'none',
                  borderLeft: notification.isRead ? '4px solid #344675' : '4px solid #FF8C00',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  cursor: !notification.isRead ? 'pointer' : 'default',
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
                          {userContext.userType === 'admin' && (
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
                            onClick={() => { setNotificationToDelete(notification); setDeleteDialog(true); }}
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
                        {notification.audience} • {notification.recipients} read • {notification.time}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          )}
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
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
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
                  <MenuItem value="Info">Info</MenuItem>
                  <MenuItem value="Warning">Warning</MenuItem>
                  <MenuItem value="General">General</MenuItem>
                  <MenuItem value="Urgent">Urgent</MenuItem>
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
                  value={newNotification.targetRole}
                  onChange={(e) => setNewNotification({ ...newNotification, targetRole: e.target.value })}
                  label="Audience"
                >
                  <MenuItem value="all">All Users</MenuItem>
                  <MenuItem value="student">Students</MenuItem>
                  <MenuItem value="teacher">Teachers</MenuItem>
                  <MenuItem value="admin">Admins</MenuItem>
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
            disabled={!newNotification.title || !newNotification.message || saving}
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
          {saving ? <CircularProgress size={22} color="inherit" /> : (dialogMode === 'create' ? 'Send Notification (सूचना भेजें)' : 'Update Notification (सूचना अपडेट करें)')}
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
        <DialogTitle sx={{ color: '#ffffff', mb: 2 }}>
          {userContext.userType === 'admin' ? 'Confirm Delete' : 'Dismiss Notification'}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#e5e7eb' }}>
            {userContext.userType === 'admin'
              ? <>Are you sure you want to delete <strong>"{notificationToDelete?.title}"</strong>? This will remove it for all users.</>
              : <>Remove <strong>"{notificationToDelete?.title}"</strong> from your list? It will only be hidden for you.</>
            }
          </Typography>
          {userContext.userType === 'admin' && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              This action cannot be undone. All recipients will no longer see this notification.
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#1d1dabff', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button onClick={() => setDeleteDialog(false)} sx={{ color: '#e5e7eb', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
            Cancel (रद्द करें)
          </Button>
          <Button variant="contained" onClick={handleDeleteConfirm}
            sx={{ backgroundColor: '#c62020ff', color: '#ffffff', '&:hover': { backgroundColor: '#a01818' } }}>
            {userContext.userType === 'admin' ? 'Delete Notification (सूचना हटाएं)' : 'Dismiss'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Notifications;

