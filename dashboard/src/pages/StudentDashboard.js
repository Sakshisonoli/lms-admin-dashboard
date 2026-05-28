import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentAPI, queryAPI } from '../services/api';
import {
  Grid, Card, CardContent, Typography, Box, LinearProgress,
  Avatar, List, ListItem, ListItemText, Chip, Button, CircularProgress,
} from '@mui/material';
import {
  School as SchoolIcon, Article as ArticleIcon,
  Assignment as AssignmentIcon, EmojiEvents as TrophyIcon, PlayCircle as PlayIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color, progress }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ backgroundColor: color, mr: 2 }}>{icon}</Avatar>
        <Box>
          <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold' }}>{value}</Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>{title}</Typography>
        </Box>
      </Box>
      {progress !== undefined && (
        <Box>
          <LinearProgress variant="determinate" value={Math.min(progress, 100)}
            sx={{ backgroundColor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { backgroundColor: color } }} />
          <Typography variant="caption" sx={{ color: '#6b7280', mt: 1 }}>{progress}% completed</Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

function StudentDashboard() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [myQueries, setMyQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ docs: 0, queries: 0, pending: 0, resolved: 0 });

  const fetchData = useCallback(async () => {
    try {
      const [cRes, qRes] = await Promise.all([
        contentAPI.getAll(),
        queryAPI.getAll(),
      ]);
      const docs = cRes.data;
      const queries = qRes.data;
      setDocuments(docs.slice(0, 4).map(d => ({
        id: d._id,
        title: d.title,
        type: d.type || 'Document',
        module: d.module || 'General',
        fileSize: d.fileSize || 'N/A',
        uploadedBy: d.uploadedBy?.name || 'Instructor',
        uploadedByEmail: d.uploadedBy?.email || '',
        description: d.description || '',
        fileUrl: d.fileUrl,
        batch: d.batch?.name || '',
        uploadDate: new Date(d.createdAt).toLocaleDateString(),
      })));
      setMyQueries(queries.slice(0, 4));
      setStats({
        docs: docs.length,
        queries: queries.length,
        pending: queries.filter(q => q.status === 'pending').length,
        resolved: queries.filter(q => q.status === 'resolved').length,
      });
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

  const handleViewDocument = (doc) => {
    navigate(`/student/document/${doc.id}`, {
      state: { document: doc, uploadedBy: doc.uploadedBy, uploadedByEmail: doc.uploadedByEmail },
    });
  };

  return (
    <Box sx={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <Box sx={{
        position: 'relative', height: '300px',
        backgroundImage: 'url("https://ssbcrackexams.com/wp-content/uploads/2024/06/Indian-Army.jpg")',
        backgroundSize: 'cover', backgroundPosition: 'center top',
        display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4,
        '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(11,31,58,0.85) 0%, rgba(255,140,0,0.75) 100%)', zIndex: 1 },
      }}>
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: 3 }}>
          <Typography variant="h2" sx={{ color: '#ffffff', fontWeight: 900,
            fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' }, textTransform: 'uppercase',
            letterSpacing: '3px', textShadow: '0 4px 12px rgba(0,0,0,0.5)', mb: 1 }}>
            THE JUNIOR LEADERS WING (JLW) (जूनियर लीडर्स विंग)
          </Typography>
          <Box sx={{ width: '120px', height: '4px', backgroundColor: '#FF8C00', margin: '0 auto 16px' }} />
          <Typography variant="h4" sx={{ color: '#FF8C00', fontWeight: 700,
            fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' }, textTransform: 'uppercase',
            letterSpacing: '2px', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            STUDENT DASHBOARD (छात्र डैशबोर्ड)
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
                <StatCard title="My Documents" value={stats.docs} icon={<SchoolIcon />} color="#FF6B00" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="My Queries" value={stats.queries} icon={<ArticleIcon />} color="#3B5323" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Pending Replies" value={stats.pending} icon={<AssignmentIcon />} color="#FF8C00" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Resolved" value={stats.resolved} icon={<TrophyIcon />} color="#c62020ff" />
              </Grid>
            </Grid>

            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {/* My Documents */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: 400 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>My Documents</Typography>
                    <Box sx={{ height: 320, overflowY: 'auto' }}>
                      {documents.length === 0 ? (
                        <Typography sx={{ color: '#6b7280', textAlign: 'center', py: 4 }}>No documents available yet</Typography>
                      ) : documents.map((doc, index) => (
                        <Card key={index} sx={{ mb: 2, backgroundColor: '#1d1dabff' }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {doc.title}
                              </Typography>
                              <Chip label={doc.type || 'Document'} size="small"
                                sx={{ backgroundColor: '#c62020ff', color: '#ffffff' }} />
                            </Box>
                            <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                              {doc.module} • {doc.fileSize || 'N/A'}
                            </Typography>
                            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                              <Button size="small" startIcon={<PlayIcon />}
                                onClick={() => handleViewDocument(doc)}
                                sx={{ color: '#FF8C00' }}>
                                View
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* My Queries */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: 400 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#1f2937', mb: 2 }}>My Recent Queries</Typography>
                    <Box sx={{ height: 320, overflowY: 'auto' }}>
                      {myQueries.length === 0 ? (
                        <Typography sx={{ color: '#6b7280', textAlign: 'center', py: 4 }}>No queries yet</Typography>
                      ) : (
                        <List>
                          {myQueries.map((q, index) => (
                            <Card key={index} sx={{ mb: 2, backgroundColor: '#1d1dabff' }}>
                              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                <ListItem sx={{ px: 0 }}>
                                  <ListItemText
                                    primary={
                                      <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                        {q.question?.length > 60 ? q.question.substring(0, 60) + '...' : q.question}
                                      </Typography>
                                    }
                                    secondary={
                                      <Box sx={{ mt: 0.5 }}>
                                        <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                                          {q.content?.title || 'Document'} • {new Date(q.createdAt).toLocaleDateString()}
                                        </Typography>
                                      </Box>
                                    }
                                  />
                                  <Chip label={q.status} size="small"
                                    color={q.status === 'pending' ? 'warning' : 'success'} />
                                </ListItem>
                                {q.reply && (
                                  <Box sx={{ mt: 1, pl: 1, borderLeft: '2px solid #FF8C00' }}>
                                    <Typography variant="caption" sx={{ color: '#FF8C00', fontWeight: 600 }}>
                                      Reply:
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#e5e7eb', ml: 1 }}>
                                      {q.reply?.length > 80 ? q.reply.substring(0, 80) + '...' : q.reply}
                                    </Typography>
                                  </Box>
                                )}
                              </CardContent>
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

export default StudentDashboard;
