import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import PageHeader from '../components/PageHeader';
import { studentAPI, batchAPI } from '../services/api';
import {
  Box, Typography, Card, CardContent, Grid, Avatar, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, InputAdornment, FormControl, InputLabel, Select,
  MenuItem, IconButton, Alert, CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon, Email as EmailIcon,
  People as PeopleIcon, School as SchoolIcon, TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

function MyStudents() {
  const navigate = useNavigate();
  const { userContext } = useUser();
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('all');

  const fetchData = useCallback(async () => {
    try {
      const [sRes, bRes] = await Promise.all([studentAPI.getAll(), batchAPI.getAll()]);
      setStudents(sRes.data.map(s => ({
        id: s._id,
        name: s.user?.name || 'Student',
        email: s.user?.email || '',
        batch: s.assignedBatch?.name || '',
        batchId: s.assignedBatch?._id || '',
        progress: s.progress || 0,
        status: s.user?.status || 'Active',
        enrollmentId: s.enrollmentId || '',
        userId: s.user?._id,
      })));
      setBatches(bRes.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredStudents = students.filter(s => {
    const matchesBatch = filterBatch === 'all' || s.batch === filterBatch;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBatch && matchesSearch;
  });

  const handleSendMessage = (student) => {
    navigate('/teacher/messages', { state: { recipient: { _id: student.userId, name: student.name, role: 'student' } } });
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader title="My Students (मेरे छात्र)" />

      {userContext?.assignedBatches?.length > 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Showing students from your assigned batches: <strong>{userContext.assignedBatches.join(', ')}</strong>
        </Alert>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: '#FF6B00', mr: 2 }}><PeopleIcon /></Avatar>
              <Box>
                <Typography variant="h4" sx={{ color: '#FF6B00', fontWeight: 'bold' }}>{students.length}</Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>Total Students</Typography>
              </Box>
            </Box>
          </CardContent></Card>
        </Grid>
        {batches.slice(0, 2).map((batch, i) => (
          <Grid item xs={12} sm={6} md={3} key={batch._id}>
            <Card onClick={() => setFilterBatch(batch.name)} sx={{ cursor: 'pointer' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ backgroundColor: i === 0 ? '#3B5323' : '#FF8C00', mr: 2 }}><SchoolIcon /></Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ color: i === 0 ? '#3B5323' : '#FF8C00', fontWeight: 'bold' }}>
                      {students.filter(s => s.batch === batch.name).length}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>{batch.name}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: '#c62020ff', mr: 2 }}><TrendingUpIcon /></Avatar>
              <Box>
                <Typography variant="h4" sx={{ color: '#c62020ff', fontWeight: 'bold' }}>{students.filter(s => s.status === 'Active').length}</Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>Active Students</Typography>
              </Box>
            </Box>
          </CardContent></Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>
              Students in My Batches
              {filterBatch !== 'all' && (
                <Chip label={`Filtered: ${filterBatch}`} onDelete={() => setFilterBatch('all')}
                  sx={{ ml: 2, backgroundColor: '#FF6B00', color: '#ffffff' }} />
              )}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField placeholder="Search students..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} size="small"
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#6b7280' }} /></InputAdornment> }}
                sx={{ minWidth: 250 }} />
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Filter by Batch</InputLabel>
                <Select value={filterBatch} onChange={(e) => setFilterBatch(e.target.value)} label="Filter by Batch">
                  <MenuItem value="all">All My Batches</MenuItem>
                  {batches.map(b => <MenuItem key={b._id} value={b.name}>{b.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
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
                    {['Student', 'Email', 'Batch', 'Status', 'Actions'].map(h => (
                      <TableCell key={h} sx={{ color: '#ffffff', fontWeight: 'bold' }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                      <Typography sx={{ color: '#9ca3af' }}>No students found</Typography>
                    </TableCell></TableRow>
                  ) : filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ backgroundColor: '#FF6B00' }}>{student.name.charAt(0)}</Avatar>
                          <Box>
                            <Typography sx={{ color: '#ffffff' }}>{student.name}</Typography>
                            {student.enrollmentId && (
                              <Typography variant="caption" sx={{ color: '#9ca3af' }}>{student.enrollmentId}</Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#9ca3af' }}>{student.email}</TableCell>
                      <TableCell>
                        <Chip label={student.batch || 'N/A'} size="small"
                          sx={{ backgroundColor: 'rgba(29,140,248,0.15)', color: '#FF6B00' }} />
                      </TableCell>
                      <TableCell>
                        <Chip label={student.status} color={student.status === 'Active' ? 'success' : 'default'} size="small" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" sx={{ color: '#c62020ff' }} onClick={() => handleSendMessage(student)}>
                            <EmailIcon />
                          </IconButton>
                        </Box>
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

export default MyStudents;
