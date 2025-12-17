export const generationRules = {
  'physical-pod': {
    copywriting: {
      product_description: {
        tone: 'engaging',
        maxLength: 500,
        required: ['benefits', 'materials', 'sizing'],
        prohibited: ['guarantees'],
        qualityGates: { minWords: 50, maxWords: 150 }
      }
    }
  }
};
