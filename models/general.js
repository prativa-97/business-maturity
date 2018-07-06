const mongoose = require('mongoose');
// Article Schema
const GeneralSchema = mongoose.Schema({
  user:{
    type: String
  },
  answer1:{
    type: String,
    required: true
  },
  answer2:{
    type: String,
    required: true
  },
  answer3:{
    type: String,
    required: true
  },
  answer4:{
    type: String,
    required: true
  },
  answer5:{
    type: String,
    required: true
  },
  answer6:{
    type: String,
    required: true
  },
  answer7:{
    type: String,
    required: true
  },
  answer8:{
    type: String,
    required: true
  },
  answer9:{
    type: String,
    required: true
  },
  answer10:{
    type: String,
    required: true
  },
});
const General = module.exports = mongoose.model('General', GeneralSchema);
