const serieSchema = require('../models/serie.model');
const Boom = require('@hapi/boom');

class SeriesService {
  async createSerie(serie) {
    serie.save();
    return serie;
  }

  async listSeries() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(serieSchema.find()), 3000);
    });
  }

  async showSerie(serieId) {
    return serieSchema.findById({ _id: serieId }).then((seriesFind) => {
      if (!seriesFind) throw Boom.notFound('No se encontro la series');
      return seriesFind;
    });
  }

  async showActor(ByRef) {
    return serieSchema.find({ 'features_seasons.cast': ByRef });
  }

  async showDate(ByRef) {
    return serieSchema.find({ 'features_seasons.premier_date': ByRef });
  }

  async editSerie(
    serieId,
    serie,
    orginal_lenguage,
    number_seasons,
    features_seasons
  ) {
    return serieSchema.findById({ _id: serieId }).then((seriesFind) => {
        if (!seriesFind) throw Boom.notFound('No series found');
        return serieSchema.updateOne(
          { _id: serieId },
          {
            serie,
            orginal_lenguage,
            number_seasons,
            features_seasons,
          }
        );
    });
  }

  async removeSerie(serieId) {
    return serieSchema.findById({ _id: serieId }).then((seriesFind) => {
      if (!seriesFind) throw Boom.notFound('No se encontro la series');
      return serieSchema.deleteOne(seriesFind);
    });
  }
}
module.exports = SeriesService;
