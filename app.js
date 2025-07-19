const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(bodyParser.json());

app.post('/getResponse', (req, res) => {
  console.log(req.body.question);

  const genAI = new GoogleGenerativeAI('AIzaSyD3efMKORfpzYV5y8pyysqKspLKjD81l0M');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  model.generateContent(req.body.question).then(result => {
    console.log(result.response.text());
    const response = result.response.text();
    res.status(200).json({ response: response });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
});


app.get('*',(res,req)=>{
  res.status(404).json({
    msg:'bad Request'
  })
})
// Removed the extra model.generateContent(prompt)... block

module.exports = app;
