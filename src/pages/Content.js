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
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

function Content() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');

  const contentData = [
    {
      id: 1,
      title: 'Introduction to Mathematics',
      type: 'Video',
      batch: 'Batch A',
      uploadedBy: 'Dr. Emily Brown',
      uploadDate: '2024-01-15',
      status: 'Published',
    },
    {
      id: 2,
      title: 'Physics Lab Manual',
      type: 'Document',
      batch: 'Batch B',
      uploadedBy: 'Prof. David Wilson',
      uploadDate: '2024-01-14',
      status: 'Draft',
    },
    {
      id: 3,
      title: 'Chemistry Experiments',
      type: 'Interactive',
      batch: 'Batch A',
      uploadedBy: 'Ms. Sarah Lee',
      uploadDate: '2024-01-13',
      status: 'Published',
    },
    {
      id: 4,
      title: 'Biology Quiz Set 1',
      type: 'Assessment',
      batch: 'Batch C',
      uploadedBy: 'Mr. John Taylor',
      uploadDate: '2024-01-12',
      status: 'Published',
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

  const getTypeColor = (type) => {
    switch (type) {
      case 'Video':
        return '#e14eca';
      case 'Document':
        return '#1d8cf8';
      case 'Interactive':
        return '#00d4aa';
      case 'Assessment':
        return '#ff8a00';
      default:
        return '#9a9a9a';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
          Content Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#e14eca',
            '&:hover': { backgroundColor: '#c73aa8' },
          }}
        >
          Upload Content
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#e14eca', fontWeight: 'bold' }}>
                1,234
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                Total Content Items
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#1d8cf8', fontWeight: 'bold' }}>
                856
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
                234
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
                144
              </Typography>
              <Typography variant="body2" sx={{ color: '#9a9a9a' }}>
                This Month
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
              placeholder="Search content..."
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
                <MenuItem value="document">Document</MenuItem>
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

          {/* Content Table */}
          <TableContainer component={Paper} sx={{ backgroundColor: '#27293d' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Batch</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Uploaded By</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contentData.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell sx={{ color: '#ffffff' }}>{content.title}</TableCell>
                    <TableCell>
                      <Chip
                        label={content.type}
                        size="small"
                        sx={{
                          backgroundColor: getTypeColor(content.type),
                          color: '#ffffff',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{content.batch}</TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{content.uploadedBy}</TableCell>
                    <TableCell sx={{ color: '#9a9a9a' }}>{content.uploadDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={content.status}
                        color={getStatusColor(content.status)}
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
    </Box>
  );
}

export default Content;