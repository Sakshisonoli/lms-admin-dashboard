import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const TeamMemberCard = ({ member, onSendMessage }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ textAlign: 'center' }}>
      <Avatar
        sx={{
          width: 80,
          height: 80,
          mx: 'auto',
          mb: 2,
          backgroundColor: '#e14eca',
          fontSize: '2rem',
        }}
      >
        {member.name.charAt(0)}
      </Avatar>
      <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
        {member.name}
      </Typography>
      <Typography variant="body2" sx={{ color: '#9a9a9a', mb: 2 }}>
        {member.email}
      </Typography>
      <Chip
        label={member.status}
        color={member.status === 'Active' ? 'success' : 'default'}
        size="small"
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
        <IconButton size="small" sx={{ color: '#1d8cf8' }}>
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: '#e14eca' }}
          onClick={() => onSendMessage(member)}
        >
          <EmailIcon />
        </IconButton>
        <IconButton size="small" sx={{ color: '#fd5d93' }}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </CardContent>
  </Card>
);

function Team() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSendMessage = (member) => {
    alert(`Send direct message to ${member.name}`);
  };

  const officeStaff = [
    { id: 1, name: 'Alice Johnson', email: 'alice@klp.com', status: 'Active', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@klp.com', status: 'Active', role: 'Manager' },
    { id: 3, name: 'Carol Davis', email: 'carol@klp.com', status: 'Inactive', role: 'Coordinator' },
  ];

  const teachers = [
    { id: 1, name: 'Dr. Emily Brown', email: 'emily@klp.com', status: 'Active', subject: 'Mathematics' },
    { id: 2, name: 'Prof. David Wilson', email: 'david@klp.com', status: 'Active', subject: 'Physics' },
    { id: 3, name: 'Ms. Sarah Lee', email: 'sarah@klp.com', status: 'Active', subject: 'Chemistry' },
    { id: 4, name: 'Mr. John Taylor', email: 'john@klp.com', status: 'Inactive', subject: 'Biology' },
  ];

  const students = [
    { id: 1, name: 'Alex Kumar', email: 'alex@student.klp.com', status: 'Active', batch: 'Batch A' },
    { id: 2, name: 'Priya Sharma', email: 'priya@student.klp.com', status: 'Active', batch: 'Batch B' },
    { id: 3, name: 'Raj Patel', email: 'raj@student.klp.com', status: 'Active', batch: 'Batch A' },
    { id: 4, name: 'Maya Singh', email: 'maya@student.klp.com', status: 'Inactive', batch: 'Batch C' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
          Team Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#e14eca',
            '&:hover': { backgroundColor: '#c73aa8' },
          }}
        >
          Add Member
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': { color: '#9a9a9a' },
              '& .Mui-selected': { color: '#e14eca' },
              '& .MuiTabs-indicator': { backgroundColor: '#e14eca' },
            }}
          >
            <Tab label="Office Staff" />
            <Tab label="Teachers" />
            <Tab label="Students" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              {officeStaff.map((member) => (
                <Grid item xs={12} sm={6} md={4} key={member.id}>
                  <TeamMemberCard member={member} onSendMessage={handleSendMessage} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TableContainer component={Paper} sx={{ backgroundColor: '#27293d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Subject</TableCell>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell sx={{ color: '#ffffff' }}>{teacher.name}</TableCell>
                      <TableCell sx={{ color: '#9a9a9a' }}>{teacher.email}</TableCell>
                      <TableCell sx={{ color: '#9a9a9a' }}>{teacher.subject}</TableCell>
                      <TableCell>
                        <Chip
                          label={teacher.status}
                          color={teacher.status === 'Active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" sx={{ color: '#1d8cf8' }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ color: '#e14eca' }}
                            onClick={() => handleSendMessage(teacher)}
                          >
                            <EmailIcon />
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
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <TableContainer component={Paper} sx={{ backgroundColor: '#27293d' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Batch</TableCell>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell sx={{ color: '#ffffff' }}>{student.name}</TableCell>
                      <TableCell sx={{ color: '#9a9a9a' }}>{student.email}</TableCell>
                      <TableCell sx={{ color: '#9a9a9a' }}>{student.batch}</TableCell>
                      <TableCell>
                        <Chip
                          label={student.status}
                          color={student.status === 'Active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" sx={{ color: '#1d8cf8' }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ color: '#e14eca' }}
                            onClick={() => handleSendMessage(student)}
                          >
                            <EmailIcon />
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
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Team;