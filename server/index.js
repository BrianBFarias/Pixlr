// server/index.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { OpenAI } = require("openai");

const api_key = "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";
// https://platform.openai.com/account/api-keys
// need to create new API Key before each commit

const openai = new OpenAI({
  apiKey: api_key
});

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/detail", async (req, res) => {
  const receivedData = req.body.data; // This will contain the JSON data sent in the request
  console.log(receivedData)
  var image;
  try{
    image = await openai.images.generate({
      prompt: `${receivedData}`,
      size: "1024x1024"
    });  
  }
  catch{
  image = {
    created: 1699061530,
    data: [
      {
        url: 'https://www.elegantthemes.com/blog/wp-content/uploads/2020/08/000-http-error-codes.png'
      }
    ]
  };
}
  console.log(image);
  res.json({ message: image.data });
});

app.post("/text", async (req, res) => {
  const receivedData = req.body.data; // This will contain the JSON data sent in the request
  console.log(receivedData)
  var message;

  try{
    message = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${receivedData}` }],
      model: "gpt-3.5-turbo",
    });  
  }
  catch{
    message = {
      choices: [
        {
          message:{ content: 'Invalid Input'}
        }
      ]
    };;
}
  console.log(message.choices[0].message.content);
  const messageContent = message.choices[0].message.content;
  const jsonString = JSON.stringify(messageContent);
  res.json({ message: jsonString });
});

app.get("/api", (req, res) => {

  res.json({ message: "Hey its me server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
