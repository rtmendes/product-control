export const mcpConfig = {
  provider: 'den.io',
  apiKey: process.env.DEN_API_KEY,
  schemas: {
    brandGuidelines: { type: 'object' },
    generationRules: { type: 'object' },
    assetMetadata: { type: 'object' }
  }
};
