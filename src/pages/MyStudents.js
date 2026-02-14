import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
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
  IconButton,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  Email as EmailIcon,
  Visibility as ViewIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

function MyStudents() {
  const navigate = useNavigate();
  const { userContext, filterByAccess, getAccessibleBatches } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('all');

  // Get teacher's accessible batches
  const myBatches = getAccessibleBatches();
  
  // All students
  const allStudents = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@student.army.gov.in', batch: 'Commando', progress: 85, status: 'Active', lastActive: '2 hours ago' },
    { id: 2, name: 'Priya Singh', email: 'priya.singh@student.army.gov.in', batch: 'Platoon Commander', progress: 92, status: 'Active', lastActive: '1 hour ago' },
    { id: 3, name: 'Raj Patel', email: 'raj.patel@student.army.gov.in', batch: 'Commando', progress: 78, status: 'Active', lastActive: '5 hours ago' },
    { id: 4, name: 'Sneha Gupta', email: 'sneha.gupta@student.army.gov.in', batch: 'Commando', progress: 95, status: 'Active', lastActive: '30 mins ago' },
    { id: 5, name: 'Arjun Verma', email: 'arjun.verma@student.army.gov.in', batch: 'Platoon Commander', progress: 88, status: 'Active', lastActive: '3 hours ago' },
    { id: 6, name: 'Anjali Reddy', email: 'anjali.reddy@student.army.gov.in', batch: 'Platoon Commander', progress: 65, status: 'Active', lastActive: '1 day ago' },
  ];

  // Filter students by teacher's assigned batches
  const students = filterByAccess(allStudents, (student) => student.batch);

  const filteredStudents = students.filter(student => {
    const matchesBatch = filterBatch === 'all' || student.batch === filterBatch;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBatch && matchesSearch;
  });

  const batchStats = myBatches.reduce((acc, batch) => {
    acc[batch] = students.filter(s => s.batch === batch).length;
    return acc;
  }, {});

  const handleSendMessage = (student) => {
    // Navigate to messages page with the student's info
    navigate('/teacher/messages', { state: { recipient: student } });
  };

  const handleViewProfile = (student) => {
    alert(`View profile of ${student.name}`);
  };

  return (
    <Box>
      <Box sx={{ mb: 2, pb: 2, borderBottom: '2px solid #FF8C00' }}>
        <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold' }}>
          My Students (मेरे छात्र)
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        {userContext.userType === 'teacher' && myBatches.length > 0 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Showing students from your assigned batches: <strong>{myBatches.join(', ')}</strong>
          </Alert>
        )}
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
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
            sx={{ cursor: 'pointer', height: '100%', '&:hover': { borderColor: '#3B5323', border: '1px solid' } }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
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
            sx={{ cursor: 'pointer', height: '100%', '&:hover': { borderColor: '#FF8C00', border: '1px solid' } }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
                <Avatar sx={{ backgroundColor: '#FF8C00', mr: 2 }}>
                  <SchoolIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF8C00', fontWeight: 'bold' }}>
                    {batchStats['Platoon Commander']}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Platoon Commander
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
                <Avatar sx={{ backgroundColor: '#c62020ff', mr: 2 }}>
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#c62020ff', fontWeight: 'bold' }}>
                    {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Avg Progress
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
              Students in My Batches
              {filterBatch !== 'all' && (
                <Chip 
                  label={`Filtered: ${filterBatch}`}
                  onDelete={() => setFilterBatch('all')}
                  sx={{ ml: 2, backgroundColor: '#FF6B00', color: '#1f2937' }}
                />
              )}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                sx={{ minWidth: 250 }}
              />
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Filter by Batch</InputLabel>
                <Select 
                  value={filterBatch}
                  onChange={(e) => setFilterBatch(e.target.value)}
                  label="Filter by Batch"
                >
                  <MenuItem value="all">All My Batches</MenuItem>
                  {myBatches.map((batch) => (
                    <MenuItem key={batch} value={batch}>{batch}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ backgroundColor: '#1d1dabff' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Student</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Batch</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Progress</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Last Active</TableCell>
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
                          <Avatar sx={{ backgroundColor: '#FF6B00' }}>
                            {student.name.charAt(0)}
                          </Avatar>
                          <Typography sx={{ color: '#1f2937' }}>{student.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#6b7280' }}>{student.email}</TableCell>
                      <TableCell>
                        <Chip 
                          label={student.batch} 
                          size="small"
                          sx={{
                            backgroundColor: student.batch === 'Commando' ? 'rgba(0, 212, 170, 0.15)' : student.batch === 'Platoon Commander' ? 'rgba(255, 138, 0, 0.15)' : 'rgba(29, 140, 248, 0.15)',
                            color: student.batch === 'Commando' ? '#3B5323' : student.batch === 'Platoon Commander' ? '#FF8C00' : '#FF6B00',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 150 }}>
                          <Typography sx={{ color: '#1f2937', minWidth: 40 }}>{student.progress}%</Typography>
                          <Box
                            sx={{
                              flexGrow: 1,
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
                                backgroundColor: student.progress >= 80 ? '#3B5323' : student.progress >= 60 ? '#FF6B00' : '#FF8C00',
                              }}
                            />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#6b7280' }}>{student.lastActive}</TableCell>
                      <TableCell>
                        <Chip
                          label={student.status}
                          color="success"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            sx={{ color: '#FF6B00' }}
                            onClick={() => handleViewProfile(student)}
                          >
                            <ViewIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ color: '#c62020ff' }}
                            onClick={() => handleSendMessage(student)}
                          >
                            <EmailIcon />
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
    </Box>
  );
}

export default MyStudents;

