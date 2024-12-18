import {Chat} from "../models/chat.model.js"
export const initiateChat = async (req, res) => {
    const { clientId, freelancerId } = req.body;

    try {
        let chat = await Chat.findOne({ clientId, freelancerId });
        if (!chat) {
            chat = await Chat.create({ clientId, freelancerId, messages: [] });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const sendMessage = async (req, res) => {
    const { chatId, sender, text } = req.body;

    try {

        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(404).json({ error: 'Chat not found' });
        console.log(chat.freelancerId);
        chat.messages.push({ sender, text });
        await chat.save();

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const chat = await Chat.findById(chatId).populate('messages.sender', 'name img');
        if (!chat) return res.status(404).json({ error: 'Chat not found' });

        res.status(200).json(chat.messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserChats = async (req, res) => {
    const {id} = req. params; 
  
    try {
      const chats = await Chat.find({
        $or: [{ clientId: id }, { freelancerId: id }],
      })
        .populate("clientId", "name img") 
        .populate("freelancerId", "name img") 
        .populate({
          path: "messages",
          select: "text timestamp",
        });
  
      res.status(200).json(chats);
    } catch (error) {
      console.error("Error fetching user chats:", error);
      res.status(500).json({ error: "Failed to fetch chats" });
    }
  };


export const deleteChat = async (req, res) => {
    const { chatId } = req.params;
  
    try {

      const deletedChat = await Chat.findByIdAndDelete(chatId);
  
      if (!deletedChat) {
        return res.status(404).json({ error: "Chat not found" });
      }
  

      const io = req.app.get("io");
      io.emit("chatDeleted", { chatId });
  
      res.status(200).json({ success: true, message: "Chat deleted successfully" });
    } catch (error) {
      console.error("Error deleting chat:", error);
      res.status(500).json({ error: "Failed to delete chat" });
    }
  };