import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  PictureAsPdf as PdfIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function MyDocuments() {
  const navigate = useNavigate();
  const { userContext, filterByAccess } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterModule, setFilterModule] = useState('All');

  // Simulated documents - filtered by student's batch
  const allDocuments = [
    {
      id: 1,
      title: 'Military Strategy Basics',
      type: 'Document',
      module: 'Strategy',
      lesson: 'Lesson 1',
      uploadDate: '2024-01-15',
      uploadedBy: 'Col. Rajesh Kumar',
      uploadedByEmail: 'rajesh.kumar@army.gov.in',
      size: '2.5 MB',
      views: 45,
      batch: 'Commando',
      description: 'Comprehensive guide to military strategic planning',
    },
    {
      id: 2,
      title: 'Physical Training Guide',
      type: 'Document',
      module: 'Physical Training',
      lesson: 'Lesson 2',
      uploadDate: '2024-01-18',
      uploadedBy: 'Maj. Priya Sharma',
      uploadedByEmail: 'priya.sharma@army.mil',
      size: '3.2 MB',
      views: 38,
      batch: 'Commando',
      description: 'Physical fitness and training protocols',
    },
    {
      id: 3,
      title: 'Weapons Safety Protocol',
      type: 'Document',
      module: 'Weapons Training',
      lesson: 'Lesson 1',
      uploadDate: '2024-01-20',
      uploadedBy: 'Ms. Sarah Lee',
      uploadedByEmail: 'sarah@army.gov.in',
      size: '1.8 MB',
      views: 52,
      batch: 'Commando',
      description: 'Safety procedures for weapons handling',
    },
    {
      id: 4,
      title: 'Leadership and Command',
      type: 'Document',
      module: 'Leadership',
      lesson: 'Lesson 3',
      uploadDate: '2024-01-22',
      uploadedBy: 'Mr. John Taylor',
      uploadedByEmail: 'john@army.gov.in',
      size: '500 KB',
      views: 28,
      batch: 'Commando',
      description: 'Leadership principles and evaluation',
    },
  ];

  // Filter documents by user's batch
  const documents = filterByAccess(allDocuments, (doc) => doc.batch);

  const getTypeIcon = (type) => {
    return <PdfIcon sx={{ color: '#FF6B00' }} />;
  };

  const getTypeColor = (type) => {
    return '#FF6B00'; // All documents use same color
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || doc.type === filterType;
    const matchesModule = filterModule === 'All' || doc.module === filterModule;
    return matchesSearch && matchesType && matchesModule;
  });

  const handleViewDocument = (doc) => {
    navigate(`/student/document/${doc.id}`, {
      state: {
        document: doc,
        uploadedBy: doc.uploadedBy,
        uploadedByEmail: doc.uploadedByEmail,
      },
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 2, pb: 2, borderBottom: '2px solid #FF8C00' }}>
        <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          My Documents (मेरे दस्तावेज़)
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        {userContext.userType === 'student' && userContext.assignedBatch && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Showing documents for: <strong>{userContext.assignedBatch}</strong>
          </Alert>
        )}
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search documents..."
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
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#6b7280' }}>Type</InputLabel>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  label="Type"
                  sx={{
                    color: '#1f2937',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#344675' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FF6B00' },
                  }}
                >
                  <MenuItem value="All">All Types</MenuItem>
                  <MenuItem value="Document">Document</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#6b7280' }}>Module</InputLabel>
                <Select
                  value={filterModule}
                  onChange={(e) => setFilterModule(e.target.value)}
                  label="Module"
                  sx={{
                    color: '#1f2937',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#344675' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FF6B00' },
                  }}
                >
                  <MenuItem value="All">All Modules</MenuItem>
                  <MenuItem value="Strategy">Strategy</MenuItem>
                  <MenuItem value="Physical Training">Physical Training</MenuItem>
                  <MenuItem value="Weapons Training">Weapons Training</MenuItem>
                  <MenuItem value="Leadership">Leadership</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <Grid container spacing={3}>
        {filteredDocuments.map((doc) => (
          <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${getTypeColor(doc.type)}40`,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getTypeIcon(doc.type)}
                  <Chip
                    label={doc.type}
                    size="small"
                    sx={{
                      ml: 'auto',
                      backgroundColor: `${getTypeColor(doc.type)}20`,
                      color: getTypeColor(doc.type),
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Typography variant="h6" sx={{ color: '#1f2937', mb: 1, fontWeight: 600 }}>
                  {doc.title}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>
                    📚 {doc.module} - {doc.lesson}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>
                    📅 {doc.uploadDate}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>
                    📦 {doc.size}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    👁️ {doc.views} views
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ViewIcon />}
                  onClick={() => handleViewDocument(doc)}
                  sx={{
                    backgroundColor: getTypeColor(doc.type),
                    '&:hover': {
                      backgroundColor: getTypeColor(doc.type),
                      opacity: 0.9,
                    },
                  }}
                >
                  View Document
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent>
            <Typography variant="body1" sx={{ color: '#6b7280', textAlign: 'center', py: 4 }}>
              No documents found matching your criteria
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default MyDocuments;




