import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  QuestionAnswer as QuestionIcon,
  CheckCircle as ResolvedIcon,
  HourglassEmpty as PendingIcon,
} from '@mui/icons-material';

function MyQueries() {
  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [newQuery, setNewQuery] = useState({
    document: '',
    subject: '',
    question: '',
  });

  const queries = [
    {
      id: 1,
      document: 'Military Strategy Basics',
      subject: 'Clarification on Chapter 3',
      question: 'Can you explain the difference between offensive and defensive strategies?',
      status: 'Resolved',
      askedDate: '2024-01-20',
      resolvedDate: '2024-01-21',
      trainer: 'Col. Rajesh Kumar',
      response: 'Offensive strategies focus on taking initiative and attacking, while defensive strategies prioritize protection and counter-attacks.',
    },
    {
      id: 2,
      document: 'Physical Training Guide',
      subject: 'Training Schedule Question',
      question: 'What is the recommended rest period between high-intensity training sessions?',
      status: 'Pending',
      askedDate: '2024-01-23',
      trainer: 'Maj. Priya Sharma',
    },
    {
      id: 3,
      document: 'Weapons Safety Protocol',
      subject: 'Safety Procedures',
      question: 'Are there any additional safety measures for night operations?',
      status: 'Resolved',
      askedDate: '2024-01-18',
      resolvedDate: '2024-01-19',
      trainer: 'Lt. Col. Amit Singh',
      response: 'Yes, night operations require additional lighting protocols and enhanced communication systems.',
    },
    {
      id: 4,
      document: 'Leadership Assessment',
      subject: 'Assessment Criteria',
      question: 'How is the leadership assessment scored?',
      status: 'Pending',
      askedDate: '2024-01-24',
      trainer: 'Capt. Sneha Gupta',
    },
  ];

  const documents = [
    'Military Strategy Basics',
    'Physical Training Guide',
    'Weapons Safety Protocol',
    'Leadership Assessment',
  ];

  const filteredQueries = queries.filter((query) =>
    filterStatus === 'All' || query.status === filterStatus
  );

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewQuery({ document: '', subject: '', question: '' });
  };

  const handleSubmitQuery = () => {
    alert('Query submitted successfully! Your trainer will respond soon.');
    handleCloseDialog();
  };

  const stats = {
    total: queries.length,
    pending: queries.filter(q => q.status === 'Pending').length,
    resolved: queries.filter(q => q.status === 'Resolved').length,
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader
        title="My Queries (मेरे प्रश्न)"
        buttonText="Ask Question (प्रश्न पूछें)"
        buttonIcon={<AddIcon />}
        onButtonClick={handleOpenDialog}
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card onClick={() => setFilterStatus('All')} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#FF6B00', mr: 2 }}>
                  <QuestionIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF6B00', fontWeight: 'bold' }}>
                    {stats.total}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>Total Queries</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card onClick={() => setFilterStatus('Pending')} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#FF8C00', mr: 2 }}>
                  <PendingIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF8C00', fontWeight: 'bold' }}>
                    {stats.pending}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>Pending</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card onClick={() => setFilterStatus('Resolved')} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#3B5323', mr: 2 }}>
                  <ResolvedIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#3B5323', fontWeight: 'bold' }}>
                    {stats.resolved}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>Resolved</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#1f2937' }}>
              My Questions
              {filterStatus !== 'All' && (
                <Chip 
                  label={`Status: ${filterStatus}`}
                  onDelete={() => setFilterStatus('All')}
                  sx={{ ml: 2, backgroundColor: '#FF6B00', color: '#1f2937' }}
                />
              )}
            </Typography>
          </Box>

          {filteredQueries.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <QuestionIcon sx={{ fontSize: 64, color: '#6b7280', mb: 2 }} />
              <Typography sx={{ color: '#6b7280' }}>
                No queries found. Ask your first question!
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredQueries.map((query) => (
                <Card key={query.id} sx={{ backgroundColor: '#1d1dabff', border: '1px solid #344675' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Avatar sx={{ backgroundColor: '#3B5323' }}>
                        <QuestionIcon />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Box>
                            <Typography variant="h6" sx={{ color: '#ffffff', mb: 0.5 }}>
                              {query.subject}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                              Document: {query.document} • Asked on {query.askedDate}
                            </Typography>
                          </Box>
                          <Chip
                            icon={query.status === 'Pending' ? <PendingIcon /> : <ResolvedIcon />}
                            label={query.status}
                            size="small"
                            color={query.status === 'Pending' ? 'warning' : 'success'}
                          />
                        </Box>
                        
                        <Typography variant="body2" sx={{ color: '#e5e7eb', my: 2 }}>
                          <strong>Question:</strong> {query.question}
                        </Typography>
                        
                        {query.response && (
                          <>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ backgroundColor: '#e8f5e9', p: 2, borderRadius: 1, borderLeft: '4px solid #3B5323' }}>
                              <Typography variant="subtitle2" sx={{ color: '#1f2937', mb: 1, fontWeight: 600 }}>
                                Response from {query.trainer}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 500 }}>
                                {query.response}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#4b5563', mt: 1, display: 'block' }}>
                                Resolved on {query.resolvedDate}
                              </Typography>
                            </Box>
                          </>
                        )}
                        
                        {!query.response && (
                          <Typography variant="body2" sx={{ color: '#6b7280', fontStyle: 'italic' }}>
                            Waiting for response from {query.trainer}...
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth
        PaperProps={{
          sx: { backgroundColor: '#1d1dabff', color: '#ffffff' } }}>
        <DialogTitle sx={{ color: '#ffffff' }}>Ask a Question</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#9ca3af' }}>Select Document</InputLabel>
              <Select
                value={newQuery.document}
                onChange={(e) => setNewQuery({ ...newQuery, document: e.target.value })}
                label="Select Document"
                sx={{ 
                  color: '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' },
                  '& .MuiSvgIcon-root': { color: '#9ca3af' }
                }}
              >
                {documents.map((doc, index) => (
                  <MenuItem key={index} value={doc}>{doc}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Subject"
              value={newQuery.subject}
              onChange={(e) => setNewQuery({ ...newQuery, subject: e.target.value })}
              sx={{ 
                '& .MuiOutlinedInput-root': { color: '#ffffff' },
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' }
              }}
            />

            <TextField
              fullWidth
              label="Your Question"
              multiline
              rows={4}
              value={newQuery.question}
              onChange={(e) => setNewQuery({ ...newQuery, question: e.target.value })}
              sx={{ 
                '& .MuiOutlinedInput-root': { color: '#ffffff' },
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#6b7280' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9ca3af' }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#1d1dabff', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button 
            onClick={handleCloseDialog} 
            sx={{ 
              color: '#e5e7eb', 
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } 
            }}
          >
            Cancel (रद्द करें)
          </Button>
          <Button 
            onClick={handleSubmitQuery} 
            variant="contained"
            disabled={!newQuery.document || !newQuery.subject || !newQuery.question}
            sx={{ 
              backgroundColor: '#c62020ff', 
              color: '#ffffff', 
              '&:hover': { backgroundColor: '#a01818' },
              '&:disabled': { backgroundColor: '#6b7280', color: '#9ca3af' },
            }}
          >
            Submit Question (प्रश्न जमा करें)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MyQueries;




