import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Lightbulb, FileText, User, TrendingUp, Sparkles } from 'lucide-react';
import type { AdStrategyKnowledgeBase, WritingStyle } from '../App';

interface AdCopywritingConfigProps {
  selectedStrategies: AdStrategyKnowledgeBase[];
  selectedWritingStyles: WritingStyle[];
  onStrategiesChange: (strategies: AdStrategyKnowledgeBase[]) => void;
  onWritingStylesChange: (styles: WritingStyle[]) => void;
}

const strategyKnowledgeBase: AdStrategyKnowledgeBase[] = [
  {
    id: 'russell-brunson',
    name: 'Russell Brunson - DotCom Secrets',
    author: 'Russell Brunson',
    description: 'Value ladder, funnel hacking, and irresistible offer frameworks',
    framework: 'Hook, Story, Offer',
    enabled: false,
  },
  {
    id: 'alex-hormozi',
    name: 'Alex Hormozi - $100M Offers',
    author: 'Alex Hormozi',
    description: 'Grand slam offers, value equation, and scarcity tactics',
    framework: 'Dream Outcome + Perceived Likelihood - Time Delay - Effort & Sacrifice',
    enabled: false,
  },
  {
    id: 'dan-kennedy',
    name: 'Dan Kennedy - No B.S. Direct Marketing',
    author: 'Dan Kennedy',
    description: 'Direct response marketing, compelling copy, and USP development',
    framework: 'Who, What, Why, Proof, Scarcity, CTA',
    enabled: false,
  },
  {
    id: 'eugene-schwartz',
    name: 'Eugene Schwartz - Breakthrough Advertising',
    author: 'Eugene Schwartz',
    description: 'Market awareness levels, mass desire, and sophisticated copy',
    framework: 'Awareness Stages (Unaware → Most Aware)',
    enabled: false,
  },
  {
    id: 'gary-halbert',
    name: 'Gary Halbert - The Boron Letters',
    author: 'Gary Halbert',
    description: 'Emotional triggers, market research, and benefit-driven copy',
    framework: 'Headlines, Benefits, Emotional Appeal, Urgency',
    enabled: false,
  },
  {
    id: 'david-ogilvy',
    name: 'David Ogilvy - Ogilvy on Advertising',
    author: 'David Ogilvy',
    description: 'Brand building, creative excellence, and tested principles',
    framework: 'Headline, Visual, Body Copy, Research-backed',
    enabled: false,
  },
  {
    id: 'todd-brown',
    name: 'Todd Brown - E5 Method',
    author: 'Todd Brown',
    description: 'Engineering the entire marketing funnel with precision',
    framework: 'Mechanism-based marketing, unique mechanism reveal',
    enabled: false,
  },
  {
    id: 'frank-kern',
    name: 'Frank Kern - Mass Control',
    author: 'Frank Kern',
    description: 'Behavioral dynamics, intent-based branding, and list building',
    framework: 'Story, Identify Problem, Present Solution, Social Proof',
    enabled: false,
  },
  {
    id: 'ryan-deiss',
    name: 'Ryan Deiss - Customer Value Optimization',
    author: 'Ryan Deiss',
    description: 'Digital marketing funnels and customer ascension',
    framework: 'Tripwire → Core Offer → Profit Maximizer → Return Path',
    enabled: false,
  },
  {
    id: 'donald-miller',
    name: 'Donald Miller - StoryBrand',
    author: 'Donald Miller',
    description: 'Clarify your message using story framework',
    framework: 'Character → Problem → Guide → Plan → Call to Action → Success',
    enabled: false,
  },
];

const writingStyleTemplates: WritingStyle[] = [
  // Awareness Stage
  {
    id: 'awareness-educational',
    name: 'Educational & Informative',
    description: 'Teach something valuable, position as expert',
    useCase: 'Blog posts, how-to guides, tutorials',
    journeyStep: 'awareness',
    enabled: false,
  },
  {
    id: 'awareness-storytelling',
    name: 'Storytelling & Narrative',
    description: 'Share relatable stories that build connection',
    useCase: 'Social media posts, video ads, case studies',
    journeyStep: 'awareness',
    enabled: false,
  },
  {
    id: 'awareness-problem-aware',
    name: 'Problem-Aware',
    description: 'Highlight the problem they didn\'t know they had',
    useCase: 'Cold traffic ads, top-of-funnel content',
    journeyStep: 'awareness',
    enabled: false,
  },
  {
    id: 'awareness-curiosity',
    name: 'Curiosity & Intrigue',
    description: 'Create curiosity gap that demands attention',
    useCase: 'Headlines, subject lines, hooks',
    journeyStep: 'awareness',
    enabled: false,
  },
  
  // Consideration Stage
  {
    id: 'consideration-benefit',
    name: 'Benefit-Driven',
    description: 'Focus on benefits and outcomes, not features',
    useCase: 'Product pages, sales letters, VSLs',
    journeyStep: 'consideration',
    enabled: false,
  },
  {
    id: 'consideration-comparison',
    name: 'Comparison & Differentiation',
    description: 'Show why you\'re different and better than alternatives',
    useCase: 'Competitive ads, landing pages',
    journeyStep: 'consideration',
    enabled: false,
  },
  {
    id: 'consideration-social-proof',
    name: 'Social Proof Heavy',
    description: 'Leverage testimonials, reviews, and case studies',
    useCase: 'Retargeting ads, sales pages',
    journeyStep: 'consideration',
    enabled: false,
  },
  {
    id: 'consideration-mechanism',
    name: 'Unique Mechanism',
    description: 'Reveal the secret or unique approach',
    useCase: 'Webinars, sales presentations, launch sequences',
    journeyStep: 'consideration',
    enabled: false,
  },

  // Decision Stage
  {
    id: 'decision-urgency',
    name: 'Urgency & Scarcity',
    description: 'Create FOMO with limited time or quantity',
    useCase: 'Flash sales, product launches, cart abandonment',
    journeyStep: 'decision',
    enabled: false,
  },
  {
    id: 'decision-risk-reversal',
    name: 'Risk Reversal',
    description: 'Strong guarantees and zero-risk propositions',
    useCase: 'Checkout pages, money-back guarantees',
    journeyStep: 'decision',
    enabled: false,
  },
  {
    id: 'decision-direct-response',
    name: 'Direct Response',
    description: 'Clear, specific CTA with immediate action required',
    useCase: 'Email promotions, direct mail, PPC ads',
    journeyStep: 'decision',
    enabled: false,
  },
  {
    id: 'decision-offer-stack',
    name: 'Offer Stack',
    description: 'Build massive value with bonuses and stacking',
    useCase: 'Sales pages, webinar pitches, launch offers',
    journeyStep: 'decision',
    enabled: false,
  },

  // Retention Stage
  {
    id: 'retention-value-added',
    name: 'Value-Added Content',
    description: 'Continue providing value to existing customers',
    useCase: 'Email newsletters, customer content',
    journeyStep: 'retention',
    enabled: false,
  },
  {
    id: 'retention-community',
    name: 'Community Building',
    description: 'Foster belonging and identity',
    useCase: 'Facebook groups, member forums, events',
    journeyStep: 'retention',
    enabled: false,
  },
  {
    id: 'retention-upsell',
    name: 'Upsell & Cross-sell',
    description: 'Present complementary or upgraded offers',
    useCase: 'Post-purchase sequences, member areas',
    journeyStep: 'retention',
    enabled: false,
  },
];

export function AdCopywritingConfig({
  selectedStrategies,
  selectedWritingStyles,
  onStrategiesChange,
  onWritingStylesChange,
}: AdCopywritingConfigProps) {
  const [filterJourney, setFilterJourney] = useState<string>('all');

  const toggleStrategy = (strategyId: string) => {
    const strategy = strategyKnowledgeBase.find(s => s.id === strategyId);
    if (!strategy) return;

    const isCurrentlySelected = selectedStrategies.some(s => s.id === strategyId);
    
    if (isCurrentlySelected) {
      onStrategiesChange(selectedStrategies.filter(s => s.id !== strategyId));
    } else {
      onStrategiesChange([...selectedStrategies, { ...strategy, enabled: true }]);
    }
  };

  const toggleWritingStyle = (styleId: string) => {
    const style = writingStyleTemplates.find(s => s.id === styleId);
    if (!style) return;

    const isCurrentlySelected = selectedWritingStyles.some(s => s.id === styleId);
    
    if (isCurrentlySelected) {
      onWritingStylesChange(selectedWritingStyles.filter(s => s.id !== styleId));
    } else {
      onWritingStylesChange([...selectedWritingStyles, { ...style, enabled: true }]);
    }
  };

  const getFilteredStyles = () => {
    if (filterJourney === 'all') return writingStyleTemplates;
    return writingStyleTemplates.filter(s => s.journeyStep === filterJourney);
  };

  const journeyStepColors = {
    awareness: 'bg-blue-100 text-blue-700',
    consideration: 'bg-yellow-100 text-yellow-700',
    decision: 'bg-green-100 text-green-700',
    retention: 'bg-purple-100 text-purple-700',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="size-5" />
          Ad Copywriting Knowledge Base
        </CardTitle>
        <p className="text-sm text-gray-600">
          Select expert strategies and writing styles to guide your ad creation
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="strategies" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="strategies">
              Expert Strategies ({selectedStrategies.length})
            </TabsTrigger>
            <TabsTrigger value="styles">
              Writing Styles ({selectedWritingStyles.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="strategies" className="space-y-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                Select strategies from marketing experts to incorporate into your campaigns
              </p>
              <Badge variant="secondary">
                {selectedStrategies.length} Selected
              </Badge>
            </div>

            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {strategyKnowledgeBase.map((strategy) => {
                  const isSelected = selectedStrategies.some(s => s.id === strategy.id);
                  
                  return (
                    <Card 
                      key={strategy.id} 
                      className={`cursor-pointer transition-all ${
                        isSelected ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                      }`}
                      onClick={() => toggleStrategy(strategy.id)}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleStrategy(strategy.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h4 className="font-medium">{strategy.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <User className="size-3 text-gray-500" />
                                  <span className="text-sm text-gray-600">{strategy.author}</span>
                                </div>
                              </div>
                              {isSelected && (
                                <Badge variant="default" className="bg-blue-600">
                                  Active
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{strategy.description}</p>
                            <div className="p-2 bg-gray-50 rounded text-sm">
                              <span className="font-medium text-gray-700">Framework: </span>
                              <span className="text-gray-600">{strategy.framework}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>

            {selectedStrategies.length > 0 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Sparkles className="size-4 text-blue-600" />
                  Active Strategy Resources
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStrategies.map(strategy => (
                    <Badge key={strategy.id} variant="secondary" className="py-1">
                      {strategy.author}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  💡 Use these frameworks to structure your ad copy, headlines, and offers
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="styles" className="space-y-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <Badge
                  variant={filterJourney === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setFilterJourney('all')}
                >
                  All Stages
                </Badge>
                <Badge
                  variant={filterJourney === 'awareness' ? 'default' : 'outline'}
                  className={`cursor-pointer ${journeyStepColors.awareness}`}
                  onClick={() => setFilterJourney('awareness')}
                >
                  Awareness
                </Badge>
                <Badge
                  variant={filterJourney === 'consideration' ? 'default' : 'outline'}
                  className={`cursor-pointer ${journeyStepColors.consideration}`}
                  onClick={() => setFilterJourney('consideration')}
                >
                  Consideration
                </Badge>
                <Badge
                  variant={filterJourney === 'decision' ? 'default' : 'outline'}
                  className={`cursor-pointer ${journeyStepColors.decision}`}
                  onClick={() => setFilterJourney('decision')}
                >
                  Decision
                </Badge>
                <Badge
                  variant={filterJourney === 'retention' ? 'default' : 'outline'}
                  className={`cursor-pointer ${journeyStepColors.retention}`}
                  onClick={() => setFilterJourney('retention')}
                >
                  Retention
                </Badge>
              </div>
              <Badge variant="secondary">
                {selectedWritingStyles.length} Selected
              </Badge>
            </div>

            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {getFilteredStyles().map((style) => {
                  const isSelected = selectedWritingStyles.some(s => s.id === style.id);
                  
                  return (
                    <Card 
                      key={style.id} 
                      className={`cursor-pointer transition-all ${
                        isSelected ? 'border-green-500 bg-green-50' : 'hover:border-gray-300'
                      }`}
                      onClick={() => toggleWritingStyle(style.id)}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleWritingStyle(style.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h4 className="font-medium">{style.name}</h4>
                                <Badge 
                                  variant="secondary" 
                                  className={`mt-1 ${journeyStepColors[style.journeyStep]}`}
                                >
                                  {style.journeyStep.charAt(0).toUpperCase() + style.journeyStep.slice(1)}
                                </Badge>
                              </div>
                              {isSelected && (
                                <Badge variant="default" className="bg-green-600">
                                  Active
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{style.description}</p>
                            <div className="p-2 bg-gray-50 rounded text-sm">
                              <span className="font-medium text-gray-700">Best for: </span>
                              <span className="text-gray-600">{style.useCase}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>

            {selectedWritingStyles.length > 0 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <TrendingUp className="size-4 text-green-600" />
                  Active Writing Styles by Journey Stage
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {(['awareness', 'consideration', 'decision', 'retention'] as const).map(stage => {
                    const stylesForStage = selectedWritingStyles.filter(s => s.journeyStep === stage);
                    if (stylesForStage.length === 0) return null;
                    
                    return (
                      <div key={stage} className="space-y-1">
                        <Badge className={journeyStepColors[stage]}>
                          {stage.charAt(0).toUpperCase() + stage.slice(1)}
                        </Badge>
                        <div className="flex flex-wrap gap-1">
                          {stylesForStage.map(style => (
                            <span key={style.id} className="text-xs bg-white px-2 py-1 rounded border">
                              {style.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
