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
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Email as EmailIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

function Students() {
  const handleSendMessage = (member) => {
    alert(`Send direct message to ${member.name}`);
  };

  const students = [
    { id: 1, name: 'Alex Kumar', email: 'alex@student.army.gov.in', status: 'Active', batch: 'Batch A', course: 'Mathematics', progress: 85 },
    { id: 2, name: 'Priya Sharma', email: 'priya@student.army.gov.in', status: 'Active', batch: 'Batch B', course: 'Physics', progress: 92 },
    { id: 3, name: 'Raj Patel', email: 'raj@student.army.gov.in', status: 'Active', batch: 'Batch A', course: 'Mathematics', progress: 78 },
    { id: 4, name: 'Maya Singh', email: 'maya@student.army.gov.in', status: 'Inactive', batch: 'Batch C', course: 'Chemistry', progress: 65 },
    { id: 5, name: 'Arjun Reddy', email: 'arjun@student.army.gov.in', status: 'Active', batch: 'Batch B', course: 'Physics', progress: 88 },
    { id: 6, name: 'Sneha Gupta', email: 'sneha@student.army.gov.in', status: 'Active', batch: 'Batch A', course: 'Mathematics', progress: 95 },
    { id: 7, name: 'Vikram Joshi', email: 'vikram@student.army.gov.in', status: 'Active', batch: 'Batch C', course: 'Chemistry', progress: 72 },
    { id: 8, name: 'Anita Verma', email: 'anita@student.army.gov.in', status: 'Active', batch: 'Batch B', course: 'Physics', progress: 89 },
  ];

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        mb: 3,
        gap: 2,
      }}>
        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Students Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#e14eca',
            '&:hover': { backgroundColor: '#c73aa8' },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          Add Student
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#1d8cf8', fontWeight: 'bold' }}>
                {students.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#00d4aa', fontWeight: 'bold' }}>
                {students.filter(s => s.status === 'Active').length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Active Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#ff8a00', fontWeight: 'bold' }}>
                3
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Active Batches
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#e14eca', fontWeight: 'bold' }}>
                83%
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Avg Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
              Students Directory
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              alignItems: { xs: 'stretch', sm: 'center' },
            }}>
              <TextField
                placeholder="Search students..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#9a9a9a' }} />
                    </InputAdornment>
                  ),
                }}
                size="small"
                sx={{ flex: { xs: 1, sm: 'auto' }, minWidth: { sm: 200 } }}
              />
              <FormControl size="small" sx={{ flex: { xs: 1, sm: 'auto' }, minWidth: { xs: '100%', sm: 120 } }}>
                <InputLabel sx={{ color: '#9a9a9a' }}>Batch</InputLabel>
                <Select label="Batch" defaultValue="">
                  <MenuItem value="">All Batches</MenuItem>
                  <MenuItem value="batch-a">Batch A</MenuItem>
                  <MenuItem value="batch-b">Batch B</MenuItem>
                  <MenuItem value="batch-c">Batch C</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          
          <TableContainer component={Paper} sx={{ backgroundColor: '#27293d', overflowX: 'auto' }}>
            <Table sx={{ minWidth: { xs: 650, sm: 'auto' } }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Batch</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Course</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Progress</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ backgroundColor: '#e14eca' }}>
                          {student.name.charAt(0)}
                        </Avatar>
                        <Typography sx={{ color: '#ffffff' }}>{student.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{student.email}</TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{student.batch}</TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{student.course}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ color: '#ffffff' }}>{student.progress}%</Typography>
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
                              backgroundColor: student.progress >= 80 ? '#00d4aa' : student.progress >= 60 ? '#ff8a00' : '#fd5d93',
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
                        <IconButton size="small" sx={{ color: '#1d8cf8' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: '#e14eca' }}
                          onClick={() => handleSendMessage(student)}
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

export default Students;