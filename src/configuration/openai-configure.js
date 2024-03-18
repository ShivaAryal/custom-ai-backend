const OpenAI = require("openai");
const configuration = {
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
};
const openai = new OpenAI(configuration);

module.exports = openai;
