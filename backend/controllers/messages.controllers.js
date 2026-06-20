import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    // 💡 Modifié ici : on extrait "message" du body pour correspondre au modèle
    const { message } = req.body;
    const senderId = req.user._id;

    // 1. Recherche de la conversation existante
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // 2. Si elle n'existe pas, on l'instancie
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
        messages: [], // Initialisation propre (même si Mongoose gère le default)
      });
    }

    // 3. Création du message avec les bonnes clés du schéma (sender, receiver, message)
    const newMessage = new Message({
      sender: senderId, // Aligné sur ton schéma
      receiver: receiverId, // Aligné sur ton schéma
      message: message, // Aligné sur ton schéma (requis)
    });

    // 4. On pousse l'ID du message créé dans le tableau de la conversation
    conversation.messages.push(newMessage._id);

    // 5. Sauvegarde simultanée des deux documents dans MongoDB Atlas
    await Promise.all([conversation.save(), newMessage.save()]);

    // 6. On retourne le message créé avec succès
    res.status(200).json(newMessage);
  } catch (error) {
    // 💡 Très important pour toi en dev : ce log te dira exactement quelle contrainte a sauté si ça persiste
    console.error("Erreur détaillée lors de l'envoi :", error);
    res.status(500).json({ error: "oups! : Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
