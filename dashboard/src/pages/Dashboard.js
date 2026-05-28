import React, { useState, useEffect, useCallback } from 'react';
import { statsAPI } from '../services/api';
import {
  Grid, Card, CardContent, Typography, Box, LinearProgress,
  Avatar, List, ListItem, ListItemAvatar, ListItemText, Chip, CircularProgress,
} from '@mui/material';
import {
  People as PeopleIcon, School as SchoolIcon, Article as ArticleIcon,
  QuestionAnswer as QueryIcon, TrendingUp as ActivityIcon,
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
      {progress !== undefined && (
        <Box>
          <LinearProgress variant="determinate" value={Math.min(progress, 100)}
            sx={{ backgroundColor: '#e5e7eb', height: 8, borderRadius: 4,
              '& .MuiLinearProgress-bar': { backgroundColor: color, borderRadius: 4 } }} />
          <Typography variant="caption" sx={{ color: '#6b7280', mt: 1, fontWeight: 600 }}>
            {progress}% of target
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const res = await statsAPI.getAll();
      setStats(res.data);
    } catch (err) {
      console.error('Failed to load stats:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    // Refresh every 30 seconds so new users show up automatically
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  const activityTypeColor = (type) => {
    switch (type) {
      case 'completion': return '#3B5323';
      case 'query': return '#c62020ff';
      case 'download': return '#FF8C00';
      default: return '#0b1f3a';
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <Box sx={{
        position: 'relative', height: '300px',
        backgroundImage: 'url("https://ssbcrackexams.com/wp-content/uploads/2024/06/Indian-Army.jpg")',
        backgroundSize: 'cover', backgroundPosition: 'center top',
        display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4,
        '&::before': {
          content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(11,31,58,0.85) 0%, rgba(139,0,0,0.75) 100%)', zIndex: 1,
        },
      }}>
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: 3 }}>
          <Typography variant="h2" sx={{
            color: '#ffffff', fontWeight: 900,
            fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
            textTransform: 'uppercase', letterSpacing: '3px',
            textShadow: '0 4px 12px rgba(0,0,0,0.5)', mb: 1,
          }}>
            THE JUNIOR LEADERS WING (JLW) (जूनियर लीडर्स विंग)
          </Typography>
          <Box sx={{ width: '120px', height: '4px', backgroundColor: '#FF8C00', margin: '0 auto 16px' }} />
          <Typography variant="h4" sx={{
            color: '#FF8C00', fontWeight: 700,
            fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
            textTransform: 'uppercase', letterSpacing: '2px',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}>
            SUPER ADMIN DASHBOARD (सुपर व्यवस्थापक डैशबोर्ड)
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#c62020ff' }} size={60} />
          </Box>
        ) : (
          <>
            {/* Main Stats */}
            <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Total Users" value={stats?.users?.total?.toLocaleString() || 0}
                  icon={<PeopleIcon />} color="#FF8C00" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Active Batches" value={stats?.batches?.active || 0}
                  icon={<SchoolIcon />} color="#3B5323" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Total Content" value={stats?.content?.total?.toLocaleString() || 0}
                  icon={<ArticleIcon />} color="#c62020ff" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Total Queries" value={stats?.queries?.total || 0}
                  icon={<QueryIcon />} color="#0b1f3a" />
              </Grid>
            </Grid>

            {/* Activity & Query Stats */}
            <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
              {/* Recent Activity */}
              <Grid item xs={12} md={8}>
                <Card sx={{ height: { xs: 'auto', md: 450 }, backgroundColor: '#ffffff', border: '2px solid #e5e7eb' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: '2px solid #FF8C00' }}>
                      <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Recent Activity
                      </Typography>
                      <ActivityIcon sx={{ color: '#FF8C00' }} />
                    </Box>
                    <Box sx={{ height: { xs: 300, md: 360 }, overflowY: 'auto' }}>
                      {stats?.recentActivities?.length === 0 ? (
                        <Typography sx={{ color: '#6b7280', textAlign: 'center', py: 4 }}>No recent activity</Typography>
                      ) : (
                        <List>
                          {stats?.recentActivities?.map((activity, index) => (
                            <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
                              <ListItemAvatar>
                                <Avatar sx={{ backgroundColor: activityTypeColor(activity.type), width: 40, height: 40, fontWeight: 700 }}>
                                  {activity.user.charAt(0)}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={`${activity.action}: ${activity.target}`}
                                secondary={`${activity.user} • ${activity.time}`}
                                sx={{
                                  '& .MuiListItemText-primary': { color: '#1f2937', fontSize: '0.875rem', mb: 0.5, fontWeight: 600 },
                                  '& .MuiListItemText-secondary': { color: '#6b7280', fontSize: '0.75rem' },
                                }}
                              />
                              <Chip label={activity.category} size="small"
                                sx={{ backgroundColor: `${activityTypeColor(activity.type)}22`,
                                  color: activityTypeColor(activity.type), fontWeight: 700, fontSize: '0.7rem' }} />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Query Stats */}
              <Grid item xs={12} md={4}>
                <Card sx={{ height: { xs: 'auto', md: 450 }, backgroundColor: '#ffffff', border: '2px solid #e5e7eb' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2, borderBottom: '2px solid #c62020ff' }}>
                      <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Query Statistics
                      </Typography>
                      <QueryIcon sx={{ color: '#c62020ff' }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'rgba(198,32,32,0.1)', borderRadius: 2, border: '2px solid rgba(198,32,32,0.2)' }}>
                        <Typography variant="h3" sx={{ color: '#c62020ff', fontWeight: 900, fontSize: '3rem' }}>
                          {stats?.queries?.total || 0}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Total Queries
                        </Typography>
                      </Box>

                      {[
                        { label: 'Pending', value: stats?.queries?.pending || 0, total: stats?.queries?.total || 1, color: '#FF8C00' },
                        { label: 'Resolved', value: stats?.queries?.resolved || 0, total: stats?.queries?.total || 1, color: '#3B5323' },
                      ].map(({ label, value, total, color }) => (
                        <Box key={label}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                              {label}
                            </Typography>
                            <Typography variant="body2" sx={{ color, fontWeight: 900 }}>{value}</Typography>
                          </Box>
                          <LinearProgress variant="determinate" value={total > 0 ? (value / total) * 100 : 0}
                            sx={{ backgroundColor: '#e5e7eb', height: 8, borderRadius: 4,
                              '& .MuiLinearProgress-bar': { backgroundColor: color, borderRadius: 4 } }} />
                        </Box>
                      ))}

                    
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Users by Role & Batch Stats */}
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {/* Users by Role */}
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
                      {[
                        { label: 'Students', value: stats?.users?.students || 0, color: '#FF8C00' },
                        { label: 'Teachers', value: stats?.users?.teachers || 0, color: '#3B5323' },
                        { label: 'Staff', value: stats?.users?.staff || 0, color: '#0b1f3a' },
                        { label: 'Admins', value: stats?.users?.admins || 0, color: '#c62020ff' },
                      ].map(({ label, value, color }) => {
                        const total = stats?.users?.total || 1;
                        const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                        return (
                          <Box key={label}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>{label}</Typography>
                              <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 900 }}>
                                {value.toLocaleString()} ({pct}%)
                              </Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={parseFloat(pct)}
                              sx={{ backgroundColor: '#e5e7eb', height: 8, borderRadius: 4,
                                '& .MuiLinearProgress-bar': { backgroundColor: color, borderRadius: 4 } }} />
                          </Box>
                        );
                      })}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Batch Stats */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', backgroundColor: '#ffffff', border: '2px solid #e5e7eb' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2, borderBottom: '2px solid #3B5323' }}>
                      <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Batch Statistics
                      </Typography>
                      <SchoolIcon sx={{ color: '#3B5323' }} />
                    </Box>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'rgba(59,83,35,0.1)', borderRadius: 2, border: '2px solid rgba(59,83,35,0.2)' }}>
                          <Typography variant="h3" sx={{ color: '#3B5323', fontWeight: 900 }}>{stats?.batches?.total || 0}</Typography>
                          <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>Total Batches</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'rgba(255,140,0,0.1)', borderRadius: 2, border: '2px solid rgba(255,140,0,0.2)' }}>
                          <Typography variant="h3" sx={{ color: '#FF8C00', fontWeight: 900 }}>{stats?.batches?.active || 0}</Typography>
                          <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>Active Batches</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {stats?.batches?.details?.map((batch, index) => (
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          p: 1.5, backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: 1 }}>
                          <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 600 }}>{batch.name}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body2" sx={{ color: '#6b7280' }}>{batch.students} students</Typography>
                            <Chip label={batch.status} size="small" color={batch.status === 'Active' ? 'success' : 'default'} sx={{ minWidth: 70 }} />
                          </Box>
                        </Box>
                      ))}
                      {(!stats?.batches?.details || stats.batches.details.length === 0) && (
                        <Typography sx={{ color: '#6b7280', textAlign: 'center', py: 2 }}>No active batches</Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
