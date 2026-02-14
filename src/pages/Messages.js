import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  Divider,
  Paper,
  InputAdornment,
} from '@mui/material';
import {
  Send as SendIcon,
  Search as SearchIcon,
  AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Col. Rajesh Kumar',
      role: 'Trainer',
      lastMessage: 'The new military strategy curriculum is ready for review.',
      time: '2 hours ago',
      unread: 2,
      avatar: 'R',
    },
    {
      id: 2,
      name: 'Training Support Team',
      role: 'Group',
      lastMessage: 'We need to discuss the upcoming batch enrollment.',
      time: '4 hours ago',
      unread: 0,
      avatar: 'T',
    },
    {
      id: 3,
      name: 'Maj. Priya Sharma',
      role: 'Trainer',
      lastMessage: 'Combat training equipment request submitted.',
      time: '1 day ago',
      unread: 1,
      avatar: 'P',
    },
    {
      id: 4,
      name: 'Lt. Col. Amit Singh',
      role: 'Trainer',
      lastMessage: 'Weapons training report is ready for your review.',
      time: '2 days ago',
      unread: 0,
      avatar: 'A',
    },
  ];

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const messages = [
    {
      id: 1,
      sender: 'Col. Rajesh Kumar',
      content: 'Hello! I wanted to update you on the military strategy curriculum progress.',
      time: '10:30 AM',
      isOwn: false,
    },
    {
      id: 2,
      sender: 'You',
      content: 'Great! How is the trainee response so far?',
      time: '10:35 AM',
      isOwn: true,
    },
    {
      id: 3,
      sender: 'Col. Rajesh Kumar',
      content: 'The feedback has been very positive. Trainees are engaging well with the new tactical modules.',
      time: '10:40 AM',
      isOwn: false,
    },
    {
      id: 4,
      sender: 'Col. Rajesh Kumar',
      content: 'The new military strategy curriculum is ready for review. I\'ve attached the complete syllabus.',
      time: '11:15 AM',
      isOwn: false,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader
        title="Messages & Communication (संदेश और संचार)"
      />

      <Grid container spacing={3} sx={{ height: 'calc(100vh - 200px)' }}>
        {/* Conversations List */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#6b7280' }} />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                />
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#c62020ff',
                  color: '#ffffff',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  py: 1,
                  '&:hover': { 
                    backgroundColor: '#a01818',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  },
                  mb: 2,
                }}
              >
                New Message (नया संदेश)
              </Button>

              <List sx={{ p: 0 }}>
                {filteredConversations.map((conversation, index) => (
                  <React.Fragment key={conversation.id}>
                    <ListItem
                      button
                      selected={selectedConversation === index}
                      onClick={() => setSelectedConversation(index)}
                      sx={{
                        borderRadius: 0,
                        mb: 0,
                        backgroundColor: selectedConversation === index ? '#f3f4f6' : 'transparent',
                        borderLeft: selectedConversation === index ? '4px solid #FF8C00' : '4px solid transparent',
                        '&:hover': {
                          backgroundColor: '#f3f4f6',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: '#1d1dabff' }}>
                          {conversation.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle2" sx={{ color: '#1f2937' }}>
                              {conversation.name}
                            </Typography>
                            {conversation.unread > 0 && (
                              <Chip
                                label={conversation.unread}
                                size="small"
                                sx={{
                                  backgroundColor: '#c62020ff',
                                  color: '#ffffff',
                                  height: 20,
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" sx={{ color: '#3B5323', fontWeight: 600 }}>
                              {conversation.role}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#6b7280',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {conversation.lastMessage}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#6b7280' }}>
                              {conversation.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < conversations.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Chat Area */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Header */}
            <Box
              sx={{
                p: 2,
                borderBottom: '1px solid #344675',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ backgroundColor: '#1d1dabff' }}>
                  {conversations[selectedConversation]?.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: '#1f2937' }}>
                    {conversations[selectedConversation]?.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#3B5323', fontWeight: 600 }}>
                    {conversations[selectedConversation]?.role}
                  </Typography>
                </Box>
              </Box>
              <IconButton sx={{ color: '#6b7280' }}>
                <MoreVertIcon />
              </IconButton>
            </Box>

            {/* Messages */}
            <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.isOwn ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      backgroundColor: message.isOwn ? '#1d1dabff' : '#f4f6f9',
                      boxShadow: 'none',
                      border: message.isOwn ? 'none' : '1px solid #e5e7eb',
                    }}
                  >
                    <Typography variant="body2" sx={{ color: message.isOwn ? '#ffffff' : '#1f2937' }}>
                      {message.content}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: message.isOwn ? 'rgba(255,255,255,0.8)' : '#4b5563',
                        display: 'block',
                        textAlign: 'right',
                        mt: 1,
                      }}
                    >
                      {message.time}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, borderTop: '1px solid #344675' }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <IconButton sx={{ color: '#6b7280' }}>
                  <AttachFileIcon />
                </IconButton>
                <IconButton
                  onClick={handleSendMessage}
                  sx={{
                    backgroundColor: '#c62020ff',
                    color: '#ffffff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': { 
                      backgroundColor: '#a01818',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Messages;


