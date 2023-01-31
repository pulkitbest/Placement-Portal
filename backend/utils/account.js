import sgMail from '@sendgrid/mail'

sgMail.setApiKey('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')

const msg = {
  to: 'pulkitgupta38@gmail.com', // Change to your recipient
  from: 'pulkitgupta38@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })