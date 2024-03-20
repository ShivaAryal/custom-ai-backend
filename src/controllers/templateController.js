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
        { role: "system", content: "You are a helpful assistant that helps generate blog title ideas and give only the title as response."},
        { role: "user", content: message }
      ],
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
};

const textExtenderV2 = async(text,keywords = [],number_of_lines = 20,voice_tone='passive' ) => {
  try {
    let  messages = [
      { role: "system", content: "You are a helpful assistant that helps to extend text based on text, keywords, frequency of the keywords to add, words length, if we need to add latest data or not, and the tone of voice."},
      { role: "system", content: "You will add: " + number_of_lines + " number of lines"},
      { role: "system", content: "Your tone of voice will be: " + voice_tone},
      { role: "user", content: text },
    ];
    if(keywords.length !== 0)
        messages.push({ role: "system", content: "To extend the text you will add keywords like:  " + keywords})

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
}

const paraghraphWriter = async(text,keywords =[], keyword_frequency = 5, words_length = 300, latest_data = false, voice_tone = 'passive' ) => {
  try {
   let messages = [
      { role: "system", content: "You are a helpful assistant that helps to extend text based on text, keywords, frequency of the keywords to add, words length, if we need to add latest data or not, and the tone of voice."},
      { role: "user", content: text },
      { role: "system", content: "To extend the text you will have a limit of words of  " + words_length},
      { role: "system", content: "Your tone of voice will be: " + voice_tone},
    ];
    if (latest_data)
        messages.push({ role: "system", content: "You will be using the latest data available."})
    if(keywords.length !== 0)
        messages.push({ role: "system", content: "To extend the text you will add keywords like:  " + keywords})
    if(keywords.length !== 0 && keyword_frequency)
        messages.push({role: "system", content: "The keywords will be used at a frequency level of:  " + keyword_frequency});
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
}

const articleIdeaGenerator = async(topic, keywords = [], voice_tone = 'passive' ) => {
  try {
    let messages = [
      { role: "system", content: "You are a helpful assistant that helps to generate article ideas based on topic, keywords, and the tone of voice."},
      { role: "system", content: "Your tone of voice will be: " + voice_tone},
      { role: "user", content: topic }
    ]
    if(keywords.length !== 0)
        messages.push({ role: "system", content: "To generate ideas you will use keywords like:  " + keywords})
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
}

const articleOutlineGeneratorV2 = async(topic, keywords = [], voice_tone = "passive" ) => {
  try {
    let messages = [
      { role: "system", content: "You are a helpful assistant that helps to generate outlines for an article based on topic, and keywords. You will generate atleast 5 points or more for this"},
      { role: "system", content: "Your tone of voice will be: " + voice_tone},
      { role: "user", content: topic }
    ]
    if(keywords.length !== 0)
       messages.push({ role: "system", content: "To generate outlines you will use keywords like:  " + keywords})
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
}

const contentRephraser = async(content,words_length = 200, voice_tone = 'passive') => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that helps to rephrase contents based on the content, length of words to use and tone of voice."},
        { role: "system", content: "To extend the text you will have a limit of words of  " + words_length},
        { role: "system", content: "Your tone of voice will be: " + voice_tone},
        { role: "user", content: content }
      ],
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
}

const articleIntroGenerator = async(title, keywords = [], words_length = 200, voice_tone = "passive") => {
  try {
    let messages = [
      { role: "system", content: "You are a helpful assistant that helps to generate introduction paragraphs for an article based on article title, length of words to use, keywords to use, and tone of voice."},
      { role: "system", content: "To extend the text you will have a limit of words of  " + words_length},
      { role: "system", content: "Your tone of voice will be: " + voice_tone},
      { role: "user", content: title }
    ];
    if(keywords.length !== 0)
       messages.push({ role: "system", content: "To generate the introduction paragraph you will use keywords like:  " + keywords})
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
}

const articleOutlineGenerator = async(topic, intro) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that helps to generate outlines for an article based on article title and intro of the article."},
        { role: "system", content: "The topic of the article is " + topic},
        { role: "user", content: intro }
      ],
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
}

const contentShortener = async(content, voice_tone = "passive") => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that helps to shorten a specific content based on the content and tone of voice."},
        { role: "system", content: "Your tone of voice will be: " + voice_tone},
        { role: "user", content: content }
      ],
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
}

const conclusionWriter = async(article, voice_tone = 'passive') => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that helps to generate a conclusion of an article based on the article and tone of voice."},
        { role: "system", content: "Your tone of voice will be: " + voice_tone},
        { role: "user", content: article }
      ],
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
}

const facebookAdsV2 = async(service_name, service_description, occasion, promotion, voice_tone = 'passive') => {
  try {
    let messages = [
      { role: "system", content: "You are a helpful assistant that helps to generate a facebook ad idea based on the service name, description of the service, occasion, promotion and tone of voice."},
      { role: "system", content: "Your tone of voice will be: " + voice_tone},
      { role: "system", content: "The service name is: " + service_name},
      { role: "system", content: "The occasion for this ad will be : " + occasion},
      { role: "system", content: "The ad will be used for the promotion of  : " + promotion},
      { role: "user", content: service_description }
    ]
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return { botResponse: response?.choices[0].message?.content };
  } catch (err) {
    throw err;
  }
}

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
  contentShortener,
  conclusionWriter,
  facebookAdsV2
};
