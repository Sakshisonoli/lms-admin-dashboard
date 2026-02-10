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
  ListItemText,
  Chip,
  Button,
} from '@mui/material';
import {
  School as SchoolIcon,
  Article as ArticleIcon,
  Assignment as AssignmentIcon,
  EmojiEvents as TrophyIcon,
  PlayCircle as PlayIcon,
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
      {progress !== undefined && (
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
            {progress}% completed
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

function StudentDashboard() {
  const myCourses = [
    { title: 'Military Strategy', progress: 85, lessons: 12, completed: 10 },
    { title: 'Physical Training', progress: 92, lessons: 8, completed: 7 },
    { title: 'Weapons Training', progress: 65, lessons: 15, completed: 10 },
    { title: 'Leadership Skills', progress: 78, lessons: 10, completed: 8 },
  ];

  const upcomingLessons = [
    { title: 'Advanced Tactics', date: 'Today, 2:00 PM', instructor: 'Col. Smith' },
    { title: 'Combat Drills', date: 'Tomorrow, 10:00 AM', instructor: 'Maj. Johnson' },
    { title: 'Strategy Planning', date: 'Jan 30, 3:00 PM', instructor: 'Lt. Col. Brown' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Welcome Back, Cadet!
          </Typography>
          <Typography variant="body1" sx={{ color: '#9a9a9a', mt: 1, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Continue your learning journey
          </Typography>
        </Box>
      </Box>
      
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Enrolled Courses"
            value="4"
            icon={<SchoolIcon />}
            color="#1d8cf8"
            progress={80}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Lessons"
            value="35"
            icon={<ArticleIcon />}
            color="#00d4aa"
            progress={70}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Assignments"
            value="5"
            icon={<AssignmentIcon />}
            color="#ff8a00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Achievements"
            value="12"
            icon={<TrophyIcon />}
            color="#e14eca"
          />
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                My Courses
              </Typography>
              <Box sx={{ height: 320, overflowY: 'auto' }}>
                {myCourses.map((course, index) => (
                  <Card key={index} sx={{ mb: 2, backgroundColor: '#1e1e2f' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                          {course.title}
                        </Typography>
                        <Chip
                          label={`${course.completed}/${course.lessons}`}
                          size="small"
                          sx={{ backgroundColor: '#e14eca', color: '#ffffff' }}
                        />
                      </Box>
                      <Box sx={{ mb: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={course.progress}
                          sx={{
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: course.progress >= 80 ? '#00d4aa' : '#1d8cf8',
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#9a9a9a' }}>
                          {course.progress}% Complete
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<PlayIcon />}
                          sx={{ color: '#e14eca' }}
                        >
                          Continue
                        </Button>
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
                Upcoming Lessons
              </Typography>
              <Box sx={{ height: 320, overflowY: 'auto' }}>
                <List>
                  {upcomingLessons.map((lesson, index) => (
                    <Card key={index} sx={{ mb: 2, backgroundColor: '#1e1e2f' }}>
                      <CardContent>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {lesson.title}
                              </Typography>
                            }
                            secondary={
                              <Box sx={{ mt: 1 }}>
                                <Typography variant="body2" sx={{ color: '#1d8cf8', mb: 0.5 }}>
                                  📅 {lesson.date}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                                  👨‍🏫 {lesson.instructor}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: '#e14eca',
                            color: '#e14eca',
                            '&:hover': { borderColor: '#c73aa8', backgroundColor: 'rgba(225, 78, 202, 0.1)' },
                          }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
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

export default StudentDashboard;