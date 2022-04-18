const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmailConfirmation(customerName, orderNroSerie) {
  return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
    <style>
    .responsive {
      width: 100%;
      height: auto;
    }
    </style>
	</head>
	<body>
		<div>
			<div>
				<label for="">This is a label</label>
			</div>
		</div>
		<div clas="row">
			<p>
				<small>That lorm ipsum dolor shit</small>
			</p>
		</div>
	</body>
	</html>`;
}

function getMessage(emailParams) {
  //establmecemos los parametros requiridos para el envio del correo del
  return {
    to: emailParams.toEmail,
    from: 'juan.1701829004@ucaldas.edu.co',
    sunject: 'Sendgrid email confirmation',
    text: `Hello, ${emailParams.customerName} , we confirm you order and your reciept is ${emailParams.orderNroSerie}, thank you for buying with us`,
    html: sendEmailConfirmation(
      emailParams.customerName,
      emailParams.orderNroSerie
    ),
  };
}

async function sendOderSerie(emailParams) {
  try {
    await sgMail.send(getMessage(emailParams));
    return { message: 'Confirmacion de pedido recibido, ha sido enviado' };
  } catch (err) {
    const message = 'No se pudo enviar la orden de compra al cliente.';
    console.error(message, error);
    console.error(error);
    if (error.response) console.error(error.response.body);
    return { message };
  }
}

async () => {
  console.log('Se ha enviado el correo electronico');
  await sendOderSerie();
};

module.exports = { sendOderSerie };
