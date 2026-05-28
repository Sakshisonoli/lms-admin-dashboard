import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { queryAPI, contentAPI } from '../services/api';
import {
  Box, Typography, Card, CardContent, Button, TextField, Avatar,
  Chip, IconButton, Divider, Paper, Alert, CircularProgress,
  ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import {
  ArrowBack as BackIcon, Send as SendIcon,
  Reply as ReplyIcon, Email as EmailIcon, Delete as DeleteIcon,
} from '@mui/icons-material';

function DocumentViewer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { userContext } = useUser();

  const [docData, setDocData] = useState(location.state?.document || null);
  const [queries, setQueries] = useState([]);
  const [loadingDoc, setLoadingDoc] = useState(false); // never block render — getOne runs in background
  const [loadingQueries, setLoadingQueries] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [postType, setPostType] = useState('question'); // 'question' or 'comment'
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [posting, setPosting] = useState(false);

  // Always call getOne to register the view in the database
  useEffect(() => {
    if (id) {
      contentAPI.getOne(id)
        .then(res => {
          // Only update docData if it wasn't passed via navigation state
          if (!location.state?.document) {
            setDocData({
              id: res.data._id,
              title: res.data.title,
              type: res.data.type,
              batch: res.data.batch?.name || '',
              uploadedBy: res.data.uploadedBy?.name || '',
              uploadedById: res.data.uploadedBy?._id,
              uploadDate: new Date(res.data.createdAt).toLocaleDateString(),
              fileSize: res.data.fileSize || 'N/A',
              fileUrl: res.data.fileUrl,
              description: res.data.description,
            });
          }
          // Always mark as loaded
          setLoadingDoc(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingDoc(false);
        });
    }
  }, [id]); // eslint-disable-line

  // Fetch queries/comments for this docData
  useEffect(() => {
    const docId = docData?.id || id;
    if (!docId) return;
    queryAPI.getAll(`?content=${docId}`)
      .then(res => setQueries(res.data))
      .catch(console.error)
      .finally(() => setLoadingQueries(false));
  }, [id, docData?.id]); // eslint-disable-line

  const handleSendMessage = () => {
    const teacher = { name: docData?.uploadedBy, _id: docData?.uploadedById };
    const currentPath = location.pathname;
    let messagePath = '/admin/messages';
    if (currentPath.includes('/student/')) messagePath = '/student/messages';
    else if (currentPath.includes('/teacher/')) messagePath = '/teacher/messages';
    navigate(messagePath, { state: { recipient: teacher } });
  };

  const refreshQueries = async () => {
    const docId = docData?.id || id;
    if (!docId) return;
    const res = await queryAPI.getAll(`?content=${docId}`);
    setQueries(res.data);
  };

  const handleDeleteQuery = async (queryId) => {
    try {
      await queryAPI.remove(queryId);
      await refreshQueries();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    try {
      setPosting(true);
      await queryAPI.create({
        question: newComment,
        content: docData?.id || id,
        postType,
      });
      await refreshQueries();
      setNewComment('');
    } catch (err) {
      console.error(err);
    } finally {
      setPosting(false);
    }
  };

  const handlePostReply = async (queryId) => {
    if (!replyText.trim()) return;
    try {
      setPosting(true);
      await queryAPI.reply(queryId, replyText);
      await refreshQueries();
      setReplyText('');
      setReplyTo(null);
    } catch (err) {
      console.error(err);
    } finally {
      setPosting(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'teacher': return '#FF6B00';
      case 'student': return '#3B5323';
      case 'admin': return '#c62020ff';
      default: return '#9a9a9a';
    }
  };

  const timeAgo = (date) => {
    if (!date) return '';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds} secs ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  if (loadingDoc) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress sx={{ color: '#c62020ff' }} /></Box>;
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: '#6b7280', mr: 2 }}>
          <BackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ color: '#1f2937', fontWeight: 'bold' }}>
          {docData?.title}
        </Typography>
      </Box>

      {/* docData Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip label={docData?.type || 'Document'} sx={{ backgroundColor: '#FF6B00', color: '#ffffff' }} size="small" />
            {docData?.batch && <Chip label={typeof docData.batch === 'object' ? docData.batch.name : docData.batch} size="small" />}
            {docData?.fileSize && docData.fileSize !== 'N/A' && <Chip label={docData.fileSize} size="small" variant="outlined" />}
          </Box>
          {docData?.description && (
            <Typography variant="body2" sx={{ color: '#1f2937', mb: 2 }}>{docData.description}</Typography>
          )}

          {/* Uploader Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2,
            backgroundColor: 'rgba(29,140,248,0.1)', borderRadius: 2, border: '1px solid rgba(29,140,248,0.3)' }}>
            <Avatar sx={{ backgroundColor: '#FF6B00', width: 48, height: 48 }}>
              {docData?.uploadedBy?.charAt(0) || 'T'}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" sx={{ color: '#1f2937', fontWeight: 600 }}>
                {docData?.uploadedBy}
              </Typography>
              <Typography variant="caption" sx={{ color: '#6b7280' }}>
                Uploaded on {docData?.uploadDate}
              </Typography>
            </Box>
            <Button variant="contained" startIcon={<EmailIcon />} onClick={handleSendMessage}
              sx={{ backgroundColor: '#c62020ff', '&:hover': { backgroundColor: '#a01818' } }}>
              Message Teacher
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Document Viewer */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          {docData?.fileUrl ? (
            <Box sx={{ height: 600, borderRadius: 2, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
              <iframe
                src={`http://localhost:5000${docData.fileUrl}`}
                title={docData.title}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                onContextMenu={(e) => e.preventDefault()}
              />
            </Box>
          ) : (
            <Box sx={{ height: 400, backgroundColor: '#1d1dabff', borderRadius: 2,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>Secure docData Viewer</Typography>
              <Typography sx={{ color: '#9ca3af', mb: 2 }}>[docData content would be displayed here]</Typography>
              <Alert severity="info" sx={{ maxWidth: 600 }}>
                This is a secure viewer. Right-click, download, and print are disabled for security purposes.
              </Alert>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Comments / Q&A Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#1f2937', mb: 3 }}>
            Questions & Comments ({queries.length})
          </Typography>

          {/* Post New Comment — all users can post */}
          <Box sx={{ mb: 4 }}>
            {/* Type selector */}
            <ToggleButtonGroup
              value={postType}
              exclusive
              onChange={(e, val) => val && setPostType(val)}
              size="small"
              sx={{ mb: 2 }}
            >
              <ToggleButton value="question"
                sx={{ '&.Mui-selected': { backgroundColor: '#c62020ff', color: '#ffffff', '&:hover': { backgroundColor: '#a01818' } } }}>
                ❓ Question
              </ToggleButton>
              <ToggleButton value="comment"
                sx={{ '&.Mui-selected': { backgroundColor: '#3B5323', color: '#ffffff', '&:hover': { backgroundColor: '#2d4a1e' } } }}>
                💬 Comment
              </ToggleButton>
            </ToggleButtonGroup>

            <TextField fullWidth multiline rows={3}
              placeholder={postType === 'question' ? 'Ask a question about this document...' : 'Post a comment or feedback...'}
              value={newComment} onChange={(e) => setNewComment(e.target.value)} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" startIcon={posting ? null : <SendIcon />}
                onClick={handlePostComment} disabled={!newComment.trim() || posting}
                sx={{
                  backgroundColor: postType === 'question' ? '#c62020ff' : '#3B5323',
                  '&:hover': { backgroundColor: postType === 'question' ? '#a01818' : '#2d4a1e' },
                }}>
                {posting ? <CircularProgress size={20} color="inherit" /> : (postType === 'question' ? 'Post Question' : 'Post Comment')}
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Comments List */}
          {loadingQueries ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress sx={{ color: '#c62020ff' }} />
            </Box>
          ) : queries.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: '#6b7280' }}>No questions yet. Be the first to ask!</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {queries.map((query) => (
                <Paper key={query._id} sx={{
                  p: 2, backgroundColor: '#1d1dabff',
                  border: `1px solid ${query.postType === 'comment' ? '#3B5323' : '#344675'}`,
                  borderLeft: `4px solid ${query.postType === 'comment' ? '#3B5323' : '#FF8C00'}`,
                }}>
                  {/* Main Question */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar sx={{ backgroundColor: getRoleColor(query.student?.role || 'student') }}>
                      {query.student?.name?.charAt(0) || 'S'}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle2" sx={{ color: '#ffffff' }}>
                            {query.student?.name || 'Student'}
                          </Typography>
                          <Chip label={query.student?.role || 'student'} size="small"
                            sx={{ backgroundColor: getRoleColor(query.student?.role || 'student'),
                              color: '#ffffff', height: 20, fontSize: '0.7rem', textTransform: 'capitalize' }} />
                          <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                            • {timeAgo(query.createdAt)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {query.postType !== 'comment' && (
                            <Chip label={query.status} size="small"
                              color={query.status === 'resolved' ? 'success' : 'warning'} />
                          )}
                          {query.postType === 'comment' && (
                            <Chip label="comment" size="small"
                              sx={{ backgroundColor: 'rgba(59,83,35,0.3)', color: '#3B5323' }} />
                          )}
                          {(userContext.userType === 'teacher' || userContext.userType === 'admin') && (
                            <IconButton size="small" sx={{ color: '#fd5d93',
                              '&:hover': { backgroundColor: 'rgba(253,93,147,0.1)' } }}
                              onClick={() => handleDeleteQuery(query._id)}>
                              <DeleteIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          )}
                        </Box>
                      </Box>

                      <Typography variant="body2" sx={{ color: '#e5e7eb', mb: 2 }}>
                        {query.question}
                      </Typography>

                      {/* Reply button — only for questions, not comments */}
                      {(userContext.userType === 'teacher' || userContext.userType === 'admin') && query.status === 'pending' && query.postType !== 'comment' && (
                        <Button size="small" startIcon={<ReplyIcon />}
                          onClick={() => setReplyTo(query._id)} sx={{ color: '#FF6B00' }}>
                          Reply
                        </Button>
                      )}

                      {/* Reply Form */}
                      {replyTo === query._id && (
                        <Box sx={{ mt: 2, pl: 2, borderLeft: '2px solid #344675' }}>
                          <TextField fullWidth multiline rows={2} placeholder="Write your reply..."
                            value={replyText} onChange={(e) => setReplyText(e.target.value)} sx={{ mb: 1 }} />
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Button size="small" variant="contained" onClick={() => handlePostReply(query._id)}
                              disabled={!replyText.trim() || posting}
                              sx={{ backgroundColor: '#c62020ff', '&:hover': { backgroundColor: '#a01818' } }}>
                              {posting ? <CircularProgress size={16} color="inherit" /> : 'Post Reply'}
                            </Button>
                            <Button size="small" variant="contained" onClick={() => { setReplyTo(null); setReplyText(''); }}
                              sx={{ backgroundColor: '#6b7280', '&:hover': { backgroundColor: '#4b5563' } }}>
                              Cancel
                            </Button>
                          </Box>
                        </Box>
                      )}

                      {/* Existing Reply */}
                      {query.reply && query.reply.trim() && (
                        <Box sx={{ mt: 2, pl: 2, borderLeft: '2px solid #FF8C00' }}>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Avatar sx={{ backgroundColor: '#FF6B00', width: 32, height: 32 }}>
                              {query.teacher?.name?.charAt(0) || 'T'}
                            </Avatar>
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Typography variant="subtitle2" sx={{ color: '#ffffff', fontSize: '0.875rem' }}>
                                  {query.teacher?.name || 'Instructor'}
                                </Typography>
                                <Chip
                                  label={
                                    query.teacher?.role === 'admin' ? 'Admin' :
                                    query.teacher?.role === 'teacher' ? 'Trainer' :
                                    'Instructor'
                                  }
                                  size="small"
                                  sx={{ backgroundColor: '#FF6B00', color: '#ffffff', height: 18, fontSize: '0.65rem' }} />
                              </Box>
                              <Typography variant="body2" sx={{ color: '#e5e7eb', fontSize: '0.875rem' }}>
                                {query.reply}
                              </Typography>
                            </Box>
                          </Box>
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
