// const express = require('express');
// const router = express.Router();
// const User  = require('../models/users');
// const Thoughts = require('../models/thoughts')

// router.post('/api/users/:userId/friends/:friendId', async (req, res) => {
//     try {
//       const { userId, friendId } = req.params;
  
//       // Find the user and friend by their IDs
//       const user = await User.findById(userId);
//       const friend = await User.findById(friendId);
  
//       // Check if user and friend exist
//       if (!user || !friend) {
//         return res.status(404).json({ error: 'User or friend not found' });
//       }
  
//       // Add friend to user's friend list
//       user.friends.push(friendId);
  
//       // Save the updated user document
//       await user.save();
  
//       res.json(user);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });

//   router.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
//     try {
//       const { userId, friendId } = req.params;
  
//       // Find the user by ID
//       const user = await User.findById(userId);
  
//       // Check if user exists
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Remove friend from user's friend list
//       user.friends = user.friends.filter(friend => friend.toString() !== friendId);
  
//       // Save the updated user document
//       await user.save();
  
//       res.json(user);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });

//   module.exports = router;
  

  