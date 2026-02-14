import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import PageHeader from '../components/PageHeader';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Button,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  Email as EmailIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

function MyTrainers() {
  const navigate = useNavigate();
  const { userContext, filterByAccess } = useUser();
  const [searchTerm, setSearchTerm] = useState('');

  const allTrainers = [
    {
      id: 1,
      name: 'Col. Rajesh Kumar',
      rank: 'Colonel',
      specialization: 'Military Strategy',
      batches: ['Commando', 'Platoon Commander'],
      email: 'rajesh.kumar@army.mil',
      phone: '+91-XXXX-XXXX',
      experience: '15 years',
      courses: ['Strategy Basics', 'Advanced Tactics', 'Combat Planning'],
    },
    {
      id: 2,
      name: 'Maj. Priya Sharma',
      rank: 'Major',
      specialization: 'Physical Training',
      batches: ['Commando', 'Platoon Commander'],
      email: 'priya.sharma@army.mil',
      phone: '+91-XXXX-XXXX',
      experience: '10 years',
      courses: ['Physical Fitness', 'Endurance Training', 'Combat Drills'],
    },
    {
      id: 3,
      name: 'Lt. Col. Amit Singh',
      rank: 'Lieutenant Colonel',
      specialization: 'Weapons Training',
      batches: ['Commando'],
      email: 'amit.singh@army.mil',
      phone: '+91-XXXX-XXXX',
      experience: '12 years',
      courses: ['Weapons Safety', 'Marksmanship', 'Advanced Weapons'],
    },
    {
      id: 4,
      name: 'Capt. Sneha Gupta',
      rank: 'Captain',
      specialization: 'Leadership Development',
      batches: ['Platoon Commander'],
      email: 'sneha.gupta@army.mil',
      phone: '+91-XXXX-XXXX',
      experience: '8 years',
      courses: ['Leadership Skills', 'Team Management', 'Decision Making'],
    },
  ];

  // Filter trainers by user's batch (trainers who have student's batch in their assignedBatches)
  const trainers = filterByAccess(allTrainers, (trainer) => trainer.batches);

  const filteredTrainers = trainers.filter((trainer) =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.rank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (trainerId, trainerName) => {
    // Navigate to messages page with the trainer's info
    const trainer = trainers.find(t => t.id === trainerId);
    navigate('/student/messages', { state: { recipient: trainer } });
  };

  // Safety check for userContext
  if (!userContext) {
    return (
      <Box>
        <Typography variant="h6" sx={{ color: '#1f2937' }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader
        title="My Trainers (मेरे प्रशिक्षक)"
      />
      
      {userContext.userType === 'student' && userContext.assignedBatch && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Showing trainers for: <strong>{userContext.assignedBatch}</strong> ({trainers.length} trainer{trainers.length !== 1 ? 's' : ''})
        </Alert>
      )}

      {/* Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search trainers by name, rank, or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#6b7280' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#1f2937',
                '& fieldset': { borderColor: '#344675' },
                '&:hover fieldset': { borderColor: '#FF6B00' },
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Trainers Grid */}
      <Grid container spacing={3}>
        {filteredTrainers.map((trainer) => (
          <Grid item xs={12} md={6} key={trainer.id}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 212, 170, 0.2)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundColor: '#3B5323',
                      fontSize: '2rem',
                      mr: 2,
                    }}
                  >
                    {trainer.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 600, mb: 0.5 }}>
                      {trainer.name}
                    </Typography>
                    <Chip
                      label={trainer.rank}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(0, 212, 170, 0.15)',
                        color: '#3B5323',
                        fontWeight: 600,
                        mb: 1,
                      }}
                    />
                    <Typography variant="body2" sx={{ color: '#6b7280', mt: 1 }}>
                      🎯 {trainer.specialization}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      📅 {trainer.experience} experience
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: '#1f2937', mb: 1, fontWeight: 600 }}>
                    Contact Information
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>
                    📧 {trainer.email}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>
                    📞 {trainer.phone}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: '#1f2937', mb: 1, fontWeight: 600 }}>
                    Assigned Batches
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {trainer.batches.map((batch, index) => (
                      <Chip
                        key={index}
                        label={batch}
                        size="small"
                        icon={<SchoolIcon />}
                        sx={{
                          backgroundColor: 'rgba(29, 140, 248, 0.15)',
                          color: '#FF6B00',
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: '#1f2937', mb: 1, fontWeight: 600 }}>
                    Courses Teaching
                  </Typography>
                  <List dense sx={{ py: 0 }}>
                    {trainer.courses.map((course, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemText
                          primary={`• ${course}`}
                          sx={{
                            '& .MuiListItemText-primary': {
                              color: '#6b7280',
                              fontSize: '0.875rem',
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EmailIcon />}
                  onClick={() => handleSendMessage(trainer.id, trainer.name)}
                  sx={{
                    backgroundColor: '#3B5323',
                    '&:hover': {
                      backgroundColor: '#00b894',
                    },
                  }}
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredTrainers.length === 0 && (
        <Card>
          <CardContent>
            <Typography variant="body1" sx={{ color: '#6b7280', textAlign: 'center', py: 4 }}>
              No trainers found matching your search
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default MyTrainers;

