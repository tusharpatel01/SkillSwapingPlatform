import SkillSwap from '../models/skillSwap.model.js';
import User from '../models/user.model.js';
import Chat from '../models/Chat.model.js';
// @desc    Get all skill swaps
// @route   GET /api/skills
export const getSkillSwaps = async (req, res) => {
  try {
    const skillSwaps = await SkillSwap.find()
      .populate('user1', 'name email skillsOffered skillsWanted')
      .populate('user2', 'name email skillsOffered skillsWanted');

    res.status(200).json({ success: true, count: skillSwaps.length, data: skillSwaps });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get skill swaps for a user
// @route   GET /api/skills/user/:userId
export const getUserSkillSwaps = async (req, res) => {
  try {
    const skillSwaps = await SkillSwap.find({
      $or: [{ user1: req.params.userId }, { user2: req.params.userId }]
    })
      .populate('user1', 'name email skillsOffered skillsWanted')
      .populate('user2', 'name email skillsOffered skillsWanted');

    res.status(200).json({ success: true, count: skillSwaps.length, data: skillSwaps });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create a new skill swap
// @route   POST /api/skills
export const createSkillSwap = async (req, res) => {
  try {
    const { user1Id, user2Id, skillOffered, skillWanted } = req.body;

    // Check if users exist
    const user1 = await User.findById(user1Id);
    const user2 = await User.findById(user2Id);
    if (!user1 || !user2) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Create a chat for the skill swap
    const chat = new Chat({
      participants: [user1Id, user2Id],
      messages: []
    });
    await chat.save();

    // Create the skill swap
    const skillSwap = new SkillSwap({
      user1: user1Id,
      user2: user2Id,
      skillOffered,
      skillWanted,
      chat: chat._id
    });

    await skillSwap.save();

    res.status(201).json({ success: true, data: skillSwap });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update skill swap status
// @route   PUT /api/skills/:id
export const updateSkillSwap = async (req, res) => {
  try {
    const { status, scheduledDate } = req.body;

    const skillSwap = await SkillSwap.findByIdAndUpdate(
      req.params.id,
      { status, scheduledDate },
      { new: true, runValidators: true }
    ).populate('user1 user2', 'name email');

    if (!skillSwap) {
      return res.status(404).json({ success: false, message: 'Skill swap not found' });
    }

    res.status(200).json({ success: true, data: skillSwap });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete skill swap
// @route   DELETE /api/skills/:id
export const deleteSkillSwap = async (req, res) => {
  try {
    const skillSwap = await SkillSwap.findByIdAndDelete(req.params.id);

    if (!skillSwap) {
      return res.status(404).json({ success: false, message: 'Skill swap not found' });
    }

    // Also delete the associated chat
    await Chat.findByIdAndDelete(skillSwap.chat);

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};