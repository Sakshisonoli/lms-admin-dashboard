import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { teacherAPI, batchAPI } from '../services/api';
import {
  Box, Typography, Card, CardContent, Grid, Avatar, Chip, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl,
  InputLabel, Select, MenuItem, Alert, InputAdornment, CircularProgress, Button,
} from '@mui/material';
import {
  Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Email as EmailIcon,
  Close as CloseIcon, Search as SearchIcon, School as SchoolIcon,
  CheckCircle as CheckCircleIcon, MenuBook as MenuBookIcon, TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

function Teachers() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [editingId, setEditingId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [filterBatch, setFilterBatch] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', rank: '', specialization: '',
    experience: '', assignedBatches: [], status: 'Active',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tRes, bRes] = await Promise.all([teacherAPI.getAll(), batchAPI.getAll()]);
      setTeachers(tRes.data.map(t => ({
        id: t._id,
        name: t.user?.name,
        email: t.user?.email,
        status: t.user?.status,
        rank: t.rank,
        subject: t.specialization,
        experience: t.experience,
        assignedBatches: t.assignedBatches?.map(b => b.name) || [],
        assignedBatchIds: t.assignedBatches?.map(b => b._id) || [],
      })));
      setBatches(bRes.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredTeachers = teachers.filter(t => {
    const matchesBatch = filterBatch === 'all' || t.assignedBatches?.includes(filterBatch);
    const matchesSearch = t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBatch && matchesSearch;
  });

  const handleOpenCreate = () => {
    setDialogMode('create'); setEditingId(null);
    setFormData({ name: '', email: '', password: '', rank: '', specialization: '', experience: '', assignedBatches: [], status: 'Active' });
    setError(''); setOpenDialog(true);
  };

  const handleOpenEdit = (teacher) => {
    setDialogMode('edit'); setEditingId(teacher.id);
    setFormData({ name: teacher.name, email: teacher.email, password: '', rank: teacher.rank || '',
      specialization: teacher.subject || '', experience: teacher.experience || '',
      assignedBatches: teacher.assignedBatchIds || [], status: teacher.status });
    setError(''); setOpenDialog(true);
  };

  const handleSubmit = async () => {
    try {
      setSaving(true); setError('');
      if (dialogMode === 'create') await teacherAPI.create(formData);
      else await teacherAPI.update(editingId, formData);
      await fetchData();
      setOpenDialog(false);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDeleteConfirm = async () => {
    try {
      await teacherAPI.remove(teacherToDelete.id);
      await fetchData();
      setDeleteDialog(false); setTeacherToDelete(null);
    } catch (err) { setError(err.message); }
  };

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader title="Teachers Management (शिक्षक प्रबंधन)" buttonText="Add Teacher (शिक्षक जोड़ें)"
        buttonIcon={<AddIcon />} onButtonClick={handleOpenCreate} />

      {error && !openDialog && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Teachers', value: teachers.length, color: '#FF6B00', icon: <SchoolIcon /> },
          { label: 'Active Teachers', value: teachers.filter(t => t.status === 'Active').length, color: '#3B5323', icon: <CheckCircleIcon /> },
          { label: 'Subjects', value: [...new Set(teachers.map(t => t.subject))].filter(Boolean).length, color: '#FF8C00', icon: <MenuBookIcon /> },
          { label: 'Batches', value: batches.length, color: '#c62020ff', icon: <TrendingUpIcon /> },
        ].map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card><CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: stat.color, mr: 2 }}>{stat.icon}</Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: stat.color, fontWeight: 'bold' }}>{stat.value}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>{stat.label}</Typography>
                </Box>
              </Box>
            </CardContent></Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>
              Teachers Directory
              {filterBatch !== 'all' && (
                <Chip label={`Filtered: ${filterBatch}`} onDelete={() => setFilterBatch('all')}
                  sx={{ ml: 2, backgroundColor: '#FF6B00', color: '#1f2937' }} />
              )}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <TextField placeholder="Search teachers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
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
                    {['Name', 'Email', 'Specialization', 'Experience', 'Batches', 'Status', 'Actions'].map(h => (
                      <TableCell key={h} sx={{ color: '#ffffff', fontWeight: 'bold' }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTeachers.length === 0 ? (
                    <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                      <Typography sx={{ color: '#9ca3af' }}>No teachers found</Typography>
                    </TableCell></TableRow>
                  ) : filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ backgroundColor: '#c62020ff' }}>{teacher.name?.charAt(0)}</Avatar>
                          <Typography sx={{ color: '#ffffff' }}>{teacher.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#9ca3af' }}>{teacher.email}</TableCell>
                      <TableCell sx={{ color: '#9ca3af' }}>{teacher.subject}</TableCell>
                      <TableCell sx={{ color: '#9ca3af' }}>{teacher.experience}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {teacher.assignedBatches?.map((batch, i) => (
                            <Chip key={i} label={batch} size="small"
                              sx={{ backgroundColor: 'rgba(29,140,248,0.15)', color: '#FF6B00', fontSize: '0.75rem' }} />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={teacher.status} color={teacher.status === 'Active' ? 'success' : 'default'} size="small" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" sx={{ color: '#FF6B00' }} onClick={() => handleOpenEdit(teacher)}><EditIcon /></IconButton>
                          <IconButton size="small" sx={{ color: '#c62020ff' }} onClick={() => navigate('/admin/messages', { state: { recipient: teacher } })}><EmailIcon /></IconButton>
                          <IconButton size="small" sx={{ color: '#fd5d93' }} onClick={() => { setTeacherToDelete(teacher); setDeleteDialog(true); }}><DeleteIcon /></IconButton>
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
          <Typography variant="h6" sx={{ color: '#ffffff' }}>{dialogMode === 'create' ? 'Add New Teacher' : 'Edit Teacher'}</Typography>
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
            {[['rank', 'Rank'], ['specialization', 'Specialization'], ['experience', 'Experience (e.g. 8 years)']].map(([field, label]) => (
              <TextField key={field} label={label} fullWidth value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' } }} />
            ))}
            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' }, '& .MuiSvgIcon-root': { color: '#9ca3af' } }}>
              <InputLabel>Assign to Batches</InputLabel>
              <Select multiple value={formData.assignedBatches}
                onChange={(e) => handleInputChange('assignedBatches', e.target.value)} label="Assign to Batches"
                renderValue={(selected) => selected.map(id => batches.find(b => b._id === id)?.name || id).join(', ')}>
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
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#e5e7eb' }}>Cancel (रद्द करें)</Button>
          <Button variant="contained" onClick={handleSubmit}
            disabled={!formData.name || !formData.email || (dialogMode === 'create' && !formData.password) || saving}
            sx={{ backgroundColor: '#c62020ff', '&:hover': { backgroundColor: '#a01818' }, '&:disabled': { backgroundColor: '#6b7280' } }}>
            {saving ? <CircularProgress size={22} color="inherit" /> : (dialogMode === 'create' ? 'Create Teacher (शिक्षक बनाएं)' : 'Save Changes (परिवर्तन सहेजें)')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}
        PaperProps={{ sx: { backgroundColor: '#1d1dabff', color: '#ffffff' } }}>
        <DialogTitle sx={{ color: '#ffffff' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#e5e7eb' }}>Are you sure you want to delete teacher <strong>{teacherToDelete?.name}</strong>?</Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>This action cannot be undone. Teacher will lose access to all assigned batches.</Alert>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button onClick={() => setDeleteDialog(false)} sx={{ color: '#e5e7eb' }}>Cancel (रद्द करें)</Button>
          <Button variant="contained" onClick={handleDeleteConfirm}
            sx={{ backgroundColor: '#c62020ff', '&:hover': { backgroundColor: '#a01818' } }}>
            Delete Teacher (शिक्षक हटाएं)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Teachers;
