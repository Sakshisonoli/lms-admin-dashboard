import React from 'react';
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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

const BatchCard = ({ batch }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
            {batch.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton 
              size="small" 
              sx={{ 
                color: '#1d8cf8',
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
        <Typography variant="body2" sx={{ color: '#9a9a9a', mb: 1 }}>
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
              backgroundColor: batch.status === 'Active' ? '#00d4aa' : '#1d8cf8',
              borderRadius: 4,
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PeopleIcon sx={{ color: '#9a9a9a', fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
            {batch.studentCount} Students
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon sx={{ color: '#9a9a9a', fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
            {batch.courseCount} Courses
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#9a9a9a', mb: 1.5 }}>
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
                color: '#1d8cf8',
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

      <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
        Duration: {batch.duration}
      </Typography>
    </CardContent>
  </Card>
);

function Batches() {
  const batchesData = [
    {
      id: 1,
      name: 'Mathematics Foundation',
      status: 'Active',
      progress: 75,
      studentCount: 45,
      courseCount: 8,
      teachers: ['Dr. Emily Brown', 'Prof. Smith'],
      duration: '6 months',
    },
    {
      id: 2,
      name: 'Physics Advanced',
      status: 'Active',
      progress: 60,
      studentCount: 32,
      courseCount: 12,
      teachers: ['Prof. David Wilson', 'Dr. Johnson'],
      duration: '8 months',
    },
    {
      id: 3,
      name: 'Chemistry Basics',
      status: 'Completed',
      progress: 100,
      studentCount: 28,
      courseCount: 6,
      teachers: ['Ms. Sarah Lee'],
      duration: '4 months',
    },
    {
      id: 4,
      name: 'Biology Intermediate',
      status: 'Pending',
      progress: 0,
      studentCount: 0,
      courseCount: 10,
      teachers: ['Mr. John Taylor', 'Dr. Wilson'],
      duration: '7 months',
    },
    {
      id: 5,
      name: 'Computer Science',
      status: 'Active',
      progress: 40,
      studentCount: 55,
      courseCount: 15,
      teachers: ['Prof. Anderson', 'Ms. Davis', 'Mr. Brown'],
      duration: '12 months',
    },
    {
      id: 6,
      name: 'English Literature',
      status: 'Active',
      progress: 85,
      studentCount: 38,
      courseCount: 9,
      teachers: ['Dr. Thompson', 'Ms. Garcia'],
      duration: '5 months',
    },
  ];

  const stats = {
    total: batchesData.length,
    active: batchesData.filter(b => b.status === 'Active').length,
    completed: batchesData.filter(b => b.status === 'Completed').length,
    pending: batchesData.filter(b => b.status === 'Pending').length,
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
          Batch Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#e14eca',
            '&:hover': { backgroundColor: '#c73aa8' },
          }}
        >
          Create Batch
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#1d8cf8', fontWeight: 'bold' }}>
                {stats.total}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Total Batches
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#00d4aa', fontWeight: 'bold' }}>
                {stats.active}
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
                {stats.completed}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#ff8a00', fontWeight: 'bold' }}>
                {stats.pending}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Batch Cards */}
      <Grid container spacing={3}>
        {batchesData.map((batch) => (
          <Grid item xs={12} sm={6} md={4} key={batch.id}>
            <BatchCard batch={batch} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Batches;