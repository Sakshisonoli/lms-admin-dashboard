import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../components/PageHeader';
import { queryAPI, contentAPI } from '../services/api';
import {
  Box, Typography, Card, CardContent, Grid, Chip, Button, TextField,
  FormControl, InputLabel, Select, MenuItem, Alert,
  CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions,
  Snackbar, Avatar,
} from '@mui/material';
import {
  Add as AddIcon, QuestionAnswer as QuestionIcon,
  CheckCircle as ResolvedIcon, HourglassEmpty as PendingIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

function MyQueries() {
  const [queries, setQueries] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [newQuery, setNewQuery] = useState({ content: '', question: '' });

  const fetchData = useCallback(async () => {
    try {
      const [qRes, cRes] = await Promise.all([queryAPI.getAll(), contentAPI.getAll()]);
      setQueries(qRes.data);
      setDocuments(cRes.data);
      // Mark all queries as seen and immediately refresh the badge
      queryAPI.markSeen()
        .then(() => window.dispatchEvent(new Event('refreshUnread')))
        .catch(() => {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredQueries = queries.filter(q =>
    filterStatus === 'All' || q.status === filterStatus.toLowerCase()
  );

  const stats = {
    total: queries.length,
    pending: queries.filter(q => q.status === 'pending').length,
    resolved: queries.filter(q => q.status === 'resolved').length,
  };

  const handleSubmitQuery = async () => {
    if (!newQuery.question.trim()) return;
    try {
      setSubmitting(true);
      await queryAPI.create({ question: newQuery.question, content: newQuery.content || undefined });
      setOpenDialog(false);
      setNewQuery({ content: '', question: '' });
      setSnackbar({ open: true, message: 'Query submitted successfully!', severity: 'success' });
      await fetchData();
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const timeAgo = (date) => {
    if (!date) return '';
    const s = Math.floor((new Date() - new Date(date)) / 1000);
    if (s < 60) return `${s}s ago`;
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader title="My Queries (मेरे प्रश्न)" buttonText="Ask a Question"
        buttonIcon={<AddIcon />} onButtonClick={() => setOpenDialog(true)} />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Queries', value: stats.total, color: '#FF6B00', icon: <QuestionIcon />, filter: 'All' },
          { label: 'Pending', value: stats.pending, color: '#FF8C00', icon: <PendingIcon />, filter: 'Pending' },
          { label: 'Resolved', value: stats.resolved, color: '#3B5323', icon: <ResolvedIcon />, filter: 'Resolved' },
        ].map((stat) => (
          <Grid item xs={12} sm={4} key={stat.label}>
            <Card onClick={() => setFilterStatus(stat.filter)}
              sx={{ cursor: 'pointer', border: filterStatus === stat.filter ? `2px solid ${stat.color}` : '1px solid transparent' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ backgroundColor: stat.color, mr: 2 }}>{stat.icon}</Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ color: stat.color, fontWeight: 'bold' }}>{stat.value}</Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>{stat.label}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Queries List */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#1f2937', mb: 3 }}>
            {filterStatus === 'All' ? 'All Queries' : `${filterStatus} Queries`}
            {filterStatus !== 'All' && (
              <Chip label={filterStatus} onDelete={() => setFilterStatus('All')}
                sx={{ ml: 2, backgroundColor: '#FF6B00', color: '#ffffff' }} />
            )}
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress sx={{ color: '#c62020ff' }} />
            </Box>
          ) : filteredQueries.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: '#6b7280', mb: 2 }}>No queries yet</Typography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}
                sx={{ backgroundColor: '#c62020ff', '&:hover': { backgroundColor: '#a01818' } }}>
                Ask Your First Question
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredQueries.map((query) => (
                <Card key={query._id} sx={{ backgroundColor: '#1d1dabff', border: '1px solid #344675',
                  '&:hover': { borderColor: query.status === 'pending' ? '#FF8C00' : '#3B5323' } }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box>
                        {query.content?.title && (
                          <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block', mb: 0.5 }}>
                            📄 {query.content.title}
                          </Typography>
                        )}
                        <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                          {query.question}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                          {timeAgo(query.createdAt)}
                        </Typography>
                      </Box>
                      <Chip icon={query.status === 'pending' ? <PendingIcon /> : <ResolvedIcon />}
                        label={query.status} size="small"
                        color={query.status === 'pending' ? 'warning' : 'success'} />
                    </Box>

                    {query.reply && (
                      <Box sx={{ mt: 2, p: 1.5, backgroundColor: 'rgba(59,83,35,0.2)', borderRadius: 1,
                        borderLeft: '3px solid #3B5323' }}>
                        <Typography variant="caption" sx={{ color: '#3B5323', fontWeight: 700, display: 'block', mb: 0.5 }}>
                          ✅ Reply from {query.teacher?.name || 'Instructor'}:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#e5e7eb' }}>{query.reply}</Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Ask Question Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { backgroundColor: '#1d1dabff', color: '#ffffff' } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#ffffff' }}>Ask a Question</Typography>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#9ca3af', minWidth: 0 }}><CloseIcon /></Button>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' },
              '& .MuiInputLabel-root': { color: '#9ca3af' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
              '& .MuiSvgIcon-root': { color: '#9ca3af' } }}>
              <InputLabel>Related Document (optional)</InputLabel>
              <Select value={newQuery.content} onChange={(e) => setNewQuery(p => ({ ...p, content: e.target.value }))}
                label="Related Document (optional)">
                <MenuItem value="">None</MenuItem>
                {documents.map(d => <MenuItem key={d._id} value={d._id}>{d.title}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField multiline rows={4} fullWidth placeholder="Type your question here..."
              value={newQuery.question} onChange={(e) => setNewQuery(p => ({ ...p, question: e.target.value }))}
              sx={{ '& .MuiOutlinedInput-root': { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' } }} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#e5e7eb' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitQuery}
            disabled={!newQuery.question.trim() || submitting}
            sx={{ backgroundColor: '#c62020ff', '&:hover': { backgroundColor: '#a01818' } }}>
            {submitting ? <CircularProgress size={20} color="inherit" /> : 'Submit Question'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MyQueries;
