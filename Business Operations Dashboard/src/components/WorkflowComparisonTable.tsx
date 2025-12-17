import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { BookOpen, GraduationCap, ShoppingCart, Palette, FileText, Share2 } from 'lucide-react';

interface StageDetail {
  name: string;
  sopAreas: string[];
  detailCapture: string[];
  conditionalContent?: string[];
  subcategories?: { name: string; items: string[] }[];
}

const productWorkflowData: Record<string, { 
  icon: any; 
  color: string; 
  stageCount: number;
  stages: StageDetail[] 
}> = {
  'Book': {
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-700',
    stageCount: 15,
    stages: [
      {
        name: 'Ideation & Concept',
        sopAreas: ['Brainstorming Templates', 'Idea Validation Checklist', 'Concept Development SOP'],
        detailCapture: ['Book Title Ideas', 'Core Concept', 'Unique Value Proposition', 'Target Word Count'],
        subcategories: [
          { name: 'Genre Selection', items: ['Fiction', 'Non-Fiction', 'Self-Help', 'Business', 'Other'] },
          { name: 'Format Type', items: ['eBook', 'Paperback', 'Hardcover', 'Audiobook'] }
        ]
      },
      {
        name: 'Market Research',
        sopAreas: ['Market Analysis Framework', 'Amazon BSR Tracking SOP', 'Reader Survey Templates'],
        detailCapture: ['Target Market Size', 'Demographics', 'Pain Points', 'Market Trends', 'Price Points'],
        subcategories: [
          { name: 'Research Sources', items: ['Amazon Best Sellers', 'Google Trends', 'Publisher\'s Marketplace', 'Goodreads'] }
        ]
      },
      {
        name: 'Competitive Analysis',
        sopAreas: ['Competitor Research Template', 'SWOT Analysis SOP', 'Positioning Framework'],
        detailCapture: ['Top Competitors (10+)', 'Pricing Strategy', 'Review Analysis', 'Gap Identification'],
        subcategories: [
          { name: 'Analysis Metrics', items: ['Review Count', 'Star Rating', 'Sales Rank', 'Marketing Tactics'] }
        ]
      },
      {
        name: 'Customer Avatar Creation',
        sopAreas: ['Avatar Development Template', 'Persona Research SOP', 'Reader Profile Framework'],
        detailCapture: ['Demographics', 'Psychographics', 'Reading Habits', 'Pain Points', 'Goals & Aspirations'],
        subcategories: [
          { name: 'Avatar Details', items: ['Age Range', 'Income Level', 'Education', 'Lifestyle', 'Media Consumption'] }
        ]
      },
      {
        name: 'Book Outline & Structure',
        sopAreas: ['Chapter Outlining Template', 'Story Structure SOP', 'Content Flow Framework'],
        detailCapture: ['Chapter Breakdown', 'Key Points per Chapter', 'Story Arc', 'Flow & Transitions'],
        conditionalContent: ['Fiction: Three-Act Structure', 'Non-Fiction: Problem-Solution Framework'],
        subcategories: [
          { name: 'Structural Elements', items: ['Front Matter', 'Main Content', 'Back Matter', 'Appendices'] }
        ]
      },
      {
        name: 'Writing & Content Creation',
        sopAreas: ['Writing Schedule SOP', 'AI Writing Prompts Library', 'Content Creation Workflow'],
        detailCapture: ['Word Count Goals', 'Writing Schedule', 'Drafts Completed', 'AI Tools Used'],
        subcategories: [
          { name: 'Writing Tools', items: ['Scrivener', 'Google Docs', 'ChatGPT', 'Claude', 'Grammarly'] }
        ]
      },
      {
        name: 'Editing & Revisions',
        sopAreas: ['Self-Editing Checklist', 'Editor Briefing Template', 'Revision Tracking SOP'],
        detailCapture: ['Revision Rounds', 'Editor Contacts', 'Feedback Incorporated', 'Final Word Count'],
        subcategories: [
          { name: 'Editing Types', items: ['Developmental Edit', 'Copy Edit', 'Proofreading', 'Beta Reader Feedback'] }
        ]
      },
      {
        name: 'Cover Design',
        sopAreas: ['Cover Brief Template', 'Designer Selection SOP', 'Cover Testing Framework'],
        detailCapture: ['Design Concepts', 'Designer Contact', 'A/B Test Results', 'Final Files'],
        subcategories: [
          { name: 'Cover Elements', items: ['Front Cover', 'Back Cover', 'Spine', '3D Mockups', 'Social Media Versions'] }
        ]
      },
      {
        name: 'Book Formatting',
        sopAreas: ['Formatting Guidelines', 'KDP Formatting SOP', 'InDesign Templates'],
        detailCapture: ['Interior Layout', 'Font Choices', 'Margins & Spacing', 'Special Elements'],
        subcategories: [
          { name: 'Format Types', items: ['Kindle Format', 'Print Format', 'Audiobook Script'] }
        ]
      },
      {
        name: 'SEO & Keywords',
        sopAreas: ['Keyword Research SOP', 'Amazon SEO Framework', 'Metadata Optimization Guide'],
        detailCapture: ['Primary Keywords', 'Secondary Keywords', 'Categories', 'Search Terms'],
        subcategories: [
          { name: 'SEO Elements', items: ['Title Keywords', 'Subtitle Keywords', '7 Backend Keywords', 'Category Selection'] }
        ]
      },
      {
        name: 'Publishing Setup',
        sopAreas: ['KDP Setup Guide', 'IngramSpark SOP', 'Distribution Checklist'],
        detailCapture: ['Platform Accounts', 'ISBN Numbers', 'Pricing Strategy', 'Territories'],
        conditionalContent: ['Self-Publishing: KDP, IngramSpark', 'Traditional: Agent Query', 'Hybrid: Assisted Publishing'],
        subcategories: [
          { name: 'Publishing Platforms', items: ['Amazon KDP', 'IngramSpark', 'Draft2Digital', 'PublishDrive', 'Kobo'] }
        ]
      },
      {
        name: 'Sales Page Creation',
        sopAreas: ['Book Description Template', 'Amazon A+ Content SOP', 'Landing Page Framework'],
        detailCapture: ['Book Description', 'Author Bio', 'A+ Content', 'Look Inside Setup'],
        subcategories: [
          { name: 'Sales Elements', items: ['Hook', 'Benefits', 'Social Proof', 'Call-to-Action', 'Author Platform'] }
        ]
      },
      {
        name: 'Marketing Materials',
        sopAreas: ['Book Trailer SOP', 'Press Kit Template', 'Marketing Asset Checklist'],
        detailCapture: ['Book Trailer', 'Press Release', 'Media Kit', 'One-Sheet', 'Sample Chapters'],
        subcategories: [
          { name: 'Marketing Assets', items: ['Book Trailer Video', 'Quote Graphics', 'Author Photos', 'Bookmarks', 'Email Swipe Files'] }
        ]
      },
      {
        name: 'Launch Campaign',
        sopAreas: ['Launch Strategy SOP', 'ARC Team Framework', 'Promotion Calendar'],
        detailCapture: ['Launch Date', 'ARC Team', 'Promo Schedule', 'Launch Pricing', 'Bonus Materials'],
        subcategories: [
          { name: 'Launch Tactics', items: ['Pre-Orders', 'Launch Day Push', 'Review Generation', 'BookBub Featured Deal', 'Blog Tour'] }
        ]
      },
      {
        name: 'Data Tracking & Analytics',
        sopAreas: ['KDP Analytics SOP', 'Sales Tracking Template', 'ROI Calculation Framework'],
        detailCapture: ['Daily Sales', 'Page Reads', 'Review Count', 'BSR Tracking', 'Revenue'],
        subcategories: [
          { name: 'Metrics', items: ['Units Sold', 'KENP Reads', 'Conversion Rate', 'ROI', 'Customer Acquisition Cost'] }
        ]
      }
    ]
  },
  'Course': {
    icon: GraduationCap,
    color: 'bg-green-100 text-green-700',
    stageCount: 14,
    stages: [
      {
        name: 'Ideation & Topic Selection',
        sopAreas: ['Course Idea Validation SOP', 'Topic Research Framework', 'Demand Analysis Template'],
        detailCapture: ['Course Topic', 'Target Outcome', 'Course Format', 'Duration'],
        subcategories: [
          { name: 'Course Type', items: ['Video Course', 'Text-based', 'Cohort-based', 'Self-paced', 'Hybrid'] }
        ]
      },
      {
        name: 'Market Research & Validation',
        sopAreas: ['Market Demand SOP', 'Competitor Course Analysis', 'Student Survey Templates'],
        detailCapture: ['Market Size', 'Price Points', 'Student Pain Points', 'Validation Results'],
        subcategories: [
          { name: 'Research Platforms', items: ['Udemy', 'Teachable', 'Skillshare', 'LinkedIn Learning', 'Coursera'] }
        ]
      },
      {
        name: 'Competitive Analysis',
        sopAreas: ['Competitor Analysis Template', 'Pricing Strategy SOP', 'Differentiation Framework'],
        detailCapture: ['Top 10 Competitors', 'Pricing Range', 'Course Structure', 'Unique Angle'],
        subcategories: [
          { name: 'Analysis Criteria', items: ['Student Count', 'Reviews', 'Curriculum', 'Instructor Authority', 'Production Quality'] }
        ]
      },
      {
        name: 'Customer Avatar Creation',
        sopAreas: ['Student Avatar Template', 'Persona Development SOP', 'Learning Style Analysis'],
        detailCapture: ['Student Demographics', 'Skill Level', 'Learning Goals', 'Obstacles', 'Motivations'],
        subcategories: [
          { name: 'Student Segments', items: ['Beginners', 'Intermediate', 'Advanced', 'Career Changers', 'Hobbyists'] }
        ]
      },
      {
        name: 'Curriculum Design & Outline',
        sopAreas: ['Course Outline Template', 'Learning Objectives SOP', 'Module Structure Framework'],
        detailCapture: ['Module Breakdown', 'Lesson Plans', 'Learning Outcomes', 'Assessments'],
        subcategories: [
          { name: 'Course Components', items: ['Video Lessons', 'Worksheets', 'Quizzes', 'Projects', 'Resources', 'Community Access'] }
        ]
      },
      {
        name: 'Content Creation & Scripts',
        sopAreas: ['Script Writing Template', 'Content Production SOP', 'AI Content Generation Guide'],
        detailCapture: ['Script Completion', 'Lesson Count', 'Total Duration', 'Supplemental Materials'],
        subcategories: [
          { name: 'Content Types', items: ['Video Scripts', 'Slide Decks', 'Workbooks', 'Checklists', 'Templates'] }
        ]
      },
      {
        name: 'Video Production & Editing',
        sopAreas: ['Video Recording SOP', 'Editing Workflow', 'Equipment Setup Guide'],
        detailCapture: ['Videos Recorded', 'Editing Status', 'Platform Specs', 'Captions'],
        subcategories: [
          { name: 'Production Elements', items: ['Screen Recording', 'Talking Head', 'Slides', 'B-Roll', 'Animations', 'Music'] }
        ]
      },
      {
        name: 'Course Platform Setup',
        sopAreas: ['Platform Selection Guide', 'Teachable Setup SOP', 'LMS Configuration Checklist'],
        detailCapture: ['Platform Choice', 'Account Setup', 'Course Upload', 'Payment Integration'],
        conditionalContent: ['Teachable Setup', 'Kajabi Setup', 'Thinkific Setup', 'Custom LMS'],
        subcategories: [
          { name: 'Platform Options', items: ['Teachable', 'Kajabi', 'Thinkific', 'Podia', 'Circle', 'Custom WordPress'] }
        ]
      },
      {
        name: 'Branding & Visual Design',
        sopAreas: ['Course Branding Guide', 'Visual Identity SOP', 'Template Creation Framework'],
        detailCapture: ['Logo Design', 'Color Scheme', 'Typography', 'Visual Templates'],
        subcategories: [
          { name: 'Brand Assets', items: ['Logo', 'Course Thumbnail', 'Slide Templates', 'Workbook Design', 'Certificate Design'] }
        ]
      },
      {
        name: 'Sales Page & VSL',
        sopAreas: ['Sales Page Template', 'VSL Script Framework', 'Conversion Optimization SOP'],
        detailCapture: ['Sales Copy', 'Video Sales Letter', 'Testimonials', 'Pricing Tiers'],
        subcategories: [
          { name: 'Sales Elements', items: ['Headline', 'VSL', 'Curriculum Preview', 'Testimonials', 'FAQ', 'Guarantees', 'Bonuses'] }
        ]
      },
      {
        name: 'Email Funnel Setup',
        sopAreas: ['Email Sequence Template', 'Funnel Architecture SOP', 'List Building Framework'],
        detailCapture: ['Lead Magnet', 'Welcome Sequence', 'Nurture Emails', 'Sales Emails'],
        subcategories: [
          { name: 'Funnel Components', items: ['Lead Magnet', 'Opt-in Page', 'Thank You Page', 'Email Sequence', 'Tripwire Offer'] }
        ]
      },
      {
        name: 'Ad Creation & Copywriting',
        sopAreas: ['Ad Creative Template', 'Copywriting Framework', 'A/B Testing SOP'],
        detailCapture: ['Ad Creatives', 'Ad Copy', 'Landing Pages', 'Test Variations'],
        subcategories: [
          { name: 'Ad Types', items: ['Facebook Ads', 'YouTube Ads', 'Google Ads', 'Instagram Ads', 'TikTok Ads'] }
        ]
      },
      {
        name: 'Launch Strategy',
        sopAreas: ['Launch Plan Template', 'Beta Launch SOP', 'Waitlist Building Framework'],
        detailCapture: ['Launch Date', 'Beta Students', 'Launch Pricing', 'Promotion Plan'],
        subcategories: [
          { name: 'Launch Types', items: ['Soft Launch', 'Beta Launch', 'Evergreen Launch', 'Live Launch', 'Webinar Launch'] }
        ]
      },
      {
        name: 'Data Tracking & Analytics',
        sopAreas: ['Analytics Dashboard Template', 'KPI Tracking SOP', 'Student Success Metrics'],
        detailCapture: ['Enrollment Numbers', 'Completion Rate', 'Revenue', 'ROI', 'Student Feedback'],
        subcategories: [
          { name: 'Metrics', items: ['Enrollment Rate', 'Completion Rate', 'Refund Rate', 'LTV', 'CAC', 'NPS Score'] }
        ]
      }
    ]
  },
  'Ecommerce': {
    icon: ShoppingCart,
    color: 'bg-purple-100 text-purple-700',
    stageCount: 13,
    stages: [
      {
        name: 'Product Ideation & Research',
        sopAreas: ['Product Research SOP', 'Trend Analysis Framework', 'Profitability Calculator'],
        detailCapture: ['Product Ideas', 'Profit Margins', 'Demand Validation', 'Sourcing Options'],
        subcategories: [
          { name: 'Product Categories', items: ['Physical Products', 'Digital Products', 'Subscription Box', 'Dropshipping'] }
        ]
      },
      {
        name: 'Market & Competitor Analysis',
        sopAreas: ['Market Research Template', 'Competitor Tracking SOP', 'Pricing Strategy Framework'],
        detailCapture: ['Market Size', 'Top Competitors', 'Pricing Analysis', 'Market Gaps'],
        subcategories: [
          { name: 'Research Tools', items: ['Jungle Scout', 'Helium 10', 'Google Trends', 'Facebook Audience Insights'] }
        ]
      },
      {
        name: 'Supplier Sourcing & Negotiations',
        sopAreas: ['Supplier Vetting Checklist', 'Negotiation Framework', 'Quality Control SOP'],
        detailCapture: ['Supplier Contacts', 'MOQ Requirements', 'Pricing Terms', 'Sample Orders'],
        subcategories: [
          { name: 'Sourcing Platforms', items: ['Alibaba', 'AliExpress', 'Global Sources', 'Domestic Suppliers', 'Private Label'] }
        ]
      },
      {
        name: 'Customer Avatar Creation',
        sopAreas: ['Customer Persona Template', 'Target Audience SOP', 'Buyer Psychology Framework'],
        detailCapture: ['Demographics', 'Buying Behavior', 'Pain Points', 'Desired Outcomes'],
        subcategories: [
          { name: 'Customer Segments', items: ['Age Groups', 'Income Levels', 'Interests', 'Shopping Habits', 'Values'] }
        ]
      },
      {
        name: 'Product Photography & Videography',
        sopAreas: ['Product Photo SOP', 'Lifestyle Shot Guide', 'Video Content Framework'],
        detailCapture: ['Main Images', 'Lifestyle Photos', 'Infographics', 'Product Videos'],
        subcategories: [
          { name: 'Visual Content', items: ['White Background', 'Lifestyle', 'Infographic', '360° View', 'Unboxing Video', 'Demo Video'] }
        ]
      },
      {
        name: 'Product Listing & SEO',
        sopAreas: ['Listing Optimization SOP', 'Keyword Research Framework', 'Amazon SEO Guide'],
        detailCapture: ['Product Title', 'Bullet Points', 'Description', 'Backend Keywords'],
        subcategories: [
          { name: 'SEO Elements', items: ['Title Optimization', 'Feature Bullets', 'A+ Content', 'Search Terms', 'Categories'] }
        ]
      },
      {
        name: 'Store Setup & Design',
        sopAreas: ['Store Design Guide', 'Platform Setup SOP', 'UX Optimization Framework'],
        detailCapture: ['Store URL', 'Theme Selection', 'Pages Created', 'Navigation Structure'],
        conditionalContent: ['Shopify Setup', 'EZsite Setup', 'Thrivecart Setup', 'GHL Setup', 'WooCommerce Setup'],
        subcategories: [
          { name: 'Platform Choice', items: ['Shopify', 'EZsite', 'Thrivecart', 'GHL', 'WooCommerce', 'Amazon FBA'] },
          { name: 'Store Pages', items: ['Homepage', 'Product Pages', 'About Us', 'Contact', 'FAQ', 'Shipping', 'Returns'] }
        ]
      },
      {
        name: 'Branding & Logo Design',
        sopAreas: ['Brand Identity Guide', 'Logo Design Brief', 'Brand Guidelines SOP'],
        detailCapture: ['Brand Name', 'Logo Files', 'Color Palette', 'Brand Voice'],
        subcategories: [
          { name: 'Brand Elements', items: ['Logo', 'Color Scheme', 'Typography', 'Brand Story', 'Packaging Design'] }
        ]
      },
      {
        name: 'Product Description Copywriting',
        sopAreas: ['Copywriting Template', 'Benefit-Focused Framework', 'SEO Copy Guide'],
        detailCapture: ['Product Descriptions', 'Feature Lists', 'Benefits', 'Social Proof'],
        subcategories: [
          { name: 'Copy Elements', items: ['Headlines', 'Features', 'Benefits', 'Social Proof', 'Urgency', 'Guarantees'] }
        ]
      },
      {
        name: 'Social Media Setup',
        sopAreas: ['Social Media Strategy', 'Content Calendar Template', 'Profile Optimization SOP'],
        detailCapture: ['Profiles Created', 'Content Plan', 'Brand Consistency', 'Bio Links'],
        subcategories: [
          { name: 'Platforms', items: ['Instagram', 'Facebook', 'Pinterest', 'TikTok', 'YouTube'] }
        ]
      },
      {
        name: 'Ad Creative & Copy',
        sopAreas: ['Ad Creative Template', 'Testing Framework', 'Creative Brief SOP'],
        detailCapture: ['Ad Images', 'Ad Videos', 'Ad Copy', 'Targeting Strategy'],
        subcategories: [
          { name: 'Ad Formats', items: ['Image Ads', 'Carousel Ads', 'Video Ads', 'Story Ads', 'Collection Ads'] }
        ]
      },
      {
        name: 'Launch Campaign',
        sopAreas: ['Launch Checklist', 'Promotion Strategy SOP', 'Influencer Outreach Template'],
        detailCapture: ['Launch Date', 'Promotions', 'Influencer Partnerships', 'PR Outreach'],
        subcategories: [
          { name: 'Launch Tactics', items: ['Launch Discount', 'Influencer Seeding', 'PR Campaign', 'Giveaways', 'Email Blast'] }
        ]
      },
      {
        name: 'Data Tracking & Analytics',
        sopAreas: ['Analytics Setup SOP', 'KPI Dashboard Template', 'Conversion Tracking Guide'],
        detailCapture: ['Sales Data', 'Traffic Sources', 'Conversion Rate', 'AOV', 'ROI'],
        subcategories: [
          { name: 'Metrics', items: ['Revenue', 'Units Sold', 'Conversion Rate', 'AOV', 'CAC', 'LTV', 'ROAS'] }
        ]
      }
    ]
  },
  'Print-on-Demand': {
    icon: Palette,
    color: 'bg-orange-100 text-orange-700',
    stageCount: 12,
    stages: [
      {
        name: 'Design Ideation & Concept',
        sopAreas: ['Design Brainstorming Template', 'Trend Research SOP', 'Niche Selection Framework'],
        detailCapture: ['Design Concepts', 'Target Niche', 'Design Style', 'Product Types'],
        subcategories: [
          { name: 'Design Niches', items: ['Funny Quotes', 'Pet Lovers', 'Fitness', 'Hobbies', 'Occupations', 'Holidays'] }
        ]
      },
      {
        name: 'Market Research & Trends',
        sopAreas: ['Trend Analysis SOP', 'Bestseller Research Framework', 'Seasonal Planning Template'],
        detailCapture: ['Trending Topics', 'Best-Selling Designs', 'Seasonal Opportunities', 'Competition Level'],
        subcategories: [
          { name: 'Research Sources', items: ['Pinterest Trends', 'Etsy Bestsellers', 'Amazon Merch', 'Google Trends', 'Social Media'] }
        ]
      },
      {
        name: 'Competitor Analysis',
        sopAreas: ['Competitor Tracking Template', 'Design Analysis SOP', 'Pricing Research Framework'],
        detailCapture: ['Top Sellers', 'Design Styles', 'Pricing Strategy', 'Keywords Used'],
        subcategories: [
          { name: 'Analysis Focus', items: ['Design Quality', 'Pricing', 'Reviews', 'Keywords', 'Product Variations'] }
        ]
      },
      {
        name: 'Customer Avatar Creation',
        sopAreas: ['Avatar Development Template', 'Buyer Persona SOP', 'Psychographic Analysis'],
        detailCapture: ['Target Demographics', 'Interests', 'Shopping Behavior', 'Values'],
        subcategories: [
          { name: 'Customer Types', items: ['Gift Buyers', 'Self-Purchase', 'Collectors', 'Enthusiasts'] }
        ]
      },
      {
        name: 'Art Creation & Design',
        sopAreas: ['Design Software Guide', 'File Specs Template', 'Design Best Practices SOP'],
        detailCapture: ['Design Files', 'Color Variations', 'File Formats', 'Resolution Quality'],
        subcategories: [
          { name: 'Design Tools', items: ['Adobe Illustrator', 'Photoshop', 'Canva', 'Affinity Designer', 'Procreate'] },
          { name: 'Design Types', items: ['Typography', 'Illustrations', 'Patterns', 'Photo-based', 'Abstract'] }
        ]
      },
      {
        name: 'AI Image Generation',
        sopAreas: ['AI Prompt Library', 'Midjourney SOP', 'AI Tool Comparison Guide'],
        detailCapture: ['AI Tools Used', 'Prompts', 'Generated Images', 'Editing Required'],
        subcategories: [
          { name: 'AI Tools', items: ['Midjourney', 'DALL-E', 'Stable Diffusion', 'Leonardo.ai', 'Firefly'] }
        ]
      },
      {
        name: 'Mockup Creation',
        sopAreas: ['Mockup Template Library', 'Product Photography SOP', 'Mockup Generator Guide'],
        detailCapture: ['Mockup Images', 'Product Angles', 'Lifestyle Shots', 'Color Variants'],
        subcategories: [
          { name: 'Mockup Tools', items: ['Placeit', 'Smartmockups', 'Printful Generator', 'Custom Photography'] },
          { name: 'Product Types', items: ['T-Shirts', 'Mugs', 'Posters', 'Phone Cases', 'Tote Bags', 'Stickers'] }
        ]
      },
      {
        name: 'Platform Setup (Etsy/Redbubble/etc)',
        sopAreas: ['Platform Comparison Guide', 'Account Setup SOP', 'Product Upload Checklist'],
        detailCapture: ['Platform Accounts', 'Shop Names', 'Payment Setup', 'Shipping Settings'],
        conditionalContent: ['Etsy Setup', 'Redbubble Setup', 'Merch by Amazon', 'Printful Integration'],
        subcategories: [
          { name: 'Platforms', items: ['Etsy', 'Redbubble', 'TeePublic', 'Society6', 'Merch by Amazon', 'Printify', 'Printful'] }
        ]
      },
      {
        name: 'Product Listing & SEO',
        sopAreas: ['SEO Keyword Template', 'Listing Optimization SOP', 'Tag Strategy Framework'],
        detailCapture: ['Product Titles', 'Descriptions', 'Tags', 'Categories'],
        subcategories: [
          { name: 'SEO Elements', items: ['Title Keywords', 'Description Copy', '13 Tags (Etsy)', 'Product Categories', 'Attributes'] }
        ]
      },
      {
        name: 'Social Media Content',
        sopAreas: ['Content Strategy Template', 'Posting Schedule SOP', 'Engagement Framework'],
        detailCapture: ['Social Posts', 'Content Calendar', 'Hashtags', 'Engagement Rate'],
        subcategories: [
          { name: 'Content Types', items: ['Product Showcases', 'Behind-the-Scenes', 'Customer Photos', 'Promotional Posts', 'Stories'] }
        ]
      },
      {
        name: 'Marketing & Promotion',
        sopAreas: ['Promotion Strategy SOP', 'Pinterest Marketing Guide', 'Influencer Outreach Template'],
        detailCapture: ['Marketing Channels', 'Ad Campaigns', 'Collaborations', 'Promotions'],
        subcategories: [
          { name: 'Marketing Channels', items: ['Pinterest', 'Instagram', 'Facebook Groups', 'Email List', 'Paid Ads', 'Influencers'] }
        ]
      },
      {
        name: 'Data Tracking & Analytics',
        sopAreas: ['Analytics Dashboard Template', 'Sales Tracking SOP', 'Performance Review Framework'],
        detailCapture: ['Sales Data', 'Views', 'Favorites', 'Conversion Rate', 'Best Sellers'],
        subcategories: [
          { name: 'Metrics', items: ['Views', 'Favorites', 'Sales', 'Conversion Rate', 'Average Order Value', 'Top Products'] }
        ]
      }
    ]
  },
  'Article': {
    icon: FileText,
    color: 'bg-pink-100 text-pink-700',
    stageCount: 12,
    stages: [
      {
        name: 'Topic Ideation & Selection',
        sopAreas: ['Topic Brainstorming Template', 'Content Gap Analysis SOP', 'Trending Topics Framework'],
        detailCapture: ['Article Ideas', 'Target Keyword', 'Angle/Unique Perspective', 'Content Type'],
        subcategories: [
          { name: 'Article Types', items: ['How-To', 'Listicle', 'Opinion', 'News', 'Case Study', 'Interview', 'Research-Based'] }
        ]
      },
      {
        name: 'Keyword Research & SEO',
        sopAreas: ['Keyword Research Template', 'SEO Strategy SOP', 'Search Intent Analysis'],
        detailCapture: ['Primary Keyword', 'Secondary Keywords', 'Search Volume', 'Difficulty Score'],
        subcategories: [
          { name: 'SEO Tools', items: ['Ahrefs', 'SEMrush', 'Ubersuggest', 'Google Keyword Planner', 'AnswerThePublic'] }
        ]
      },
      {
        name: 'Competitive Analysis',
        sopAreas: ['Content Gap Template', 'SERP Analysis SOP', 'Competitor Content Review'],
        detailCapture: ['Top 10 Ranking Articles', 'Content Length', 'Unique Angles', 'Improvement Opportunities'],
        subcategories: [
          { name: 'Analysis Elements', items: ['Word Count', 'Content Structure', 'Media Used', 'Internal Links', 'Backlinks'] }
        ]
      },
      {
        name: 'Research & Fact-Checking',
        sopAreas: ['Research Protocol SOP', 'Source Verification Template', 'Citation Framework'],
        detailCapture: ['Research Sources', 'Statistics', 'Expert Quotes', 'Citations'],
        subcategories: [
          { name: 'Research Sources', items: ['Academic Papers', 'Industry Reports', 'Expert Interviews', 'Government Data', 'Case Studies'] }
        ]
      },
      {
        name: 'Article Outline',
        sopAreas: ['Outline Template', 'Content Structure SOP', 'Reader Flow Framework'],
        detailCapture: ['Headline', 'Introduction', 'Main Points', 'Subheadings', 'Conclusion'],
        subcategories: [
          { name: 'Structure Elements', items: ['Hook', 'Problem Statement', 'Main Content', 'Examples', 'Conclusion', 'CTA'] }
        ]
      },
      {
        name: 'Writing & Content Creation',
        sopAreas: ['Writing Process SOP', 'AI Writing Guide', 'Content Quality Checklist'],
        detailCapture: ['Word Count', 'Draft Status', 'AI Tools Used', 'Writing Time'],
        subcategories: [
          { name: 'Writing Tools', items: ['Google Docs', 'Notion', 'ChatGPT', 'Claude', 'Jasper', 'Grammarly'] }
        ]
      },
      {
        name: 'Editing & Proofreading',
        sopAreas: ['Editing Checklist', 'Readability Guide', 'Style Guide SOP'],
        detailCapture: ['Revisions Made', 'Readability Score', 'Grammar Check', 'Fact Verification'],
        subcategories: [
          { name: 'Editing Tools', items: ['Grammarly', 'Hemingway App', 'ProWritingAid', 'Manual Review'] }
        ]
      },
      {
        name: 'Image Creation & Optimization',
        sopAreas: ['Image Guidelines SOP', 'Alt Text Template', 'Image SEO Framework'],
        detailCapture: ['Featured Image', 'In-Content Images', 'Alt Text', 'File Optimization'],
        subcategories: [
          { name: 'Image Sources', items: ['Custom Graphics', 'Stock Photos', 'Screenshots', 'Infographics', 'Charts'] },
          { name: 'Image Tools', items: ['Canva', 'Adobe Express', 'Unsplash', 'Pexels', 'TinyPNG'] }
        ]
      },
      {
        name: 'SEO Optimization',
        sopAreas: ['On-Page SEO Checklist', 'Meta Data Template', 'Internal Linking SOP'],
        detailCapture: ['Meta Title', 'Meta Description', 'URL Slug', 'Internal Links', 'External Links'],
        subcategories: [
          { name: 'SEO Elements', items: ['Title Tag', 'Meta Description', 'H1/H2/H3', 'Alt Text', 'Schema Markup', 'Internal Links'] }
        ]
      },
      {
        name: 'Publishing & Formatting',
        sopAreas: ['Publishing Checklist', 'WordPress Guide', 'Formatting Standards SOP'],
        detailCapture: ['Platform', 'Publication Date', 'Categories', 'Tags', 'Author Bio'],
        conditionalContent: ['WordPress Publishing', 'Medium Publishing', 'LinkedIn Article', 'Custom CMS'],
        subcategories: [
          { name: 'Publishing Platforms', items: ['WordPress', 'Medium', 'LinkedIn', 'Substack', 'Ghost', 'Webflow'] }
        ]
      },
      {
        name: 'Social Media Promotion',
        sopAreas: ['Social Promotion Template', 'Content Distribution SOP', 'Engagement Framework'],
        detailCapture: ['Social Posts', 'Platforms', 'Hashtags', 'Promotion Schedule'],
        subcategories: [
          { name: 'Promotion Channels', items: ['Twitter/X', 'LinkedIn', 'Facebook', 'Pinterest', 'Reddit', 'Email Newsletter'] }
        ]
      },
      {
        name: 'Data Tracking & Analytics',
        sopAreas: ['Analytics Setup SOP', 'Performance Metrics Template', 'Content ROI Framework'],
        detailCapture: ['Page Views', 'Time on Page', 'Bounce Rate', 'Conversions', 'Backlinks'],
        subcategories: [
          { name: 'Metrics', items: ['Traffic', 'Engagement', 'Rankings', 'Conversions', 'Social Shares', 'Backlinks'] }
        ]
      }
    ]
  },
  'Social Media': {
    icon: Share2,
    color: 'bg-cyan-100 text-cyan-700',
    stageCount: 14,
    stages: [
      {
        name: 'Content Ideation & Planning',
        sopAreas: ['Content Ideation Template', 'Trend Analysis SOP', 'Content Pillar Framework'],
        detailCapture: ['Content Ideas', 'Post Types', 'Content Pillars', 'Campaign Themes'],
        subcategories: [
          { name: 'Content Types', items: ['Educational', 'Entertaining', 'Inspirational', 'Promotional', 'Behind-the-Scenes'] }
        ]
      },
      {
        name: 'Audience Research',
        sopAreas: ['Audience Analysis Template', 'Demographics Research SOP', 'Engagement Analysis'],
        detailCapture: ['Target Demographics', 'Interests', 'Pain Points', 'Preferred Platforms'],
        subcategories: [
          { name: 'Research Tools', items: ['Facebook Insights', 'Instagram Insights', 'TikTok Analytics', 'YouTube Analytics'] }
        ]
      },
      {
        name: 'Competitor Analysis',
        sopAreas: ['Competitor Tracking Template', 'Content Analysis SOP', 'Engagement Benchmarking'],
        detailCapture: ['Top Competitors', 'Content Strategy', 'Posting Frequency', 'Engagement Rates'],
        subcategories: [
          { name: 'Analysis Focus', items: ['Content Themes', 'Posting Times', 'Hashtags', 'Engagement', 'Growth Rate'] }
        ]
      },
      {
        name: 'Customer Avatar Creation',
        sopAreas: ['Social Avatar Template', 'Persona Development SOP', 'Behavioral Analysis'],
        detailCapture: ['Avatar Details', 'Social Behavior', 'Content Preferences', 'Engagement Patterns'],
        subcategories: [
          { name: 'Avatar Elements', items: ['Age', 'Location', 'Interests', 'Online Behavior', 'Content Consumption', 'Buying Triggers'] }
        ]
      },
      {
        name: 'Content Calendar Creation',
        sopAreas: ['Calendar Template', 'Scheduling Strategy SOP', 'Content Mix Framework'],
        detailCapture: ['Monthly Calendar', 'Posting Schedule', 'Content Mix', 'Special Dates'],
        subcategories: [
          { name: 'Calendar Tools', items: ['Google Sheets', 'Notion', 'Asana', 'Trello', 'Later', 'Hootsuite'] }
        ]
      },
      {
        name: 'Graphic Design & Images',
        sopAreas: ['Design Template Library', 'Brand Guidelines SOP', 'Visual Content Framework'],
        detailCapture: ['Graphics Created', 'Templates', 'Brand Assets', 'Design Variations'],
        subcategories: [
          { name: 'Design Tools', items: ['Canva', 'Adobe Express', 'Figma', 'Photoshop'] },
          { name: 'Design Types', items: ['Feed Posts', 'Stories', 'Reels Covers', 'Carousels', 'Quotes'] }
        ]
      },
      {
        name: 'AI Image Generation',
        sopAreas: ['AI Prompt Library', 'Image Generation SOP', 'AI Tool Guide'],
        detailCapture: ['AI Tools Used', 'Images Generated', 'Prompts', 'Style Consistency'],
        subcategories: [
          { name: 'AI Tools', items: ['Midjourney', 'DALL-E', 'Stable Diffusion', 'Leonardo.ai', 'Canva AI'] }
        ]
      },
      {
        name: 'Video Production & Editing',
        sopAreas: ['Video Content SOP', 'Editing Workflow', 'Platform Specs Guide'],
        detailCapture: ['Videos Created', 'Video Type', 'Duration', 'Platform Format'],
        subcategories: [
          { name: 'Video Tools', items: ['CapCut', 'Adobe Premiere', 'Final Cut Pro', 'InShot', 'DaVinci Resolve'] },
          { name: 'Video Types', items: ['Reels', 'TikToks', 'YouTube Shorts', 'Long-form YouTube', 'Stories', 'Lives'] }
        ]
      },
      {
        name: 'AI Video Generation',
        sopAreas: ['AI Video Template', 'Prompt Engineering SOP', 'Video AI Tool Comparison'],
        detailCapture: ['AI Videos Created', 'Tools Used', 'Scripts', 'Voiceovers'],
        subcategories: [
          { name: 'AI Video Tools', items: ['Runway ML', 'Pictory', 'Synthesia', 'Descript', 'InVideo', 'Lumen5'] }
        ]
      },
      {
        name: 'Copywriting & Captions',
        sopAreas: ['Caption Template Library', 'Copywriting Framework', 'CTA Strategy SOP'],
        detailCapture: ['Captions Written', 'CTAs', 'Voice & Tone', 'Character Count'],
        subcategories: [
          { name: 'Caption Elements', items: ['Hook', 'Value/Story', 'Call-to-Action', 'Hashtags', 'Emoji Usage'] }
        ]
      },
      {
        name: 'Hashtag Research',
        sopAreas: ['Hashtag Strategy Template', 'Research Process SOP', 'Performance Tracking'],
        detailCapture: ['Hashtag Sets', 'Niche Tags', 'Trending Tags', 'Branded Tags'],
        subcategories: [
          { name: 'Hashtag Types', items: ['Branded', 'Niche', 'Trending', 'Community', 'Location-based'] },
          { name: 'Research Tools', items: ['Instagram Search', 'Hashtag Generator', 'RiteTag', 'All Hashtag'] }
        ]
      },
      {
        name: 'Scheduling & Publishing',
        sopAreas: ['Scheduling SOP', 'Best Time Guide', 'Platform-Specific Templates'],
        detailCapture: ['Posts Scheduled', 'Publishing Times', 'Platforms', 'Auto-Posting Setup'],
        subcategories: [
          { name: 'Scheduling Tools', items: ['Meta Business Suite', 'Later', 'Buffer', 'Hootsuite', 'Sprout Social'] },
          { name: 'Platforms', items: ['Instagram', 'Facebook', 'TikTok', 'YouTube', 'LinkedIn', 'Twitter/X', 'Pinterest'] }
        ]
      },
      {
        name: 'Engagement & Community Management',
        sopAreas: ['Engagement Strategy SOP', 'Response Templates', 'Community Guidelines'],
        detailCapture: ['Comments Responded', 'DMs Managed', 'Engagement Rate', 'Community Activity'],
        subcategories: [
          { name: 'Engagement Activities', items: ['Reply to Comments', 'DM Responses', 'Story Replies', 'Engage with Others', 'UGC Sharing'] }
        ]
      },
      {
        name: 'Data Tracking & Analytics',
        sopAreas: ['Analytics Dashboard Template', 'Performance Review SOP', 'Growth Tracking Framework'],
        detailCapture: ['Reach', 'Engagement Rate', 'Follower Growth', 'Top Posts', 'Best Times'],
        subcategories: [
          { name: 'Metrics', items: ['Reach', 'Impressions', 'Engagement Rate', 'Follower Growth', 'Click-through Rate', 'Conversions'] }
        ]
      }
    ]
  }
};

export function WorkflowComparisonTable() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['Book', 'Course']);
  const [viewMode, setViewMode] = useState<'comparison' | 'individual'>('comparison');

  const toggleProduct = (product: string) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter(p => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Workflow Comparison Matrix</CardTitle>
        <p className="text-sm text-gray-600">
          Compare workflow stages, SOP requirements, and detail capture areas across different product types
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="mb-6">
          <TabsList>
            <TabsTrigger value="comparison">Comparison View</TabsTrigger>
            <TabsTrigger value="individual">Individual Deep Dive</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison">
            <div className="space-y-4">
              {/* Product Selection */}
              <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
                {Object.keys(productWorkflowData).map((product) => {
                  const data = productWorkflowData[product];
                  const Icon = data.icon;
                  const isSelected = selectedProducts.includes(product);
                  
                  return (
                    <div
                      key={product}
                      onClick={() => toggleProduct(product)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
                        isSelected 
                          ? `${data.color} border-2 border-current` 
                          : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Checkbox checked={isSelected} />
                      <Icon className="size-4" />
                      <span className="text-sm">{product}</span>
                      <Badge variant="outline" className="ml-1">
                        {data.stageCount} stages
                      </Badge>
                    </div>
                  );
                })}
              </div>

              {/* Comparison Table */}
              {selectedProducts.length > 0 && (
                <ScrollArea className="h-[600px] w-full rounded-md border">
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10">
                      <TableRow>
                        <TableHead className="w-[200px]">Stage Name</TableHead>
                        {selectedProducts.map((product) => (
                          <TableHead key={product}>
                            <div className="flex items-center gap-2">
                              {productWorkflowData[product].icon && 
                                (() => {
                                  const Icon = productWorkflowData[product].icon;
                                  return <Icon className="size-4" />;
                                })()
                              }
                              {product}
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Get max stages */}
                      {Array.from({ 
                        length: Math.max(...selectedProducts.map(p => productWorkflowData[p].stages.length)) 
                      }).map((_, idx) => (
                        <TableRow key={idx}>
                          <TableCell>Stage {idx + 1}</TableCell>
                          {selectedProducts.map((product) => {
                            const stage = productWorkflowData[product].stages[idx];
                            
                            return (
                              <TableCell key={product} className="align-top">
                                {stage ? (
                                  <div className="space-y-2">
                                    <div className="font-medium text-sm">{stage.name}</div>
                                    
                                    <div className="text-xs space-y-1">
                                      <div className="font-medium text-gray-700">SOP Areas:</div>
                                      <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                                        {stage.sopAreas.map((sop, i) => (
                                          <li key={i}>{sop}</li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="text-xs space-y-1">
                                      <div className="font-medium text-gray-700">Capture Fields:</div>
                                      <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                                        {stage.detailCapture.map((detail, i) => (
                                          <li key={i}>{detail}</li>
                                        ))}
                                      </ul>
                                    </div>

                                    {stage.subcategories && stage.subcategories.length > 0 && (
                                      <div className="text-xs space-y-1">
                                        <div className="font-medium text-gray-700">Subcategories:</div>
                                        {stage.subcategories.map((sub, i) => (
                                          <div key={i} className="ml-2">
                                            <div className="font-medium text-gray-600">{sub.name}:</div>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                              {sub.items.map((item, j) => (
                                                <Badge key={j} variant="secondary" className="text-xs">
                                                  {item}
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {stage.conditionalContent && stage.conditionalContent.length > 0 && (
                                      <div className="text-xs">
                                        <div className="font-medium text-orange-700">Conditional:</div>
                                        <ul className="list-disc list-inside text-orange-600 space-y-0.5">
                                          {stage.conditionalContent.map((content, i) => (
                                            <li key={i}>{content}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-gray-400 text-sm">-</span>
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}

              {selectedProducts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Select product types above to compare their workflows
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="individual">
            <Tabs defaultValue="Book" className="w-full">
              <TabsList className="flex-wrap h-auto">
                {Object.keys(productWorkflowData).map((product) => {
                  const Icon = productWorkflowData[product].icon;
                  return (
                    <TabsTrigger key={product} value={product} className="gap-2">
                      <Icon className="size-4" />
                      {product}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {Object.keys(productWorkflowData).map((product) => {
                const data = productWorkflowData[product];
                
                return (
                  <TabsContent key={product} value={product}>
                    <ScrollArea className="h-[600px] w-full">
                      <div className="space-y-6 pr-4">
                        <div className={`${data.color} p-4 rounded-lg`}>
                          <div className="flex items-center gap-3">
                            {(() => {
                              const Icon = data.icon;
                              return <Icon className="size-6" />;
                            })()}
                            <div>
                              <h3>{product}</h3>
                              <p className="text-sm">{data.stageCount} Workflow Stages</p>
                            </div>
                          </div>
                        </div>

                        {data.stages.map((stage, idx) => (
                          <Card key={idx}>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Badge variant="outline">Stage {idx + 1}</Badge>
                                {stage.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <h4 className="mb-2 flex items-center gap-2">
                                  <span className="size-2 bg-blue-500 rounded-full"></span>
                                  Knowledge Base & SOP Areas
                                </h4>
                                <div className="bg-blue-50 p-3 rounded-lg">
                                  <ul className="space-y-1">
                                    {stage.sopAreas.map((sop, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <Checkbox className="mt-0.5" />
                                        <span className="text-sm">{sop}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div>
                                <h4 className="mb-2 flex items-center gap-2">
                                  <span className="size-2 bg-green-500 rounded-full"></span>
                                  Detail Capture Fields
                                </h4>
                                <div className="bg-green-50 p-3 rounded-lg">
                                  <ul className="space-y-1">
                                    {stage.detailCapture.map((detail, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <Checkbox className="mt-0.5" />
                                        <span className="text-sm">{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {stage.subcategories && stage.subcategories.length > 0 && (
                                <div>
                                  <h4 className="mb-2 flex items-center gap-2">
                                    <span className="size-2 bg-purple-500 rounded-full"></span>
                                    Subcategories & Options
                                  </h4>
                                  <div className="space-y-3">
                                    {stage.subcategories.map((sub, i) => (
                                      <div key={i} className="bg-purple-50 p-3 rounded-lg">
                                        <div className="font-medium text-sm mb-2">{sub.name}</div>
                                        <div className="flex flex-wrap gap-2">
                                          {sub.items.map((item, j) => (
                                            <div key={j} className="flex items-center gap-2 bg-white px-2 py-1 rounded">
                                              <Checkbox />
                                              <span className="text-sm">{item}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {stage.conditionalContent && stage.conditionalContent.length > 0 && (
                                <div>
                                  <h4 className="mb-2 flex items-center gap-2">
                                    <span className="size-2 bg-orange-500 rounded-full"></span>
                                    Conditional Content
                                  </h4>
                                  <div className="bg-orange-50 p-3 rounded-lg">
                                    <ul className="space-y-1">
                                      {stage.conditionalContent.map((content, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <Badge variant="outline" className="text-xs">
                                            If
                                          </Badge>
                                          <span className="text-sm">{content}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                );
              })}
            </Tabs>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
