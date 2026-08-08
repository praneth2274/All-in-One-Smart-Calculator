import API from './api';

export const explainCalculationWithAI = async (
  calculatorTitle: string,
  formula: string,
  inputs: Record<string, any>,
  results: Record<string, any>
): Promise<string> => {
  try {
    const res = await API.post('/ai/explain', { calculatorTitle, formula, inputs, results });
    return res.data.explanation;
  } catch (error) {
    return 'Unable to generate AI explanation right now. Please try again.';
  }
};

export const chatWithAI = async (prompt: string, type = 'chat', context = {}): Promise<string> => {
  try {
    const res = await API.post('/ai/chat', { prompt, type, context });
    return res.data.reply;
  } catch (error) {
    return 'I am currently unable to reach the AI engine. Please verify your connection or try another prompt.';
  }
};
