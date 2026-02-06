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

function Teachers() {
  const handleSendMessage = (member) => {
    alert(`Send direct message to ${member.name}`);
  };

  const teachers = [
    { id: 1, name: 'Dr. Emily Brown', email: 'emily@army.gov.in', status: 'Active', subject: 'Mathematics', experience: '8 years' },
    { id: 2, name: 'Prof. David Wilson', email: 'david@army.gov.in', status: 'Active', subject: 'Physics', experience: '12 years' },
    { id: 3, name: 'Ms. Sarah Lee', email: 'sarah@army.gov.in', status: 'Active', subject: 'Chemistry', experience: '6 years' },
    { id: 4, name: 'Mr. John Taylor', email: 'john@army.gov.in', status: 'Inactive', subject: 'Biology', experience: '10 years' },
    { id: 5, name: 'Dr. Michael Chen', email: 'michael@army.gov.in', status: 'Active', subject: 'Computer Science', experience: '15 years' },
    { id: 6, name: 'Ms. Lisa Anderson', email: 'lisa@army.gov.in', status: 'Active', subject: 'English', experience: '7 years' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
          Teachers Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#e14eca',
            '&:hover': { backgroundColor: '#c73aa8' },
          }}
        >
          Add Teacher
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#1d8cf8', fontWeight: 'bold' }}>
                {teachers.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Total Teachers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#00d4aa', fontWeight: 'bold' }}>
                {teachers.filter(t => t.status === 'Active').length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Active Teachers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#ff8a00', fontWeight: 'bold' }}>
                6
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Subjects
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#e14eca', fontWeight: 'bold' }}>
                9.5
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Avg Experience
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
            Teachers Directory
          </Typography>
          <TableContainer component={Paper} sx={{ backgroundColor: '#27293d' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Subject</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Experience</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ backgroundColor: '#e14eca' }}>
                          {teacher.name.charAt(0)}
                        </Avatar>
                        <Typography sx={{ color: '#ffffff' }}>{teacher.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{teacher.email}</TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{teacher.subject}</TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{teacher.experience}</TableCell>
                    <TableCell>
                      <Chip
                        label={teacher.status}
                        color={teacher.status === 'Active' ? 'success' : 'default'}
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
                          onClick={() => handleSendMessage(teacher)}
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

export default Teachers;