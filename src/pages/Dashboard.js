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
  QuestionAnswer as QueryIcon,
  TrendingUp as ActivityIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color, progress }) => (
  <Card sx={{ 
    height: '100%',
    background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
    border: '2px solid #e5e7eb',
  }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ backgroundColor: color, mr: 2, width: 56, height: 56 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 900, fontSize: '2rem' }}>
            {value}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
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
              backgroundColor: '#e5e7eb',
              height: 8,
              borderRadius: 4,
              '& .MuiLinearProgress-bar': {
                backgroundColor: color,
                borderRadius: 4,
              },
            }}
          />
          <Typography variant="caption" sx={{ color: '#6b7280', mt: 1, fontWeight: 600 }}>
            {progress}% of target
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

function Dashboard() {
  // Student Activity Tracking
  const recentActivities = [
    { user: 'Rahul Sharma', action: 'Completed Military Strategy Module', time: '15 mins ago', type: 'completion' },
    { user: 'Priya Patel', action: 'Submitted query on Weapons Training', time: '1 hour ago', type: 'query' },
    { user: 'Amit Kumar', action: 'Viewed Physical Training Guide', time: '2 hours ago', type: 'view' },
    { user: 'Sneha Gupta', action: 'Downloaded Leadership Assessment', time: '3 hours ago', type: 'download' },
    { user: 'Vikram Singh', action: 'Completed Combat Drills Assessment', time: '4 hours ago', type: 'completion' },
    { user: 'Anjali Reddy', action: 'Asked question on Tactical Operations', time: '5 hours ago', type: 'query' },
  ];

  // Total Users by Role
  const userStats = {
    totalUsers: 2847,
    students: 2234,
    teachers: 156,
    staff: 45,
    admins: 12,
  };

  // Group Statistics
  const groupStats = {
    totalBatches: 24,
    activeBatches: 2,
    batchDetails: [
      { name: 'Commando', students: 45, status: 'Active' },
      { name: 'Platoon Commander', students: 38, status: 'Active' },
    ],
  };

  // Document Upload Counts
  const contentStats = {
    totalContent: 1234,
    documents: 856,
    videos: 234,
    assessments: 144,
    uploadsThisMonth: 87,
    uploadsThisWeek: 23,
  };

  // Query Statistics
  const queryStats = {
    totalQueries: 456,
    pendingQueries: 89,
    resolvedQueries: 367,
    avgResponseTime: '4.2 hours',
  };

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
            background: 'linear-gradient(135deg, rgba(11, 31, 58, 0.85) 0%, rgba(139, 0, 0, 0.75) 100%)',
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
            SUPER ADMIN DASHBOARD (सुपर व्यवस्थापक डैशबोर्ड)
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Main Stats Cards - Total Users by Role */}
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              value={userStats.totalUsers.toLocaleString()}
              icon={<PeopleIcon />}
              color="#FF8C00"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Batches"
              value={groupStats.activeBatches}
              icon={<SchoolIcon />}
              color="#3B5323"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Content"
              value={contentStats.totalContent.toLocaleString()}
              icon={<ArticleIcon />}
              color="#c62020ff"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Queries"
              value={queryStats.totalQueries}
              icon={<QueryIcon />}
              color="#0b1f3a"
            />
          </Grid>
        </Grid>

      {/* Student Activity Tracking & Query Statistics */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: { xs: 'auto', md: 450 }, backgroundColor: '#ffffff', border: '2px solid #e5e7eb' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: '2px solid #FF8C00' }}>
                <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Student Activity Tracking
                </Typography>
                <ActivityIcon sx={{ color: '#FF8C00' }} />
              </Box>
              <Box sx={{ height: { xs: 300, md: 360 }, overflowY: 'auto' }}>
                <List>
                  {recentActivities.map((activity, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          backgroundColor: activity.type === 'completion' ? '#3B5323' : 
                                         activity.type === 'query' ? '#c62020ff' : 
                                         activity.type === 'download' ? '#FF8C00' : '#0b1f3a',
                          width: 40, 
                          height: 40,
                          fontWeight: 700,
                        }}>
                          {activity.user.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.action}
                        secondary={`${activity.user} • ${activity.time}`}
                        sx={{
                          '& .MuiListItemText-primary': { color: '#1f2937', fontSize: '0.875rem', mb: 0.5, fontWeight: 600 },
                          '& .MuiListItemText-secondary': { color: '#6b7280', fontSize: '0.75rem' },
                        }}
                      />
                      <Chip 
                        label={activity.type} 
                        size="small"
                        sx={{ 
                          backgroundColor: activity.type === 'completion' ? 'rgba(59, 83, 35, 0.15)' : 
                                          activity.type === 'query' ? 'rgba(139, 0, 0, 0.15)' : 
                                          activity.type === 'download' ? 'rgba(255, 140, 0, 0.15)' : 'rgba(11, 31, 58, 0.15)',
                          color: activity.type === 'completion' ? '#3B5323' : 
                                activity.type === 'query' ? '#c62020ff' : 
                                activity.type === 'download' ? '#FF8C00' : '#0b1f3a',
                          fontWeight: 700,
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: { xs: 'auto', md: 500 }, backgroundColor: '#ffffff', border: '2px solid #e5e7eb' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2, borderBottom: '2px solid #c62020ff' }}>
                <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Query Statistics
                </Typography>
                <QueryIcon sx={{ color: '#c62020ff' }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'rgba(139, 0, 0, 0.1)', borderRadius: 2, border: '2px solid rgba(139, 0, 0, 0.2)' }}>
                  <Typography variant="h3" sx={{ color: '#c62020ff', fontWeight: 900, fontSize: '3rem' }}>
                    {queryStats.totalQueries}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Total Queries
                  </Typography>
                </Box>
                
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                      Pending Queries
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#FF8C00', fontWeight: 900 }}>
                      {queryStats.pendingQueries}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(queryStats.pendingQueries / queryStats.totalQueries) * 100}
                    sx={{
                      backgroundColor: '#e5e7eb',
                      height: 8,
                      borderRadius: 4,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#FF8C00',
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                      Resolved Queries
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#3B5323', fontWeight: 900 }}>
                      {queryStats.resolvedQueries}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(queryStats.resolvedQueries / queryStats.totalQueries) * 100}
                    sx={{
                      backgroundColor: '#e5e7eb',
                      height: 8,
                      borderRadius: 4,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#3B5323',
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ p: 3, pb: 4, backgroundColor: 'rgba(59, 83, 35, 0.1)', borderRadius: 2, textAlign: 'center', border: '2px solid rgba(59, 83, 35, 0.2)' }}>
                  <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mb: 1, fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    Avg Response Time
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#3B5323', fontWeight: 900 }}>
                    {queryStats.avgResponseTime}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Total Users by Role & Group Statistics */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', backgroundColor: '#ffffff', border: '2px solid #e5e7eb' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2, borderBottom: '2px solid #FF8C00' }}>
                <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Total Users by Role
                </Typography>
                <PeopleIcon sx={{ color: '#FF8C00' }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>
                      Students
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 900 }}>
                      {userStats.students.toLocaleString()} ({((userStats.students / userStats.totalUsers) * 100).toFixed(1)}%)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(userStats.students / userStats.totalUsers) * 100}
                    sx={{
                      backgroundColor: '#e5e7eb',
                      height: 8,
                      borderRadius: 4,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#FF8C00',
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>
                      Teachers
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 900 }}>
                      {userStats.teachers} ({((userStats.teachers / userStats.totalUsers) * 100).toFixed(1)}%)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(userStats.teachers / userStats.totalUsers) * 100}
                    sx={{
                      backgroundColor: '#e5e7eb',
                      height: 8,
                      borderRadius: 4,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#3B5323',
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>
                      Staff
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 900 }}>
                      {userStats.staff} ({((userStats.staff / userStats.totalUsers) * 100).toFixed(1)}%)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(userStats.staff / userStats.totalUsers) * 100}
                    sx={{
                      backgroundColor: '#e5e7eb',
                      height: 8,
                      borderRadius: 4,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#0b1f3a',
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>
                      Admins
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 900 }}>
                      {userStats.admins} ({((userStats.admins / userStats.totalUsers) * 100).toFixed(1)}%)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(userStats.admins / userStats.totalUsers) * 100}
                    sx={{
                      backgroundColor: '#e5e7eb',
                      height: 8,
                      borderRadius: 4,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#c62020ff',
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', backgroundColor: '#ffffff', border: '2px solid #e5e7eb' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2, borderBottom: '2px solid #3B5323' }}>
                <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Group Statistics
                </Typography>
                <SchoolIcon sx={{ color: '#3B5323' }} />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'rgba(59, 83, 35, 0.1)', borderRadius: 2, border: '2px solid rgba(59, 83, 35, 0.2)' }}>
                      <Typography variant="h3" sx={{ color: '#3B5323', fontWeight: 900 }}>
                        {groupStats.totalBatches}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                        Total Batches
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'rgba(255, 140, 0, 0.1)', borderRadius: 2, border: '2px solid rgba(255, 140, 0, 0.2)' }}>
                      <Typography variant="h3" sx={{ color: '#FF8C00', fontWeight: 900 }}>
                        {groupStats.activeBatches}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                        Active Batches
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {groupStats.batchDetails.map((batch, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1.5,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: 1,
                  }}>
                    <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 600 }}>
                      {batch.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {batch.students} students
                      </Typography>
                      <Chip 
                        label={batch.status} 
                        size="small"
                        color={batch.status === 'Active' ? 'success' : 'default'}
                        sx={{ minWidth: 70 }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;

