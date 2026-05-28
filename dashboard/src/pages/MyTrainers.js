import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import PageHeader from '../components/PageHeader';
import { teacherAPI } from '../services/api';
import {
  Box, Typography, Card, CardContent, Grid, Avatar, Chip, Button,
  TextField, InputAdornment, List, ListItem, ListItemText, Alert, CircularProgress,
} from '@mui/material';
import { Search as SearchIcon, Email as EmailIcon, School as SchoolIcon } from '@mui/icons-material';

function MyTrainers() {
  const navigate = useNavigate();
  const { userContext } = useUser();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTrainers = useCallback(async () => {
    try {
      const res = await teacherAPI.getAll();
      const studentBatch = userContext?.assignedBatch;
      const filtered = res.data.filter((t) => {
        const batchNames = t.assignedBatches?.map((b) => b.name || b) || [];
        return !studentBatch || batchNames.includes(studentBatch);
      });
      setTrainers(filtered.map((t) => ({
        id: t._id,
        name: t.user?.name || 'Instructor',
        email: t.user?.email || '',
        rank: t.rank || '',
        specialization: t.specialization || '',
        experience: t.experience || '',
        batches: t.assignedBatches?.map((b) => b.name || b) || [],
        courses: t.courses || [],
        userId: t.user?._id,
      })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userContext?.assignedBatch]);

  useEffect(() => { fetchTrainers(); }, [fetchTrainers]);

  const filteredTrainers = trainers.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.rank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (trainer) => {
    navigate('/student/messages', {
      state: { recipient: { _id: trainer.userId, name: trainer.name, role: 'teacher' } },
    });
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader title='My Trainers' />
      {userContext?.assignedBatch && (
        <Alert severity='info' sx={{ mb: 3 }}>
          Showing trainers for: <strong>{userContext.assignedBatch}</strong> ({trainers.length} trainer{trainers.length !== 1 ? 's' : ''})
        </Alert>
      )}
      {error && <Alert severity='error' sx={{ mb: 2 }}>{error}</Alert>}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField fullWidth placeholder='Search trainers...' value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position='start'><SearchIcon sx={{ color: '#6b7280' }} /></InputAdornment> }} />
        </CardContent>
      </Card>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress sx={{ color: '#c62020ff' }} />
        </Box>
      ) : filteredTrainers.length === 0 ? (
        <Card><CardContent>
          <Typography sx={{ color: '#6b7280', textAlign: 'center', py: 4 }}>
            {trainers.length === 0 ? 'No trainers assigned to your batch yet' : 'No trainers match your search'}
          </Typography>
        </CardContent></Card>
      ) : (
        <Grid container spacing={3}>
          {filteredTrainers.map((trainer) => (
            <Grid item xs={12} md={6} key={trainer.id}>
              <Card sx={{ height: '100%', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                    <Avatar sx={{ width: 72, height: 72, backgroundColor: '#3B5323', fontSize: '1.75rem', mr: 2 }}>
                      {trainer.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant='h6' sx={{ color: '#1f2937', fontWeight: 600, mb: 0.5 }}>{trainer.name}</Typography>
                      {trainer.rank && <Chip label={trainer.rank} size='small' sx={{ backgroundColor: 'rgba(59,83,35,0.15)', color: '#3B5323', fontWeight: 600, mb: 1 }} />}
                      {trainer.specialization && <Typography variant='body2' sx={{ color: '#6b7280' }}>{trainer.specialization}</Typography>}
                      {trainer.experience && <Typography variant='body2' sx={{ color: '#6b7280' }}>{trainer.experience} experience</Typography>}
                    </Box>
                  </Box>
                  {trainer.email && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant='subtitle2' sx={{ color: '#1f2937', mb: 1, fontWeight: 600 }}>Contact</Typography>
                      <Typography variant='body2' sx={{ color: '#6b7280' }}>{trainer.email}</Typography>
                    </Box>
                  )}
                  {trainer.batches.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant='subtitle2' sx={{ color: '#1f2937', mb: 1, fontWeight: 600 }}>Assigned Batches</Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {trainer.batches.map((batch, i) => (
                          <Chip key={i} label={batch} size='small' icon={<SchoolIcon />} sx={{ backgroundColor: 'rgba(29,140,248,0.15)', color: '#FF6B00' }} />
                        ))}
                      </Box>
                    </Box>
                  )}
                  {trainer.courses.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant='subtitle2' sx={{ color: '#1f2937', mb: 1, fontWeight: 600 }}>Courses</Typography>
                      <List dense sx={{ py: 0 }}>
                        {trainer.courses.map((course, i) => (
                          <ListItem key={i} sx={{ px: 0, py: 0.25 }}>
                            <ListItemText primary={'- ' + course} sx={{ '& .MuiListItemText-primary': { color: '#6b7280', fontSize: '0.875rem' } }} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  <Button fullWidth variant='contained' startIcon={<EmailIcon />} onClick={() => handleSendMessage(trainer)}
                    sx={{ backgroundColor: '#3B5323', '&:hover': { backgroundColor: '#2d4a1e' } }}>
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default MyTrainers;