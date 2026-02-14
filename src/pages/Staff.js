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
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Email as EmailIcon,
  Close as CloseIcon,
  People as PeopleIcon,
  CheckCircle as ActiveIcon,
  Business as DepartmentIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';

function Staff() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'Active',
    password: '',
    permissions: [],
  });

  const handleSendMessage = (member) => {
    // Navigate to messages page with the member's info
    navigate('/admin/messages', { state: { recipient: member } });
  };

  const officeStaff = [
    { id: 1, name: 'Ramesh Gupta', email: 'ramesh.gupta@army.gov.in', status: 'Active', role: 'Admin', department: 'Administration' },
    { id: 2, name: 'Sanjay Mehta', email: 'sanjay.mehta@army.gov.in', status: 'Active', role: 'Manager', department: 'Operations' },
    { id: 3, name: 'Kavita Desai', email: 'kavita.desai@army.gov.in', status: 'Inactive', role: 'Coordinator', department: 'Training' },
    { id: 4, name: 'Arun Sharma', email: 'arun.sharma@army.gov.in', status: 'Active', role: 'Supervisor', department: 'Logistics' },
    { id: 5, name: 'Neha Kapoor', email: 'neha.kapoor@army.gov.in', status: 'Active', role: 'Assistant', department: 'HR' },
  ];

  const filteredStaff = officeStaff.filter((staff) => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || staff.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || staff.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleOpenCreate = () => {
    setDialogMode('create');
    setFormData({
      name: '',
      email: '',
      role: '',
      department: '',
      status: 'Active',
      password: '',
      permissions: [],
    });
    setOpenDialog(true);
  };

  const handleOpenEdit = (staff) => {
    setDialogMode('edit');
    setFormData({
      name: staff.name,
      email: staff.email,
      role: staff.role,
      department: staff.department,
      status: staff.status,
      password: '',
      permissions: [],
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    alert(`Staff member ${dialogMode === 'create' ? 'created' : 'updated'} successfully!`);
    handleCloseDialog();
  };

  const handleDeleteClick = (staff) => {
    setStaffToDelete(staff);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting staff:', staffToDelete);
    alert(`Staff member ${staffToDelete.name} deleted successfully!`);
    setDeleteDialog(false);
    setStaffToDelete(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader
        title="Office Staff Management (कार्यालय कर्मचारी प्रबंधन)"
        buttonText="Add Staff Member (कर्मचारी जोड़ें)"
        buttonIcon={<AddIcon />}
        onButtonClick={handleOpenCreate}
      />

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#FF6B00', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF6B00', fontWeight: 'bold' }}>
                    {officeStaff.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Total Staff
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
                    {officeStaff.filter(s => s.status === 'Active').length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Active Staff
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
                  <DepartmentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF8C00', fontWeight: 'bold' }}>
                    5
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Departments
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
                  <AdminIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#c62020ff', fontWeight: 'bold' }}>
                    3
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Admin Roles
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          {/* Search and Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search staff by name, email, or role..."
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
              <InputLabel>Department</InputLabel>
              <Select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                label="Department"
              >
                <MenuItem value="all">All Departments</MenuItem>
                <MenuItem value="Administration">Administration</MenuItem>
                <MenuItem value="Operations">Operations</MenuItem>
                <MenuItem value="Training">Training</MenuItem>
                <MenuItem value="Logistics">Logistics</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>
            Office Staff Directory ({filteredStaff.length} staff members)
          </Typography>
          <TableContainer component={Paper} sx={{ backgroundColor: '#1d1dabff', overflowX: 'auto' }}>
            <Table sx={{ minWidth: { xs: 650, sm: 'auto' } }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Role</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Department</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ backgroundColor: '#c62020ff' }}>
                          {staff.name.charAt(0)}
                        </Avatar>
                        <Typography sx={{ color: '#1f2937' }}>{staff.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{staff.email}</TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{staff.role}</TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{staff.department}</TableCell>
                    <TableCell>
                      <Chip
                        label={staff.status}
                        color={staff.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ color: '#FF6B00' }} onClick={() => handleOpenEdit(staff)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: '#c62020ff' }}
                          onClick={() => handleSendMessage(staff)}
                        >
                          <EmailIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#fd5d93' }} onClick={() => handleDeleteClick(staff)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Create/Edit Staff Dialog */}
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
            {dialogMode === 'create' ? 'Add New Staff Member' : 'Edit Staff Member'}
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
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                label="Role"
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Coordinator">Coordinator</MenuItem>
                <MenuItem value="Supervisor">Supervisor</MenuItem>
                <MenuItem value="Assistant">Assistant</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{
              '& .MuiOutlinedInput-root': { color: '#ffffff' },
              '& .MuiInputLabel-root': { color: '#9ca3af' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' },
              '& .MuiSvgIcon-root': { color: '#9ca3af' }
            }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                label="Department"
              >
                <MenuItem value="Administration">Administration</MenuItem>
                <MenuItem value="Operations">Operations</MenuItem>
                <MenuItem value="Training">Training</MenuItem>
                <MenuItem value="Logistics">Logistics</MenuItem>
                <MenuItem value="HR">Human Resources</MenuItem>
                <MenuItem value="IT">IT Support</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{
              '& .MuiOutlinedInput-root': { color: '#ffffff' },
              '& .MuiInputLabel-root': { color: '#9ca3af' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' },
              '& .MuiSvgIcon-root': { color: '#9ca3af' }
            }}>
              <InputLabel>Permissions</InputLabel>
              <Select
                multiple
                value={formData.permissions}
                onChange={(e) => handleInputChange('permissions', e.target.value)}
                label="Permissions"
                renderValue={(selected) => selected.join(', ')}
              >
                <MenuItem value="User Management">User Management</MenuItem>
                <MenuItem value="Content Management">Content Management</MenuItem>
                <MenuItem value="Batch Management">Batch Management</MenuItem>
                <MenuItem value="Reports">View Reports</MenuItem>
                <MenuItem value="System Settings">System Settings</MenuItem>
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
                Staff member will receive login credentials via email
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
              !formData.role || 
              !formData.department || 
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
            {dialogMode === 'create' ? 'Create Staff Member (कर्मचारी बनाएं)' : 'Save Changes (परिवर्तन सहेजें)'}
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
            Are you sure you want to Delete Staff Member (???????? ?????) <strong>{staffToDelete?.name}</strong>?
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            This action cannot be undone. Staff member will lose access to the system.
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
            Delete Staff Member (कर्मचारी हटाएं)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Staff;


