//Import dependencies

import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

//Load api-key config

dotenv.config();

//Express load

const app = express();
const PORT = process.env.PORT || 3000;

//Front-end service

app.use("/", express.static("public"));

//Middleware(json to object js)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//OpenAI request and load api-key

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//Path/ endpoint/ URL

app.post("/api/translate", async (req, res) => {
  //Functions to translate with AI
  const { text, targetLang } = req.body;

  const promptSystem1 = "You are a professional translator";
  const promptSystem2 =
    "You can only answer with a direct translation of the text that the user have sent you";
  +"any other answer or conversation is forbidden";
  const promptUser = `Translate the following text to ${targetLang}: ${text}`;

  //Call LLM or OI model

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: promptSystem1 },
        { role: "system", content: promptSystem2 },
        { role: "user", content: promptUser },
      ],
      max_tokens: 500,
      response_format: { type: "text" },
    });

    const translatedText = completion.choices[0].message.content;

    return res.status(200).json({ translatedText });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while translating" });
  }

  /* return res.status(200).json({
        message: "Hello i am a node path",
        content: req.body
    });*/
});

//Back-end service

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
