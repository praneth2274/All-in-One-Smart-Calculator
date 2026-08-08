const axios = require('axios');

/**
 * CalcHub AI Engine - Handles AI queries, step-by-step problem explanations,
 * health/finance advice, and math solving.
 */
const generateAIResponse = async (prompt, type = 'chat', context = {}) => {
  const apiKey = context.apiKey || process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.trim() !== '') {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are CalcHub AI, an expert mathematical, financial, student, health, and scientific calculator assistant.
Context: ${JSON.stringify(context)}
Task Type: ${type}
Query: ${prompt}
Provide clear, accurate, step-by-step formatted responses with formulas, mathematical breakdown, and actionable insights. Use Markdown.`,
                },
              ],
            },
          ],
        },
        { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
      );

      const candidate = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (candidate) return candidate;
    } catch (err) {
      console.warn('[AI Engine] Gemini API call failed or timed out. Falling back to local smart engine.', err.message);
    }
  }

  // Smart Fallback Solver Engine
  return generateFallbackExplanation(prompt, type, context);
};

function generateFallbackExplanation(prompt, type, context) {
  const lower = (prompt || '').toLowerCase();

  if (type === 'explain') {
    const calcName = context.calculatorTitle || 'Calculation';
    return `### Step-by-Step AI Explanation for ${calcName}\n\n` +
      `1. **Input Variables Received:**\n` +
      Object.entries(context.inputs || {})
        .map(([k, v]) => `   - **${k}**: \`${v}\``)
        .join('\n') + `\n\n` +
      `2. **Mathematical Formula Used:**\n` +
      `   > Applicable Standard Formula: \\(${context.formula || 'Result = f(Inputs)'}\\)\n\n` +
      `3. **Step-by-Step Calculation:**\n` +
      `   - Substituting inputs into the formula.\n` +
      `   - Computing intermediate coefficients.\n` +
      `   - Evaluating the final values for accurate precision.\n\n` +
      `4. **Key Results Summary:**\n` +
      Object.entries(context.results || {})
        .map(([k, v]) => `   - **${k}**: **\`${v}\`**`)
        .join('\n') + `\n\n` +
      `💡 *Tip: You can export this calculation to PDF or Excel using the top toolbar!*`;
  }

  if (lower.includes('emi') || lower.includes('loan')) {
    return `### 💡 EMI & Loan Advice\n\n- **Formula:** \\(EMI = P \\times r \\times \\frac{(1+r)^n}{(1+r)^n - 1}\\)\n- Keep your total loan EMIs under **40%** of your net monthly income.\n- Making small periodic principal pre-payments can significantly reduce total interest overhead over long tenures.`;
  }

  if (lower.includes('bmi') || lower.includes('health') || lower.includes('calorie')) {
    return `### 🏥 Health & Wellness Calculation Guide\n\n- **BMI Formula:** \\(BMI = \\frac{\\text{Weight (kg)}}{\\text{Height (m)}^2}\\)\n- Normal range: **18.5 – 24.9**.\n- Combine calculated caloric intake with 150+ minutes of moderate exercise per week for optimal cardiovascular fitness.`;
  }

  if (lower.includes('sip') || lower.includes('invest') || lower.includes('compound')) {
    return `### 📈 Compound Wealth Growth Insights\n\n- **SIP Compound Formula:** \\(M = P \\times \\frac{(1+i)^n - 1}{i} \\times (1+i)\\)\n- Starting even 5 years earlier can double your final returns due to exponential compounding interest over time.`;
  }

  return `### 🤖 CalcHub AI Assistant Response\n\n` +
    `I evaluated your prompt: **"${prompt}"**.\n\n` +
    `- **Suggested Tool:** Use the search bar in CalcHub AI to find the perfect calculator among our 40+ specialized tools.\n` +
    `- **Step-by-Step Accuracy:** Every calculator in CalcHub provides detailed real-time mathematical formulas and breakdown.\n` +
    `- **Questions?** Feel free to ask specific questions about EMI, SIP, BMI, GPA, Unit Conversions, or Scientific equations!`;
}

module.exports = { generateAIResponse };
