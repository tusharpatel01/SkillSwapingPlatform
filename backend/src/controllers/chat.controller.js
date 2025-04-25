import Chat from '../models/Chat.model.js';
// @desc    Get chat by ID
// @route   GET /api/chats/:id
export const getChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate('participants', 'name email')
      .populate('messages.sender', 'name email');

    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }

    res.status(200).json({ success: true, data: chat });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Send message in chat
// @route   POST /api/chats/:id/messages
export const sendMessage = async (req, res) => {
  try {
    const { sender, content } = req.body;

    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          messages: { sender, content }
        },
        lastUpdated: Date.now()
      },
      { new: true }
    )
      .populate('participants', 'name email')
      .populate('messages.sender', 'name email');

    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }

    res.status(201).json({ success: true, data: chat });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};