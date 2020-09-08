const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const nodemailer = require('nodemailer');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/getFeedbacks', (req, res) => {
    let rawdata = fs.readFileSync('feedbacks.json');
    let feedbacks = JSON.parse(rawdata);
    res.send({data: feedbacks});
});

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/putFeedbacks', (req, res) => {
    let rawdata = fs.readFileSync('feedbacks.json');
    let feedbacks = JSON.parse(rawdata);

    let newFeedback = {
        "id": Math.random(),
        "read": false,
        "important": false,
        "querySubject": req.body.subject,
        "queryBody": req.body.query,
        "status": "pending",
        "impBtnValue":"important",
        "readBtnValue":"read"
    }
    feedbacks.push(newFeedback);

    let data = JSON.stringify(feedbacks, null, 2);

    fs.writeFile('feedbacks.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    console.log('Feedback saved', newFeedback.id);

    console.log('Sending email');
    //Send email

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'avi.mzn@gmail.com',
            pass: 'anantmaygmail'
        }
    });

    var mailOptions = {
        from: 'avi.mzn@gmail.com',
        to: 'ishank.g@taboola.com',
        subject: req.body.subject,
        text: req.body.query
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send("PUT Request Called")
})