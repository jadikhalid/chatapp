import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { content } = req.body;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      const newConversation = new Conversation({
        participants: [senderId, receiverId],
      });
      await newConversation.save();
      conversation = newConversation;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      content,
    });
    await newMessage.save();
    conversation.messages.push(newMessage);
    await conversation.save();
    res.status(200).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
