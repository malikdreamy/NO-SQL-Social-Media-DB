const { Schema, Types, model } = require('mongoose');
const ObjectId = Types.ObjectId;

// Reaction schema for nested documents
const reactionSchema = new Schema(
    {
      reactionId: {
        type: ObjectId,
        default: () => new Types.ObjectId(),
        unique: true,
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        immuatable: true,
        default: Date.now
        
      },
    },
    {
      _id: false, 
    }
  );

// Thought schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    immuatable: true,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Create the Thought model
const Thought = model('Thought', thoughtSchema);


module.exports = Thought;
