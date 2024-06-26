const mongoose = require('mongoose');

const assigneeSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
});

const Assignee = mongoose.model('Assignee', assigneeSchema);

module.exports = Assignee;
