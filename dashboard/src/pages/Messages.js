import React, { useState, useEffect, useRef } from "react";
import PageHeader from "../components/PageHeader";
import { messageAPI } from "../services/api";
import {
  Box, Typography, Card, CardContent, Grid, TextField, List,
  ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar,
  IconButton, Divider, Paper, InputAdornment, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  FormControl, InputLabel, Select, MenuItem,
} from "@mui/material";
import {
  Send as SendIcon, Search as SearchIcon,
  AttachFile as AttachFileIcon, Add as AddIcon, Close as CloseIcon,
} from "@mui/icons-material";

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newMsgDialog, setNewMsgDialog] = useState(false);
  const [newMsgTo, setNewMsgTo] = useState("");
  const [newMsgText, setNewMsgText] = useState("");
  const messagesEndRef = useRef(null);

  const fetchConversations = async () => {
    try {
      const res = await messageAPI.getConversations();
      setConversations(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await messageAPI.getUsers();
      setAllUsers(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchMessages = async (userId) => {
    try {
      const res = await messageAPI.getMessages(userId);
      setMessages(res.data);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchConversations(); fetchAllUsers(); }, []); // eslint-disable-line
  useEffect(() => { if (selectedUser?._id) fetchMessages(selectedUser._id); }, [selectedUser]); // eslint-disable-line

  const filteredConversations = conversations.filter(c =>
    c.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    try {
      setSending(true);
      await messageAPI.send(selectedUser._id, newMessage);
      setNewMessage("");
      await fetchMessages(selectedUser._id);
      await fetchConversations();
    } catch (err) { console.error(err); }
    finally { setSending(false); }
  };

  const handleStartNewConversation = async () => {
    if (!newMsgTo || !newMsgText.trim()) return;
    try {
      setSending(true);
      await messageAPI.send(newMsgTo, newMsgText);
      const user = allUsers.find(u => u._id === newMsgTo);
      setSelectedUser(user);
      setNewMsgDialog(false);
      setNewMsgTo("");
      setNewMsgText("");
      await fetchConversations();
      await fetchMessages(newMsgTo);
    } catch (err) { console.error(err); }
    finally { setSending(false); }
  };

  const getRoleColor = (role) => {
    if (role === "admin") return "#c62020ff";
    if (role === "teacher") return "#FF6B00";
    return "#3B5323";
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <PageHeader title="Messages and Communication" buttonText="New Message"
        buttonIcon={<AddIcon />} onButtonClick={() => setNewMsgDialog(true)} />
      <Grid container spacing={3} sx={{ height: "calc(100vh - 200px)" }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <TextField fullWidth placeholder="Search conversations..." value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} size="small"
                  InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#6b7280" }} /></InputAdornment> }} />
              </Box>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}><CircularProgress sx={{ color: "#c62020ff" }} /></Box>
              ) : filteredConversations.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography sx={{ color: "#6b7280", mb: 2 }}>No conversations yet</Typography>
                  <Button variant="contained" startIcon={<AddIcon />} onClick={() => setNewMsgDialog(true)}
                    sx={{ backgroundColor: "#c62020ff", "&:hover": { backgroundColor: "#a01818" } }}>
                    Start a Conversation
                  </Button>
                </Box>
              ) : (
                <List sx={{ p: 0 }}>
                  {filteredConversations.map((conv, index) => (
                    <React.Fragment key={conv.user?._id || index}>
                      <ListItem disablePadding>
                        <ListItemButton selected={selectedUser?._id === conv.user?._id}
                          onClick={() => setSelectedUser(conv.user)}
                          sx={{ borderLeft: selectedUser?._id === conv.user?._id ? "4px solid #FF8C00" : "4px solid transparent", "&:hover": { backgroundColor: "#f3f4f6" } }}>
                          <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: getRoleColor(conv.user?.role) }}>{conv.user?.name?.charAt(0)}</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={<Typography variant="subtitle2" sx={{ color: "#1f2937" }}>{conv.user?.name}</Typography>}
                            secondary={
                              <Box>
                                <Typography variant="caption" sx={{ color: getRoleColor(conv.user?.role), fontWeight: 600, textTransform: "capitalize" }}>{conv.user?.role}</Typography>
                                <Typography variant="body2" sx={{ color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{conv.lastMessage?.content || "No messages yet"}</Typography>
                              </Box>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                      {index < filteredConversations.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {selectedUser ? (
              <>
                <Box sx={{ p: 2, borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ backgroundColor: getRoleColor(selectedUser.role) }}>{selectedUser.name?.charAt(0)}</Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ color: "#1f2937" }}>{selectedUser.name}</Typography>
                    <Typography variant="caption" sx={{ color: getRoleColor(selectedUser.role), fontWeight: 600, textTransform: "capitalize" }}>{selectedUser.role}</Typography>
                  </Box>
                </Box>
                <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
                  {messages.length === 0 ? (
                    <Typography sx={{ color: "#6b7280", textAlign: "center", py: 4 }}>No messages yet. Say hello!</Typography>
                  ) : messages.map((message) => (
                    <Box key={message._id} sx={{ display: "flex", justifyContent: message.isOwn ? "flex-end" : "flex-start", mb: 2 }}>
                      <Paper sx={{ p: 2, maxWidth: "70%", backgroundColor: message.isOwn ? "#1d1dabff" : "#f4f6f9", boxShadow: "none", border: message.isOwn ? "none" : "1px solid #e5e7eb" }}>
                        <Typography variant="body2" sx={{ color: message.isOwn ? "#ffffff" : "#1f2937" }}>{message.content}</Typography>
                        <Typography variant="caption" sx={{ color: message.isOwn ? "rgba(255,255,255,0.7)" : "#6b7280", display: "block", textAlign: "right", mt: 1 }}>
                          {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Box>
                <Box sx={{ p: 2, borderTop: "1px solid #e5e7eb" }}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
                    <TextField fullWidth multiline maxRows={3} placeholder="Type your message..."
                      value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }} />
                    <IconButton sx={{ color: "#6b7280" }}><AttachFileIcon /></IconButton>
                    <IconButton onClick={handleSendMessage} disabled={sending}
                      sx={{ backgroundColor: "#c62020ff", color: "#ffffff", "&:hover": { backgroundColor: "#a01818" }, "&:disabled": { backgroundColor: "#6b7280" } }}>
                      {sending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                    </IconButton>
                  </Box>
                </Box>
              </>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 2 }}>
                <Typography sx={{ color: "#6b7280" }}>Select a conversation or start a new one</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setNewMsgDialog(true)}
                  sx={{ backgroundColor: "#c62020ff", "&:hover": { backgroundColor: "#a01818" } }}>
                  New Message
                </Button>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>

      <Dialog open={newMsgDialog} onClose={() => setNewMsgDialog(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { backgroundColor: "#1d1dabff", color: "#ffffff" } }}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ color: "#ffffff" }}>New Message</Typography>
          <IconButton onClick={() => setNewMsgDialog(false)} sx={{ color: "#9ca3af" }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { color: "#ffffff" }, "& .MuiInputLabel-root": { color: "#9ca3af" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6b7280" }, "& .MuiSvgIcon-root": { color: "#9ca3af" } }}>
              <InputLabel>Send To</InputLabel>
              <Select value={newMsgTo} onChange={(e) => setNewMsgTo(e.target.value)} label="Send To">
                {["admin", "teacher", "student"].map(role => {
                  const usersOfRole = allUsers.filter(u => u.role === role);
                  if (usersOfRole.length === 0) return null;
                  return [
                    <MenuItem key={role + "-header"} disabled sx={{ color: "#9ca3af", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700 }}>
                      {role === "admin" ? "Staff / Admin" : role === "teacher" ? "Teachers" : "Students"}
                    </MenuItem>,
                    ...usersOfRole.map(u => (
                      <MenuItem key={u._id} value={u._id}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Avatar sx={{ width: 28, height: 28, fontSize: "0.75rem", backgroundColor: getRoleColor(u.role) }}>{u.name.charAt(0)}</Avatar>
                          <Box>
                            <Typography variant="body2">{u.name}</Typography>
                            <Typography variant="caption" sx={{ color: "#6b7280" }}>{u.email}</Typography>
                          </Box>
                        </Box>
                      </MenuItem>
                    ))
                  ];
                })}
              </Select>
            </FormControl>
            <TextField multiline rows={4} fullWidth placeholder="Write your message..."
              value={newMsgText} onChange={(e) => setNewMsgText(e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { color: "#ffffff" }, "& .MuiInputLabel-root": { color: "#9ca3af" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6b7280" } }} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <Button onClick={() => setNewMsgDialog(false)} sx={{ color: "#e5e7eb" }}>Cancel</Button>
          <Button variant="contained" startIcon={sending ? null : <SendIcon />}
            onClick={handleStartNewConversation} disabled={!newMsgTo || !newMsgText.trim() || sending}
            sx={{ backgroundColor: "#c62020ff", "&:hover": { backgroundColor: "#a01818" }, "&:disabled": { backgroundColor: "#6b7280" } }}>
            {sending ? <CircularProgress size={20} color="inherit" /> : "Send Message"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Messages;