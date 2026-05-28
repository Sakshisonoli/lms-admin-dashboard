import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { batchAPI, teacherAPI } from '../services/api';
import {
  Box, Typography, Card, CardContent, Grid, Chip, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment,
  FormControl, InputLabel, Select, MenuItem, Alert, Avatar, CircularProgress, Button,
} from '@mui/material';
import {
  Add as AddIcon, Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon,
  People as PeopleIcon, School as SchoolIcon, Close as CloseIcon,
  CheckCircle as ActiveIcon, Article as ContentIcon,
} from '@mui/icons-material';

const BatchCard = ({ batch, onEdit, onDelete }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 600 }}>{batch.name}</Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small" onClick={() => onEdit(batch)}
            sx={{ color: '#FF6B00', backgroundColor: 'rgba(29,140,248,0.1)', width: 32, height: 32 }}>
            <EditIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(batch)}
            sx={{ color: '#fd5d93', backgroundColor: 'rgba(253,93,147,0.1)', width: 32, height: 32 }}>
            <DeleteIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>

      <Chip label={batch.status} color={batch.status === 'Active' ? 'success' : batch.status === 'Completed' ? 'info' : 'warning'} size="small" sx={{ mb: 2 }} />

      {batch.description && (
        <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>{batch.description}</Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PeopleIcon sx={{ color: '#6b7280', fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: '#6b7280' }}>{batch.studentCount} Students</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon sx={{ color: '#6b7280', fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: '#6b7280' }}>{batch.teacherCount} Teachers</Typography>
        </Box>
      </Box>

      {batch.teachers?.length > 0 && (
        <Box>
          <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>Teachers:</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {batch.teachers.map((t, i) => (
              <Chip key={i} label={t} size="small"
                sx={{ backgroundColor: 'rgba(29,140,248,0.15)', color: '#FF6B00', fontSize: '0.75rem' }} />
            ))}
          </Box>
        </Box>
      )}
    </CardContent>
  </Card>
);

function Batches() {
  const [batchesData, setBatchesData] = useState([]);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [editingId, setEditingId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [formData, setFormData] = useState({
    name: '', description: '', status: 'Active', startDate: '', endDate: '', maxStudents: 50, teachers: [],
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bRes, tRes] = await Promise.all([batchAPI.getAll(), teacherAPI.getAll()]);
      setBatchesData(bRes.data.map(b => ({
        id: b._id,
        name: b.name,
        description: b.description,
        status: b.status,
        studentCount: b.students?.length || 0,
        teacherCount: b.teachers?.length || 0,
        teachers: b.teachers?.map(t => t.user?.name).filter(Boolean) || [],
        teacherIds: b.teachers?.map(t => t._id) || [],
        maxStudents: b.maxStudents,
        startDate: b.startDate?.split('T')[0] || '',
        endDate: b.endDate?.split('T')[0] || '',
      })));
      setAvailableTeachers(tRes.data.map(t => ({ id: t._id, name: t.user?.name })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredBatches = batchesData.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: batchesData.length,
    active: batchesData.filter(b => b.status === 'Active').length,
    completed: batchesData.filter(b => b.status === 'Completed').length,
    pending: batchesData.filter(b => b.status === 'Pending').length,
  };

  const handleOpenCreate = () => {
    setDialogMode('create'); setEditingId(null);
    setFormData({ name: '', description: '', status: 'Active', startDate: '', endDate: '', maxStudents: 50, teachers: [] });
    setError(''); setOpenDialog(true);
  };

  const handleOpenEdit = (batch) => {
    setDialogMode('edit'); setEditingId(batch.id);
    setFormData({ name: batch.name, description: batch.description || '', status: batch.status,
      startDate: batch.startDate, endDate: batch.endDate, maxStudents: batch.maxStudents, teachers: batch.teacherIds });
    setError(''); setOpenDialog(true);
  };

  const handleSubmit = async () => {
    try {
      setSaving(true); setError('');
      if (dialogMode === 'create') await batchAPI.create(formData);
      else await batchAPI.update(editingId, formData);
      await fetchData();
      setOpenDialog(false);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDeleteConfirm = async () => {
    try {
      await batchAPI.remove(batchToDelete.id);
      await fetchData();
      setDeleteDialog(false); setBatchToDelete(null);
    } catch (err) { setError(err.message); }
  };

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader title="Batch Management (बैच प्रबंधन)" buttonText="Create Batch (बैच बनाएं)"
        buttonIcon={<AddIcon />} onButtonClick={handleOpenCreate} />

      {error && !openDialog && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Batches', value: stats.total, color: '#FF6B00', icon: <SchoolIcon /> },
          { label: 'Active Batches', value: stats.active, color: '#3B5323', icon: <ActiveIcon /> },
          { label: 'Completed', value: stats.completed, color: '#c62020ff', icon: <ContentIcon /> },
          { label: 'Pending', value: stats.pending, color: '#FF8C00', icon: <PeopleIcon /> },
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

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField placeholder="Search batches..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#6b7280' }} /></InputAdornment> }}
              sx={{ minWidth: 300, flexGrow: 1 }} />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress sx={{ color: '#c62020ff' }} /></Box>
      ) : (
        <Grid container spacing={3}>
          {filteredBatches.map((batch) => (
            <Grid item xs={12} sm={6} md={4} key={batch.id}>
              <BatchCard batch={batch} onEdit={handleOpenEdit} onDelete={(b) => { setBatchToDelete(b); setDeleteDialog(true); }} />
            </Grid>
          ))}
          {filteredBatches.length === 0 && (
            <Grid item xs={12}>
              <Card><CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography sx={{ color: '#6b7280' }}>No batches found</Typography>
              </CardContent></Card>
            </Grid>
          )}
        </Grid>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { backgroundColor: '#1d1dabff', color: '#ffffff' } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#ffffff' }}>{dialogMode === 'create' ? 'Create New Batch' : 'Edit Batch'}</Typography>
          <IconButton onClick={() => setOpenDialog(false)} sx={{ color: '#9ca3af' }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField label="Batch Name" fullWidth value={formData.name} required
              onChange={(e) => handleInputChange('name', e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' } }} />
            <TextField label="Description" fullWidth multiline rows={2} value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' } }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField label="Start Date" type="date" fullWidth value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)} InputLabelProps={{ shrink: true }}
                  sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' } }} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="End Date" type="date" fullWidth value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)} InputLabelProps={{ shrink: true }}
                  sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' } }} />
              </Grid>
            </Grid>
            <TextField label="Max Students" type="number" fullWidth value={formData.maxStudents}
              onChange={(e) => handleInputChange('maxStudents', parseInt(e.target.value) || 50)}
              sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' } }} />
            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' }, '& .MuiSvgIcon-root': { color: '#9ca3af' } }}>
              <InputLabel>Assign Teachers</InputLabel>
              <Select multiple value={formData.teachers} onChange={(e) => handleInputChange('teachers', e.target.value)} label="Assign Teachers"
                renderValue={(selected) => selected.map(id => availableTeachers.find(t => t.id === id)?.name || id).join(', ')}>
                {availableTeachers.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' }, '& .MuiSvgIcon-root': { color: '#9ca3af' } }}>
              <InputLabel>Status</InputLabel>
              <Select value={formData.status} onChange={(e) => handleInputChange('status', e.target.value)} label="Status">
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#e5e7eb' }}>Cancel (रद्द करें)</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!formData.name || saving}
            sx={{ backgroundColor: '#c62020ff', '&:hover': { backgroundColor: '#a01818' }, '&:disabled': { backgroundColor: '#6b7280' } }}>
            {saving ? <CircularProgress size={22} color="inherit" /> : (dialogMode === 'create' ? 'Create Batch (बैच बनाएं)' : 'Save Changes (परिवर्तन सहेजें)')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}
        PaperProps={{ sx: { backgroundColor: '#1d1dabff', color: '#ffffff' } }}>
        <DialogTitle sx={{ color: '#ffffff' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#e5e7eb' }}>Are you sure you want to delete batch <strong>{batchToDelete?.name}</strong>?</Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>This action cannot be undone. All students in this batch will be unassigned.</Alert>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button onClick={() => setDeleteDialog(false)} sx={{ color: '#e5e7eb' }}>Cancel (रद्द करें)</Button>
          <Button variant="contained" onClick={handleDeleteConfirm}
            sx={{ backgroundColor: '#c62020ff', '&:hover': { backgroundColor: '#a01818' } }}>
            Delete Batch (बैच हटाएं)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Batches;
