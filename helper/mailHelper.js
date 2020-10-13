const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');

const config = {
    mailer: {
        service: 'Gmail',
        host: 'localhost',
        port: '465',
        user: process.env.GMAIL_USERNAME,
        password: process.env.GMAIL_PASSWORD,
    }
}

const from = 'Paperworks < paper2works.co@gmail.com>';
const to = 'paper2works.co@gmail.com';
const subject = '페이퍼웍스 사이트에서 질문이 올라왔습니다.';
const html = '<p>This is paragraph.</p>';

const mailOptions = {
    from,
    to,
    subject,
    html,
    // text,
  };

  const transporter = nodemailer.createTransport(smtpPool({
    service: config.mailer.service,
    host: config.mailer.host,
    port: config.mailer.port,
    auth: {
      user: config.mailer.user,
      pass: config.mailer.password,
    },
    tls: {
      rejectUnauthorize: false,
    },
    maxConnections: 5,
    maxMessages: 10,
  }));

exports.postMessage = (messageHTML, email) => {

    return transporter.sendMail({
        ...mailOptions,
        html: messageHTML
    });
}