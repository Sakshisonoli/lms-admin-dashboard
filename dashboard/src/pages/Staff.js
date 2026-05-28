import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { staffAPI } from '../services/api';
import {
  Box, Typography, Card, CardContent, Grid, Button, Avatar, Chip, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment,
  FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon,
  Email as EmailIcon, Close as CloseIcon, People as PeopleIcon,
  CheckCircle as ActiveIcon, Business as DepartmentIcon, AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';

function Staff() {
  const navigate = useNavigate();
  const [officeStaff, setOfficeStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [editingId, setEditingId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [formData, setFormData] = useState({
    name: '', email: '', staffRole: '', department: '',
    status: 'Active', password: '', permissions: [],
  });

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await staffAPI.getAll();
      setOfficeStaff(res.data.map(s => ({
        id: s._id,
        name: s.user?.name,
        email: s.user?.email,
        status: s.user?.status,
        role: s.staffRole,
        department: s.department,
        permissions: s.permissions,
      })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStaff(); }, []);

  const filteredStaff = officeStaff.filter((staff) => {
    const matchesSearch = staff.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || staff.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || staff.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleOpenCreate = () => {
    setDialogMode('create');
    setEditingId(null);
    setFormData({ name: '', email: '', staffRole: '', department: '', status: 'Active', password: '', permissions: [] });
    setError('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => { setOpenDialog(false); setError(''); };

  const handleOpenEdit = (staff) => {
    setDialogMode('edit');
    setEditingId(staff.id);
    setFormData({ name: staff.name, email: staff.email, staffRole: staff.role,
      department: staff.department, status: staff.status, password: '', permissions: staff.permissions || [] });
    setError('');
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError('');
      if (dialogMode === 'create') {
        await staffAPI.create(formData);
      } else {
        await staffAPI.update(editingId, formData);
      }
      await fetchStaff();
      setOpenDialog(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await staffAPI.remove(staffToDelete.id);
      await fetchStaff();
      setDeleteDialog(false);
      setStaffToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader
        title="Office Staff Management (कार्यालय कर्मचारी प्रबंधन)"
        buttonText="Add Staff Member (कर्मचारी जोड़ें)"
        buttonIcon={<AddIcon />}
        onButtonClick={handleOpenCreate}
      />

      {error && !openDialog && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: '#FF6B00', mr: 2 }}><PeopleIcon /></Avatar>
              <Box>
                <Typography variant="h4" sx={{ color: '#FF6B00', fontWeight: 'bold' }}>{officeStaff.length}</Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>Total Staff</Typography>
              </Box>
            </Box>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: '#3B5323', mr: 2 }}><ActiveIcon /></Avatar>
              <Box>
                <Typography variant="h4" sx={{ color: '#3B5323', fontWeight: 'bold' }}>{officeStaff.filter(s => s.status === 'Active').length}</Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>Active Staff</Typography>
              </Box>
            </Box>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: '#FF8C00', mr: 2 }}><DepartmentIcon /></Avatar>
              <Box>
                <Typography variant="h4" sx={{ color: '#FF8C00', fontWeight: 'bold' }}>{[...new Set(officeStaff.map(s => s.department))].length}</Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>Departments</Typography>
              </Box>
            </Box>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: '#c62020ff', mr: 2 }}><AdminIcon /></Avatar>
              <Box>
                <Typography variant="h4" sx={{ color: '#c62020ff', fontWeight: 'bold' }}>{officeStaff.filter(s => s.role === 'Admin').length}</Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>Admin Roles</Typography>
              </Box>
            </Box>
          </CardContent></Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search staff by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#6b7280' }} /></InputAdornment> }}
              sx={{ minWidth: 300, flexGrow: 1 }}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Department</InputLabel>
              <Select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)} label="Department">
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
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>
            Office Staff Directory ({filteredStaff.length} staff members)
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress sx={{ color: '#c62020ff' }} />
            </Box>
          ) : (
          <TableContainer component={Paper} sx={{ backgroundColor: '#1d1dabff', overflowX: 'auto' }}>
            <Table sx={{ minWidth: { xs: 650, sm: 'auto' } }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Role</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Department</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStaff.length === 0 ? (
                  <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                    <Typography sx={{ color: '#9ca3af' }}>No staff members found</Typography>
                  </TableCell></TableRow>
                ) : filteredStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ backgroundColor: '#c62020ff' }}>{staff.name?.charAt(0)}</Avatar>
                        <Typography sx={{ color: '#ffffff' }}>{staff.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#9ca3af' }}>{staff.email}</TableCell>
                    <TableCell sx={{ color: '#9ca3af' }}>{staff.role}</TableCell>
                    <TableCell sx={{ color: '#9ca3af' }}>{staff.department}</TableCell>
                    <TableCell>
                      <Chip label={staff.status} color={staff.status === 'Active' ? 'success' : 'default'} size="small" />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ color: '#FF6B00' }} onClick={() => handleOpenEdit(staff)}><EditIcon /></IconButton>
                        <IconButton size="small" sx={{ color: '#c62020ff' }} onClick={() => navigate('/admin/messages', { state: { recipient: staff } })}><EmailIcon /></IconButton>
                        <IconButton size="small" sx={{ color: '#fd5d93' }} onClick={() => { setStaffToDelete(staff); setDeleteDialog(true); }}><DeleteIcon /></IconButton>
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
            {error && <Alert severity="error">{error}</Alert>}
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
                value={formData.staffRole}
                onChange={(e) => handleInputChange('staffRole', e.target.value)}
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
            disabled={!formData.name || !formData.email || !formData.staffRole || !formData.department || !formData.status || (dialogMode === 'create' && !formData.password) || saving}
            sx={{
              backgroundColor: '#c62020ff',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#a01818' },
              '&:disabled': { backgroundColor: '#6b7280', color: '#9ca3af' },
            }}
          >
            {saving ? <CircularProgress size={22} color="inherit" /> : (dialogMode === 'create' ? 'Create Staff Member (कर्मचारी बनाएं)' : 'Save Changes (परिवर्तन सहेजें)')}
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
            Are you sure you want to delete staff member <strong>{staffToDelete?.name}</strong>?
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


