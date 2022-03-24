const mongoose = require('mongoose');
const serieSchema = mongoose.Schema({
  serie: { type: String, require: true, unique: true },
  number_episodes: { type: Number, require: true },
  number_seasons: { type: Number, require: true },
  description: { type: String, require: true },
});
module.exports = mongoose.model('SerieCollection', serieSchema);
