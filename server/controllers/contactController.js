const Message = require('../models/Message');
const sendEmail = require('../utils/emailSender');

const submitContact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = await Message.create(req.body);

    // Notify Admin via Email
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL,
        subject: `New Portfolio Message from ${name}`,
        message: `You have received a new message.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #00ff88; border-radius: 10px; background-color: #0a0a0a; color: #ffffff;">
            <h2 style="color: #00ff88;">New Inquiry Received</h2>
            <p><strong>From:</strong> ${name} (<a href="mailto:${email}" style="color: #0080ff;">${email}</a>)</p>
            <div style="background: #1a1a1a; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #00ff88;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <p style="font-size: 0.8rem; color: #808080; margin-top: 20px;">You can reply directly to this email or view it in your Admin Dashboard.</p>
          </div>
        `
      });
    } catch (mailErr) {
      console.error('Contact Notify Email Failed:', mailErr.message);
      // Don't fail the request if only email fails
    }

    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting message' });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort('-createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    message.isRead = true;
    await message.save();
    res.json({ success: true, message: 'Message marked as read', data: message });
  } catch (error) {
    res.status(500).json({ message: 'Error marking message as read' });
  }
};

module.exports = { submitContact, getMessages, markMessageAsRead };
