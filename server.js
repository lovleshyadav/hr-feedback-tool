const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/getFeedbacks', (req, res) => {
    let rawdata = fs.readFileSync('feedbacks.json');
    let feedbacks = JSON.parse(rawdata);
    res.send({data: feedbacks});
});