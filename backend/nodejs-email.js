module.exports = function nodeEmail(nodemailer, messagetext) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  let transport = nodemailer.createTransport({
    host: "serwer1942689.home.pl",
    port: 587,
    secure: false,
    auth: {
      user: "server@mail.biurokonfort.pl",
      pass: "maciejunio1"
    }
  });

  const message = messagetext => ({
    from: "server@mail.biurokonfort.pl", // Sender address
    to: "maciejkaczmarski1@wp.pl", // List of recipients
    subject: "Nowa wiadomość ze strony biurokonfort.pl", // Subject line
    html: messagetext // Plain text body
  });

  transport.sendMail(message(messagetext), function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
