const mongoose = require('mongoose');
const User = require('../models/users'); // Import User model
const Thought = require('../models/thoughts'); // Import Thought model



const usersData = [
  {
    username: 'johndoe123',
    email: 'john.doe@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'sarahsmith789',
    email: 'sarah.smith@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'michaeljones456',
    email: 'michael.jones@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'lisawilliams321',
    email: 'lisa.williams@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'alexbrown567',
    email: 'alex.brown@example.com',
    thoughts: [],
    friends: []
  }
];


const thoughtsData = [
  {
    thoughtText: 'Just finished my morning run! Feeling accomplished and ready to start the day! 🏃‍♂️💪 #fitness #morningworkout',
    username: 'johndoe123',
    reactions: [
      {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: 'Great job! Keep up the healthy lifestyle! 💪🌞',
        username: 'sarahsmith789',
        createdAt: new Date()
      },
      {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: 'I need to start running too! 😅🏃‍♀️',
        username: 'michaeljones456',
        createdAt: new Date()
      }
    ]
  },
  {
    thoughtText: 'Just watched an amazing movie last night! The plot was mind-blowing! 🍿🎬 #movienight #mustwatch',
    username: 'sarahsmith789',
    reactions: [
      {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: 'I love movies! What movie was it? 🍿🎥',
        username: 'johndoe123',
        createdAt: new Date()
      },
      {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: `I'm always looking for movie recommendations. Share the title! 🎞️🤔`,
        username: 'michaeljones456',
        createdAt: new Date()
      }
    ]
  },
  {
    thoughtText: 'Spent the weekend hiking in the mountains! The view was breathtaking! 🌄🏞️ #naturelover #adventures',
    username: 'michaeljones456',
    reactions: [
      {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: 'Wow, that sounds amazing! I love hiking too! 🌲🥾',
        username: 'johndoe123',
        createdAt: new Date()
      },
      {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: 'I wish I could go hiking too! The pictures must be stunning! 📸🏔️',
        username: 'sarahsmith789',
        createdAt: new Date()
      }
    ]
  },
  {
    thoughtText: 'Enjoying a lazy Sunday morning with a cup of coffee and a good book! ☕📚 #cozy #bookworm',
    username: 'lisawilliams321',
    reactions: [
      {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: 'Sounds like a perfect way to spend a Sunday morning! What book are you reading? 📖☕',
        username: 'johndoe123',
        createdAt: new Date()
      },
      {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: 'I love cozy Sundays with a good book and coffee too! Enjoy! 📚☕',
        username: 'sarahsmith789',
        createdAt: new Date()
      }
    ]
},
{
thoughtText: 'Just adopted a cute little puppy! Meet my new fur baby, Charlie! 🐾🐶 #puppylove #newaddition',
username: 'alexbrown567',
reactions: [
{
reactionId: new mongoose.Types.ObjectId(),
reactionBody: 'Congratulations on the new addition to your family! Charlie is adorable! 🐾🐕',
username: 'johndoe123',
createdAt: new Date()
},
{
reactionId: new mongoose.Types.ObjectId(),
reactionBody: `I'm so happy for you! Can't wait to meet Charlie! 🐾🐾`,
username: 'lisawilliams321',
createdAt: new Date()
}
]
}
];


const seedDatabase = async () => {
try {
await mongoose.connect('mongodb://localhost/social-media', {
useNewUrlParser: true,
useUnifiedTopology: true,
});    
 await User.deleteMany();
 await Thought.deleteMany(); 

const createdUsers = await User.create(usersData);
const createdThoughts = await Thought.create(thoughtsData); 

const users = await User.find();
const thoughts = await Thought.find();

for( thought of thoughts){
    let username = thought.username;
    let foundUser = users.find(name => name.username == username);
    foundUser.thoughts.push(thought)
}

      for (const user of users) {
       
        const numFriends = Math.floor(Math.random() * 3) + 1;
        const friends = users
          .filter(u => u._id.toString() !== user._id.toString())
          .map(u => u._id)
          .sort(() => 0.5 - Math.random())
          .slice(0, numFriends);
  
        user.friends.push(...friends);
        await user.save();
      }
      


console.log('Database seeded successfully 🌱');
mongoose.connection.close();

} catch (err) {
    console.error(err);
    mongoose.connection.close();
}
};

seedDatabase(); 

module.exports = {User, Thought} ;
