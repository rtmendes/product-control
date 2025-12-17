import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export class SEOAgent {
  async optimizeProduct(data: any) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{
        role: 'system',
        content: 'You are an SEO expert. Optimize content for search engines.'
      }, {
        role: 'user',
        content: `Optimize SEO for: ${JSON.stringify(data)}`
      }]
    });
    return { seo: completion.choices[0].message.content };
  }
  
  async getStatus() {
    return { name: 'SEO Agent', status: 'active' };
  }
}
