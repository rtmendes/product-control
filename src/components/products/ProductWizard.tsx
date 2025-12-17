import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Wand2 } from 'lucide-react';

interface ProductFormData {
  brandId: string;
  type: string;
  title: string;
  description: string;
  targetAudience: string;
  pricing: {
    price: number;
    compareAtPrice: number;
  };
  features: string[];
  tags: string[];
}

export function ProductWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormData>({
    brandId: '',
    type: '',
    title: '',
    description: '',
    targetAudience: '',
    pricing: { price: 0, compareAtPrice: 0 },
    features: [''],
    tags: []
  });

  const steps = [
    { id: 1, name: 'Product Type', description: 'Choose your product category' },
    { id: 2, name: 'Basic Info', description: 'Product details' },
    { id: 3, name: 'Audience & Features', description: 'Target market and key features' },
    { id: 4, name: 'Pricing', description: 'Set your prices' },
    { id: 5, name: 'Review', description: 'Confirm and generate' }
  ];

  const productTypes = [
    { id: 't-shirt', name: 'T-Shirt', icon: '👕', description: 'Classic apparel' },
    { id: 'hoodie', name: 'Hoodie', icon: '🧥', description: 'Comfortable sweatshirt' },
    { id: 'mug', name: 'Mug', icon: '☕', description: 'Ceramic drinkware' },
    { id: 'poster', name: 'Poster', icon: '🖼️', description: 'Wall art print' },
    { id: 'sticker', name: 'Sticker', icon: '🏷️', description: 'Die-cut stickers' },
    { id: 'phone-case', name: 'Phone Case', icon: '📱', description: 'Device protection' }
  ];

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updatePricing = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      pricing: { ...prev.pricing, [field]: value }
    }));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    console.log('Creating product:', formData);
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : currentStep === step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                    }
                  `}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-slate-900">{step.name}</div>
                  <div className="text-xs text-slate-500">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-1 mx-4 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="min-h-96">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Choose Product Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {productTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateField('type', type.id)}
                    className={`
                      p-6 rounded-lg border-2 transition-all text-left
                      ${formData.type === type.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                      }
                    `}
                  >
                    <div className="text-4xl mb-3">{type.icon}</div>
                    <div className="font-semibold text-slate-900 mb-1">{type.name}</div>
                    <div className="text-sm text-slate-600">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Basic Information</h2>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Product Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g., Premium Cotton T-Shirt"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Describe your product in detail..."
                  rows={6}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Audience & Features</h2>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => updateField('targetAudience', e.target.value)}
                  placeholder="e.g., Young professionals aged 25-35"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Key Features
                </label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Enter a feature"
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formData.features.length > 1 && (
                      <button
                        onClick={() => removeFeature(index)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addFeature}
                  className="mt-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                >
                  + Add Feature
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Pricing</h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      value={formData.pricing.price}
                      onChange={(e) => updatePricing('price', parseFloat(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Compare at Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      value={formData.pricing.compareAtPrice}
                      onChange={(e) => updatePricing('compareAtPrice', parseFloat(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {formData.pricing.compareAtPrice > formData.pricing.price && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-sm text-green-800">
                    Savings: ${(formData.pricing.compareAtPrice - formData.pricing.price).toFixed(2)} (
                    {Math.round(((formData.pricing.compareAtPrice - formData.pricing.price) / formData.pricing.compareAtPrice) * 100)}% off)
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Review & Generate</h2>

              <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                <div>
                  <div className="text-sm font-medium text-slate-500">Product Type</div>
                  <div className="text-lg font-semibold text-slate-900">
                    {productTypes.find(t => t.id === formData.type)?.name}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-slate-500">Title</div>
                  <div className="text-lg font-semibold text-slate-900">{formData.title}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-slate-500">Description</div>
                  <div className="text-slate-900">{formData.description}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-slate-500">Target Audience</div>
                  <div className="text-slate-900">{formData.targetAudience}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-slate-500">Features</div>
                  <ul className="list-disc list-inside text-slate-900">
                    {formData.features.filter(f => f).map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-sm font-medium text-slate-500">Pricing</div>
                  <div className="text-lg font-semibold text-slate-900">
                    ${formData.pricing.price}
                    {formData.pricing.compareAtPrice > 0 && (
                      <span className="ml-2 text-slate-500 line-through">
                        ${formData.pricing.compareAtPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Wand2 className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">AI Generation Ready</div>
                    <div className="text-sm text-blue-800">
                      Click Generate to create product descriptions, SEO content, and marketing assets using AI.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Wand2 className="h-4 w-4" />
              Generate with AI
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
