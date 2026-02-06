import React from 'react';
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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

function Staff() {
  const handleSendMessage = (member) => {
    alert(`Send direct message to ${member.name}`);
  };

  const officeStaff = [
    { id: 1, name: 'Alice Johnson', email: 'alice@army.gov.in', status: 'Active', role: 'Admin', department: 'Administration' },
    { id: 2, name: 'Bob Smith', email: 'bob@army.gov.in', status: 'Active', role: 'Manager', department: 'Operations' },
    { id: 3, name: 'Carol Davis', email: 'carol@army.gov.in', status: 'Inactive', role: 'Coordinator', department: 'Training' },
    { id: 4, name: 'David Wilson', email: 'david@army.gov.in', status: 'Active', role: 'Supervisor', department: 'Logistics' },
    { id: 5, name: 'Emma Brown', email: 'emma@army.gov.in', status: 'Active', role: 'Assistant', department: 'HR' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
          Office Staff Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#e14eca',
            '&:hover': { backgroundColor: '#c73aa8' },
          }}
        >
          Add Staff Member
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#1d8cf8', fontWeight: 'bold' }}>
                {officeStaff.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Total Staff
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#00d4aa', fontWeight: 'bold' }}>
                {officeStaff.filter(s => s.status === 'Active').length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Active Staff
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#ff8a00', fontWeight: 'bold' }}>
                5
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Departments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#e14eca', fontWeight: 'bold' }}>
                3
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Admin Roles
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
            Office Staff Directory
          </Typography>
          <TableContainer component={Paper} sx={{ backgroundColor: '#27293d' }}>
            <Table>
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
                {officeStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ backgroundColor: '#e14eca' }}>
                          {staff.name.charAt(0)}
                        </Avatar>
                        <Typography sx={{ color: '#ffffff' }}>{staff.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{staff.email}</TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{staff.role}</TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{staff.department}</TableCell>
                    <TableCell>
                      <Chip
                        label={staff.status}
                        color={staff.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ color: '#1d8cf8' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: '#e14eca' }}
                          onClick={() => handleSendMessage(staff)}
                        >
                          <EmailIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#fd5d93' }}>
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
    </Box>
  );
}

export default Staff;