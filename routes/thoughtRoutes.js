const express = require("express");
const router = express.Router();
const User  = require('../models/users');
const Thought = require('../models/thoughts')


router.get('/', async (req, res) =>{
try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts)
} catch (error) {
    res.status(400).json(error)   
}
});

router.get('/:id', async(req, res) =>{
try {
    const thought = await Thought.findById(req.params.id)  
    res.status(200).json(thought)
} catch (error) {
    res.status(400).json(error)
}
})

router.post('/', async(req, res)=>{
try {
const thought = await Thought.create(req.body);
res.status(200).json(thought);
} catch (error) {
    res.status(400).json(error);
}
})


router.put('/update/:id', async(req, res)=>{
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(200)
    } catch (error) {
        res.status(400).json(error)        
    }
});

router.delete('/api/users/:id', async (req, res) => {
    try {
        const thought = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/:thoughtId/reactions', async(req, res)=>{
try {
const thought = await Thought.findById(req.params.thoughtId);
const reactions = thought.reactions;
const reactionFromUser = req.body;
reactions.push(reactionFromUser)
await thought.save();
res.status(200).json(thought);
} catch (error) {
    res.status(400).json(error);
}
})

router.delete('/:thoughtId/reactions/:reaction', async (req, res) =>{
    try {
      const thought = await Thought.findById(req.params.thoughtId)
      let reactions = thought.reactions;
      let found = reactions.find(r => r.reactionId.toString() == req.params.reaction.toString());
    let indexOfFound = reactions.indexOf(found)
      if(indexOfFound == 0){
          reactions.shift()
          await thought.save()
          res.status(200).json(thought)
          return;
      }
      reactions.splice(indexOfFound, 1);
      await thought.save();
      res.status(200).json(thought)

    } catch (error) {
      res.status(400).json(error)
    }
  })
  


module.exports = router;



