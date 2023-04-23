const mongoose = require('mongoose');

const Thought = require('./thoughts')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                // Basic email validation using regular expression
                return /^[\w+\-.]+[\w+\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    thoughts: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
