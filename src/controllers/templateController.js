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

// const articleWriter =

module.exports = {
  gptChat,
};
