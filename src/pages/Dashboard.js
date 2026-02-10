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
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Article as ArticleIcon,
  TrendingUp as TrendingUpIcon,
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
            {progress}% of target
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

function Dashboard() {
  const recentActivities = [
    { user: 'John Doe', action: 'Added new course content', time: '2 hours ago' },
    { user: 'Jane Smith', action: 'Updated student batch', time: '4 hours ago' },
    { user: 'Mike Johnson', action: 'Sent notification to teachers', time: '6 hours ago' },
    { user: 'Sarah Wilson', action: 'Created new user account', time: '8 hours ago' },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ color: '#ffffff', mb: 3, fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        Dashboard Analytics
      </Typography>
      
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value="2,847"
            icon={<PeopleIcon />}
            color="#1d8cf8"
            progress={75}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Batches"
            value="156"
            icon={<SchoolIcon />}
            color="#00d4aa"
            progress={82}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Content Items"
            value="1,234"
            icon={<ArticleIcon />}
            color="#ff8a00"
            progress={68}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Monthly Growth"
            value="23.5%"
            icon={<TrendingUpIcon />}
            color="#e14eca"
            progress={90}
          />
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} md={5}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                System Overview
              </Typography>
              <Box sx={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ color: '#9a9a9a' }}>
                  Chart visualization would be implemented here
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                Recent Activities
              </Typography>
              <Box sx={{ height: 320, overflowY: 'auto' }}>
                <List>
                  {recentActivities.map((activity, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: '#e14eca', width: 32, height: 32 }}>
                          {activity.user.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.action}
                        secondary={`${activity.user} • ${activity.time}`}
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

export default Dashboard;