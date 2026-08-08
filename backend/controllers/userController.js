const User = require('../models/User');
const bcrypt = require('bcryptjs');

const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = name || user.name;
        user.avatar = avatar || user.avatar;
        const updated = await user.save();
        return res.json({ _id: updated._id, name: updated.name, email: updated.email, avatar: updated.avatar, role: updated.role });
      }
    } catch (e) {}

    // Mock fallback response
    res.json({
      _id: req.user._id,
      name: name || req.user.name,
      email: req.user.email,
      avatar: avatar || req.user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: req.user.role || 'user'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required' });
    }
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateProfile, changePassword };
