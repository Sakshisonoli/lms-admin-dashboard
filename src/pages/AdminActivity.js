import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Article as ArticleIcon,
  Message as MessageIcon,
} from '@mui/icons-material';

function AdminActivity() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');

  const activities = [
    {
      id: 1,
      user: 'Admin User',
      action: 'Created',
      target: 'New Batch: Commando Training Program',
      category: 'Batch Management',
      timestamp: '2024-01-28 10:30 AM',
      status: 'Success',
      details: 'Created new batch with 45 students',
    },
    {
      id: 2,
      user: 'Admin User',
      action: 'Updated',
      target: 'User Profile: Col. Rajesh Kumar',
      category: 'User Management',
      timestamp: '2024-01-28 09:15 AM',
      status: 'Success',
      details: 'Updated teacher profile information',
    },
    {
      id: 3,
      user: 'Admin User',
      action: 'Deleted',
      target: 'Content: Old Training Manual',
      category: 'Content Management',
      timestamp: '2024-01-28 08:45 AM',
      status: 'Success',
      details: 'Removed outdated content from system',
    },
    {
      id: 4,
      user: 'Alice Coordinator',
      action: 'Sent',
      target: 'Notification: System Maintenance',
      category: 'Communication',
      timestamp: '2024-01-27 04:20 PM',
      status: 'Success',
      details: 'Sent maintenance notification to all users',
    },
    {
      id: 5,
      user: 'Bob Admin',
      action: 'Failed Login',
      target: 'Admin Panel Access',
      category: 'Security',
      timestamp: '2024-01-27 02:10 PM',
      status: 'Failed',
      details: 'Multiple failed login attempts detected',
    },
    {
      id: 6,
      user: 'Carol Manager',
      action: 'Exported',
      target: 'Student Data Report',
      category: 'Reports',
      timestamp: '2024-01-27 01:30 PM',
      status: 'Success',
      details: 'Generated and exported student performance report',
    },
    {
      id: 7,
      user: 'David Admin',
      action: 'Modified',
      target: 'System Settings',
      category: 'Configuration',
      timestamp: '2024-01-27 11:45 AM',
      status: 'Success',
      details: 'Updated notification preferences',
    },
    {
      id: 8,
      user: 'Emma Coordinator',
      action: 'Created',
      target: 'New User: Student Account',
      category: 'User Management',
      timestamp: '2024-01-27 10:20 AM',
      status: 'Success',
      details: 'Created new student account for batch enrollment',
    },
  ];

  const getActionIcon = (action) => {
    switch (action.toLowerCase()) {
      case 'created':
        return <AddIcon sx={{ fontSize: 16, color: '#3B5323' }} />;
      case 'updated':
      case 'modified':
        return <EditIcon sx={{ fontSize: 16, color: '#FF6B00' }} />;
      case 'deleted':
        return <DeleteIcon sx={{ fontSize: 16, color: '#fd5d93' }} />;
      case 'sent':
        return <MessageIcon sx={{ fontSize: 16, color: '#c62020ff' }} />;
      case 'exported':
        return <DownloadIcon sx={{ fontSize: 16, color: '#FF8C00' }} />;
      default:
        return <ViewIcon sx={{ fontSize: 16, color: '#6b7280' }} />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'user management':
        return <PersonIcon sx={{ fontSize: 16 }} />;
      case 'batch management':
        return <SchoolIcon sx={{ fontSize: 16 }} />;
      case 'content management':
        return <ArticleIcon sx={{ fontSize: 16 }} />;
      case 'communication':
        return <MessageIcon sx={{ fontSize: 16 }} />;
      default:
        return <ViewIcon sx={{ fontSize: 16 }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'success';
      case 'failed':
      case 'error':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const stats = {
    totalActivities: activities.length,
    successfulActions: activities.filter(a => a.status === 'Success').length,
    failedActions: activities.filter(a => a.status === 'Failed').length,
    uniqueUsers: [...new Set(activities.map(a => a.user))].length,
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader
        title="Admin Activity Log (व्यवस्थापक गतिविधि लॉग)"
      />

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#FF6B00', fontWeight: 'bold' }}>
                {stats.totalActivities}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Total Activities
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#3B5323', fontWeight: 'bold' }}>
                {stats.successfulActions}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Successful Actions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#fd5d93', fontWeight: 'bold' }}>
                {stats.failedActions}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Failed Actions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#c62020ff', fontWeight: 'bold' }}>
                {stats.uniqueUsers}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Active Admins
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />
            
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: '#6b7280' }}>Action</InputLabel>
              <Select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                label="Action"
              >
                <MenuItem value="all">All Actions</MenuItem>
                <MenuItem value="created">Created</MenuItem>
                <MenuItem value="updated">Updated</MenuItem>
                <MenuItem value="deleted">Deleted</MenuItem>
                <MenuItem value="sent">Sent</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: '#6b7280' }}>User</InputLabel>
              <Select
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                label="User"
              >
                <MenuItem value="all">All Users</MenuItem>
                <MenuItem value="admin">Admins</MenuItem>
                <MenuItem value="manager">Managers</MenuItem>
                <MenuItem value="coordinator">Coordinators</MenuItem>
              </Select>
            </FormControl>

            <Tooltip title="Export Activity Log">
              <IconButton sx={{ color: '#c62020ff' }}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Activity Table */}
          <TableContainer component={Paper} sx={{ backgroundColor: '#1d1dabff', overflowX: 'auto' }}>
            <Table sx={{ minWidth: { xs: 650, sm: 'auto' } }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>User</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Action</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Target</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Timestamp</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, backgroundColor: '#c62020ff' }}>
                          {activity.user.charAt(0)}
                        </Avatar>
                        <Typography sx={{ color: '#1f2937' }}>{activity.user}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getActionIcon(activity.action)}
                        <Typography sx={{ color: '#6b7280' }}>{activity.action}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#6b7280', maxWidth: 200 }}>
                      <Typography
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {activity.target}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getCategoryIcon(activity.category)}
                        <Typography sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                          {activity.category}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{activity.timestamp}</TableCell>
                    <TableCell>
                      <Chip
                        label={activity.status}
                        color={getStatusColor(activity.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton size="small" sx={{ color: '#FF6B00' }}>
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminActivity;


