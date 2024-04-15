const openai = require("./../configuration/openai-configure");

const gptChat = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const blogTitles = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that helps generate blog title ideas and give only the title as response.",
        },
        { role: "user", content: message },
      ],
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const textExtenderV2 = async (
  text,
  keywords = [],
  number_of_lines = 20,
  voice_tone = "passive"
) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to extend text based on text, keywords, frequency of the keywords to add, words length, if we need to add latest data or not, and the tone of voice.",
      },
      {
        role: "system",
        content: "You will add: " + number_of_lines + " number of lines",
      },
      { role: "system", content: "Your tone of voice will be: " + voice_tone },
      { role: "user", content: text },
    ];
    if (keywords.length !== 0)
      messages.push({
        role: "system",
        content: "To extend the text you will add keywords like:  " + keywords,
      });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const paraghraphWriter = async (
  text,
  keywords = [],
  keyword_frequency = 5,
  words_length = 300,
  latest_data = false,
  voice_tone = "passive"
) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to extend text based on text, keywords, frequency of the keywords to add, words length, if we need to add latest data or not, and the tone of voice.",
      },
      { role: "user", content: text },
      {
        role: "system",
        content:
          "To extend the text you will have a limit of words of  " +
          words_length,
      },
      { role: "system", content: "Your tone of voice will be: " + voice_tone },
    ];
    if (latest_data)
      messages.push({
        role: "system",
        content: "You will be using the latest data available.",
      });
    if (keywords.length !== 0)
      messages.push({
        role: "system",
        content: "To extend the text you will add keywords like:  " + keywords,
      });
    if (keywords.length !== 0 && keyword_frequency)
      messages.push({
        role: "system",
        content:
          "The keywords will be used at a frequency level of:  " +
          keyword_frequency,
      });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const articleIdeaGenerator = async (
  topic,
  keywords = [],
  voice_tone = "passive"
) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate article ideas based on topic, keywords, and the tone of voice.",
      },
      { role: "system", content: "Your tone of voice will be: " + voice_tone },
      { role: "user", content: topic },
    ];
    if (keywords.length !== 0)
      messages.push({
        role: "system",
        content: "To generate ideas you will use keywords like:  " + keywords,
      });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const articleOutlineGeneratorV2 = async (topic, keywords = []) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate outlines for an article based on topic, and keywords. You will generate atleast 5 points or more for this",
      },
      { role: "user", content: topic },
    ];
    if (keywords.length !== 0)
      messages.push({
        role: "system",
        content:
          "To generate outlines you will use keywords like:  " + keywords,
      });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const contentRephraser = async (
  content,
  words_length = 200,
  voice_tone = "passive"
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that helps to rephrase contents based on the content, length of words to use and tone of voice.",
        },
        {
          role: "system",
          content:
            "To extend the text you will have a limit of words of  " +
            words_length,
        },
        {
          role: "system",
          content: "Your tone of voice will be: " + voice_tone,
        },
        { role: "user", content: content },
      ],
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const articleIntroGenerator = async (
  title,
  keywords = [],
  words_length = 200,
  voice_tone = "passive"
) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate introduction paragraphs for an article based on article title, length of words to use, keywords to use, and tone of voice.",
      },
      {
        role: "system",
        content:
          "To extend the text you will have a limit of words of  " +
          words_length,
      },
      { role: "system", content: "Your tone of voice will be: " + voice_tone },
      { role: "user", content: title },
    ];
    if (keywords.length !== 0)
      messages.push({
        role: "system",
        content:
          "To generate the introduction paragraph you will use keywords like:  " +
          keywords,
      });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const articleOutlineGenerator = async (topic, intro) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that helps to generate outlines for an article based on article title and intro of the article.",
        },
        { role: "system", content: "The topic of the article is " + topic },
        { role: "user", content: intro },
      ],
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const contentShortenV2 = async (content, voice_tone = "passive") => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that helps to shorten a specific content based on the content and tone of voice.",
        },
        {
          role: "system",
          content: "Your tone of voice will be: " + voice_tone,
        },
        { role: "user", content: content },
      ],
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const conclusionWriterV2 = async (article, voice_tone = "passive") => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that helps to generate a conclusion of an article based on the article and tone of voice.",
        },
        {
          role: "system",
          content: "Your tone of voice will be: " + voice_tone,
        },
        { role: "user", content: article },
      ],
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const facebookAdsV2 = async (
  service_name,
  service_description,
  occasion,
  promotion,
  voice_tone = "passive"
) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate a facebook ad idea based on the service name, description of the service, occasion, promotion and tone of voice.",
      },
      { role: "system", content: "Your tone of voice will be: " + voice_tone },
      { role: "system", content: "The service name is: " + service_name },
      {
        role: "system",
        content: "The occasion for this ad will be : " + occasion,
      },
      {
        role: "system",
        content: "The ad will be used for the promotion of  : " + promotion,
      },
      { role: "user", content: service_description },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const linkedinAdsV2 = async (
  service_name,
  service_description,
  discount,
  keywords
) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate a linkedin ad idea based on the service name, description of the service, discount and keywords.",
      },
      { role: "system", content: "The service name is: " + service_name },
    ];
    if (discount)
      messages.append({
        role: "system",
        content: "The ad will be used for the discount of  : " + promotion,
      });
    messages.push({
      role: "system",
      content: "To extend the text you will add keywords like:  " + keywords,
    });

    messages.append({ role: "user", content: service_description });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const googleAdTitlesV2 = async (
  company_name,
  product_description,
  keywords,
  voice_tone = "positive"
) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate a google ad title based on the company name, product/service description of the service, keywords and tone of voice.",
      },
      { role: "system", content: "The service name is: " + company_name },
      { role: "system", content: "Your tone of voice will be: " + voice_tone },
      {
        role: "system",
        content: "To extend the text you will add keywords like:  " + keywords,
      },
      { role: "user", content: product_description },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const googleAdDescriptionsV2 = async (
  name,
  product_description,
  keywords,
  voice_tone = "positive"
) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate a google ad descriptiopn based on the name, product/service description of the service, keywords and tone of voice.",
      },
      { role: "system", content: "The name is: " + name },
      { role: "system", content: "Your tone of voice will be: " + voice_tone },
      {
        role: "system",
        content: "To extend the text you will add keywords like:  " + keywords,
      },
      { role: "user", content: product_description },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const appAndSMSNotifications = async (description) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that helps to generate app and SMS notifications on the basis of the description given.",
        },
        { role: "user", content: description },
      ],
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const linkedinAdsDescriptions = async (
  productName,
  product_description,
  keywords,
  voice_tone = "positive"
) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate a linkedin ad descriptiopn based on the product/service name, product/service description of the service, keywords and tone of voice.",
      },
      {
        role: "system",
        content: "The product/service name is: " + productName,
      },
      { role: "system", content: "Your tone of voice will be: " + voice_tone },
      {
        role: "system",
        content: "To extend the text you will add keywords like:  " + keywords,
      },
      { role: "user", content: product_description },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const linkedinAdsHeadlines = async (
  product_name,
  product_description,
  keywords,
  promotion
) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate a linkedin ad headline based on the product/service name, product/service description of the service, keywords and promotion.",
      },
      {
        role: "system",
        content: "The product/service name is: " + product_name,
      },
      {
        role: "system",
        content: "To extend the text you will add keywords like:  " + keywords,
      },
    ];
    if (promotion)
      messages.push({
        role: "system",
        content: "The promotion is : " + promotion,
      });

    messages.push({ role: "user", content: product_description });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const personalBiosV2 = async (information, platform) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate a personal bios based on the information given",
      },
      {
        role: "system",
        content: "The platform is: " + platform,
      },
      { role: "user", content: information },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const companyBiosV2 = async (
  company_name,
  company_description,
  voice_tone,
  platform
) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate a personal bios based on the company description given",
      },
      {
        role: "system",
        content: "The company name is " + company_name,
      },
      {
        role: "system",
        content: "The tone of voice is " + voice_tone,
      },
      {
        role: "system",
        content: "The platform is: " + platform,
      },
      { role: "user", content: company_description },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const quoraAnswers = async (
  question,
  information,
  latest_google_data = false
) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate a quora answer for the question  provided",
      },
    ];
    if (latest_google_data) {
      messages.push({
        role: "system",
        content: "You should include latest google data as well",
      });
    }
    if (information) {
      messages.push({
        role: "system",
        content: "The information related is : " + information,
      });
    }
    messages.push({
      role: "user",
      content: "The question is: " + question,
    });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const stories = async (description, voice_tone = "positive") => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate a story based on the description",
      },
      { role: "system", content: "The voice tone should be : " + voice_tone },
      { role: "user", content: description },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const bulletPointAnswers = async (question) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps to generate bullet point answers for the given question",
      },
      {
        role: "user",
        content: question,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const passivetoActiveVoice = async (sentence) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps text from passive to active voice for a given sentence",
      },
      {
        role: "user",
        content: sentence,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const definition = async (keyword) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps giving definition for a given keyword",
      },
      {
        role: "user",
        content: keyword,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const answers = async (question) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps giving answers for a given question",
      },
      {
        role: "user",
        content: question,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const prosandCons = async (paragraph) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps giving pros and cons for a given paragraph",
      },
      {
        role: "user",
        content: paragraph,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const questions = async (paragraph) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps generating questions for a given paragraph",
      },
      {
        role: "user",
        content: paragraph,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const emailsV2 = async (recipient, recipient_position, description) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps generating email for a given recipient name, recipient position and description",
      },
      {
        role: "system",
        content: "The recipient name is : " + recipient,
      },
      {
        role: "system",
        content: "The recipient position is : " + recipient_position,
      },
      {
        role: "user",
        content: "The description is : " + description,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const rewritewithKeywords = async (article, keywords) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps rewriting an article including given keywords",
      },
      {
        role: "system",
        content: "The keywords to include are : " + keywords,
      },
      {
        role: "user",
        content: "The article is : " + article,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const emailSubjectLines = async (product_name, email_description) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps generating email subject lines with given product name and email description",
      },
      {
        role: "system",
        content: "The product name is : " + product_name,
      },
      {
        role: "user",
        content: "The email description is : " + email_description,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const coldEmailsV2 = async (from, to, goal, scenario) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps generating cold emails from the inputs - from, to, goal and scenario",
      },
      {
        role: "system",
        content: "Email is from : " + from,
      },
      {
        role: "system",
        content: "Email is to : " + to,
      },
      {
        role: "system",
        content: "The goal is : " + goal,
      },
      {
        role: "user",
        content: "The scenario is : " + scenario,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const companyMission = async (company_name, company_description) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps generating company mission from given company name and company description",
      },
      {
        role: "system",
        content: "Company name is : " + company_name,
      },
      {
        role: "user",
        content: "Company description is : " + company_description,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const companyVision = async (company_name, company_description) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps generating company vision from given company name and company description",
      },
      {
        role: "system",
        content: "Company name is : " + company_name,
      },
      {
        role: "user",
        content: "Company description is : " + company_description,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const twitterThreadsV2 = async (topic, number_of_tweets, voice_tone) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps generating twitter threads based on topic and voice tone",
      },
      {
        role: "system",
        content: "The number of tweets to generate is : " + number_of_tweets,
      },
      {
        role: "system",
        content: "The tone of voice should be : " + voice_tone,
      },
      {
        role: "user",
        content: "Give me result on the topic : " + topic,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const socialMediaContentPlan = async (objective, platform) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps generating social media content plan for given objective and given platform",
      },
      {
        role: "system",
        content: "Platform is : " + platform,
      },
      {
        role: "user",
        content: "The objective is : " + objective,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const instagramCaptions = async (description, voice_tone, words_length) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps generating instagram captions for given description",
      },
      {
        role: "system",
        content: "The tone of voice should be : " + voice_tone,
      },
      {
        role: "system",
        content: "The words length should be : " + words_length,
      },
      {
        role: "user",
        content:
          "Generate the result based on the description : " + description,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const twitterTweets = async (topic) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps generating twitter tweets from given topic",
      },
      {
        role: "user",
        content: "The topic is : " + topic,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const trendingInstagramHashtags = async (image_description) => {
  try {
    let messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that helps generating trending instagram hashtags from given image description",
      },
      {
        role: "user",
        content: "The image description is : " + image_description,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

// const eCommereceProductDescription = async(product_name, product_specification, product_image, description_length,seo_keywords, addtional_file, voice_tone) => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a helpful assistant that helps to generate description of an ecommerce product based on the title, specifications, image, seo_keywords and addtional_files."},
//         { role: "system", content: "Your tone of voice will be: " + voice_tone},
//         { role: "system", content: "To generate the description you will take account to the seo keywords which are :  " + seo_keywords},
//         { role: "system", content: "To give you an overview on how the image looks like, here is the image : " + product_image},
//         { role: "system", content: "The title of the product is  : " + product_name},
//         { role: "system", content: "The description length will be of  : " + description_length + " number of words"},
//         { role: "user", content: product_specification }
//       ],
//     });
//     return { botResponse: response?.choices[0].message?.content };
//   } catch (err) {
//     throw err;
//   }
// }

// const allinOneContentWriter

module.exports = {
  gptChat,
  blogTitles,
  textExtenderV2,
  paraghraphWriter,
  articleIdeaGenerator,
  articleOutlineGeneratorV2,
  contentRephraser,
  articleIntroGenerator,
  articleOutlineGenerator,
  contentShortenV2,
  conclusionWriterV2,
  facebookAdsV2,
  linkedinAdsV2,
  googleAdTitlesV2,
  googleAdDescriptionsV2,
  appAndSMSNotifications,
  linkedinAdsDescriptions,
  linkedinAdsHeadlines,
  personalBiosV2,
  companyBiosV2,
  quoraAnswers,
  stories,
  bulletPointAnswers,
  passivetoActiveVoice,
  definition,
  answers,
  prosandCons,
  questions,
  emailsV2,
  rewritewithKeywords,
  emailSubjectLines,
  coldEmailsV2,
  companyMission,
  companyVision,
  twitterThreadsV2,
  socialMediaContentPlan,
  instagramCaptions,
  twitterTweets,
  trendingInstagramHashtags,
};
