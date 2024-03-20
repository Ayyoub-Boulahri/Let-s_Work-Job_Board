const SupportMessage = require('../models/supportMessages');

class supportMessagesController {
    insertMessage = async (req, res) => {
        const { newMessage } = req.body;
        try {
            const message = new SupportMessage(newMessage)
            const insertMessage = await message.save();
            return res.status(200).json({ message: "message inserted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new supportMessagesController();
