const { generateAIResponse } = require('../utils/aiEngine');

const explainCalculation = async (req, res) => {
  try {
    const { calculatorTitle, formula, inputs, results, userApiKey, apiKey: bodyApiKey } = req.body;
    const apiKey = req.headers['x-gemini-api-key'] || userApiKey || bodyApiKey;
    const explanation = await generateAIResponse(
      `Explain step by step how ${calculatorTitle} works with inputs ${JSON.stringify(inputs)} and results ${JSON.stringify(results)}`,
      'explain',
      { calculatorTitle, formula, inputs, results, apiKey }
    );
    res.json({ explanation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const aiChat = async (req, res) => {
  try {
    const { prompt, type, context, userApiKey, apiKey: bodyApiKey } = req.body;
    const apiKey = req.headers['x-gemini-api-key'] || userApiKey || bodyApiKey;
    const reply = await generateAIResponse(prompt, type || 'chat', { ...(context || {}), apiKey });
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { explainCalculation, aiChat };
