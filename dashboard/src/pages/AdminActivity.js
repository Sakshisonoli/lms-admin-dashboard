import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { activityAPI } from '../services/api';
import {
  Box, Typography, Card, CardContent, Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip, Avatar, TextField,
  InputAdornment, FormControl, InputLabel, Select, MenuItem, IconButton,
  Tooltip, CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon, Download as DownloadIcon, Visibility as ViewIcon,
  Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon,
  Person as PersonIcon, School as SchoolIcon, Article as ArticleIcon,
  Message as MessageIcon,
} from '@mui/icons-material';

function AdminActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const params = filterAction !== 'all' ? `?action=${filterAction}` : '';
      const res = await activityAPI.getAll(params);
      setActivities(res.data.map(a => ({
        id: a._id,
        user: a.user?.name || 'Unknown',
        action: a.action,
        target: a.target,
        category: a.category,
        timestamp: new Date(a.createdAt).toLocaleString(),
        status: a.status,
        details: a.details,
      })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchActivities(); }, [filterAction]); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredActivities = activities.filter(a =>
    a.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: activities.length,
    success: activities.filter(a => a.status === 'Success').length,
    failed: activities.filter(a => a.status === 'Failed').length,
    users: [...new Set(activities.map(a => a.user))].length,
  };

  const getActionIcon = (action) => {
    switch (action?.toLowerCase()) {
      case 'created': return <AddIcon sx={{ fontSize: 16, color: '#3B5323' }} />;
      case 'updated': case 'modified': return <EditIcon sx={{ fontSize: 16, color: '#FF6B00' }} />;
      case 'deleted': return <DeleteIcon sx={{ fontSize: 16, color: '#fd5d93' }} />;
      case 'sent': return <MessageIcon sx={{ fontSize: 16, color: '#c62020ff' }} />;
      case 'exported': return <DownloadIcon sx={{ fontSize: 16, color: '#FF8C00' }} />;
      default: return <ViewIcon sx={{ fontSize: 16, color: '#6b7280' }} />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'user management': return <PersonIcon sx={{ fontSize: 16 }} />;
      case 'batch management': return <SchoolIcon sx={{ fontSize: 16 }} />;
      case 'content management': return <ArticleIcon sx={{ fontSize: 16 }} />;
      case 'communication': return <MessageIcon sx={{ fontSize: 16 }} />;
      default: return <ViewIcon sx={{ fontSize: 16 }} />;
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader title="Admin Activity Log (व्यवस्थापक गतिविधि लॉग)" />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Activities', value: stats.total, color: '#FF6B00' },
          { label: 'Successful', value: stats.success, color: '#3B5323' },
          { label: 'Failed', value: stats.failed, color: '#fd5d93' },
          { label: 'Active Admins', value: stats.users, color: '#c62020ff' },
        ].map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card><CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: stat.color, fontWeight: 'bold' }}>{stat.value}</Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>{stat.label}</Typography>
            </CardContent></Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#6b7280' }} /></InputAdornment> }}
              sx={{ minWidth: 250, flexGrow: 1 }}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Action</InputLabel>
              <Select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} label="Action">
                <MenuItem value="all">All Actions</MenuItem>
                <MenuItem value="Created">Created</MenuItem>
                <MenuItem value="Updated">Updated</MenuItem>
                <MenuItem value="Deleted">Deleted</MenuItem>
                <MenuItem value="Login">Login</MenuItem>
                <MenuItem value="Failed Login">Failed Login</MenuItem>
              </Select>
            </FormControl>
            <Tooltip title="Refresh">
              <IconButton onClick={fetchActivities} sx={{ color: '#c62020ff' }}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress sx={{ color: '#c62020ff' }} />
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ backgroundColor: '#1d1dabff', overflowX: 'auto' }}>
              <Table sx={{ minWidth: { xs: 650, sm: 'auto' } }}>
                <TableHead>
                  <TableRow>
                    {['User', 'Action', 'Target', 'Category', 'Timestamp', 'Status', 'Details'].map(h => (
                      <TableCell key={h} sx={{ color: '#ffffff', fontWeight: 'bold' }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredActivities.length === 0 ? (
                    <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                      <Typography sx={{ color: '#9ca3af' }}>No activities found</Typography>
                    </TableCell></TableRow>
                  ) : filteredActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32, backgroundColor: '#c62020ff' }}>
                            {activity.user.charAt(0)}
                          </Avatar>
                          <Typography sx={{ color: '#ffffff' }}>{activity.user}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getActionIcon(activity.action)}
                          <Typography sx={{ color: '#9ca3af' }}>{activity.action}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#9ca3af', maxWidth: 200 }}>
                        <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {activity.target}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getCategoryIcon(activity.category)}
                          <Typography sx={{ color: '#9ca3af', fontSize: '0.875rem' }}>{activity.category}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#9ca3af' }}>{activity.timestamp}</TableCell>
                      <TableCell>
                        <Chip label={activity.status}
                          color={activity.status === 'Success' ? 'success' : activity.status === 'Failed' ? 'error' : 'default'}
                          size="small" />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={activity.details || 'No details'}>
                          <IconButton size="small" sx={{ color: '#FF6B00' }}><ViewIcon /></IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminActivity;
