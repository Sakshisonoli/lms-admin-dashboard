import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Autocomplete,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Close as CloseIcon,
  CheckCircle as ActiveIcon,
  Article as ContentIcon,
} from '@mui/icons-material';

const BatchCard = ({ batch, onEdit, onDelete }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 600 }}>
            {batch.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton 
              size="small" 
              onClick={() => onEdit(batch)}
              sx={{ 
                color: '#FF6B00',
                backgroundColor: 'rgba(29, 140, 248, 0.1)',
                '&:hover': { backgroundColor: 'rgba(29, 140, 248, 0.2)' },
                width: 32,
                height: 32,
              }}
            >
              <EditIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton 
              size="small"
              onClick={() => onDelete(batch)}
              sx={{ 
                color: '#fd5d93',
                backgroundColor: 'rgba(253, 93, 147, 0.1)',
                '&:hover': { backgroundColor: 'rgba(253, 93, 147, 0.2)' },
                width: 32,
                height: 32,
              }}
            >
              <DeleteIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Box>
        
        <Chip
          label={batch.status}
          color={batch.status === 'Active' ? 'success' : batch.status === 'Completed' ? 'info' : 'warning'}
          size="small"
          sx={{ mb: 2 }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
          Progress: {batch.progress}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={batch.progress}
          sx={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            height: 8,
            borderRadius: 4,
            '& .MuiLinearProgress-bar': {
              backgroundColor: batch.status === 'Active' ? '#3B5323' : '#FF6B00',
              borderRadius: 4,
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PeopleIcon sx={{ color: '#6b7280', fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            {batch.studentCount} Students
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon sx={{ color: '#6b7280', fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            {batch.courseCount} Courses
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#6b7280', mb: 1.5 }}>
          Teachers:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {batch.teachers.map((teacher, index) => (
            <Chip
              key={index}
              label={teacher}
              size="small"
              sx={{
                backgroundColor: 'rgba(29, 140, 248, 0.15)',
                color: '#FF6B00',
                fontSize: '0.75rem',
                height: 24,
                '& .MuiChip-label': {
                  px: 1.5,
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <Typography variant="body2" sx={{ color: '#6b7280' }}>
        Duration: {batch.duration}
      </Typography>
    </CardContent>
  </Card>
);

function Batches() {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [formData, setFormData] = useState({
    name: '',
    status: 'Active',
    duration: '',
    courseCount: 0,
    teachers: [],
    description: '',
  });

  const availableTeachers = [
    'Col. Rajesh Kumar',
    'Maj. Priya Sharma',
    'Lt. Col. Amit Singh',
    'Capt. Sneha Gupta',
  ];

  const batchesData = [
    {
      id: 1,
      name: 'Commando Training Program',
      status: 'Active',
      progress: 75,
      studentCount: 45,
      courseCount: 8,
      teachers: ['Col. Rajesh Kumar', 'Maj. Priya Sharma'],
      duration: '6 months',
    },
    {
      id: 2,
      name: 'Platoon Commander Development',
      status: 'Active',
      progress: 60,
      studentCount: 38,
      courseCount: 12,
      teachers: ['Col. Rajesh Kumar', 'Capt. Sneha Gupta'],
      duration: '8 months',
    },
  ];

  const filteredBatches = batchesData.filter((batch) => {
    const matchesSearch = batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.teachers.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || batch.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: filteredBatches.length,
    active: filteredBatches.filter(b => b.status === 'Active').length,
    completed: filteredBatches.filter(b => b.status === 'Completed').length,
    pending: filteredBatches.filter(b => b.status === 'Pending').length,
  };

  const handleOpenCreate = () => {
    setDialogMode('create');
    setFormData({
      name: '',
      status: 'Active',
      duration: '',
      courseCount: 0,
      teachers: [],
      description: '',
    });
    setOpenDialog(true);
  };

  const handleOpenEdit = (batch) => {
    setDialogMode('edit');
    setFormData({
      name: batch.name,
      status: batch.status,
      duration: batch.duration,
      courseCount: batch.courseCount,
      teachers: batch.teachers,
      description: '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    alert(`Batch ${dialogMode === 'create' ? 'created' : 'updated'} successfully!`);
    handleCloseDialog();
  };

  const handleDeleteClick = (batch) => {
    setBatchToDelete(batch);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting batch:', batchToDelete);
    alert(`Batch ${batchToDelete.name} deleted successfully!`);
    setDeleteDialog(false);
    setBatchToDelete(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: '2px solid #FF8C00' }}>
        <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold' }}>
          Batch Management (बैच प्रबंधन)
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{
            backgroundColor: '#c62020ff',
            '&:hover': { backgroundColor: '#a01818' },
          }}
        >
          Create Batch (बैच बनाएं)
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#FF6B00', mr: 2 }}>
                  <SchoolIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF6B00', fontWeight: 'bold' }}>
                    {stats.total}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Total Batches
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
                <Avatar sx={{ backgroundColor: '#3B5323', mr: 2 }}>
                  <ActiveIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#3B5323', fontWeight: 'bold' }}>
                    {stats.active}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Active Batches
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
                  <ContentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#c62020ff', fontWeight: 'bold' }}>
                    {stats.completed}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Completed
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
                  <PeopleIcon />
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
      </Grid>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search batches by name or teacher..."
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
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Platoon Commanderards */}
      <Grid container spacing={3}>
        {filteredBatches.map((batch) => (
          <Grid item xs={12} sm={6} md={4} key={batch.id}>
            <BatchCard batch={batch} onEdit={handleOpenEdit} onDelete={handleDeleteClick} />
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Commandoialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: '#1d1dabff', color: '#ffffff' },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#ffffff' }}>
            {dialogMode === 'create' ? 'Create New Batch' : 'Edit Batch'}
          </Typography>
          <IconButton onClick={handleCloseDialog} sx={{ color: '#9ca3af' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Batch Name"
              fullWidth
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              placeholder="e.g., Commando Training Program"
              sx={{
                '& .MuiOutlinedInput-root': { color: '#ffffff' },
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' }
              }}
            />
            
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the batch"
              sx={{
                '& .MuiOutlinedInput-root': { color: '#ffffff' },
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' }
              }}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{
                  '& .MuiOutlinedInput-root': { color: '#ffffff' },
                  '& .MuiInputLabel-root': { color: '#9ca3af' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' },
                  '& .MuiSvgIcon-root': { color: '#9ca3af' }
                }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Duration"
                  fullWidth
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g., 6 months"
                  sx={{
                    '& .MuiOutlinedInput-root': { color: '#ffffff' },
                    '& .MuiInputLabel-root': { color: '#9ca3af' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' }
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              label="Number of Courses"
              type="number"
              fullWidth
              value={formData.courseCount}
              onChange={(e) => handleInputChange('courseCount', parseInt(e.target.value) || 0)}
              inputProps={{ min: 0 }}
              sx={{
                '& .MuiOutlinedInput-root': { color: '#ffffff' },
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' }
              }}
            />

            <Autocomplete
              multiple
              options={availableTeachers}
              value={formData.teachers}
              onChange={(event, newValue) => handleInputChange('teachers', newValue)}
              sx={{
                '& .MuiOutlinedInput-root': { color: '#ffffff' },
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' },
                '& .MuiSvgIcon-root': { color: '#9ca3af' },
                '& .MuiChip-root': { color: '#ffffff' }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Assign Teachers"
                  placeholder="Select teachers"
                  sx={{
                    '& .MuiOutlinedInput-root': { color: '#ffffff' },
                    '& .MuiInputLabel-root': { color: '#9ca3af' }
                  }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    sx={{
                      backgroundColor: 'rgba(29, 140, 248, 0.15)',
                      color: '#FF6B00',
                    }}
                  />
                ))
              }
            />

            {dialogMode === 'create' && (
              <Alert severity="info">
                Students can be assigned to this Commandofter creation from the Students page.
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#1d1dabff', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button 
            onClick={handleCloseDialog} 
            sx={{ 
              color: '#e5e7eb',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Cancel (रद्द करें)
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!formData.name || !formData.status || !formData.duration || formData.teachers.length === 0}
            sx={{
              backgroundColor: '#c62020ff',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#a01818' },
              '&:disabled': { backgroundColor: '#6b7280', color: '#9ca3af' },
            }}
          >
            {dialogMode === 'create' ? 'Create Batch (बैच बनाएं)' : 'Save Changes (परिवर्तन सहेजें)'}
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
            Are you sure you want to delete batch <strong>{batchToDelete?.name}</strong>?
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            This action cannot be undone. All students in this batch will be unassigned.
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
            Delete Batch (बैच हटाएं)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Batches;

