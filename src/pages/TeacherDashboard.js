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
          <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold' }}>
            {value}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
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
          <Typography variant="caption" sx={{ color: '#6b7280', mt: 1 }}>
            {progress}% completion
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

function TeacherDashboard() {
  const myStudents = [
    { name: 'Rahul Kumar', batch: 'Commando', progress: 85, status: 'Active' },
    { name: 'Priya Sharma', batch: 'Commando', progress: 92, status: 'Active' },
    { name: 'Raj Patel', batch: 'Platoon Commander', progress: 78, status: 'Active' },
    { name: 'Sneha Gupta', batch: 'Commando', progress: 95, status: 'Active' },
  ];

  const recentActivities = [
    { student: 'Rahul Kumar', action: 'Submitted assignment', time: '1 hour ago' },
    { student: 'Priya Sharma', action: 'Completed lesson 5', time: '3 hours ago' },
    { student: 'Raj Patel', action: 'Asked a question', time: '5 hours ago' },
    { student: 'Sneha Gupta', action: 'Passed quiz', time: '1 day ago' },
  ];

  return (
    <Box sx={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      {/* Hero Banner Section */}
      <Box
        sx={{
          position: 'relative',
          height: '300px',
          backgroundImage: 'url("https://ssbcrackexams.com/wp-content/uploads/2024/06/Indian-Army.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(11, 31, 58, 0.85) 0%, rgba(59, 83, 35, 0.75) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: 3 }}>
          <Typography
            variant="h2"
            sx={{
              color: '#ffffff',
              fontWeight: 900,
              fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
              textTransform: 'uppercase',
              letterSpacing: '3px',
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              mb: 1,
            }}
          >
            THE JUNIOR LEADERS WING (JLW) (जूनियर लीडर्स विंग)
          </Typography>
          <Box
            sx={{
              width: '120px',
              height: '4px',
              backgroundColor: '#FF8C00',
              margin: '0 auto 16px',
            }}
          />
          <Typography
            variant="h4"
            sx={{
              color: '#FF8C00',
              fontWeight: 700,
              fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
            }}
          >
            TEACHER DASHBOARD (शिक्षक डैशबोर्ड)
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="My Students"
            value="45"
            icon={<PeopleIcon />}
            color="#FF6B00"
            progress={85}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="My Batches"
            value="2"
            icon={<SchoolIcon />}
            color="#3B5323"
            progress={100}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Content Uploaded"
            value="28"
            icon={<ArticleIcon />}
            color="#FF8C00"
            progress={70}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Reviews"
            value="12"
            icon={<AssignmentIcon />}
            color="#c62020ff"
            progress={40}
          />
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#1f2937', mb: 3 }}>
                My Students Progress
              </Typography>
              <Box sx={{ height: 320, overflowY: 'auto', pr: 1 }}>
                {myStudents.map((student, index) => (
                  <Card 
                    key={index} 
                    sx={{ 
                      mb: 2, 
                      backgroundColor: '#1d1dabff',
                      border: '2px solid #FF8C00',
                      '&:hover': {
                        borderColor: '#FF6B00',
                        backgroundColor: '#1d1dabff',
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
                            color: '#FF6B00',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#9ca3af',
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
                              backgroundColor: student.progress >= 80 ? '#3B5323' : student.progress >= 60 ? '#FF6B00' : '#FF8C00',
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
              <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>
                Recent Student Activities
              </Typography>
              <Box sx={{ height: 320, overflowY: 'auto' }}>
                <List>
                  {recentActivities.map((activity, index) => (
                    <Card
                      key={index}
                      sx={{
                        mb: 2,
                        backgroundColor: '#1d1dabff',
                        border: '1px solid #344675',
                      }}
                    >
                      <ListItem sx={{ px: 2, py: 1.5 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ backgroundColor: '#FF6B00', width: 32, height: 32 }}>
                            {activity.student.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={activity.action}
                          secondary={`${activity.student} • ${activity.time}`}
                          sx={{
                            '& .MuiListItemText-primary': { color: '#ffffff', fontSize: '0.875rem' },
                            '& .MuiListItemText-secondary': { color: '#9ca3af', fontSize: '0.75rem' },
                          }}
                        />
                      </ListItem>
                    </Card>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
}

export default TeacherDashboard;




