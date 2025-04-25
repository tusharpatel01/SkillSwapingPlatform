import mongoose from "mongoose";
const SkillSwapSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skillOffered: {
    type: String,
    required: true
  },
  skillWanted: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'rejected'],
    default: 'pending'
  },
  scheduledDate: Date,
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const  SkillSwap= mongoose.model('SkillSwap', SkillSwapSchema);
export default SkillSwap;