import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Chip,
  IconButton,
  Divider,
  Paper,
  Alert,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Send as SendIcon,
  Reply as ReplyIcon,
  MoreVert as MoreIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

function DocumentViewer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { userContext } = useUser();
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Get document data from navigation state or use default
  const documentFromState = location.state?.document;
  const uploadedByEmail = location.state?.uploadedByEmail || '';

  // Sample document data (fallback if no state)
  const document = documentFromState || {
    id: id || 1,
    title: 'Introduction to Military Strategy',
    type: 'Document',
    uploadedBy: 'Dr. Rajesh Kumar',
    uploadedByEmail: 'rajesh.kumar@army.gov.in',
    uploadDate: '2024-01-15',
    batch: 'Commando',
    description: 'Comprehensive guide to military strategic planning and tactical operations.',
    fileSize: '2.5 MB',
  };

  const handleSendMessage = () => {
    const teacher = {
      name: document.uploadedBy,
      email: document.uploadedByEmail || uploadedByEmail,
    };
    // Determine the correct path based on current user role
    const currentPath = location.pathname;
    let messagePath = '/admin/messages';
    if (currentPath.includes('/student/')) {
      messagePath = '/student/messages';
    } else if (currentPath.includes('/teacher/')) {
      messagePath = '/teacher/messages';
    }
    navigate(messagePath, { state: { recipient: teacher } });
  };

  // Sample comments/queries
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Rahul Sharma',
      userRole: 'Student',
      avatar: 'R',
      comment: 'Could you please explain the concept of tactical positioning in more detail?',
      timestamp: '2 hours ago',
      replies: [
        {
          id: 11,
          user: 'Col. Rajesh Kumar',
          userRole: 'Trainer',
          avatar: 'R',
          comment: 'Tactical positioning refers to the strategic placement of forces to maximize advantage. I\'ll cover this in detail in the next session.',
          timestamp: '1 hour ago',
        },
      ],
    },
    {
      id: 2,
      user: 'Priya Sharma',
      userRole: 'Student',
      avatar: 'P',
      comment: 'Is there a practical exercise related to this topic?',
      timestamp: '3 hours ago',
      replies: [],
    },
    {
      id: 3,
      user: 'Raj Patel',
      userRole: 'Student',
      avatar: 'R',
      comment: 'The diagrams on page 15 are very helpful. Thank you!',
      timestamp: '5 hours ago',
      replies: [
        {
          id: 31,
          user: 'Col. Rajesh Kumar',
          userRole: 'Trainer',
          avatar: 'R',
          comment: 'Glad you found them useful! Let me know if you need any clarification.',
          timestamp: '4 hours ago',
        },
      ],
    },
  ]);

  const handlePostComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        user: 'Current User',
        userRole: 'Admin',
        avatar: 'A',
        comment: newComment,
        timestamp: 'Just now',
        replies: [],
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
      alert('Comment posted successfully!');
    }
  };

  const handlePostReply = (commentId) => {
    if (replyText.trim()) {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: comment.replies.length + 1,
                user: 'Current User',
                userRole: 'Admin',
                avatar: 'A',
                comment: replyText,
                timestamp: 'Just now',
              },
            ],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyText('');
      setReplyTo(null);
      alert('Reply posted successfully!');
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Trainer':
        return '#FF6B00';
      case 'Student':
        return '#3B5323';
      case 'Admin':
        return '#c62020ff';
      default:
        return '#9a9a9a';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: '#6b7280', mr: 2 }}>
          <BackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold' }}>
          {document.title}
        </Typography>
      </Box>

      {/* Document Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip 
                  label={document.type || 'Document'} 
                  sx={{ backgroundColor: '#FF6B00', color: '#1f2937' }} 
                  size="small" 
                />
                <Chip label={document.batch} size="small" />
                {document.fileSize && (
                  <Chip label={document.fileSize} size="small" variant="outlined" />
                )}
              </Box>
              <Typography variant="body2" sx={{ color: '#1f2937', mb: 2 }}>
                {document.description}
              </Typography>
              
              {/* Teacher Info Section */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  p: 2,
                  backgroundColor: 'rgba(29, 140, 248, 0.1)',
                  borderRadius: 2,
                  border: '1px solid rgba(29, 140, 248, 0.3)',
                }}
              >
                <Avatar sx={{ backgroundColor: '#FF6B00', width: 48, height: 48 }}>
                  {document.uploadedBy?.charAt(0) || 'T'}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: '#1f2937', fontWeight: 600 }}>
                    {document.uploadedBy}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#6b7280' }}>
                    Uploaded on {document.uploadDate}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<EmailIcon />}
                  onClick={handleSendMessage}
                  sx={{
                    backgroundColor: '#c62020ff',
                    '&:hover': { backgroundColor: '#a01818' },
                  }}
                >
                  Message Teacher
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Document Viewer */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              height: 500,
              backgroundColor: '#1d1dabff',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #344675',
              position: 'relative',
            }}
          >
            <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
              Secure Document Viewer
            </Typography>
            <Typography sx={{ color: '#9ca3af', mb: 2 }}>
              [Document content would be displayed here]
            </Typography>
            <Alert severity="info" sx={{ maxWidth: 600 }}>
              This is a secure viewer. Right-click, download, and print are disabled for security purposes.
            </Alert>
          </Box>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#1f2937', mb: 3 }}>
            Questions & Comments ({comments.length})
          </Typography>

          {/* Post New Comment */}
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Ask a question or post a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handlePostComment}
                disabled={!newComment.trim()}
                sx={{
                  backgroundColor: '#c62020ff',
                  '&:hover': { backgroundColor: '#a01818' },
                }}
              >
                Post Comment
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Comments List */}
          {comments.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: '#6b7280' }}>
                No comments yet. Be the first to ask a question!
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {comments.map((comment) => (
                <Paper
                  key={comment.id}
                  sx={{
                    p: 2,
                    backgroundColor: '#1d1dabff',
                    border: '1px solid #344675',
                  }}
                >
                  {/* Main Comment */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar sx={{ backgroundColor: getRoleColor(comment.userRole) }}>
                      {comment.avatar}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle2" sx={{ color: '#ffffff' }}>
                            {comment.user}
                          </Typography>
                          <Chip
                            label={comment.userRole}
                            size="small"
                            sx={{
                              backgroundColor: getRoleColor(comment.userRole),
                              color: '#ffffff',
                              height: 20,
                              fontSize: '0.7rem',
                            }}
                          />
                          <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                            • {comment.timestamp}
                          </Typography>
                        </Box>
                        <IconButton size="small" sx={{ color: '#9ca3af' }}>
                          <MoreIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#e5e7eb', mb: 2 }}>
                        {comment.comment}
                      </Typography>
                      {/* Only show Reply button for admin and teacher, not for students */}
                      {userContext.userType !== 'student' && (
                        <Button
                          size="small"
                          startIcon={<ReplyIcon />}
                          onClick={() => setReplyTo(comment.id)}
                          sx={{ color: '#FF6B00' }}
                        >
                          Reply
                        </Button>
                      )}

                      {/* Reply Form */}
                      {replyTo === comment.id && (
                        <Box sx={{ mt: 2, pl: 2, borderLeft: '2px solid #344675' }}>
                          <TextField
                            fullWidth
                            multiline
                            rows={2}
                            placeholder="Write your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            sx={{ mb: 1 }}
                          />
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => handlePostReply(comment.id)}
                              disabled={!replyText.trim()}
                              sx={{
                                backgroundColor: '#c62020ff',
                                color: '#ffffff',
                                '&:hover': { backgroundColor: '#a01818' },
                                '&.Mui-disabled': {
                                  backgroundColor: '#4b5563',
                                  color: '#9ca3af',
                                },
                              }}
                            >
                              Post Reply
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setReplyTo(null);
                                setReplyText('');
                              }}
                              sx={{ 
                                color: '#ffffff',
                                backgroundColor: '#6b7280',
                                '&:hover': { backgroundColor: '#4b5563' } 
                              }}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Box>
                      )}

                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <Box sx={{ mt: 2, pl: 2, borderLeft: '2px solid #344675' }}>
                          {comment.replies.map((reply) => (
                            <Box key={reply.id} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                              <Avatar
                                sx={{
                                  backgroundColor: getRoleColor(reply.userRole),
                                  width: 32,
                                  height: 32,
                                }}
                              >
                                {reply.avatar}
                              </Avatar>
                              <Box sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                  <Typography variant="subtitle2" sx={{ color: '#ffffff', fontSize: '0.875rem' }}>
                                    {reply.user}
                                  </Typography>
                                  <Chip
                                    label={reply.userRole}
                                    size="small"
                                    sx={{
                                      backgroundColor: getRoleColor(reply.userRole),
                                      color: '#ffffff',
                                      height: 18,
                                      fontSize: '0.65rem',
                                    }}
                                  />
                                  <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                                    • {reply.timestamp}
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#e5e7eb', fontSize: '0.875rem' }}>
                                  {reply.comment}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default DocumentViewer;



