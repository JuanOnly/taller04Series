require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const mongoose = require('mongoose');
const routerApi = require('./src/routes');
const app = express();
const { logErrors, errorHandler, boomErrorHandler } = require('./src/handler/errors.handlers')

app.listen(port, () => console.log('Active port', port));

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log('Success, connected with mongo'))
  .catch((err) => console.error(err));
  
app.use(express.json());
app.use(logErrors)
app.use(errorHandler)
app.use(boomErrorHandler)
routerApi(app);
