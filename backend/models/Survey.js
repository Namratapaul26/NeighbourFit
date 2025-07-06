const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  ageGroup: { type: String, required: true },
  occupation: { type: String, required: true },
  livingType: { type: String, required: true },
  vibe: { type: String, required: true },
  safety: { type: Number, required: true },
  affordability: { type: Number, required: true },
  cleanliness: { type: Number, required: true },
  commute: { type: Number, required: true },
  greenery: { type: Number, required: true },
  nightlife: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Survey', SurveySchema); 