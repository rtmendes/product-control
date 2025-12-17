import OpenAI from 'openai';
import { prisma } from '../../lib/prisma';
import { KnowledgeBaseService } from '../knowledge-base.service';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface CopywritingRequest {
  userId: string;
  productId: string;
  assetTypes: string[];
}

export class CopywritingAgent {
  private knowledgeBase: KnowledgeBaseService;
  
  constructor() {
    this.knowledgeBase = new KnowledgeBaseService();
  }
  
  async generateCopy(request: CopywritingRequest) {
    const { userId, productId, assetTypes } = request;
    
    // Get product details
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Get brand guidelines and generation rules from knowledge base
    const brandGuidelines = await this.knowledgeBase.getBrandGuidelines(userId);
    const generationRules = await this.knowledgeBase.getGenerationRules(userId, product.productType);
    
    // Generate copy for each asset type
    const results = [];
    
    for (const assetType of assetTypes) {
      const rules = generationRules.copywriting[assetType];
      
      if (!rules) {
        console.warn(`No generation rules found for ${assetType}`);
        continue;
      }
      
      // Create AI prompt
      const prompt = this.buildPrompt(product, brandGuidelines, rules, assetType);
      
      // Generate copy using OpenAI
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are an expert copywriter specializing in ${product.productType} products. 
            Follow these brand guidelines: ${JSON.stringify(brandGuidelines)}
            Follow these generation rules: ${JSON.stringify(rules)}`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });
      
      const generatedCopy = completion.choices[0].message.content;
      
      // Quality check against rules
      const qualityCheck = await this.checkQuality(generatedCopy, rules.qualityGates);
      
      // Store asset in database
      const asset = await prisma.asset.create({
        data: {
          productId,
          assetType,
          assetCategory: 'copywriting',
          content: generatedCopy,
          metadata: {
            model: 'gpt-4-turbo-preview',
            prompt,
            qualityCheck,
            generationRules: rules,
          },
          status: qualityCheck.passed ? 'approved' : 'needs_review',
        },
      });
      
      // Store in knowledge base for learning
      await this.knowledgeBase.storeAssetMetadata({
        assetId: asset.id,
        productId,
        assetType,
        qualityScore: qualityCheck.score,
        metadata: {
          wordCount: generatedCopy.split(' ').length,
          tone: rules.tone,
          guidelines: brandGuidelines,
        },
      });
      
      results.push({
        assetType,
        assetId: asset.id,
        content: generatedCopy,
        qualityCheck,
        status: asset.status,
      });
    }
    
    return {
      productId,
      generatedAssets: results,
      summary: {
        total: results.length,
        approved: results.filter(r => r.status === 'approved').length,
        needsReview: results.filter(r => r.status === 'needs_review').length,
      },
    };
  }
  
  private buildPrompt(product: any, brandGuidelines: any, rules: any, assetType: string): string {
    return `
Generate ${assetType.replace('_', ' ')} for the following product:

Product Name: ${product.name}
Description: ${product.description}
Type: ${product.productType}

Requirements:
- Tone: ${rules.tone}
- Length: ${rules.maxLength} characters maximum
- Required elements: ${rules.required.join(', ')}
- Prohibited elements: ${rules.prohibited.join(', ')}

Brand Voice: ${brandGuidelines.voice}
Target Audience: ${brandGuidelines.targetAudience}

Create compelling, conversion-focused copy that aligns with the brand guidelines and generation rules.
    `.trim();
  }
  
  private async checkQuality(content: string, qualityGates: any): Promise<any> {
    const checks = [];
    let score = 100;
    
    // Check word count
    const wordCount = content.split(' ').length;
    if (qualityGates.minWords && wordCount < qualityGates.minWords) {
      checks.push({
        gate: 'minWords',
        passed: false,
        message: `Content has ${wordCount} words, minimum is ${qualityGates.minWords}`,
      });
      score -= 20;
    }
    
    if (qualityGates.maxWords && wordCount > qualityGates.maxWords) {
      checks.push({
        gate: 'maxWords',
        passed: false,
        message: `Content has ${wordCount} words, maximum is ${qualityGates.maxWords}`,
      });
      score -= 10;
    }
    
    // Check for required keywords
    if (qualityGates.requiredKeywords) {
      const missingKeywords = qualityGates.requiredKeywords.filter((kw: string) => 
        !content.toLowerCase().includes(kw.toLowerCase())
      );
      
      if (missingKeywords.length > 0) {
        checks.push({
          gate: 'requiredKeywords',
          passed: false,
          message: `Missing keywords: ${missingKeywords.join(', ')}`,
        });
        score -= 15;
      }
    }
    
    // Check for prohibited words
    if (qualityGates.prohibitedWords) {
      const foundProhibited = qualityGates.prohibitedWords.filter((word: string) => 
        content.toLowerCase().includes(word.toLowerCase())
      );
      
      if (foundProhibited.length > 0) {
        checks.push({
          gate: 'prohibitedWords',
          passed: false,
          message: `Found prohibited words: ${foundProhibited.join(', ')}`,
        });
        score -= 25;
      }
    }
    
    return {
      passed: score >= 70,
      score,
      checks,
      timestamp: new Date(),
    };
  }
  
  async getStatus() {
    return {
      name: 'Copywriting Agent',
      status: 'active',
      capabilities: [
        'Product descriptions',
        'Email sequences',
        'Social media posts',
        'Ad copy',
        'Landing page copy',
        'Blog posts',
      ],
      lastActivity: new Date(),
    };
  }
}
