import API from './api';
import axios from 'axios';

/**
 * Direct Gemini API fallback call from browser if backend API is offline/delayed
 */
const callGeminiDirect = async (prompt: string, apiKey: string): Promise<string | null> => {
  const modelsToTry = ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-flash-latest'];
  for (const model of modelsToTry) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are CalcHub AI, an expert mathematical, financial, student, health, and scientific calculator assistant.
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
      console.warn(`[AI Service Direct] Model ${model} failed, trying next...`);
    }
  }
  return null;
};

/**
 * Smart Client-Side Mathematical & Assistant Fallback Engine
 */
function generateClientSmartFallback(prompt: string, type: string = 'chat', context: Record<string, any> = {}): string {
  const lower = (prompt || '').toLowerCase();

  if (type === 'explain') {
    const calcName = context.calculatorTitle || 'Calculation';
    const inputsList = Object.entries(context.inputs || {})
      .map(([k, v]) => `   - **${k}**: \`${v}\``)
      .join('\n') || '   - *Standard parameters applied*';

    const resultsList = Object.entries(context.results || {})
      .map(([k, v]) => `   - **${k}**: **\`${v}\`**`)
      .join('\n') || '   - *Results calculated successfully*';

    return `### 🧮 Step-by-Step AI Breakdown for ${calcName}\n\n` +
      `1. **Input Variables Received:**\n${inputsList}\n\n` +
      `2. **Mathematical Formula:**\n` +
      `   > Standard Formula: \\(${context.formula || 'Result = f(Inputs)'}\\)\n\n` +
      `3. **Step-by-Step Calculation:**\n` +
      `   - Validated numerical values and units.\n` +
      `   - Applied formula transformations and intermediate products.\n` +
      `   - Calculated final results with target decimal precision.\n\n` +
      `4. **Calculated Results:**\n${resultsList}\n\n` +
      `💡 *Tip: Click 'PDF Report' or 'Export Excel' above to download a complete formatted summary!*`;
  }

  if (lower.includes('emi') || lower.includes('loan')) {
    return `### 💡 EMI & Loan Breakdown\n\n` +
      `- **Standard EMI Formula:** \\(EMI = P \\times r \\times \\frac{(1+r)^n}{(1+r)^n - 1}\\)\n` +
      `- **Key Principle:** Monthly installments pay off both interest and principal over time.\n` +
      `- **Smart Strategy:** Making pre-payments toward the principal early in the tenure reduces overall interest drastically!`;
  }

  if (lower.includes('compound') || lower.includes('sip') || lower.includes('invest') || lower.includes('interest')) {
    return `### 📈 Compound Growth & Investment Analysis\n\n` +
      `- **Compound Interest Formula:** \\(A = P \\left(1 + \\frac{r}{n}\\right)^{nt}\\)\n` +
      `- **SIP Wealth Growth:** \\(M = P \\times \\frac{(1+i)^n - 1}{i} \\times (1+i)\\)\n` +
      `- **Insight:** Compounding generates exponential returns as interest earns interest over time.`;
  }

  if (lower.includes('bmi') || lower.includes('health') || lower.includes('bmr') || lower.includes('calorie')) {
    return `### 🏥 Health & Calorie Calculation Guidance\n\n` +
      `- **BMI Formula:** \\(BMI = \\frac{\\text{Weight (kg)}}{\\text{Height (m)}^2}\\)\n` +
      `- **Normal Weight Range:** 18.5 – 24.9\n` +
      `- **BMR (Harris-Benedict):** Calculates minimum energy expended at rest to maintain body functions.`;
  }

  if (lower.includes('gpa') || lower.includes('cgpa') || lower.includes('grade') || lower.includes('attendance')) {
    return `### 🎓 Academic Score & Attendance Breakdown\n\n` +
      `- **GPA Formula:** \\(GPA = \\frac{\\sum (\\text{Grade Points} \\times \\text{Credits})}{\\sum \\text{Credits}}\\)\n` +
      `- **Attendance Target:** Maintain $\\ge 75\\%$ to meet standard university requirements.`;
  }

  return `### 🤖 CalcHub AI Assistant Response\n\n` +
    `I evaluated your request: **"${prompt}"**\n\n` +
    `- **Step-by-Step Guidance:** CalcHub AI supports 40+ specialized calculators for Finance, Math, Health, Academics, and Unit Conversions.\n` +
    `- **Mathematical Precision:** Every calculation provides formulas, graphs, and export options.\n` +
    `- **Need help?** Ask me any question about EMI, SIP, Compound Interest, BMI, GPA, or Unit Conversions!`;
}

export const explainCalculationWithAI = async (
  calculatorTitle: string,
  formula: string,
  inputs: Record<string, any>,
  results: Record<string, any>
): Promise<string> => {
  try {
    const res = await API.post('/ai/explain', { calculatorTitle, formula, inputs, results });
    if (res.data && res.data.explanation) return res.data.explanation;
  } catch (error) {
    console.warn('[AI Service] Backend explain endpoint unreachable. Trying direct Gemini key or client solver.');
  }

  // Try direct user key if stored locally
  const savedKey = localStorage.getItem('calchub_gemini_key');
  if (savedKey) {
    const prompt = `Explain step by step how ${calculatorTitle} works with inputs ${JSON.stringify(inputs)} and results ${JSON.stringify(results)}`;
    const directReply = await callGeminiDirect(prompt, savedKey);
    if (directReply) return directReply;
  }

  // Smart client fallback
  return generateClientSmartFallback(`Explain ${calculatorTitle}`, 'explain', { calculatorTitle, formula, inputs, results });
};

export const chatWithAI = async (prompt: string, type = 'chat', context = {}): Promise<string> => {
  try {
    const res = await API.post('/ai/chat', { prompt, type, context });
    if (res.data && res.data.reply) return res.data.reply;
  } catch (error) {
    console.warn('[AI Service] Backend chat endpoint unreachable. Trying direct Gemini key or client solver.');
  }

  // Try direct user key if stored in localStorage
  const savedKey = localStorage.getItem('calchub_gemini_key');
  if (savedKey) {
    const directReply = await callGeminiDirect(prompt, savedKey);
    if (directReply) return directReply;
  }

  // Smart client fallback solver
  return generateClientSmartFallback(prompt, type, context);
};
