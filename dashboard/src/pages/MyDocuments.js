import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import PageHeader from '../components/PageHeader';
import { contentAPI } from '../services/api';
import {
  Box, Typography, Card, CardContent, Grid, Chip, Button,
  TextField, InputAdornment, MenuItem, Select, FormControl,
  InputLabel, Alert, CircularProgress,
} from '@mui/material';
import { Search as SearchIcon, PictureAsPdf as PdfIcon, Visibility as ViewIcon } from '@mui/icons-material';

function MyDocuments() {
  const navigate = useNavigate();
  const { userContext } = useUser();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState('All');

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await contentAPI.getAll();
      setDocuments(res.data.map(d => ({
        id: d._id,
        title: d.title,
        type: d.type || 'Document',
        module: d.module || 'General',
        lesson: d.lesson || '',
        uploadDate: new Date(d.createdAt).toLocaleDateString(),
        uploadedBy: d.uploadedBy?.name || 'Instructor',
        uploadedByEmail: d.uploadedBy?.email || '',
        size: d.fileSize || 'N/A',
        views: d.views || 0,
        batch: d.batch?.name || '',
        description: d.description || '',
        fileUrl: d.fileUrl,
      })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDocuments(); }, [fetchDocuments]);

  const modules = ['All', ...new Set(documents.map(d => d.module).filter(Boolean))];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = filterModule === 'All' || doc.module === filterModule;
    return matchesSearch && matchesModule;
  });

  const handleViewDocument = (doc) => {
    navigate(`/student/document/${doc.id}`, {
      state: { document: doc, uploadedBy: doc.uploadedBy, uploadedByEmail: doc.uploadedByEmail },
    });
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader title="My Documents (मेरे दस्तावेज़)" />

      {userContext?.assignedBatch && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Showing documents for: <strong>{userContext.assignedBatch}</strong>
        </Alert>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth placeholder="Search documents..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#6b7280' }} /></InputAdornment> }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Module</InputLabel>
                <Select value={filterModule} onChange={(e) => setFilterModule(e.target.value)} label="Module">
                  {modules.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress sx={{ color: '#c62020ff' }} />
        </Box>
      ) : filteredDocuments.length === 0 ? (
        <Card><CardContent>
          <Typography sx={{ color: '#6b7280', textAlign: 'center', py: 4 }}>
            {documents.length === 0 ? 'No documents available for your batch yet' : 'No documents match your search'}
          </Typography>
        </CardContent></Card>
      ) : (
        <Grid container spacing={3}>
          {filteredDocuments.map((doc) => (
            <Grid item xs={12} sm={6} md={4} key={doc.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column',
                transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PdfIcon sx={{ color: '#FF6B00', mr: 1 }} />
                    <Chip label={doc.type} size="small"
                      sx={{ ml: 'auto', backgroundColor: 'rgba(255,107,0,0.15)', color: '#FF6B00', fontWeight: 600 }} />
                  </Box>
                  <Typography variant="h6" sx={{ color: '#1f2937', mb: 1, fontWeight: 600 }}>{doc.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>📚 {doc.module}{doc.lesson ? ` - ${doc.lesson}` : ''}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>👤 {doc.uploadedBy}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>📅 {doc.uploadDate}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>📦 {doc.size}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>👁️ {doc.views} views</Typography>
                  <Button fullWidth variant="contained" startIcon={<ViewIcon />} onClick={() => handleViewDocument(doc)}
                    sx={{ mt: 2, backgroundColor: '#FF6B00', '&:hover': { backgroundColor: '#e65c00' } }}>
                    View Document
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

export default MyDocuments;
