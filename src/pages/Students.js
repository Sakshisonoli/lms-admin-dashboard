import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
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
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Email as EmailIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

function Students() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create'); // 'create' or 'edit'
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [filterBatch, setFilterBatch] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    batch: '',
    course: '',
    status: 'Active',
    password: '',
  });

  const handleSendMessage = (member) => {
    // Navigate to messages page with the member's info
    navigate('/admin/messages', { state: { recipient: member } });
  };

  const students = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@student.army.gov.in', status: 'Active', batch: 'Commando', course: 'Military Strategy', progress: 85 },
    { id: 2, name: 'Priya Singh', email: 'priya.singh@student.army.gov.in', status: 'Active', batch: 'Platoon Commander', course: 'Combat Training', progress: 92 },
    { id: 3, name: 'Raj Patel', email: 'raj.patel@student.army.gov.in', status: 'Active', batch: 'Commando', course: 'Weapons Training', progress: 78 },
    { id: 4, name: 'Anjali Reddy', email: 'anjali.reddy@student.army.gov.in', status: 'Active', batch: 'Platoon Commander', course: 'Leadership', progress: 65 },
    { id: 5, name: 'Arjun Verma', email: 'arjun.verma@student.army.gov.in', status: 'Active', batch: 'Platoon Commander', course: 'Tactical Operations', progress: 88 },
    { id: 6, name: 'Sneha Gupta', email: 'sneha.gupta@student.army.gov.in', status: 'Active', batch: 'Commando', course: 'Field Operations', progress: 95 },
    { id: 7, name: 'Vikram Joshi', email: 'vikram.joshi@student.army.gov.in', status: 'Active', batch: 'Commando', course: 'Combat Training', progress: 72 },
    { id: 8, name: 'Anita Nair', email: 'anita.nair@student.army.gov.in', status: 'Active', batch: 'Platoon Commander', course: 'Military Strategy', progress: 89 },
  ];

  const handleOpenCreate = () => {
    setDialogMode('create');
    setFormData({
      name: '',
      email: '',
      batch: '',
      course: '',
      status: 'Active',
      password: '',
    });
    setOpenDialog(true);
  };

  const handleOpenEdit = (student) => {
    setDialogMode('edit');
    setFormData({
      name: student.name,
      email: student.email,
      batch: student.batch,
      course: student.course,
      status: student.status,
      password: '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    // Here you would typically make an API call
    console.log('Submitting:', formData);
    alert(`Student ${dialogMode === 'create' ? 'created' : 'updated'} successfully!`);
    handleCloseDialog();
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting student:', studentToDelete);
    alert(`Student ${studentToDelete.name} deleted successfully!`);
    setDeleteDialog(false);
    setStudentToDelete(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Filter students by batch
  const filteredStudents = students.filter(student => {
    const matchesBatch = filterBatch === 'all' || student.batch === filterBatch;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBatch && matchesSearch;
  });

  // Get batch statistics
  const batchStats = {
    'Commando': students.filter(s => s.batch === 'Commando').length,
    'Platoon Commander': students.filter(s => s.batch === 'Platoon Commander').length,
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader
        title="Students Management (छात्र प्रबंधन)"
        buttonText="Add Student (छात्र जोड़ें)"
        buttonIcon={<AddIcon />}
        onButtonClick={handleOpenCreate}
      />

      {/* Stats Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#FF6B00', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF6B00', fontWeight: 'bold' }}>
                    {students.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Total Students
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            onClick={() => setFilterBatch('Commando')}
            sx={{ cursor: 'pointer', '&:hover': { borderColor: '#3B5323', border: '1px solid' } }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#3B5323', mr: 2 }}>
                  <SchoolIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#3B5323', fontWeight: 'bold' }}>
                    {batchStats['Commando']}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Commando Students
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            onClick={() => setFilterBatch('Platoon Commander')}
            sx={{ cursor: 'pointer', '&:hover': { borderColor: '#FF8C00', border: '1px solid' } }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#FF8C00', mr: 2 }}>
                  <GroupIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF8C00', fontWeight: 'bold' }}>
                    {batchStats['Platoon Commander']}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Platoon Commander Students
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>
              Students Directory
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
                placeholder="Search students..."
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
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Batch</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Course</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Progress</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                      <Typography sx={{ color: '#6b7280' }}>
                        No students found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ backgroundColor: '#c62020ff' }}>
                          {student.name.charAt(0)}
                        </Avatar>
                        <Typography sx={{ color: '#1f2937' }}>{student.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{student.email}</TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{student.batch}</TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{student.course}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ color: '#1f2937' }}>{student.progress}%</Typography>
                        <Box
                          sx={{
                            width: 50,
                            height: 6,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: 3,
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            sx={{
                              width: `${student.progress}%`,
                              height: '100%',
                              backgroundColor: student.progress >= 80 ? '#3B5323' : student.progress >= 60 ? '#FF8C00' : '#fd5d93',
                            }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={student.status}
                        color={student.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ color: '#FF6B00' }} onClick={() => handleOpenEdit(student)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: '#c62020ff' }}
                          onClick={() => handleSendMessage(student)}
                        >
                          <EmailIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#fd5d93' }} onClick={() => handleDeleteClick(student)}>
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

      {/* Create/Edit Student Dialog */}
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
            {dialogMode === 'create' ? 'Add New Student' : 'Edit Student'}
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
              <InputLabel>Assign to Batch</InputLabel>
              <Select
                value={formData.batch}
                onChange={(e) => handleInputChange('batch', e.target.value)}
                label="Assign to Batch"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Commando">Commando - Special Operations Training</MenuItem>
                <MenuItem value="Platoon Commander">Platoon Commander - Leadership Development</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{
              '& .MuiOutlinedInput-root': { color: '#ffffff' },
              '& .MuiInputLabel-root': { color: '#9ca3af' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' },
              '& .MuiSvgIcon-root': { color: '#9ca3af' }
            }}>
              <InputLabel>Course</InputLabel>
              <Select
                value={formData.course}
                onChange={(e) => handleInputChange('course', e.target.value)}
                label="Course"
              >
                <MenuItem value="Military Strategy">Military Strategy</MenuItem>
                <MenuItem value="Combat Training">Combat Training</MenuItem>
                <MenuItem value="Weapons Training">Weapons Training</MenuItem>
                <MenuItem value="Leadership">Leadership</MenuItem>
                <MenuItem value="Tactical Operations">Tactical Operations</MenuItem>
                <MenuItem value="Field Operations">Field Operations</MenuItem>
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
                Student will receive login credentials via email
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
              !formData.batch || 
              !formData.course || 
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
            {dialogMode === 'create' ? 'Create Student (छात्र बनाएं)' : 'Save Changes (परिवर्तन सहेजें)'}
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
            Are you sure you want to delete student <strong>{studentToDelete?.name}</strong>?
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            This action cannot be undone. All student data and progress will be permanently removed.
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
            Delete Student (छात्र हटाएं)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Students;

