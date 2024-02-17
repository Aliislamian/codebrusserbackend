const Message = require('../models/message');

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    const message = new Message({ senderId, receiverId, content });
    await message.save();
    res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const messages = await Message.find({ senderId, receiverId }).sort({ createdAt: 'asc' });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to retrieve messages.' });
  }
};
