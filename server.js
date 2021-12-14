const express = require('express');
const app = express();
const port = process.env.PORT || 8443;
const fs = require('fs');
const path = require('path');
// const nodemailer = require('nodemailer');


app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('*',function (req, res) {
    res.redirect('/');
});

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
// New admin access: bf1e6869f634e51eaa710d5f77c840b88d6852201512924d46fe1be660ef8f31

// Get user feedbacks
app.post('/getUserFeedbacks', (req, res) => {
    let rawdata = fs.readFileSync('feedbacks.json');
    let feedbacks = JSON.parse(rawdata);
    let payload = [];

    if (req.body.userHash === "bf1e6869f634e51eaa710d5f77c840b88d6852201512924d46fe1be660ef8f31") {
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
    // let payload = {};
    if (req.body.userHash === "bf1e6869f634e51eaa710d5f77c840b88d6852201512924d46fe1be660ef8f31") {
        user = "admin";
    }

    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    let responseDate = year + "-" + month + "-" + date;
    let responseTime = hours + ":" + minutes;

    for (const feedback of feedbacks) {
        if (feedback.id === req.body.queryId) {
            let addNewResponse = {
                "user": user,
                "response": req.body.response,
                "date": responseDate,
                "time": responseTime
            };

            feedback.response.push(addNewResponse);
            // payload = feedback;
        }
    }
    let data = JSON.stringify(feedbacks, null, 2);

    fs.writeFile('feedbacks.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    console.log('Response saved for feedback: ', req.body.queryId);

    let payload = [];

    if (req.body.userHash === "bf1e6869f634e51eaa710d5f77c840b88d6852201512924d46fe1be660ef8f31") {
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

// Save Feedback from user
app.post('/putFeedbacks', (req, res) => {
    let rawdata = fs.readFileSync('feedbacks.json');
    let feedbacks = JSON.parse(rawdata);
    let queryId = feedbacks.length + 1 + Math.random();
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    let feedbackDate = year + "-" + month + "-" + date;
    let feedbackTime = hours + ":" + minutes;


    let newFeedback = {
        "id": queryId,
        "read": false,
        "important": false,
        "querySubject": req.body.subject,
        "queryBody": req.body.query,
        "location": req.body.location,
        "incidentDate": req.body.incidentDate,
        "userName": req.body.userName,
        "status": "pending",
        "impBtnValue":"important",
        "readBtnValue":"read",
        "userHash": req.body.userHash,
        "date": feedbackDate,
        "time": feedbackTime,
        "response": [
            {
                "user": "normal",
                "response": req.body.query,
                "date": feedbackDate,
                "time": feedbackTime
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

    let payload = [];

    if (req.body.userHash === "bf1e6869f634e51eaa710d5f77c840b88d6852201512924d46fe1be660ef8f31") {
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
