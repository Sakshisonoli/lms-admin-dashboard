const Message = require('../models/Message');
const User = require('../models/User');

// GET all users for messaging (excluding self)
const getUsers = async (req, res) => {
  try {
    const User = require('../models/User');
    const users = await User.find({ _id: { $ne: req.user._id } }).select('name email role');
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getConversations = async (req, res) => {
  try {
    // Get all unique users this user has chatted with
    const sent = await Message.find({ sender: req.user._id }).distinct('receiver');
    const received = await Message.find({ receiver: req.user._id }).distinct('sender');
    const userIds = [...new Set([...sent, ...received].map(String))];

    const users = await User.find({ _id: { $in: userIds } }).select('name email role');

    // Get last message and unread count for each
    const conversations = await Promise.all(
      users.map(async (user) => {
        const lastMessage = await Message.findOne({
          $or: [
            { sender: req.user._id, receiver: user._id },
            { sender: user._id, receiver: req.user._id },
          ],
        }).sort('-createdAt');

        const unread = await Message.countDocuments({
          sender: user._id,
          receiver: req.user._id,
          isRead: false,
        });

        return { user, lastMessage, unread };
      })
    );

    res.json({ success: true, data: conversations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id },
      ],
    }).sort('createdAt');

    // Mark as read
    await Message.updateMany(
      { sender: req.params.userId, receiver: req.user._id, isRead: false },
      { isRead: true }
    );

    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const send = async (req, res) => {
  try {
    const { receiver, content } = req.body;
    const message = await Message.create({ sender: req.user._id, receiver, content });
    res.status(201).json({ success: true, data: message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { getUsers, getConversations, getMessages, send };
