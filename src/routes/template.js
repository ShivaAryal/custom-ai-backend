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

router.post("/blogTitles", (req, res) => {
  let message = req.body.message;
  if (!message) {
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

router.post("/textExtender/v2", (req, res) => {
  let text = req.body.text;
  if (!text) {
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

router.post("/paraghraphWriter", (req, res) => {
  let text = req.body.text;
  console.log(text);
  if (!text) {
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

router.post("/articleIdeaGenerator", (req, res) => {
  let topic = req.body.topic;
  if (!topic) {
    return res.status(422).json({ error: "Topic is required." });
  }
  let keywords = req.body.keywords ?? null;
  let voice_tone = req.body.voice_tone ?? null;
  templateController
    .textExtenderV2(topic, keywords, voice_tone)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/articleOutlineGenerator/V2", (req, res) => {
  let topic = req.body.topic;
  if (!topic) {
    return res.status(422).json({ error: "Topic is required." });
  }
  let keywords = req.body.keywords ?? null;
  //   let voice_tone = req.body.voice_tone ?? null;
  templateController
    .articleOutlineGeneratorV2(topic, keywords)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/contentRephraser/V2", (req, res) => {
  let content = req.body.content;
  if (!content) {
    return res.status(422).json({ error: "Content is required." });
  }
  let words_length = req.body.words_length ?? null;
  let voice_tone = req.body.voice_tone ?? null;
  templateController
    .contentRephraser(content, words_length, voice_tone)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/articleIntroGenerator", (req, res) => {
  let title = req.body.title;
  if (!title) {
    return res.status(422).json({ error: "Title is required." });
  }
  let keywords = req.body.keywords ?? [];
  let words_length = req.body.words_length ?? null;
  let voice_tone = req.body.voice_tone ?? null;
  templateController
    .articleIntroGenerator(title, keywords, words_length, voice_tone)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/articleOutlineGenerator", (req, res) => {
  let topic = req.body.topic;
  if (!topic) {
    return res.status(422).json({ error: "Topic is required." });
  }
  let intro = req.body.intro;
  if (!intro) {
    return res.status(422).json({ error: "Intro is required." });
  }
  templateController
    .articleOutlineGenerator(topic, intro)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/contentShorten/V2", (req, res) => {
  let content = req.body.content;
  if (!content) {
    return res.status(422).json({ error: "Content is required." });
  }
  let voice_tone = req.body.voice_tone ?? null;
  templateController
    .contentShortenV2(content, voice_tone)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/conclusionWriter/V2", (req, res) => {
  let article = req.body.article;
  if (!article) {
    return res.status(422).json({ error: "Article is required." });
  }
  let voice_tone = req.body.voice_tone ?? null;
  templateController
    .conclusionWriterV2(article, voice_tone)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/facebookAds/V2", (req, res) => {
  let service_name = req.body.service_name;
  if (!service_name) {
    return res.status(422).json({ error: "Service name is required." });
  }
  let service_description = req.body.service_description;
  if (!service_description) {
    return res.status(422).json({ error: "Service description is required." });
  }
  let occasion = req.body.occasion || "";
  let promotion = req.body.promotion || "";
  let voice_tone = req.body.voice_tone ?? null;
  templateController
    .facebookAdsV2(
      service_name,
      service_description,
      occasion,
      promotion,
      voice_tone
    )
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/linkedinAds/V2", (req, res) => {
  let service_name = req.body.service_name;
  if (!service_name) {
    return res.status(422).json({ error: "Service name is required." });
  }
  let service_description = req.body.service_description;
  if (!service_description) {
    return res.status(422).json({ error: "Service description is required." });
  }
  if (!req.body.keywords) {
    return res.status(422).json({ error: "Keywords is required." });
  }
  let discount = req.body.discount || "";
  let keywords = req.body.keywords || [];
  templateController
    .facebookAdsV2(service_name, service_description, discount, keywords)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/googleAdTitles/V2", (req, res) => {
  let company_name = req.body.company_name;
  if (!company_name) {
    return res.status(422).json({ error: "Company name is required." });
  }
  let product_description = req.body.product_description;
  if (!product_description) {
    return res.status(422).json({ error: "Product description is required." });
  }
  if (!req.body.keywords) {
    return res.status(422).json({ error: "Keywords is required." });
  }
  let keywords = req.body.keywords || [];
  let voice_tone = req.body.voice_tone;
  templateController
    .googleAdTitlesV2(company_name, product_description, keywords, voice_tone)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/googleAdDescriptions/V2", (req, res) => {
  let name = req.body.name;
  if (!name) {
    return res.status(422).json({ error: "Name is required." });
  }
  let product_description = req.body.product_description;
  if (!product_description) {
    return res.status(422).json({ error: "Product description is required." });
  }
  if (!req.body.keywords) {
    return res.status(422).json({ error: "Keywords is required." });
  }
  let keywords = req.body.keywords || [];
  let voice_tone = req.body.voice_tone;
  templateController
    .googleAdDescriptionsV2(name, product_description, keywords, voice_tone)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/appAndSMSNotifications", (req, res) => {
  let description = req.body.description;
  if (!description) {
    return res.status(422).json({ error: "Description is required." });
  }
  templateController
    .appAndSMSNotifications(description)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/linkedinAdsDescriptions", (req, res) => {
  let product_name = req.body.product_name;
  if (!product_name) {
    return res.status(422).json({ error: "Product name is required." });
  }
  let product_description = req.body.product_description;
  if (!product_description) {
    return res.status(422).json({ error: "Product description is required." });
  }
  if (!req.body.keywords) {
    return res.status(422).json({ error: "Keywords is required." });
  }
  let voice_tone = req.body.voice_tone || "";
  let keywords = req.body.keywords || [];
  templateController
    .linkedinAdsDescriptions(
      service_name,
      service_description,
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

router.post("/linkedinAdsHeadlines", (req, res) => {
  let product_name = req.body.product_name;
  if (!product_name) {
    return res.status(422).json({ error: "Product name is required." });
  }
  let product_description = req.body.product_description;
  if (!product_description) {
    return res.status(422).json({ error: "Product description is required." });
  }
  if (!req.body.keywords) {
    return res.status(422).json({ error: "Keywords is required." });
  }
  let promotion = req.body.promotion || "";
  let keywords = req.body.keywords || [];
  templateController
    .linkedinAdsHeadlines(
      service_name,
      service_description,
      keywords,
      promotion
    )
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/personalBios/V2", (req, res) => {
  let information = req.body.information;
  if (!information) {
    return res.status(422).json({ error: "Information is required." });
  }
  let platform = req.body.platform;
  if (!platform) {
    return res.status(422).json({ error: "Platform is required." });
  }
  templateController
    .personalBiosV2(information, platform)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      console.log(err);
      response.sendDataError(res, err);
    });
});

router.post("/quoraAnswers", (req, res) => {
  let { question, information, latest_google_data } = req.body;
  if (!question) {
    return res.status(422).json({ error: "Question is required." });
  }
  templateController
    .quoraAnswers(question, information, latest_google_data)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/stories", (req, res) => {
  let { description, voice_tone } = req.body;
  if (!description) {
    return res.status(422).json({ error: "Description is required." });
  }
  templateController
    .stories(description, voice_tone)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/bulletPointAnswers", (req, res) => {
  let { question } = req.body;
  if (!question) {
    return res.status(422).json({ error: "Question is required." });
  }
  templateController
    .bulletPointAnswers(question)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/passivetoActiveVoice", (req, res) => {
  let { sentence } = req.body;
  if (!sentence) {
    return res.status(422).json({ error: "Sentence is required." });
  }
  templateController
    .passivetoActiveVoice(question)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/definition", (req, res) => {
  let { keyword } = req.body;
  if (!keyword) {
    return res.status(422).json({ error: "Keyword is required." });
  }
  templateController
    .definition(keyword)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/answers", (req, res) => {
  let { question } = req.body;
  if (!question) {
    return res.status(422).json({ error: "Question is required." });
  }
  templateController
    .answers(question)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/prosandcons", (req, res) => {
  let { paragraph } = req.body;
  if (!paragraph) {
    return res.status(422).json({ error: "Paragraph is required." });
  }
  templateController
    .prosandCons(paragraph)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/questions", (req, res) => {
  let { paragraph } = req.body;
  if (!paragraph) {
    return res.status(422).json({ error: "Paragraph is required." });
  }
  templateController
    .questions(paragraph)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/emailsV2", (req, res) => {
  let { recipient, recipient_position, description } = req.body;
  if (!recipient) {
    return res.status(422).json({ error: "Recipient is required." });
  }
  if (!recipient_position) {
    return res.status(422).json({ error: "Recipient Position is required." });
  }
  if (!description) {
    return res.status(422).json({ error: "Description is required." });
  }
  templateController
    .emailsV2(recipient, recipient_position, description)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/rewritewithkeywords", (req, res) => {
  let { article, keywords } = req.body;
  if (!article) {
    return res.status(422).json({ error: "Article is required." });
  }
  if (!keywords) {
    return res.status(422).json({ error: "Keywords are required." });
  }
  templateController
    .rewritewithKeywords(article, keywords)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/emailsubjectlines", (req, res) => {
  let { product_name, email_description } = req.body;
  if (!product_name) {
    return res.status(422).json({ error: "Product Name is required." });
  }
  if (!email_description) {
    return res.status(422).json({ error: "Email description is required." });
  }
  templateController
    .emailSubjectLines(product_name, email_description)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/coldEmails/V2", (req, res) => {
  let { from, to, goal, scenario } = req.body;
  if (!from) {
    return res.status(422).json({ error: "From is required." });
  }
  if (!to) {
    return res.status(422).json({ error: "To is required." });
  }
  if (!goal) {
    return res.status(422).json({ error: "Goal is required." });
  }
  if (!scenario) {
    return res.status(422).json({ error: "Scenario is required." });
  }
  templateController
    .coldEmailsV2(from, to, goal, scenario)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/companyMission", (req, res) => {
  let { company_name, company_description } = req.body;
  if (!company_name) {
    return res.status(422).json({ error: "Company name is required." });
  }
  if (!to) {
    return res.status(422).json({ error: "Company description is required." });
  }
  templateController
    .companyMission(company_name, company_description)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/companyVision", (req, res) => {
  let { company_name, company_description } = req.body;
  if (!company_name) {
    return res.status(422).json({ error: "Company name is required." });
  }
  if (!to) {
    return res.status(422).json({ error: "Company description is required." });
  }
  templateController
    .companyVision(company_name, company_description)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/twitterthreads/V2", (req, res) => {
  let { topic, number_of_tweets, voice_tone } = req.body;
  if (!topic) {
    return res.status(422).json({ error: "Topic is required." });
  }
  if (!number_of_tweets) {
    return res.status(422).json({ error: "Number of tweets is required." });
  }
  if (!voice_tone) {
    return res.status(422).json({ error: "Voice tone is required." });
  }
  templateController
    .twitterThreadsV2(topic, number_of_tweets, voice_tone)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/socialmediacontentplan", (req, res) => {
  let { objective, platform } = req.body;
  if (!objective) {
    return res.status(422).json({ error: "Objective is required." });
  }
  if (!platform) {
    return res.status(422).json({ error: "Platform is required." });
  }
  templateController
    .socialMediaContentPlan(objective, platform)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/instagramCaptions", (req, res) => {
  let { description, voice_tone, words_length } = req.body;
  if (!description) {
    return res.status(422).json({ error: "Description is required." });
  }
  if (!voice_tone) {
    return res
      .status(422)
      .json({ error: "Brand Voice / Tone of voice is required." });
  }
  if (!words_length) {
    return res.status(422).json({ error: "Words length is required." });
  }
  templateController
    .instagramCaptions(description, voice_tone, words_length)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/twitterTweets", (req, res) => {
  let { topic } = req.body;
  if (!topic) {
    return res.status(422).json({ error: "Topic is required." });
  }
  templateController
    .twitterTweets(topic)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

router.post("/trendingInstagramHashtags", (req, res) => {
  let { image_description } = req.body;
  if (!image_description) {
    return res.status(422).json({ error: "Image description is required." });
  }
  templateController
    .trendingInstagramHashtags(topic)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

module.exports = router;
