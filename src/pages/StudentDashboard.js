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
          <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold' }}>
            {value}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
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
          <Typography variant="caption" sx={{ color: '#6b7280', mt: 1 }}>
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
    { title: 'Advanced Tactics', date: 'Today, 2:00 PM', instructor: 'Col. Rajesh Kumar' },
    { title: 'Combat Drills', date: 'Tomorrow, 10:00 AM', instructor: 'Maj. Priya Sharma' },
    { title: 'Strategy Planning', date: 'Jan 30, 3:00 PM', instructor: 'Lt. Col. Amit Singh' },
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
            background: 'linear-gradient(135deg, rgba(11, 31, 58, 0.85) 0%, rgba(255, 140, 0, 0.75) 100%)',
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
            INDIAN ARMY (भारतीय सेना)
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
            STUDENT DASHBOARD (छात्र डैशबोर्ड)
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Enrolled Courses"
            value="4"
            icon={<SchoolIcon />}
            color="#FF6B00"
            progress={80}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Lessons"
            value="35"
            icon={<ArticleIcon />}
            color="#3B5323"
            progress={70}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Assignments"
            value="5"
            icon={<AssignmentIcon />}
            color="#FF8C00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Achievements"
            value="12"
            icon={<TrophyIcon />}
            color="#c62020ff"
          />
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>
                My Courses
              </Typography>
              <Box sx={{ height: 320, overflowY: 'auto' }}>
                {myCourses.map((course, index) => (
                  <Card key={index} sx={{ mb: 2, backgroundColor: '#1d1dabff' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                          {course.title}
                        </Typography>
                        <Chip
                          label={`${course.completed}/${course.lessons}`}
                          size="small"
                          sx={{ backgroundColor: '#c62020ff', color: '#ffffff' }}
                        />
                      </Box>
                      <Box sx={{ mb: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={course.progress}
                          sx={{
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: course.progress >= 80 ? '#3B5323' : '#FF6B00',
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                          {course.progress}% Complete
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<PlayIcon />}
                          sx={{ color: '#FF8C00' }}
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
              <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>
                Upcoming Lessons
              </Typography>
              <Box sx={{ height: 320, overflowY: 'auto' }}>
                <List>
                  {upcomingLessons.map((lesson, index) => (
                    <Card key={index} sx={{ mb: 2, backgroundColor: '#1d1dabff' }}>
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
                                <Typography variant="body2" sx={{ color: '#FF8C00', mb: 0.5 }}>
                                  📅 {lesson.date}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#9ca3af' }}>
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
                            borderColor: '#FF8C00',
                            color: '#FF8C00',
                            '&:hover': { borderColor: '#FF6B00', backgroundColor: 'rgba(255, 140, 0, 0.1)' },
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
    </Box>
  );
}

export default StudentDashboard;




