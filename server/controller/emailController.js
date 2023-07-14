import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gaurabghimire240@gmail.com',
    pass: 'ykwklmoyszrqmwpb',
  },
});

export const sendEmail = (Email, Message) => {
  const mailOptions = {
    from: `${Email}`,
    to: 'dipakghimire240@gmail.com',
    subject: 'New Message from Contact Form',
    text: `Sender: ${Email}\n\n${Message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Email sending error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
  });
};
