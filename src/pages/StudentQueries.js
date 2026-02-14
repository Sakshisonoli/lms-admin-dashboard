import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Paper,
  Button,
  Divider,
  Badge,
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
  const [filterStatus, setFilterStatus] = useState('all');

  const queries = [
    {
      id: 1,
      student: 'Rahul Sharma',
      studentAvatar: 'A',
      batch: 'Commando',
      document: 'Military Strategy and Tactics',
      question: 'Could you please explain the concept of tactical positioning in more detail?',
      timestamp: '2 hours ago',
      status: 'pending',
      replies: 0,
    },
    {
      id: 2,
      student: 'Priya Sharma',
      studentAvatar: 'P',
      batch: 'Platoon Commander',
      document: 'Combat Training Manual',
      question: 'Is there a practical exercise related to this topic?',
      timestamp: '3 hours ago',
      status: 'pending',
      replies: 0,
    },
    {
      id: 3,
      student: 'Raj Patel',
      studentAvatar: 'R',
      batch: 'Commando',
      document: 'Military Strategy and Tactics',
      question: 'The diagrams on page 15 are very helpful. Thank you!',
      timestamp: '5 hours ago',
      status: 'resolved',
      replies: 1,
    },
    {
      id: 4,
      student: 'Sneha Gupta',
      studentAvatar: 'S',
      batch: 'Commando',
      document: 'Leadership and Command',
      question: 'When is the deadline for this assessment?',
      timestamp: '1 day ago',
      status: 'resolved',
      replies: 1,
    },
  ];

  const filteredQueries = queries.filter(q => 
    filterStatus === 'all' || q.status === filterStatus
  );

  const stats = {
    total: queries.length,
    pending: queries.filter(q => q.status === 'pending').length,
    resolved: queries.filter(q => q.status === 'resolved').length,
  };

  const handleViewDocument = (query) => {
    navigate(`/teacher/document/${query.id}`);
  };

  const handleReply = (query) => {
    navigate(`/teacher/document/${query.id}`);
  };

  return (
    <Box>
      <Box sx={{ mb: 2, pb: 2, borderBottom: '2px solid #FF8C00' }}>
        <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold' }}>
          Student Queries & Questions (छात्र प्रश्न और सवाल)
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card 
            onClick={() => setFilterStatus('all')}
            sx={{ cursor: 'pointer', '&:hover': { borderColor: '#FF6B00', border: '1px solid' } }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#FF6B00', mr: 2 }}>
                  <QuestionIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF6B00', fontWeight: 'bold' }}>
                    {stats.total}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Total Queries
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card 
            onClick={() => setFilterStatus('pending')}
            sx={{ cursor: 'pointer', '&:hover': { borderColor: '#FF8C00', border: '1px solid' } }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Badge badgeContent={stats.pending} color="error">
                  <Avatar sx={{ backgroundColor: '#FF8C00', mr: 2 }}>
                    <PendingIcon />
                  </Avatar>
                </Badge>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF8C00', fontWeight: 'bold' }}>
                    {stats.pending}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Pending Replies
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card 
            onClick={() => setFilterStatus('resolved')}
            sx={{ cursor: 'pointer', '&:hover': { borderColor: '#3B5323', border: '1px solid' } }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#3B5323', mr: 2 }}>
                  <ResolvedIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#3B5323', fontWeight: 'bold' }}>
                    {stats.resolved}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Resolved
                  </Typography>
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
              Recent Queries
              {filterStatus !== 'all' && (
                <Chip 
                  label={`Status: ${filterStatus}`}
                  onDelete={() => setFilterStatus('all')}
                  sx={{ ml: 2, backgroundColor: '#FF6B00', color: '#1f2937' }}
                />
              )}
            </Typography>
          </Box>

          {filteredQueries.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: '#6b7280' }}>
                No queries found
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredQueries.map((query) => (
                <Paper
                  key={query.id}
                  sx={{
                    p: 2,
                    backgroundColor: '#1d1dabff',
                    border: '1px solid #344675',
                    '&:hover': {
                      borderColor: query.status === 'pending' ? '#FF8C00' : '#3B5323',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar sx={{ backgroundColor: '#FF6B00' }}>
                      {query.studentAvatar}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="subtitle2" sx={{ color: '#ffffff' }}>
                              {query.student}
                            </Typography>
                            <Chip
                              label={query.batch}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(29, 140, 248, 0.15)',
                                color: '#FF6B00',
                                height: 20,
                                fontSize: '0.7rem',
                              }}
                            />
                            <Typography variant="caption" sx={{ color: '#6b7280' }}>
                              • {query.timestamp}
                            </Typography>
                          </Box>
                          <Typography variant="caption" sx={{ color: '#6b7280' }}>
                            Document: {query.document}
                          </Typography>
                        </Box>
                        <Chip
                          icon={query.status === 'pending' ? <PendingIcon /> : <ResolvedIcon />}
                          label={query.status}
                          size="small"
                          color={query.status === 'pending' ? 'warning' : 'success'}
                        />
                      </Box>
                      
                      <Typography variant="body2" sx={{ color: '#e5e7eb', mb: 2, mt: 1 }}>
                        {query.question}
                      </Typography>
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button
                          size="small"
                          startIcon={<ReplyIcon />}
                          variant={query.status === 'pending' ? 'contained' : 'outlined'}
                          onClick={() => handleReply(query)}
                          sx={{
                            backgroundColor: query.status === 'pending' ? '#FF8C00' : 'transparent',
                            borderColor: '#FF6B00',
                            color: query.status === 'pending' ? '#ffffff' : '#FF6B00',
                            '&:hover': {
                              backgroundColor: query.status === 'pending' ? '#e67700' : 'rgba(29, 140, 248, 0.1)',
                            },
                          }}
                        >
                          {query.status === 'pending' ? 'Reply Now' : `View Reply (${query.replies})`}
                        </Button>
                        <Button
                          size="small"
                          startIcon={<ViewIcon />}
                          onClick={() => handleViewDocument(query)}
                          sx={{ color: '#6b7280' }}
                        >
                          View Document
                        </Button>
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


