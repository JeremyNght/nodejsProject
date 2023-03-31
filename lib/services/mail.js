'use strict';

require('dotenv').config();
const { Service } = require('@hapipal/schmervice');
const { transporter } = require('../../server/mailer');

module.exports = class MailServices extends Service {
    sendMail(user) {

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: user.mail,
            subject: 'Votre compte est créé',
            text: 'Bienvenue ' + user.userName + ' !'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent:' + info.response);
            }
        });
    }
};
