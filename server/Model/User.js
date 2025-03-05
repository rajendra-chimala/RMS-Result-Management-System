const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, unique: true },
  name: String,
  subjects: [{
    name: String,
    marks: Number,
    maxMarks: Number
  }],
  total: Number,
  percentage: Number
});

module.exports = mongoose.model('Student', studentSchema);