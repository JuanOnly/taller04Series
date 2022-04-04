const SeriesService = require('../services/serie.service');
const SerieModel = require('../models/serie.model');
const service = new SeriesService();
const express = require('express');
const serieRoutes = express.Router();

serieRoutes.post('/serie', async (req, res, next) => {
  try {
    const serie = SerieModel(req.body);
    const data = await service.createSerie(serie);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
});

serieRoutes.get('/', async (req, res, next) => {
  try {
    const data = await service.listSeries();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

serieRoutes.get('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const data = await service.showSerie(serieId);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

// Filtro por actor
serieRoutes.get('/actor/:ByRef', async (req, res, next) => {
  try {
    const { ByRef } = req.params;
    const data = await service.showActor(ByRef);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

// Filtro estreno temporada
serieRoutes.get('/premier_date/:ByRef', async (req, res, next) => {
  try {
    const { ByRef } = req.params;
    const data = await service.showDate(ByRef);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

// serieRoutes.get('/premier_date/:ByRef', async (req, res) => {
//   const { ByRef } = req.params;
//   serieSchema
//     .find({ 'features_seasons.premier_date': ByRef })
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

serieRoutes.put('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const { serie, orginal_lenguage, number_seasons, features_seasons } =
      req.body;
    const data = await service.editSerie(
      serieId,
      serie,
      orginal_lenguage,
      number_seasons,
      features_seasons
    );
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

serieRoutes.delete('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const data = await service.removeSerie(serieId);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

module.exports = serieRoutes;
