import React, { useState, useEffect, useCallback } from 'react';
import { studentAPI, contentAPI, queryAPI, batchAPI } from '../services/api';
import {
  Grid, Card, CardContent, Typography, Box,
  Avatar, List, ListItem, ListItemAvatar, ListItemText, Chip, CircularProgress,
  Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import {
  People as PeopleIcon, School as SchoolIcon,
  Article as ArticleIcon, Assignment as AssignmentIcon,
  ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon,
  CheckCircle as ViewedIcon, Cancel as NotViewedIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ backgroundColor: color, mr: 2 }}>{icon}</Avatar>
        <Box>
          <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold' }}>{value}</Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>{title}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

function TeacherDashboard() {
  const [stats, setStats] = useState({ students: 0, batches: 0, content: 0, pendingQueries: 0 });
  const [students, setStudents] = useState([]);
  const [recentQueries, setRecentQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [trackingData, setTrackingData] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const [sRes, cRes, qRes, bRes] = await Promise.all([
        studentAPI.getAll(),
        contentAPI.getAll(),
        queryAPI.getAll(),
        batchAPI.getAll(),
      ]);
      const studentList = sRes.data;
      setStats({
        students: studentList.length,
        batches: bRes.data.length,
        content: cRes.data.length,
        pendingQueries: qRes.data.filter(q => q.status === 'pending').length,
      });
      setStudents(studentList.slice(0, 6).map(s => ({
        id: s._id,
        name: s.user?.name || 'Student',
        batch: s.assignedBatch?.name || 'N/A',
      })));
      setRecentQueries(qRes.data.slice(0, 4).map(q => ({
        student: q.student?.name || 'Student',
        action: q.status === 'pending' ? 'Asked a question' : 'Query resolved',
        time: new Date(q.createdAt).toLocaleDateString(),
        status: q.status,
      })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleExpandStudent = async (studentId) => {
    if (expandedStudent === studentId) {
      setExpandedStudent(null);
      return;
    }
    setExpandedStudent(studentId);
    if (!trackingData[studentId]) {
      try {
        const res = await contentAPI.getTracking(studentId);
        setTrackingData(prev => ({ ...prev, [studentId]: res.data }));
      } catch (err) {
        console.error(err);
      }
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
          background: 'linear-gradient(135deg, rgba(11,31,58,0.85) 0%, rgba(59,83,35,0.75) 100%)', zIndex: 1,
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
            TEACHER DASHBOARD (शिक्षक डैशबोर्ड)
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
            {/* Stats */}
            <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="My Students" value={stats.students} icon={<PeopleIcon />} color="#FF6B00" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="My Batches" value={stats.batches} icon={<SchoolIcon />} color="#3B5323" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Content Uploaded" value={stats.content} icon={<ArticleIcon />} color="#FF8C00" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Pending Queries" value={stats.pendingQueries} icon={<AssignmentIcon />} color="#c62020ff" />
              </Grid>
            </Grid>

            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {/* Document Tracking */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: 450 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>
                      Student Document Tracking
                    </Typography>
                    <Box sx={{ height: 370, overflowY: 'auto', pr: 1 }}>
                      {students.length === 0 ? (
                        <Typography sx={{ color: '#6b7280', textAlign: 'center', py: 4 }}>No students yet</Typography>
                      ) : students.map((student) => (
                        <Card key={student.id} sx={{ mb: 1.5, backgroundColor: '#1d1dabff', border: '1px solid #344675' }}>
                          <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                            {/* Student row */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 30, height: 30, backgroundColor: '#FF6B00', fontSize: '0.8rem' }}>
                                  {student.name.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.85rem' }}>
                                    {student.name}
                                  </Typography>
                                  <Chip label={student.batch} size="small"
                                    sx={{ backgroundColor: 'rgba(29,140,248,0.15)', color: '#FF6B00', fontSize: '0.65rem', height: 16 }} />
                                </Box>
                              </Box>
                              <IconButton size="small" sx={{ color: '#9ca3af' }}
                                onClick={() => handleExpandStudent(student.id)}>
                                {expandedStudent === student.id ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                              </IconButton>
                            </Box>

                            {/* Expanded doc list */}
                            <Collapse in={expandedStudent === student.id}>
                              <Box sx={{ mt: 1 }}>
                                {!trackingData[student.id] ? (
                                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
                                    <CircularProgress size={18} sx={{ color: '#FF8C00' }} />
                                  </Box>
                                ) : trackingData[student.id].length === 0 ? (
                                  <Typography variant="caption" sx={{ color: '#9ca3af', pl: 1 }}>
                                    No documents uploaded for this batch yet
                                  </Typography>
                                ) : (
                                  <Table size="small">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell sx={{ color: '#9ca3af', fontSize: '0.68rem', py: 0.5, px: 0.5, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Document</TableCell>
                                        <TableCell sx={{ color: '#9ca3af', fontSize: '0.68rem', py: 0.5, px: 0.5, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Module</TableCell>
                                        <TableCell sx={{ color: '#9ca3af', fontSize: '0.68rem', py: 0.5, px: 0.5, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Viewed</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {trackingData[student.id].map((doc) => (
                                        <TableRow key={doc.id}>
                                          <TableCell sx={{ color: '#e5e7eb', fontSize: '0.72rem', py: 0.5, px: 0.5,
                                            maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                            borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            {doc.title}
                                          </TableCell>
                                          <TableCell sx={{ color: '#9ca3af', fontSize: '0.72rem', py: 0.5, px: 0.5,
                                            borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            {doc.module}
                                          </TableCell>
                                          <TableCell sx={{ py: 0.5, px: 0.5, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            {doc.viewed
                                              ? <ViewedIcon sx={{ color: '#3B5323', fontSize: 16 }} />
                                              : <NotViewedIcon sx={{ color: '#c62020ff', fontSize: 16 }} />}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                )}
                              </Box>
                            </Collapse>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Recent Queries */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: 450 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>Recent Student Queries</Typography>
                    <Box sx={{ height: 370, overflowY: 'auto' }}>
                      {recentQueries.length === 0 ? (
                        <Typography sx={{ color: '#6b7280', textAlign: 'center', py: 4 }}>No queries yet</Typography>
                      ) : (
                        <List>
                          {recentQueries.map((q, index) => (
                            <Card key={index} sx={{ mb: 2, backgroundColor: '#1d1dabff', border: '1px solid #344675' }}>
                              <ListItem sx={{ px: 2, py: 1.5 }}>
                                <ListItemAvatar>
                                  <Avatar sx={{ backgroundColor: '#FF6B00', width: 32, height: 32 }}>
                                    {q.student.charAt(0)}
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={q.action}
                                  secondary={`${q.student} • ${q.time}`}
                                  sx={{
                                    '& .MuiListItemText-primary': { color: '#ffffff', fontSize: '0.875rem' },
                                    '& .MuiListItemText-secondary': { color: '#9ca3af', fontSize: '0.75rem' },
                                  }}
                                />
                                <Chip label={q.status} size="small"
                                  color={q.status === 'pending' ? 'warning' : 'success'} />
                              </ListItem>
                            </Card>
                          ))}
                        </List>
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

export default TeacherDashboard;
