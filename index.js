require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const mongoose = require('mongoose');
const routerApi = require('./src/routes');
const app = express();
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./src/handler/errors.handlers');

// Importar twilio
const sgMail = require('@sendgrid/mail');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_client = require('twilio')(accountSid, authToken);
const sgMailSendGrid = require('./src/emailSendGrid/email');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email para enviar mesajes de texto
app.post('/api/email/confirmation', async (err, req, res, next) =>{
  try {
    res.json(await sgMailSendGrid.sendOderSerie(req.body));
  } catch (err) {
    next(err);
  }
});

twilio_client.messages
  .create({
    body: 'Twilio whatsapp sandbox test',
    from: '+17752563829',
    to: '+573165497320',
  })
  .then((message) => console.log(`Message sent: ${message.sid}`));

twilio_client.messages // whatsapp message
  .create({
    body: 'Your appointment is coming up on July 21 at 3PM',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+573165497320',
  })
  .then((message) =>
    console.log(`twilio message directly to whatsapp${message.sid}`)
  )
  .done();

app.listen(port, () => console.log('Active port', port));

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log('Success, connected with mongo'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* app.post('/api/email/confirmation', async (req, res, next) => {
  try {
    res.json(await sgMailSendGrid.sendOrder(req.body));
  } catch (error) {
    next(error);
  }
}); */

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  resturn;
});

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
routerApi(app);
