const router = require("express").Router();
const response = require("./../utils");
const helper = require("./../utils/helper");
const templateController = require("./../controllers/templateController");
const { route } = require(".");
const { text, json } = require("body-parser");

router.post("/gptChat", (req, res) => {
  templateController
    .gptChat(req.body.message)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/gptChat/blogTitles", (req, res) => {
  let message = req.body.message
  if(!message){
    return res.status(422).json({ error: "Message is required." });
  }
  templateController
    .blogTitles(message)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/gptChat/textExtender/v2", (req, res) => {
  let text = req.body.text;
  if(!text){
    return res.status(422).json({ error: "Text is required." });
  }
  let number_of_lines = req.body.number_of_lines ?? null;
  let voice_tone = req.body.voice_tone ?? null;
  let keywords = req.body.keywords ?? [];
  templateController
    .textExtenderV2(text, keywords, number_of_lines, voice_tone)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/gptChat/paraghraphWriter", (req, res) => {
  let text = req.body.text;
  console.log(text)
  if(!text){
    return res.status(422).json({ error: "Text is required." });
  }
  let words_length = req.body.words_length ?? null;
  let latest_data = req.body.latest_data === 1 ? true : false;
  let keywords = req.body.keywords ?? [];
  let keyword_frequency = req.body.keyword_frequency ?? null;
  let voice_tone = req.body.voice_tone ?? null; 
  templateController
    .paraghraphWriter(
      text,
      keywords,
      keyword_frequency,
      words_length,
      latest_data,
      voice_tone
    )
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/gptChat/articleIdeaGenerator", (req, res) => {
  let topic = req.body.topic;
  if(!topic){
    return res.status(422).json({ error: "Topic is required." });
  }
  let keywords = req.body.keywords ?? null;
  let voice_tone = req.body.voice_tone ?? null;
  templateController
    .textExtenderV2(
      topic,
      keywords,
      voice_tone
    )
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/gptChat/articleOutlineGenerator/V2", (req, res) => {
  let topic = req.body.topic;
  if(!topic){
    return res.status(422).json({ error: "Topic is required." });
  }
  let keywords = req.body.keywords ?? null;
  let voice_tone = req.body.voice_tone ?? null;
  templateController
    .articleOutlineGeneratorV2(
      topic,
      keywords,
      voice_tone
    )
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/gptChat/contentRephraser", (req, res) => {
  let content = req.body.content;
  if(!content){
    return res.status(422).json({ error: "Content is required." });
  }
  let words_length = req.body.words_length ?? null;
  let voice_tone = req.body.voice_tone ?? null;
  templateController
    .contentRephraser(
      content,
      words_length,
      voice_tone
    )
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/gptChat/articleIntroGenerator", (req, res) => {
  let title = req.body.title;
  if(!title){
    return res.status(422).json({ error: "Title is required." });
  }
  let keywords = req.body.keywords ?? [];
  let words_length = req.body.words_length ?? null;
  let voice_tone = req.body.voice_tone ?? null;
  templateController
    .articleIntroGenerator(
      title,
      keywords,
      words_length,
      voice_tone
    )
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/gptChat/articleOutlineGenerator", (req, res) => {
  let topic = req.body.topic;
  if(!topic){
    return res.status(422).json({ error: "Topic is required." });
  }
  let intro = req.body.intro;
  if(!intro){
    return res.status(422).json({ error: "Intro is required." });
  }
  templateController
    .articleOutlineGenerator(
      topic,
      intro,
    )
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/gptChat/contentShortener", (req, res) => {
  let content = req.body.content;
  if(!content){
    return res.status(422).json({ error: "Content is required." });
  }
  let voice_tone = req.body.voice_tone ?? null;
  templateController
    .contentShortener(
      content,
      voice_tone,
    )
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/gptChat/conclusionWriter", (req, res) => {
  let article = req.body.article;
  if(!article){
    return res.status(422).json({ error: "Article is required." });
  }
  let voice_tone = req.body.voice_tone ?? null;
  templateController
    .conclusionWriter(
      article,
      voice_tone,
    )
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/gptChat/facebookAds/V2", (req, res) => {
  let service_name = req.body.service_name;
  if(!service_name){
    return res.status(422).json({ error: "Service name is required." });
  }
  let service_description = req.body.service_description;
  if(!service_description){
    return res.status(422).json({ error: "Service description is required." });
  }
  let occasion = req.body.occasion;
  if(!occasion){
    return res.status(422).json({ error: "Occasion is required." });
  }
  let promotion = req.body.promotion;
  if(!promotion){
    return res.status(422).json({ error: "Promotion is required." });
  }
  let voice_tone = req.body.voice_tone ?? null;
  templateController
    .facebookAdsV2(
      service_name,
      service_description,
      occasion,
      promotion,
      voice_tone,
    )
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

module.exports = router;
