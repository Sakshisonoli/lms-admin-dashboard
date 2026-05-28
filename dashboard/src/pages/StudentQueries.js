import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { queryAPI } from '../services/api';
import {
  Box, Typography, Card, CardContent, Grid, Chip, Avatar, Paper,
  Button, Divider, Badge, CircularProgress, TextField, Alert,
} from '@mui/material';
import {
  Reply as ReplyIcon,
  Visibility as ViewIcon,
  CheckCircle as ResolvedIcon,
  HourglassEmpty as PendingIcon,
  QuestionAnswer as QuestionIcon,
} from '@mui/icons-material';

function StudentQueries() {
  const navigate = useNavigate();
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchQueries = useCallback(async () => {
    try {
      const res = await queryAPI.getAll();
      setQueries(res.data);
      // Mark all queries as seen and immediately refresh the badge
      queryAPI.markSeen()
        .then(() => window.dispatchEvent(new Event('refreshUnread')))
        .catch(() => {});;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQueries();
    const interval = setInterval(fetchQueries, 30000);
    return () => clearInterval(interval);
  }, [fetchQueries]);

  const filteredQueries = queries.filter(q =>
    filterStatus === 'all' || q.status === filterStatus
  );

  const stats = {
    total: queries.length,
    pending: queries.filter(q => q.status === 'pending').length,
    resolved: queries.filter(q => q.status === 'resolved').length,
  };

  const handleReplySubmit = async (queryId) => {
    if (!replyText.trim()) return;
    try {
      setSubmitting(true);
      await queryAPI.reply(queryId, replyText);
      setReplyTo(null);
      setReplyText('');
      await fetchQueries();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const timeAgo = (date) => {
    if (!date) return '';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds} secs ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader title="Student Queries & Questions (छात्र प्रश्न और सवाल)" />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card onClick={() => setFilterStatus('all')}
            sx={{ cursor: 'pointer', border: filterStatus === 'all' ? '2px solid #FF6B00' : '1px solid transparent' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#FF6B00', mr: 2 }}><QuestionIcon /></Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF6B00', fontWeight: 'bold' }}>{stats.total}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>Total Queries</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card onClick={() => setFilterStatus('pending')}
            sx={{ cursor: 'pointer', border: filterStatus === 'pending' ? '2px solid #FF8C00' : '1px solid transparent' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Badge badgeContent={stats.pending} color="error">
                  <Avatar sx={{ backgroundColor: '#FF8C00', mr: 2 }}><PendingIcon /></Avatar>
                </Badge>
                <Box sx={{ ml: 1 }}>
                  <Typography variant="h4" sx={{ color: '#FF8C00', fontWeight: 'bold' }}>{stats.pending}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>Pending Replies</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card onClick={() => setFilterStatus('resolved')}
            sx={{ cursor: 'pointer', border: filterStatus === 'resolved' ? '2px solid #3B5323' : '1px solid transparent' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#3B5323', mr: 2 }}><ResolvedIcon /></Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#3B5323', fontWeight: 'bold' }}>{stats.resolved}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>Resolved</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Queries List */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#1f2937' }}>
              {filterStatus === 'all' ? 'All Queries' : filterStatus === 'pending' ? 'Pending Queries' : 'Resolved Queries'}
              {filterStatus !== 'all' && (
                <Chip label={`Status: ${filterStatus}`} onDelete={() => setFilterStatus('all')}
                  sx={{ ml: 2, backgroundColor: '#FF6B00', color: '#ffffff' }} />
              )}
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress sx={{ color: '#c62020ff' }} />
            </Box>
          ) : filteredQueries.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: '#6b7280' }}>No queries found</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredQueries.map((query) => (
                <Paper key={query._id} sx={{
                  p: 2, backgroundColor: '#1d1dabff', border: '1px solid #344675',
                  '&:hover': { borderColor: query.status === 'pending' ? '#FF8C00' : '#3B5323' },
                }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar sx={{ backgroundColor: '#FF6B00' }}>
                      {query.student?.name?.charAt(0) || 'S'}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      {/* Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                            <Typography variant="subtitle2" sx={{ color: '#ffffff' }}>
                              {query.student?.name || 'Student'}
                            </Typography>
                            {query.batch?.name && (
                              <Chip label={query.batch.name} size="small"
                                sx={{ backgroundColor: 'rgba(29,140,248,0.15)', color: '#FF6B00', height: 20, fontSize: '0.7rem' }} />
                            )}
                            <Typography variant="caption" sx={{ color: '#6b7280' }}>
                              • {timeAgo(query.createdAt)}
                            </Typography>
                          </Box>
                          {query.content?.title && (
                            <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                              Document: {query.content.title}
                            </Typography>
                          )}
                        </Box>
                        <Chip icon={query.status === 'pending' ? <PendingIcon /> : <ResolvedIcon />}
                          label={query.status} size="small"
                          color={query.status === 'pending' ? 'warning' : 'success'} />
                      </Box>

                      {/* Question */}
                      <Typography variant="body2" sx={{ color: '#e5e7eb', mb: 1.5, mt: 1 }}>
                        {query.question}
                      </Typography>

                      {/* Existing reply */}
                      {query.reply && (
                        <Box sx={{ mb: 1.5, pl: 2, borderLeft: '3px solid #FF8C00', backgroundColor: 'rgba(255,140,0,0.08)', p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" sx={{ color: '#FF8C00', fontWeight: 700, display: 'block', mb: 0.5 }}>
                            Your reply:
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#e5e7eb' }}>{query.reply}</Typography>
                        </Box>
                      )}

                      {/* Inline reply form */}
                      {replyTo === query._id && (
                        <Box sx={{ mb: 1.5, p: 1.5, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
                          <TextField fullWidth multiline rows={3} placeholder="Write your reply..."
                            value={replyText} onChange={(e) => setReplyText(e.target.value)}
                            sx={{ mb: 1, '& .MuiOutlinedInput-root': { color: '#ffffff' },
                              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' } }} />
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button size="small" variant="contained" onClick={() => handleReplySubmit(query._id)}
                              disabled={!replyText.trim() || submitting}
                              sx={{ backgroundColor: '#c62020ff', '&:hover': { backgroundColor: '#a01818' } }}>
                              {submitting ? <CircularProgress size={16} color="inherit" /> : 'Submit Reply'}
                            </Button>
                            <Button size="small" onClick={() => { setReplyTo(null); setReplyText(''); }}
                              sx={{ color: '#9ca3af' }}>
                              Cancel
                            </Button>
                          </Box>
                        </Box>
                      )}

                      <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.1)' }} />

                      {/* Action buttons */}
                      <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                        {query.status === 'pending' && replyTo !== query._id && (
                          <Button size="small" startIcon={<ReplyIcon />} variant="contained"
                            onClick={() => { setReplyTo(query._id); setReplyText(''); }}
                            sx={{ backgroundColor: '#FF8C00', color: '#ffffff', '&:hover': { backgroundColor: '#e67700' } }}>
                            Reply Now
                          </Button>
                        )}
                        {query.status === 'resolved' && (
                          <Button size="small" startIcon={<ResolvedIcon />} variant="outlined"
                            sx={{ borderColor: '#3B5323', color: '#3B5323' }} disabled>
                            Resolved
                          </Button>
                        )}
                        {query.content?._id && (
                          <Button size="small" startIcon={<ViewIcon />}
                            onClick={() => navigate(`/teacher/document/${query.content._id}`)}
                            sx={{ color: '#9ca3af' }}>
                            View Document
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default StudentQueries;
