import OpenAI from 'openai';
import { prisma } from '../../lib/prisma';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export class ProductStrategyAgent {
  async generateStrategy(data: any) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{
        role: 'system',
        content: 'You are a product strategy expert. Create positioning and pricing strategies.'
      }, {
        role: 'user',
        content: `Generate strategy for: ${JSON.stringify(data)}`
      }]
    });
    return { strategy: completion.choices[0].message.content };
  }
  
  async getStatus() {
    return { name: 'Product Strategy Agent', status: 'active' };
  }
}
