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
      title: 'Introduction to Military Strategy',
      type: 'Video',
      batch: 'Batch A',
      uploadedBy: 'Col. Smith',
      uploadDate: '2024-01-15',
      status: 'Published',
      duration: '45 min',
      size: '250 MB',
    },
    {
      id: 2,
      title: 'Combat Training Manual',
      type: 'PDF',
      batch: 'Batch B',
      uploadedBy: 'Maj. Johnson',
      uploadDate: '2024-01-14',
      status: 'Draft',
      duration: 'N/A',
      size: '15 MB',
    },
    {
      id: 3,
      title: 'Tactical Operations Guide',
      type: 'Interactive',
      batch: 'Batch A',
      uploadedBy: 'Lt. Col. Brown',
      uploadDate: '2024-01-13',
      status: 'Published',
      duration: '60 min',
      size: '180 MB',
    },
    {
      id: 4,
      title: 'Leadership Assessment',
      type: 'Assessment',
      batch: 'Batch C',
      uploadedBy: 'Capt. Wilson',
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
        return <VideoIcon sx={{ fontSize: 16, color: '#e14eca' }} />;
      case 'PDF':
        return <PdfIcon sx={{ fontSize: 16, color: '#1d8cf8' }} />;
      case 'Interactive':
        return <ImageIcon sx={{ fontSize: 16, color: '#00d4aa' }} />;
      case 'Assessment':
        return <EditIcon sx={{ fontSize: 16, color: '#ff8a00' }} />;
      default:
        return <ViewIcon sx={{ fontSize: 16, color: '#9a9a9a' }} />;
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
          Lesson Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            backgroundColor: '#e14eca',
            '&:hover': { backgroundColor: '#c73aa8' },
          }}
        >
          Create Lesson
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#e14eca', fontWeight: 'bold' }}>
                {lessons.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Total Lessons
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#1d8cf8', fontWeight: 'bold' }}>
                {lessons.filter(l => l.status === 'Published').length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Published
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#ff8a00', fontWeight: 'bold' }}>
                {lessons.filter(l => l.status === 'Draft').length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Draft
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#00d4aa', fontWeight: 'bold' }}>
                450
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
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
                    <SearchIcon sx={{ color: '#9a9a9a' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />
            
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: '#9a9a9a' }}>Type</InputLabel>
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
              <InputLabel sx={{ color: '#9a9a9a' }}>Batch</InputLabel>
              <Select
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                label="Batch"
              >
                <MenuItem value="all">All Batches</MenuItem>
                <MenuItem value="batch-a">Batch A</MenuItem>
                <MenuItem value="batch-b">Batch B</MenuItem>
                <MenuItem value="batch-c">Batch C</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Lessons Table */}
          <TableContainer component={Paper} sx={{ backgroundColor: '#27293d' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Batch</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Uploaded By</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Duration</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lessons.map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell sx={{ color: '#ffffff' }}>{lesson.title}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getTypeIcon(lesson.type)}
                        <Typography sx={{ color: '#9a9a9a', fontSize: '0.875rem' }}>
                          {lesson.type}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{lesson.batch}</TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{lesson.uploadedBy}</TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{lesson.duration}</TableCell>
                    <TableCell>
                      <Chip
                        label={lesson.status}
                        color={getStatusColor(lesson.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ color: '#00d4aa' }}>
                          <ViewIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#1d8cf8' }}>
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

      {/* Create Lesson Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: '#27293d', color: '#ffffff' },
        }}
      >
        <DialogTitle>Create New Lesson</DialogTitle>
        <DialogContent>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': { color: '#9a9a9a' },
              '& .Mui-selected': { color: '#e14eca' },
              '& .MuiTabs-indicator': { backgroundColor: '#e14eca' },
              mb: 3,
            }}
          >
            <Tab label="Video Lesson" />
            <Tab label="PDF Document" />
            <Tab label="Images" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <UploadIcon sx={{ fontSize: 64, color: '#e14eca', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                Upload Video Lesson
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a', mb: 3 }}>
                Drag and drop your video file here or click to browse
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#e14eca',
                  color: '#e14eca',
                  '&:hover': { borderColor: '#c73aa8', backgroundColor: 'rgba(225, 78, 202, 0.1)' },
                }}
              >
                Choose Video File
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <PdfIcon sx={{ fontSize: 64, color: '#1d8cf8', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                Upload PDF Document
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a', mb: 3 }}>
                Upload training manuals, guides, and documents
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#1d8cf8',
                  color: '#1d8cf8',
                  '&:hover': { borderColor: '#1565c0', backgroundColor: 'rgba(29, 140, 248, 0.1)' },
                }}
              >
                Choose PDF File
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <ImageIcon sx={{ fontSize: 64, color: '#00d4aa', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                Upload Images
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a', mb: 3 }}>
                Upload diagrams, charts, and visual content
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#00d4aa',
                  color: '#00d4aa',
                  '&:hover': { borderColor: '#00a085', backgroundColor: 'rgba(0, 212, 170, 0.1)' },
                }}
              >
                Choose Image Files
              </Button>
            </Box>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#9a9a9a' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#e14eca',
              '&:hover': { backgroundColor: '#c73aa8' },
            }}
          >
            Create Lesson
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Lessons;