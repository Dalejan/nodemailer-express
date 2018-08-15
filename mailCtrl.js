const nodemailer = require('nodemailer');
let { google } = require("googleapis");
let OAuth2 = google.auth.OAuth2;

let oauth2Client = new OAuth2(
    //clientId
    "*********",
    //clientSecret
    "******",
    //url de redirección
    "https://developers.google.com/oauthplayround"
)

oauth2Client.setCredentials({
    refresh_token: "******"
})

let accessToken = "";


oauth2Client.refreshAccessToken(function (err, tokens) {
    accessToken = tokens.access_token;
})

// Función que envía el email
exports.sendEmail = function (req, res) {

    //Define el transportador y el método de autenticación
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'yourmail@gmail.com',
            clientId: "*******",
            clientSecret: "******",
            refreshToken: "*******",
            accessToken: accessToken
        }
    });

    transporter.set('oauth2_provision_cb', (user, renew, callback) => {
        let accessToken = userTokens[user];
        if (!accessToken) {
            return callback(new Error('Unknown user'));
        } else {
            return callback(null, accessToken);
        }
    });

    // Definimos el email
    var mailOptions = {
        from: req.body.mail,
        to: 'yourmail@gmail.com',
        subject: 'Email sender',
        html: "<h2>De: " + req.body.name + " | " + req.body.mail + " | " + "</h2>" + "<br>" + "<h3>" + req.body.text + "</h3>"
    };

    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email enviado");
            res.status(200).jsonp(req.body);
        }
    });
};
