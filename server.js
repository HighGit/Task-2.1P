const express = require('express');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const app = express();
const PORT = 3000;

const mg = new Mailgun(formData);
const client = mg.client({username: 'api', key: '43a76b0143bf6bed76951b8620ae1016-0f1db83d-36038678'});

app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/send-welcome', async (req, res) => {
    const { email } = req.body;

    const data = {
        from: 'Excited Admin <maxtonybrowny@gmail.com>',
        to: email,
        subject: 'Welcome to DEV@Deakin',
        text: 'Thank you joining DEV@Deakin team.'
    };

    try {
        const response = await client.messages.create('sandbox523538460e0a4e12b063204cfb8fa86e.mailgun.org', data);
        console.log('Email sent:', response); 
        res.status(200).json({message: 'Welcome email sent successfully!', response});
    } catch (error) {
        console.error('Error sending email:', error); 
        res.status(500).json({error: error.message});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
