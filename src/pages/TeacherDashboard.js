import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Article as ArticleIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color, progress }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ backgroundColor: color, mr: 2 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
            {value}
          </Typography>
          <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
            {title}
          </Typography>
        </Box>
      </Box>
      {progress && (
        <Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: color,
              },
            }}
          />
          <Typography variant="caption" sx={{ color: '#9a9a9a', mt: 1 }}>
            {progress}% completion
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

function TeacherDashboard() {
  const myStudents = [
    { name: 'Alex Kumar', batch: 'Batch A', progress: 85, status: 'Active' },
    { name: 'Priya Sharma', batch: 'Batch A', progress: 92, status: 'Active' },
    { name: 'Raj Patel', batch: 'Batch B', progress: 78, status: 'Active' },
    { name: 'Sneha Gupta', batch: 'Batch A', progress: 95, status: 'Active' },
  ];

  const recentActivities = [
    { student: 'Alex Kumar', action: 'Submitted assignment', time: '1 hour ago' },
    { student: 'Priya Sharma', action: 'Completed lesson 5', time: '3 hours ago' },
    { student: 'Raj Patel', action: 'Asked a question', time: '5 hours ago' },
    { student: 'Sneha Gupta', action: 'Passed quiz', time: '1 day ago' },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ color: '#ffffff', mb: 3, fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        Teacher Dashboard Analytics
      </Typography>
      
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="My Students"
            value="45"
            icon={<PeopleIcon />}
            color="#1d8cf8"
            progress={85}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="My Batches"
            value="3"
            icon={<SchoolIcon />}
            color="#00d4aa"
            progress={100}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Content Uploaded"
            value="28"
            icon={<ArticleIcon />}
            color="#ff8a00"
            progress={70}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Reviews"
            value="12"
            icon={<AssignmentIcon />}
            color="#e14eca"
            progress={40}
          />
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                My Students Progress
              </Typography>
              <Box sx={{ height: 320, overflowY: 'auto', pr: 1 }}>
                {myStudents.map((student, index) => (
                  <Card 
                    key={index} 
                    sx={{ 
                      mb: 2, 
                      backgroundColor: '#1e1e2f',
                      border: '1px solid #344675',
                      '&:hover': {
                        borderColor: '#1d8cf8',
                        backgroundColor: 'rgba(29, 140, 248, 0.05)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                        <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                          {student.name}
                        </Typography>
                        <Chip 
                          label={student.batch} 
                          size="small" 
                          sx={{
                            backgroundColor: 'rgba(29, 140, 248, 0.15)',
                            color: '#1d8cf8',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#9a9a9a',
                            minWidth: 80,
                            fontSize: '0.875rem',
                          }}
                        >
                          Progress: {student.progress}%
                        </Typography>
                        <Box
                          sx={{
                            flexGrow: 1,
                            height: 8,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: 4,
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            sx={{
                              width: `${student.progress}%`,
                              height: '100%',
                              backgroundColor: student.progress >= 80 ? '#00d4aa' : student.progress >= 60 ? '#1d8cf8' : '#ff8a00',
                              borderRadius: 4,
                              transition: 'width 0.3s ease',
                            }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                Recent Student Activities
              </Typography>
              <Box sx={{ height: 320, overflowY: 'auto' }}>
                <List>
                  {recentActivities.map((activity, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: '#1d8cf8', width: 32, height: 32 }}>
                          {activity.student.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.action}
                        secondary={`${activity.student} • ${activity.time}`}
                        sx={{
                          '& .MuiListItemText-primary': { color: '#ffffff', fontSize: '0.875rem' },
                          '& .MuiListItemText-secondary': { color: '#9a9a9a', fontSize: '0.75rem' },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TeacherDashboard;