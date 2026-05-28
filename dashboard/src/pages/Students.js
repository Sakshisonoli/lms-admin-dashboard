import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { studentAPI, batchAPI } from '../services/api';
import {
  Box, Typography, Card, CardContent, Grid, Avatar, Chip, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions, Alert, CircularProgress, Button,
} from '@mui/material';
import {
  Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Email as EmailIcon,
  Search as SearchIcon, Close as CloseIcon, People as PeopleIcon,
  School as SchoolIcon, Group as GroupIcon,
} from '@mui/icons-material';

function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [editingId, setEditingId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [filterBatch, setFilterBatch] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', assignedBatch: '', status: 'Active',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sRes, bRes] = await Promise.all([studentAPI.getAll(), batchAPI.getAll()]);
      setStudents(sRes.data.map(s => ({
        id: s._id,
        name: s.user?.name,
        email: s.user?.email,
        status: s.user?.status,
        batch: s.assignedBatch?.name || '',
        batchId: s.assignedBatch?._id || '',
        progress: s.progress || 0,
        enrollmentId: s.enrollmentId,
      })));
      setBatches(bRes.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line

  const filteredStudents = students.filter(s => {
    const matchesBatch = filterBatch === 'all' || s.batch === filterBatch;
    const matchesSearch = s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBatch && matchesSearch;
  });

  const handleOpenCreate = () => {
    setDialogMode('create'); setEditingId(null);
    setFormData({ name: '', email: '', password: '', assignedBatch: '', status: 'Active' });
    setError(''); setOpenDialog(true);
  };

  const handleOpenEdit = (student) => {
    setDialogMode('edit'); setEditingId(student.id);
    setFormData({ name: student.name, email: student.email, password: '',
      assignedBatch: student.batchId, status: student.status });
    setError(''); setOpenDialog(true);
  };

  const handleSubmit = async () => {
    try {
      setSaving(true); setError('');
      if (dialogMode === 'create') await studentAPI.create(formData);
      else await studentAPI.update(editingId, formData);
      await fetchData();
      setOpenDialog(false);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDeleteConfirm = async () => {
    try {
      await studentAPI.remove(studentToDelete.id);
      await fetchData();
      setDeleteDialog(false); setStudentToDelete(null);
    } catch (err) { setError(err.message); }
  };

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader title="Students Management (छात्र प्रबंधन)" buttonText="Add Student (छात्र जोड़ें)"
        buttonIcon={<AddIcon />} onButtonClick={handleOpenCreate} />

      {error && !openDialog && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
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
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: '#c62020ff', mr: 2 }}><PeopleIcon /></Avatar>
              <Box>
                <Typography variant="h4" sx={{ color: '#c62020ff', fontWeight: 'bold' }}>
                  {students.filter(s => s.status === 'Active').length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>Active Students</Typography>
              </Box>
            </Box>
          </CardContent></Card>
        </Grid>
        {batches.map((batch, i) => (
          <Grid item xs={12} sm={6} md={3} key={batch._id}>
            <Card onClick={() => setFilterBatch(batch.name)} sx={{ cursor: 'pointer' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ backgroundColor: i === 0 ? '#3B5323' : '#FF8C00', mr: 2 }}>
                    {i === 0 ? <SchoolIcon /> : <GroupIcon />}
                  </Avatar>
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
      </Grid>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>
              Students Directory
              {filterBatch !== 'all' && (
                <Chip label={`Filtered: ${filterBatch}`} onDelete={() => setFilterBatch('all')}
                  sx={{ ml: 2, backgroundColor: '#FF6B00', color: '#1f2937' }} />
              )}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <TextField placeholder="Search students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#6b7280' }} /></InputAdornment> }}
                size="small" sx={{ flex: 1 }} />
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Filter by Batch</InputLabel>
                <Select label="Filter by Batch" value={filterBatch} onChange={(e) => setFilterBatch(e.target.value)}>
                  <MenuItem value="all">All Batches</MenuItem>
                  {batches.map(b => <MenuItem key={b._id} value={b.name}>{b.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress sx={{ color: '#c62020ff' }} /></Box>
          ) : (
            <TableContainer component={Paper} sx={{ backgroundColor: '#1d1dabff', overflowX: 'auto' }}>
              <Table sx={{ minWidth: { xs: 650, sm: 'auto' } }}>
                <TableHead>
                  <TableRow>
                    {['Name', 'Email', 'Enrollment ID', 'Batch', 'Status', 'Actions'].map(h => (
                      <TableCell key={h} sx={{ color: '#ffffff', fontWeight: 'bold' }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                      <Typography sx={{ color: '#9ca3af' }}>No students found</Typography>
                    </TableCell></TableRow>
                  ) : filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ backgroundColor: '#c62020ff' }}>{student.name?.charAt(0)}</Avatar>
                          <Typography sx={{ color: '#ffffff' }}>{student.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#9ca3af' }}>{student.email}</TableCell>
                      <TableCell sx={{ color: '#9ca3af' }}>{student.enrollmentId}</TableCell>
                      <TableCell sx={{ color: '#9ca3af' }}>{student.batch}</TableCell>
                      <TableCell>
                        <Chip label={student.status} color={student.status === 'Active' ? 'success' : 'default'} size="small" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" sx={{ color: '#FF6B00' }} onClick={() => handleOpenEdit(student)}><EditIcon /></IconButton>
                          <IconButton size="small" sx={{ color: '#c62020ff' }} onClick={() => navigate('/admin/messages', { state: { recipient: student } })}><EmailIcon /></IconButton>
                          <IconButton size="small" sx={{ color: '#fd5d93' }} onClick={() => { setStudentToDelete(student); setDeleteDialog(true); }}><DeleteIcon /></IconButton>
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

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { backgroundColor: '#1d1dabff', color: '#ffffff' } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#ffffff' }}>{dialogMode === 'create' ? 'Add New Student' : 'Edit Student'}</Typography>
          <IconButton onClick={() => setOpenDialog(false)} sx={{ color: '#9ca3af' }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {[['name', 'Full Name', 'text'], ['email', 'Email Address', 'email']].map(([field, label, type]) => (
              <TextField key={field} label={label} type={type} fullWidth value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)} required
                sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' } }} />
            ))}
            {dialogMode === 'create' && (
              <TextField label="Password" type="password" fullWidth value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)} required helperText="Minimum 8 characters"
                sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' }, '& .MuiFormHelperText-root': { color: '#9ca3af' } }} />
            )}
            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' }, '& .MuiSvgIcon-root': { color: '#9ca3af' } }}>
              <InputLabel>Assign to Batch</InputLabel>
              <Select value={formData.assignedBatch} onChange={(e) => handleInputChange('assignedBatch', e.target.value)} label="Assign to Batch">
                <MenuItem value="">None</MenuItem>
                {batches.map(b => <MenuItem key={b._id} value={b._id}>{b.name}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' }, '& .MuiSvgIcon-root': { color: '#9ca3af' } }}>
              <InputLabel>Status</InputLabel>
              <Select value={formData.status} onChange={(e) => handleInputChange('status', e.target.value)} label="Status">
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            {dialogMode === 'create' && <Alert severity="info">Student will receive login credentials via email</Alert>}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#e5e7eb' }}>Cancel (रद्द करें)</Button>
          <Button variant="contained" onClick={handleSubmit}
            disabled={!formData.name || !formData.email || (dialogMode === 'create' && !formData.password) || saving}
            sx={{ backgroundColor: '#c62020ff', '&:hover': { backgroundColor: '#a01818' }, '&:disabled': { backgroundColor: '#6b7280' } }}>
            {saving ? <CircularProgress size={22} color="inherit" /> : (dialogMode === 'create' ? 'Create Student (छात्र बनाएं)' : 'Save Changes (परिवर्तन सहेजें)')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}
        PaperProps={{ sx: { backgroundColor: '#1d1dabff', color: '#ffffff' } }}>
        <DialogTitle sx={{ color: '#ffffff' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#e5e7eb' }}>Are you sure you want to delete student <strong>{studentToDelete?.name}</strong>?</Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>This action cannot be undone. All student data will be permanently removed.</Alert>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button onClick={() => setDeleteDialog(false)} sx={{ color: '#e5e7eb' }}>Cancel (रद्द करें)</Button>
          <Button variant="contained" onClick={handleDeleteConfirm}
            sx={{ backgroundColor: '#c62020ff', '&:hover': { backgroundColor: '#a01818' } }}>
            Delete Student (छात्र हटाएं)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Students;
