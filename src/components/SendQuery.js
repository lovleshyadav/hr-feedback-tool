import React, { useState } from "react";
const nodemailer = require('nodemailer');

function SendQuery() {

    const [subject, setSubject] = useState("");
    const [query, setQuery] = useState("");

    function validateForm() {
        return subject.length > 0 && query.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        var payload = {
            "subject": subject,
            "query": query
        };

        fetch('/putFeedbacks', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((response) => response.json()).then((result) => {
                console.log(result)
        });

        //Send email

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'ishank.g@taboola.com',
              pass: 'blahblahrandompass'
            }
          });
          
          var mailOptions = {
            from: 'ishank.g@taboola.com',
            to: 'ishank1995@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
  return (

    <div className="SendQuery">
     <div className="sendQueryTitle">Send Your Query!</div>
    <div className="query">
        <div className="formWrapper">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <input type="text" id="username" className="input" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
                </div>
                <div className="field">
                    <textarea id="query" className="input" placeholder="Query" value={query} onChange={e => setQuery(e.target.value)} />
                </div>
                <div className="sendQueryBtnWrapper">
                    <button className="sendQueryBtn" disabled={!validateForm()}>Send!</button>
                </div>
            </form>
        </div>
    </div>

    </div>
  );
}

export default SendQuery;
