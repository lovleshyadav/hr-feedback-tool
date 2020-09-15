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

app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// admin admin: d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892
// user user: e172c5654dbc12d78ce1850a4f7956ba6e5a3d2ac40f0925fc6d691ebb54f6bf
// test test: 37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578

// Get user feedbacks
app.post('/getUserFeedbacks', (req, res) => {
    let rawdata = fs.readFileSync('feedbacks.json');
    let feedbacks = JSON.parse(rawdata);
    let payload = [];

    if (req.body.userHash === "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892") {
        // Sending complete data for admin
        payload = feedbacks;
    } else {
        for (const feedback of feedbacks) {
            if (feedback.userHash === req.body.userHash) {
                payload.push(feedback);
            }
        }
    }
    // Sending User Feedbacks
    res.send({data: payload});
});

// Added new response to a query
// @params "userHash", "queryId" and "response"
app.post('/responseToQuery', (req, res) => {
    let rawdata = fs.readFileSync('feedbacks.json');
    let feedbacks = JSON.parse(rawdata);
    let user = "normal";
    let payload = {};
    if (req.body.userHash === "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892") {
        user = "admin";
    }

    for (const feedback of feedbacks) {
        if (feedback.id === req.body.queryId) {
            let addNewResponse = {
                "user": user,
                "response": req.body.response,
                "date": "",
                "time": ""
            };

            feedback.response.push(addNewResponse);
            payload = feedback;
        }
    }
    let data = JSON.stringify(feedbacks, null, 2);

    fs.writeFile('feedbacks.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    console.log('Response saved for feedback: ', req.body.queryId);
    // Sending User Feedbacks
    res.send({data: payload});
});

// Save Feedback from user
app.post('/putFeedbacks', (req, res) => {
    let rawdata = fs.readFileSync('feedbacks.json');
    let feedbacks = JSON.parse(rawdata);
    let queryId = feedbacks.length + 1 + Math.random();

    let newFeedback = {
        "id": queryId,
        "read": false,
        "important": false,
        "querySubject": req.body.subject,
        "queryBody": req.body.query,
        "status": "pending",
        "impBtnValue":"important",
        "readBtnValue":"read",
        "userHash": req.body.userHash,
        "date": "",
        "response": [
            {
                "user": "normal",
                "response": req.body.query,
                "date":"",
                "time":""
            }]
    };

    feedbacks.push(newFeedback);

    let data = JSON.stringify(feedbacks, null, 2);

    fs.writeFile('feedbacks.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    console.log('Feedback saved', newFeedback.id);

    //Send email
    // console.log('Sending email');
    /* Will Uncomment you someday baby
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
     */
    res.send({data: feedbacks});
});
