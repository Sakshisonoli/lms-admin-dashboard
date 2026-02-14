import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  InsertDriveFile as FileIcon,
  Article as ArticleIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditDraftIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

function Content() {
  const navigate = useNavigate();
  const { userContext, filterByAccess, getAccessibleBatches } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  // const [openViewDialog, setOpenViewDialog] = useState(false); // Commented out - View Dialog not used
  // const [selectedContent, setSelectedContent] = useState(null); // Commented out - View Dialog not used
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [contentToDelete, setContentToDelete] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'Document',
    batch: [],
    description: '',
    file: null,
  });
  const [editMode, setEditMode] = useState(false);

  const allContentData = [
    {
      id: 1,
      title: 'Military Strategy and Tactics',
      type: 'Document',
      batch: 'Commando',
      uploadedBy: 'Col. Rajesh Kumar',
      uploadedByEmail: 'rajesh.kumar@army.gov.in',
      uploadDate: '2024-01-15',
      status: 'Published',
      fileSize: '2.5 MB',
      description: 'Comprehensive guide to military strategic planning and tactical operations',
    },
    {
      id: 2,
      title: 'Combat Training Manual',
      type: 'Document',
      batch: 'Platoon Commander',
      uploadedBy: 'Maj. Priya Sharma',
      uploadedByEmail: 'priya.sharma@army.mil',
      uploadDate: '2024-01-14',
      status: 'Published',
      fileSize: '5.8 MB',
      description: 'Physical combat techniques and training procedures',
    },
    {
      id: 3,
      title: 'Weapons Handling and Safety',
      type: 'Document',
      batch: 'Commando',
      uploadedBy: 'Lt. Col. Amit Singh',
      uploadedByEmail: 'amit.singh@army.mil',
      uploadDate: '2024-01-13',
      status: 'Published',
      fileSize: '3.2 MB',
      description: 'Safety protocols and operational procedures for weapons',
    },
    {
      id: 4,
      title: 'Leadership and Command',
      type: 'Document',
      batch: 'Platoon Commander',
      uploadedBy: 'Capt. Sneha Gupta',
      uploadedByEmail: 'sneha.gupta@army.mil',
      uploadDate: '2024-01-12',
      status: 'Published',
      fileSize: '4.1 MB',
      description: 'Leadership principles and command responsibilities',
    },
    {
      id: 5,
      title: 'Field Operations Guide',
      type: 'Document',
      batch: 'Commando',
      uploadedBy: 'Col. Rajesh Kumar',
      uploadedByEmail: 'rajesh.kumar@army.gov.in',
      uploadDate: '2024-01-11',
      status: 'Published',
      fileSize: '6.3 MB',
      description: 'Field operations, navigation, and survival techniques',
    },
    {
      id: 6,
      title: 'Communication Protocols',
      type: 'Document',
      batch: 'Platoon Commander',
      uploadedBy: 'Maj. Priya Sharma',
      uploadedByEmail: 'priya.sharma@army.mil',
      uploadDate: '2024-01-10',
      status: 'Draft',
      fileSize: '1.9 MB',
      description: 'Military communication systems and protocols',
    },
  ];

  // Filter content by user's accessible batches
  const contentData = filterByAccess(allContentData, (content) => content.batch);

  // Get accessible batches for the current user
  const accessibleBatches = getAccessibleBatches();

  // Filter documents by status and batch
  const filteredContent = contentData.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterType === 'all' || content.status.toLowerCase() === filterType.toLowerCase();
    const matchesBatch = filterBatch === 'all' || content.batch.toLowerCase().replace(' ', '-') === filterBatch.toLowerCase();
    return matchesSearch && matchesStatus && matchesBatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'success';
      case 'Draft':
        return 'warning';
      case 'Archived':
        return 'default';
      default:
        return 'default';
    }
  };

  const handleOpenUpload = () => {
    setEditMode(false);
    setFormData({
      title: '',
      type: 'Document',
      batch: [],
      description: '',
      file: null,
    });
    setOpenUploadDialog(true);
  };

  const handleOpenEdit = (content) => {
    setEditMode(true);
    setFormData({
      title: content.title,
      type: 'Document',
      batch: Array.isArray(content.batch) ? content.batch : [content.batch],
      description: content.description || '',
      file: null,
    });
    setOpenUploadDialog(true);
  };

  const handleCloseUpload = () => {
    setOpenUploadDialog(false);
    setUploadProgress(0);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleUploadSubmit = () => {
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            alert(`Document ${editMode ? 'updated' : 'uploaded'} successfully!`);
            handleCloseUpload();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleView = (content) => {
    // Navigate to document viewer based on user role
    let documentPath = '/admin/document/';
    
    if (userContext.userType === 'teacher') {
      documentPath = '/teacher/document/';
    } else if (userContext.userType === 'student') {
      documentPath = '/student/document/';
    }
    
    navigate(`${documentPath}${content.id}`, { 
      state: { 
        document: content,
        uploadedBy: content.uploadedBy,
        uploadedByEmail: content.uploadedByEmail 
      } 
    });
  };

  const handleDeleteClick = (content) => {
    setContentToDelete(content);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting content:', contentToDelete);
    alert(`Content "${contentToDelete.title}" deleted successfully!`);
    setDeleteDialog(false);
    setContentToDelete(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: '3px solid #FF6B00' }}>
          <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Document Management System (दस्तावेज़ प्रबंधन प्रणाली)
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenUpload}
            sx={{
              backgroundColor: '#c62020ff',
              '&:hover': { backgroundColor: '#660000' },
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Upload Document (दस्तावेज़ अपलोड करें)
          </Button>
        </Box>
        
        {/* Access Level Indicator */}
        {userContext.userType === 'teacher' && accessibleBatches.length > 0 && (
          <Alert severity="info">
            You can manage content for: <strong>{accessibleBatches.join(', ')}</strong>
          </Alert>
        )}
        {userContext.userType === 'student' && userContext.assignedBatch && (
          <Alert severity="info">
            Showing documents for: <strong>{userContext.assignedBatch}</strong>
          </Alert>
        )}
        {userContext.userType === 'admin' && (
          <Alert severity="success">
            Viewing all batches (Admin access)
          </Alert>
        )}
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)', border: '2px solid #e5e7eb' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#FF6B00', mr: 2 }}>
                  <ArticleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF6B00', fontWeight: 900, fontSize: '2.5rem' }}>
                    {contentData.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                    Total Documents
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)', border: '2px solid #e5e7eb' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#3B5323', mr: 2 }}>
                  <CheckCircleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#3B5323', fontWeight: 900, fontSize: '2.5rem' }}>
                    {contentData.filter(c => c.status === 'Published').length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                    Published
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)', border: '2px solid #e5e7eb' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#c62020ff', mr: 2 }}>
                  <EditDraftIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#c62020ff', fontWeight: 900, fontSize: '2.5rem' }}>
                    {contentData.filter(c => c.status === 'Draft').length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                    Draft
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)', border: '2px solid #e5e7eb' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: '#0b1f3a', mr: 2 }}>
                  <SchoolIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#0b1f3a', fontWeight: 900, fontSize: '2.5rem' }}>
                    3
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                    Batches
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ backgroundcolor: '#1f2937', border: '2px solid #e5e7eb' }}>
        <CardContent>
          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />
            
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: '#6b7280' }}>Status</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: '#6b7280' }}>Batch</InputLabel>
              <Select
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                label="Batch"
              >
                <MenuItem value="all">
                  {userContext.userType === 'admin' ? 'All Batches' : 'My Batches'}
                </MenuItem>
                {accessibleBatches.map((batch) => (
                  <MenuItem key={batch} value={batch.toLowerCase().replace(' ', '-')}>
                    {batch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Content Table */}
          <TableContainer component={Paper} sx={{ backgroundColor: '#1d1dabff' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Document Title</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Batch</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Uploaded By</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Upload Date</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>File Size</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredContent.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                      <Typography sx={{ color: '#6b7280' }}>
                        No documents found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContent.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FileIcon sx={{ color: '#FF6B00' }} />
                        <Typography sx={{ color: '#1f2937' }}>{content.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{content.batch}</TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{content.uploadedBy}</TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{content.uploadDate}</TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{content.fileSize}</TableCell>
                    <TableCell>
                      <Chip
                        label={content.status}
                        color={getStatusColor(content.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ color: '#3B5323' }} onClick={() => handleView(content)}>
                          <ViewIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#FF6B00' }} onClick={() => handleOpenEdit(content)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#fd5d93' }} onClick={() => handleDeleteClick(content)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Upload Content Dialog */}
      <Dialog
        open={openUploadDialog}
        onClose={handleCloseUpload}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: '#1d1dabff', color: '#ffffff' },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#ffffff' }}>
            {editMode ? 'Edit Document' : 'Upload Training Document'}
          </Typography>
          <IconButton onClick={handleCloseUpload} sx={{ color: '#9ca3af' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Document Title"
              fullWidth
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
              placeholder="e.g., Introduction to Military Strategy"
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the content"
            />

            <Alert severity="info" sx={{ mb: 2 }}>
              Only PDF documents are supported. Maximum file size: 50MB
              {editMode && ' (Leave file empty to keep existing document)'}
            </Alert>

            <FormControl fullWidth>
              <InputLabel>Category/Module</InputLabel>
              <Select
                value={formData.category || ''}
                onChange={(e) => handleInputChange('category', e.target.value)}
                label="Category/Module"
              >
                <MenuItem value="Module 1">Module 1 - Introduction</MenuItem>
                <MenuItem value="Module 2">Module 2 - Basic Training</MenuItem>
                <MenuItem value="Module 3">Module 3 - Advanced Concepts</MenuItem>
                <MenuItem value="Module 4">Module 4 - Practical Applications</MenuItem>
                <MenuItem value="Module 5">Module 5 - Assessment</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Lesson/Topic</InputLabel>
              <Select
                value={formData.lesson || ''}
                onChange={(e) => handleInputChange('lesson', e.target.value)}
                label="Lesson/Topic"
              >
                <MenuItem value="Lesson 1">Lesson 1 - Fundamentals</MenuItem>
                <MenuItem value="Lesson 2">Lesson 2 - Core Principles</MenuItem>
                <MenuItem value="Lesson 3">Lesson 3 - Tactical Operations</MenuItem>
                <MenuItem value="Lesson 4">Lesson 4 - Strategic Planning</MenuItem>
                <MenuItem value="Lesson 5">Lesson 5 - Leadership</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Assign to Batches</InputLabel>
              <Select
                multiple
                value={formData.batch}
                onChange={(e) => handleInputChange('batch', e.target.value)}
                label="Assign to Batches"
                renderValue={(selected) => selected.join(', ')}
              >
                {accessibleBatches.map((batch) => (
                  <MenuItem key={batch} value={batch}>{batch}</MenuItem>
                ))}
              </Select>
              {accessibleBatches.length === 0 && (
                <Alert severity="warning" sx={{ mt: 1 }}>
                  No batches available for assignment
                </Alert>
              )}
              {userContext.userType === 'teacher' && (
                <Alert severity="info" sx={{ mt: 1 }}>
                  You can only assign content to your batches: {accessibleBatches.join(', ')}
                </Alert>
              )}
            </FormControl>

            {/* File Upload Area */}
            <Box
              sx={{
                border: '2px dashed #6b7280',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                backgroundColor: 'rgba(107, 114, 128, 0.1)',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#c62020ff',
                  backgroundColor: 'rgba(198, 32, 32, 0.05)',
                },
              }}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <input
                id="file-upload"
                type="file"
                hidden
                accept=".pdf"
                onChange={handleFileChange}
              />
              {formData.file ? (
                <Box>
                  <FileIcon sx={{ fontSize: 48, color: '#3B5323', mb: 1 }} />
                  <Typography sx={{ color: '#ffffff' }}>{formData.file.name}</Typography>
                  <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                    {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <UploadIcon sx={{ fontSize: 48, color: '#9ca3af', mb: 1 }} />
                  <Typography sx={{ color: '#ffffff', mb: 1 }}>
                    Click to upload or drag and drop
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                    PDF only (Max 50MB)
                  </Typography>
                </Box>
              )}
            </Box>

            {uploadProgress > 0 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    Uploading...
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#3B5323' }}>
                    {uploadProgress}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#3B5323',
                    },
                  }}
                />
              </Box>
            )}

            <Alert severity="warning">
              Documents will be securely stored and only visible to assigned batches. Download will be disabled for security purposes.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#1d1dabff', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button 
            onClick={handleCloseUpload} 
            sx={{ 
              color: '#e5e7eb',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }} 
            disabled={uploadProgress > 0}
          >
            Cancel (रद्द करें)
          </Button>
          <Button
            variant="contained"
            onClick={handleUploadSubmit}
            disabled={
              !formData.title || 
              !formData.category || 
              !formData.lesson || 
              formData.batch.length === 0 || 
              (!formData.file && !editMode) || 
              uploadProgress > 0
            }
            sx={{
              backgroundColor: '#c62020ff',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#a01818' },
              '&:disabled': { backgroundColor: '#6b7280', color: '#9ca3af' },
            }}
          >
            {editMode ? 'Update Document (दस्तावेज़ अपडेट करें)' : 'Upload Document (दस्तावेज़ अपलोड करें)'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Content Dialog - COMMENTED OUT (Not currently used - using DocumentViewer page instead) */}
      {/* 
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: '#1d1dabff', color: '#ffffff' },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{selectedContent?.title}</Typography>
          <IconButton onClick={() => setOpenViewDialog(false)} sx={{ color: '#6b7280' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Chip
              label="PDF Document"
              sx={{
                backgroundColor: '#FF6B00',
                color: '#1f2937',
                mr: 1,
              }}
            />
            <Chip
              label={selectedContent?.status}
              color={getStatusColor(selectedContent?.status)}
            />
          </Box>
          <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
            Uploaded by: {selectedContent?.uploadedBy} • {selectedContent?.uploadDate}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
            Assigned to: {selectedContent?.batch}
          </Typography>
          <Box
            sx={{
              height: 400,
              backgroundColor: '#1e1e2f',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #344675',
            }}
          >
            <Typography sx={{ color: '#6b7280' }}>
              [Secure Document Viewer - Download Disabled]
            </Typography>
          </Box>
          <Alert severity="warning" sx={{ mt: 2 }}>
            This is a secure viewer. Right-click and download are disabled for security purposes.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)} sx={{ color: '#6b7280' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      */}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        PaperProps={{
          sx: { backgroundColor: '#1d1dabff', color: '#ffffff' },
        }}
      >
        <DialogTitle sx={{ color: '#ffffff', mb: 2 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#e5e7eb' }}>
            Are you sure you want to delete <strong>{contentToDelete?.title}</strong>?
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            This action cannot be undone. The content will be permanently removed from all assigned batches.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#1d1dabff', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button 
            onClick={() => setDeleteDialog(false)} 
            sx={{ 
              color: '#e5e7eb', 
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } 
            }}
          >
            Cancel (रद्द करें)
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            sx={{
              backgroundColor: '#c62020ff',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#a01818' },
            }}
          >
            Delete Content (सामग्री हटाएं)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Content;



