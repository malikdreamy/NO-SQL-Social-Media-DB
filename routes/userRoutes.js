const express = require('express');
const router = express.Router();
const User  = require('../models/users');
const Thought = require('../models/thoughts')


// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by its _id and populated thought and friend data
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('thoughts') // Populate thoughts field with Thought documents
      .populate('friends'); // Populate friends field with User documents
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user)
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  
  }
});

// PUT to update a user by its _id
router.put('/update/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});
 
// DELETE to remove user by its _id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(user.thoughts.length !== 0 ){
      let thoughts = user.thoughts
    for(let i=0; i < thoughts.length; i++){
      let thoughtId = thoughts[i];
      let thoughtNum = thoughtId.id.toString('hex')
      console.log(thoughtNum)
const thought = await Thought.findByIdAndDelete(thoughtNum);
const userDelete = await User.findByIdAndDelete(req.params.id)
    }

    }
    res.status(200).json(`Successfully Deleted 🚮`);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/:userId/friends/:friendId', async (req, res) =>{
  try {
    const user = await User.findById(req.params.userId)
    user.friends.push(req.params.friendId)
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete('/:userId/friends/:friendId', async (req, res) =>{
  try {
    const user = await User.findById(req.params.userId)
    let friends = await user.friends
    const friendToRemove = await friends.find(friend => friend == req.params.friendId);
const indexOfFriend = friends.indexOf(friendToRemove);

if (indexOfFriend == 0){
    friends.shift()
    await user.save()
    res.status(200).json(user)
    return;
}
  friends.splice(indexOfFriend, 1);
  await user.save()
  res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router;
