import React, { useState } from 'react';
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
  Tab,
  Tabs,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  VideoLibrary as VideoIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function Lessons() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const lessons = [
    {
      id: 1,
      title: 'Military Strategy and Tactics',
      type: 'Video',
      batch: 'Commando',
      uploadedBy: 'Col. Rajesh Kumar',
      uploadDate: '2024-01-15',
      status: 'Published',
      duration: '45 min',
      size: '250 MB',
    },
    {
      id: 2,
      title: 'Combat Training Manual',
      type: 'PDF',
      batch: 'Platoon Commander',
      uploadedBy: 'Maj. Priya Sharma',
      uploadDate: '2024-01-14',
      status: 'Published',
      duration: 'N/A',
      size: '15 MB',
    },
    {
      id: 3,
      title: 'Tactical Operations Guide',
      type: 'Interactive',
      batch: 'Commando',
      uploadedBy: 'Lt. Col. Amit Singh',
      uploadDate: '2024-01-13',
      status: 'Published',
      duration: '60 min',
      size: '180 MB',
    },
    {
      id: 4,
      title: 'Leadership and Command',
      type: 'Assessment',
      batch: 'Platoon Commander',
      uploadedBy: 'Capt. Sneha Gupta',
      uploadDate: '2024-01-12',
      status: 'Published',
      duration: '30 min',
      size: '5 MB',
    },
  ];

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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video':
        return <VideoIcon sx={{ fontSize: 16, color: '#c62020ff' }} />;
      case 'PDF':
        return <PdfIcon sx={{ fontSize: 16, color: '#FF6B00' }} />;
      case 'Interactive':
        return <ImageIcon sx={{ fontSize: 16, color: '#3B5323' }} />;
      case 'Assessment':
        return <EditIcon sx={{ fontSize: 16, color: '#FF8C00' }} />;
      default:
        return <ViewIcon sx={{ fontSize: 16, color: '#6b7280' }} />;
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: '2px solid #FF8C00' }}>
        <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold' }}>
          Lesson Management (पाठ प्रबंधन)
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            backgroundColor: '#c62020ff',
            '&:hover': { backgroundColor: '#a01818' },
          }}
        >
          Create Lesson (पाठ बनाएं)
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#c62020ff', fontWeight: 'bold' }}>
                {lessons.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Total Lessons
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#FF6B00', fontWeight: 'bold' }}>
                {lessons.filter(l => l.status === 'Published').length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Published
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#FF8C00', fontWeight: 'bold' }}>
                {lessons.filter(l => l.status === 'Draft').length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Draft
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#3B5323', fontWeight: 'bold' }}>
                450
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Total MB
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search lessons..."
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
              <InputLabel sx={{ color: '#6b7280' }}>Type</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Type"
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="interactive">Interactive</MenuItem>
                <MenuItem value="assessment">Assessment</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: '#6b7280' }}>Batch</InputLabel>
              <Select
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                label="Batch"
              >
                <MenuItem value="all">All Batches</MenuItem>
                <MenuItem value="commando">Commando</MenuItem>
                <MenuItem value="platoon-commander">Platoon Commander</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Lessons Table */}
          <TableContainer component={Paper} sx={{ backgroundColor: '#1d1dabff' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Batch</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Uploaded By</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Duration</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lessons.map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell sx={{ color: '#1f2937' }}>{lesson.title}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getTypeIcon(lesson.type)}
                        <Typography sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                          {lesson.type}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{lesson.batch}</TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{lesson.uploadedBy}</TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{lesson.duration}</TableCell>
                    <TableCell>
                      <Chip
                        label={lesson.status}
                        color={getStatusColor(lesson.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ color: '#3B5323' }}>
                          <ViewIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#FF6B00' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#fd5d93' }}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Create Lesson (?? ???) Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: '#1d1dabff', color: '#ffffff' },
        }}
      >
        <DialogTitle>Create New Lesson</DialogTitle>
        <DialogContent>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': { color: '#6b7280' },
              '& .Mui-selected': { color: '#c62020ff' },
              '& .MuiTabs-indicator': { backgroundColor: '#c62020ff' },
              mb: 3,
            }}
          >
            <Tab label="Video Lesson" />
            <Tab label="PDF Document" />
            <Tab label="Images" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <UploadIcon sx={{ fontSize: 64, color: '#c62020ff', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#1f2937', mb: 1 }}>
                Upload Video Lesson
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                Drag and drop your video file here or click to browse
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#c62020ff',
                  color: '#c62020ff',
                  '&:hover': { borderColor: '#a01818', backgroundColor: 'rgba(225, 78, 202, 0.1)' },
                }}
              >
                Choose Video File
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <PdfIcon sx={{ fontSize: 64, color: '#FF6B00', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#1f2937', mb: 1 }}>
                Upload PDF Document
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                Upload training manuals, guides, and documents
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#FF6B00',
                  color: '#FF6B00',
                  '&:hover': { borderColor: '#1565c0', backgroundColor: 'rgba(29, 140, 248, 0.1)' },
                }}
              >
                Choose PDF File
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <ImageIcon sx={{ fontSize: 64, color: '#3B5323', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#1f2937', mb: 1 }}>
                Upload Images
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                Upload diagrams, charts, and visual content
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#3B5323',
                  color: '#3B5323',
                  '&:hover': { borderColor: '#00a085', backgroundColor: 'rgba(0, 212, 170, 0.1)' },
                }}
              >
                Choose Image Files
              </Button>
            </Box>
          </TabPanel>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#1d1dabff', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button 
            onClick={() => setOpenDialog(false)} 
            sx={{ 
              color: '#e5e7eb',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Cancel (रद्द करें)
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#c62020ff',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#a01818' },
            }}
          >
            Create Lesson (पाठ बनाएं)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Lessons;


