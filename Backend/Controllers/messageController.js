require('dotenv').config();
const twilio = require('twilio');

const sendSMS = (res) => {
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    return client.messages
        .create({ body: " Product Added", from: 'whatsapp:+14155238886', to: 'whatsapp:+96181235624' })
        .then(message => {
            res.json({
                success: true,
                message: "Message Sent",
                twilioResponse: message
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: "Message Not Sent",
                error: err
            });
        });
}

module.exports = sendSMS;
