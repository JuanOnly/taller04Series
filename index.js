require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const mongoose = require('mongoose');
const routerApi = require('./src/routes');
const app = express();

app.listen(port, () => console.log('Active port', port));

mongoose
  .connect(process.env.CONNECTION_STRING_MONGODB)
  .then(() => console.log('Sucess connect with mongo'))
  .catch((err) => console.error(err));

app.use(express.json());
routerApi(app);
