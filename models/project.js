const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  ,description:{
    type:String,
    default:''
  },status:{
    type:String,
    enum:['active','completed'],
    default:'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);