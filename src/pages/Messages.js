import React, { useState } from 'react';
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

  const conversations = [
    {
      id: 1,
      name: 'Dr. Emily Brown',
      role: 'Teacher',
      lastMessage: 'The new mathematics curriculum is ready for review.',
      time: '2 hours ago',
      unread: 2,
      avatar: 'E',
    },
    {
      id: 2,
      name: 'Student Support Team',
      role: 'Group',
      lastMessage: 'We need to discuss the upcoming batch enrollment.',
      time: '4 hours ago',
      unread: 0,
      avatar: 'S',
    },
    {
      id: 3,
      name: 'Prof. David Wilson',
      role: 'Teacher',
      lastMessage: 'Physics lab equipment request submitted.',
      time: '1 day ago',
      unread: 1,
      avatar: 'D',
    },
    {
      id: 4,
      name: 'Alice Johnson',
      role: 'Office Staff',
      lastMessage: 'Monthly report is ready for your review.',
      time: '2 days ago',
      unread: 0,
      avatar: 'A',
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'Dr. Emily Brown',
      content: 'Hello! I wanted to update you on the mathematics curriculum progress.',
      time: '10:30 AM',
      isOwn: false,
    },
    {
      id: 2,
      sender: 'You',
      content: 'Great! How is the student response so far?',
      time: '10:35 AM',
      isOwn: true,
    },
    {
      id: 3,
      sender: 'Dr. Emily Brown',
      content: 'The feedback has been very positive. Students are engaging well with the new interactive modules.',
      time: '10:40 AM',
      isOwn: false,
    },
    {
      id: 4,
      sender: 'Dr. Emily Brown',
      content: 'The new mathematics curriculum is ready for review. I\'ve attached the complete syllabus.',
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
    <Box>
      <Typography variant="h4" sx={{ color: '#ffffff', mb: 3, fontWeight: 'bold' }}>
        Messages & Communication
      </Typography>

      <Grid container spacing={3} sx={{ height: 'calc(100vh - 200px)' }}>
        {/* Conversations List */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Search conversations..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#9a9a9a' }} />
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
                  backgroundColor: '#e14eca',
                  '&:hover': { backgroundColor: '#c73aa8' },
                  mb: 2,
                }}
              >
                New Message
              </Button>

              <List sx={{ p: 0 }}>
                {conversations.map((conversation, index) => (
                  <React.Fragment key={conversation.id}>
                    <ListItem
                      button
                      selected={selectedConversation === index}
                      onClick={() => setSelectedConversation(index)}
                      sx={{
                        borderRadius: '8px',
                        mb: 1,
                        backgroundColor: selectedConversation === index ? 'rgba(225, 78, 202, 0.1)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(225, 78, 202, 0.05)',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: '#e14eca' }}>
                          {conversation.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle2" sx={{ color: '#ffffff' }}>
                              {conversation.name}
                            </Typography>
                            {conversation.unread > 0 && (
                              <Chip
                                label={conversation.unread}
                                size="small"
                                sx={{
                                  backgroundColor: '#e14eca',
                                  color: '#ffffff',
                                  height: 20,
                                  fontSize: '0.75rem',
                                }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" sx={{ color: '#1d8cf8' }}>
                              {conversation.role}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#9a9a9a',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {conversation.lastMessage}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#9a9a9a' }}>
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
                <Avatar sx={{ backgroundColor: '#e14eca' }}>
                  {conversations[selectedConversation]?.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: '#ffffff' }}>
                    {conversations[selectedConversation]?.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#1d8cf8' }}>
                    {conversations[selectedConversation]?.role}
                  </Typography>
                </Box>
              </Box>
              <IconButton sx={{ color: '#9a9a9a' }}>
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
                      backgroundColor: message.isOwn ? '#e14eca' : '#344675',
                      color: '#ffffff',
                    }}
                  >
                    <Typography variant="body2">{message.content}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: message.isOwn ? 'rgba(255,255,255,0.8)' : '#9a9a9a',
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
                <IconButton sx={{ color: '#9a9a9a' }}>
                  <AttachFileIcon />
                </IconButton>
                <IconButton
                  onClick={handleSendMessage}
                  sx={{
                    backgroundColor: '#e14eca',
                    color: '#ffffff',
                    '&:hover': { backgroundColor: '#c73aa8' },
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