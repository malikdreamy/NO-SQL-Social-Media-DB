const { connect, connection } = require('mongoose');

connect('mongodb://localhost/social-media', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = connection;
