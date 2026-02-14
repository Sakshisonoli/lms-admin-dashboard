import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Email as EmailIcon,
  Close as CloseIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

function Teachers() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  // eslint-disable-next-line no-unused-vars
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [filterBatch, setFilterBatch] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    experience: '',
    status: 'Active',
    password: '',
    assignedBatches: [],
  });

  const handleSendMessage = (member) => {
    // Navigate to messages page with the member's info
    navigate('/admin/messages', { state: { recipient: member } });
  };

  const teachers = [
    { id: 1, name: 'Col. Rajesh Kumar', email: 'rajesh.kumar@army.gov.in', status: 'Active', subject: 'Military Strategy', experience: '15 years', assignedBatches: ['Commando', 'Platoon Commander'] },
    { id: 2, name: 'Maj. Priya Sharma', email: 'priya.sharma@army.mil', status: 'Active', subject: 'Combat Training', experience: '10 years', assignedBatches: ['Commando', 'Platoon Commander'] },
    { id: 3, name: 'Lt. Col. Amit Singh', email: 'amit.singh@army.mil', status: 'Active', subject: 'Weapons Training', experience: '12 years', assignedBatches: ['Commando'] },
    { id: 4, name: 'Capt. Sneha Gupta', email: 'sneha.gupta@army.mil', status: 'Active', subject: 'Leadership', experience: '8 years', assignedBatches: ['Platoon Commander'] },
    { id: 5, name: 'Maj. Vikram Reddy', email: 'vikram.reddy@army.mil', status: 'Active', subject: 'Tactical Operations', experience: '11 years', assignedBatches: ['Commando', 'Platoon Commander'] },
    { id: 6, name: 'Capt. Anjali Nair', email: 'anjali.nair@army.mil', status: 'Active', subject: 'Field Operations', experience: '7 years', assignedBatches: ['Commando'] },
  ];

  const handleOpenCreate = () => {
    setDialogMode('create');
    setFormData({
      name: '',
      email: '',
      subject: '',
      experience: '',
      status: 'Active',
      password: '',
      assignedBatches: [],
    });
    setOpenDialog(true);
  };

  const handleOpenEdit = (teacher) => {
    setDialogMode('edit');
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      subject: teacher.subject,
      experience: teacher.experience,
      status: teacher.status,
      password: '',
      assignedBatches: teacher.assignedBatches || [],
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTeacher(null);
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    alert(`Teacher ${dialogMode === 'create' ? 'created' : 'updated'} successfully!`);
    handleCloseDialog();
  };

  const handleDeleteClick = (teacher) => {
    setTeacherToDelete(teacher);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting teacher:', teacherToDelete);
    alert(`Teacher ${teacherToDelete.name} deleted successfully!`);
    setDeleteDialog(false);
    setTeacherToDelete(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Filter teachers by Commandond search term
  const filteredTeachers = teachers.filter(teacher => {
    const matchesBatch = filterBatch === 'all' || (teacher.assignedBatches && teacher.assignedBatches.includes(filterBatch));
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBatch && matchesSearch;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: '2px solid #FF8C00' }}>
        <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold' }}>
          Teachers Management (शिक्षक प्रबंधन)
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
          Add Teacher (शिक्षक जोड़ें)
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#FF6B00', fontWeight: 'bold' }}>
                {teachers.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Total Teachers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#3B5323', fontWeight: 'bold' }}>
                {teachers.filter(t => t.status === 'Active').length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Active Teachers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#FF8C00', fontWeight: 'bold' }}>
                6
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Subjects
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#c62020ff', fontWeight: 'bold' }}>
                9.5
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Avg Experience
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>
              Teachers Directory
              {filterBatch !== 'all' && (
                <Chip 
                  label={`Filtered: ${filterBatch}`}
                  onDelete={() => setFilterBatch('all')}
                  sx={{ ml: 2, backgroundColor: '#FF6B00', color: '#1f2937' }}
                />
              )}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              alignItems: { xs: 'stretch', sm: 'center' },
            }}>
              <TextField
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#6b7280' }} />
                    </InputAdornment>
                  ),
                }}
                size="small"
                sx={{ flex: { xs: 1, sm: 'auto' }, minWidth: { sm: 200 } }}
              />
              <FormControl size="small" sx={{ flex: { xs: 1, sm: 'auto' }, minWidth: { xs: '100%', sm: 150 } }}>
                <InputLabel sx={{ color: '#6b7280' }}>Filter by Batch</InputLabel>
                <Select 
                  label="Filter by Batch" 
                  value={filterBatch}
                  onChange={(e) => setFilterBatch(e.target.value)}
                >
                  <MenuItem value="all">All Batches</MenuItem>
                  <MenuItem value="Commando">Commando</MenuItem>
                  <MenuItem value="Platoon Commander">Platoon Commander</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          
          <TableContainer component={Paper} sx={{ backgroundColor: '#1d1dabff', overflowX: 'auto' }}>
            <Table sx={{ minWidth: { xs: 650, sm: 'auto' } }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Subject</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Experience</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Assigned Batches</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTeachers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                      <Typography sx={{ color: '#6b7280' }}>
                        No teachers found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ backgroundColor: '#c62020ff' }}>
                          {teacher.name.charAt(0)}
                        </Avatar>
                        <Typography sx={{ color: '#1f2937' }}>{teacher.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{teacher.email}</TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{teacher.subject}</TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{teacher.experience}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {teacher.assignedBatches && teacher.assignedBatches.length > 0 ? (
                          teacher.assignedBatches.map((batch, index) => (
                            <Chip
                              key={index}
                              label={batch}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(29, 140, 248, 0.15)',
                                color: '#FF6B00',
                                fontSize: '0.75rem',
                              }}
                            />
                          ))
                        ) : (
                          <Typography sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                            No batches
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={teacher.status}
                        color={teacher.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ color: '#FF6B00' }} onClick={() => handleOpenEdit(teacher)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: '#c62020ff' }}
                          onClick={() => handleSendMessage(teacher)}
                        >
                          <EmailIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#fd5d93' }} onClick={() => handleDeleteClick(teacher)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Create/Edit Teacher Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: '#1d1dabff', color: '#ffffff' },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#ffffff' }}>
            {dialogMode === 'create' ? 'Add New Teacher' : 'Edit Teacher'}
          </Typography>
          <IconButton onClick={handleCloseDialog} sx={{ color: '#9ca3af' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Full Name"
              fullWidth
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': { color: '#ffffff' },
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' }
              }}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': { color: '#ffffff' },
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' }
              }}
            />
            {dialogMode === 'create' && (
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                helperText="Minimum 8 characters"
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#ffffff' },
                  '& .MuiInputLabel-root': { color: '#9ca3af' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' },
                  '& .MuiFormHelperText-root': { color: '#9ca3af' }
                }}
              />
            )}
            <FormControl fullWidth sx={{
              '& .MuiOutlinedInput-root': { color: '#ffffff' },
              '& .MuiInputLabel-root': { color: '#9ca3af' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' },
              '& .MuiSvgIcon-root': { color: '#9ca3af' }
            }}>
              <InputLabel>Subject Specialization</InputLabel>
              <Select
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                label="Subject Specialization"
              >
                <MenuItem value="Military Strategy">Military Strategy</MenuItem>
                <MenuItem value="Combat Training">Combat Training</MenuItem>
                <MenuItem value="Weapons Training">Weapons Training</MenuItem>
                <MenuItem value="Leadership">Leadership</MenuItem>
                <MenuItem value="Tactical Operations">Tactical Operations</MenuItem>
                <MenuItem value="Field Operations">Field Operations</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Years of Experience"
              fullWidth
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              placeholder="e.g., 8 years"
              sx={{
                '& .MuiOutlinedInput-root': { color: '#ffffff' },
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' }
              }}
            />
            <FormControl fullWidth sx={{
              '& .MuiOutlinedInput-root': { color: '#ffffff' },
              '& .MuiInputLabel-root': { color: '#9ca3af' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' },
              '& .MuiSvgIcon-root': { color: '#9ca3af' }
            }}>
              <InputLabel>Assign to Batches</InputLabel>
              <Select
                multiple
                value={formData.assignedBatches}
                onChange={(e) => handleInputChange('assignedBatches', e.target.value)}
                label="Assign to Batches"
                renderValue={(selected) => selected.join(', ')}
              >
                <MenuItem value="Commando">Commando</MenuItem>
                <MenuItem value="Platoon Commander">Platoon Commander</MenuItem>
              </Select>
            </FormControl>
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
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            {dialogMode === 'create' && (
              <Alert severity="info" sx={{ mt: 1 }}>
                Teacher will receive login credentials via email
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
            disabled={
              !formData.name || 
              !formData.email || 
              !formData.subject || 
              !formData.status ||
              (dialogMode === 'create' && !formData.password)
            }
            sx={{
              backgroundColor: '#c62020ff',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#a01818' },
              '&:disabled': { backgroundColor: '#6b7280', color: '#9ca3af' },
            }}
          >
            {dialogMode === 'create' ? 'Create Teacher (शिक्षक बनाएं)' : 'Save Changes (परिवर्तन सहेजें)'}
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
            Are you sure you want to delete teacher <strong>{teacherToDelete?.name}</strong>?
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            This action cannot be undone. Teacher will lose access to all assigned batches.
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
            Delete Teacher (शिक्षक हटाएं)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Teachers;


