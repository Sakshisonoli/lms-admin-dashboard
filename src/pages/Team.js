import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
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
          backgroundColor: '#c62020ff',
          fontSize: '2rem',
        }}
      >
        {member.name.charAt(0)}
      </Avatar>
      <Typography variant="h6" sx={{ color: '#1f2937', mb: 1 }}>
        {member.name}
      </Typography>
      <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
        {member.email}
      </Typography>
      <Chip
        label={member.status}
        color={member.status === 'Active' ? 'success' : 'default'}
        size="small"
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
        <IconButton size="small" sx={{ color: '#FF6B00' }}>
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: '#c62020ff' }}
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
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSendMessage = (member) => {
    // Navigate to messages page with the member's info
    navigate('/admin/messages', { state: { recipient: member } });
  };

  const officeStaff = [
    { id: 1, name: 'Ramesh Gupta', email: 'ramesh.gupta@army.gov.in', status: 'Active', role: 'Admin' },
    { id: 2, name: 'Sanjay Mehta', email: 'sanjay.mehta@army.gov.in', status: 'Active', role: 'Manager' },
    { id: 3, name: 'Kavita Desai', email: 'kavita.desai@army.gov.in', status: 'Active', role: 'Coordinator' },
  ];

  const teachers = [
    { id: 1, name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@army.gov.in', status: 'Active', subject: 'Military Strategy' },
    { id: 2, name: 'Prof. Amit Singh', email: 'amit.singh@army.gov.in', status: 'Active', subject: 'Physical Training' },
    { id: 3, name: 'Ms. Priya Verma', email: 'priya.verma@army.gov.in', status: 'Active', subject: 'Weapons Training' },
    { id: 4, name: 'Mr. Vikram Patel', email: 'vikram.patel@army.gov.in', status: 'Active', subject: 'Leadership' },
  ];

  const students = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@student.army.gov.in', status: 'Active', batch: 'Commando' },
    { id: 2, name: 'Priya Singh', email: 'priya.singh@student.army.gov.in', status: 'Active', batch: 'Platoon Commander' },
    { id: 3, name: 'Raj Patel', email: 'raj.patel@student.army.gov.in', status: 'Active', batch: 'Commando' },
    { id: 4, name: 'Anjali Reddy', email: 'anjali.reddy@student.army.gov.in', status: 'Active', batch: 'Platoon Commander' },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader
        title="Team Management (टीम प्रबंधन)"
        buttonText="Add Team Member"
        buttonIcon={<AddIcon />}
        onButtonClick={() => {}}
      />

      <Card>
        <CardContent>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': { color: '#6b7280' },
              '& .Mui-selected': { color: '#c62020ff' },
              '& .MuiTabs-indicator': { backgroundColor: '#c62020ff' },
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
            <TableContainer component={Paper} sx={{ backgroundColor: '#1d1dabff', overflowX: 'auto' }}>
              <Table sx={{ minWidth: { xs: 650, sm: 'auto' } }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Subject</TableCell>
                    <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell sx={{ color: '#1f2937' }}>{teacher.name}</TableCell>
                      <TableCell sx={{ color: '#6b7280' }}>{teacher.email}</TableCell>
                      <TableCell sx={{ color: '#6b7280' }}>{teacher.subject}</TableCell>
                      <TableCell>
                        <Chip
                          label={teacher.status}
                          color={teacher.status === 'Active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" sx={{ color: '#FF6B00' }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ color: '#c62020ff' }}
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
            <TableContainer component={Paper} sx={{ backgroundColor: '#1d1dabff', overflowX: 'auto' }}>
              <Table sx={{ minWidth: { xs: 650, sm: 'auto' } }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Batch</TableCell>
                    <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: '#1f2937', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell sx={{ color: '#1f2937' }}>{student.name}</TableCell>
                      <TableCell sx={{ color: '#6b7280' }}>{student.email}</TableCell>
                      <TableCell sx={{ color: '#6b7280' }}>{student.batch}</TableCell>
                      <TableCell>
                        <Chip
                          label={student.status}
                          color={student.status === 'Active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" sx={{ color: '#FF6B00' }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ color: '#c62020ff' }}
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



