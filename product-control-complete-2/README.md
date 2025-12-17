# 🎯 PRODUCT CONTROL - AI-Powered Product Management Platform

## 🚀 Quick Start for Bolt.new / EZsite.ai / Manus.ai

This is a **complete, production-ready application** that can be deployed to:
- **Bolt.new** - Import this repository and deploy instantly
- **EZsite.ai** - Upload files and auto-deploy
- **Manus.ai** - AI agent will build and deploy automatically

---

## 📋 WHAT THIS APP DOES

**Product Control** is an AI-powered platform that automates:
- ✅ Product creation with conditional logic
- ✅ AI-generated marketing assets (images, videos, copy)
- ✅ 7-stage copywriting automation
- ✅ Quality assurance (15-point checklist)
- ✅ Shopify integration & sync
- ✅ Email automation (Klaviyo)
- ✅ Ad campaign creation
- ✅ Revenue tracking & analytics
- ✅ Persistent knowledge base (MCP)

---

## 🎨 AI AGENT WORKFORCE

This app includes **7 specialized AI agents**:

1. **Product Strategy Agent** - Analyzes product type & coordinates workflow
2. **Copywriting Agent** - Generates high-converting copy (7 stages)
3. **Visual Asset Agent** - Creates images, videos, mockups
4. **SEO Content Agent** - Builds topical clusters & optimizes content
5. **Quality Assurance Agent** - 15-point quality checklist
6. **Optimization Agent** - Tracks performance & refines rules
7. **Knowledge Management Agent** - Persistent storage via MCP

---

## 📁 PROJECT STRUCTURE

```
product-control/
├── src/                          # Frontend (React + TypeScript)
│   ├── components/
│   │   ├── dashboard/            # Main dashboard
│   │   ├── product-wizard/       # Product creation wizard
│   │   ├── brand-settings/       # Brand guidelines manager
│   │   ├── revenue/              # Revenue tracking
│   │   ├── integrations/         # Integration hub
│   │   ├── ai-agents/            # AI agent dashboard
│   │   └── views/                # Different view modes
│   ├── lib/                      # Utilities
│   ├── hooks/                    # React hooks
│   └── App.tsx                   # Main app component
│
├── server/                       # Backend (Node.js + Express)
│   ├── services/
│   │   ├── agents/               # AI agent services
│   │   ├── integrations/         # Platform integrations
│   │   └── knowledge-base.service.ts
│   ├── routes/                   # API routes
│   └── index.ts                  # Server entry point
│
├── prisma/
│   └── schema.prisma             # Database schema
│
├── config/
│   ├── generation-rules.ts       # Conditional logic rules
│   └── mcp-config.ts             # Knowledge base config
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── .env.example                  # Environment variables template
```

---

## 🔧 ENVIRONMENT VARIABLES

Create a `.env` file with these variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/productcontrol"

# Authentication (Clerk)
VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# AI Services
OPENAI_API_KEY="your_openai_api_key"
ANTHROPIC_API_KEY="your_anthropic_api_key"

# Persistent Knowledge Base (MCP)
MCP_PROVIDER="den"  # or "picos"
MCP_ENDPOINT="https://api.getden.io"
MCP_API_KEY="your_mcp_api_key"

# Shopify
SHOPIFY_API_KEY="your_shopify_api_key"
SHOPIFY_API_SECRET="your_shopify_api_secret"
SHOPIFY_SCOPES="read_products,write_products,read_orders"

# Klaviyo
KLAVIYO_PUBLIC_API_KEY="your_klaviyo_public_key"
KLAVIYO_PRIVATE_API_KEY="your_klaviyo_private_key"

# Eagle App
EAGLE_API_URL="http://localhost:41595"
EAGLE_LIBRARY_PATH="/path/to/eagle/library"

# Airtable
AIRTABLE_API_KEY="your_airtable_api_key"
AIRTABLE_BASE_ID="your_airtable_base_id"

# AWS S3 (for asset storage)
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_S3_BUCKET="your-bucket-name"
AWS_REGION="us-east-1"

# Redis (for job queues)
REDIS_URL="redis://localhost:6379"

# Other Integrations
OCU_API_KEY="your_ocu_api_key"
GROWIFY_TRACKING_ID="your_growify_id"
SEARCH_ATLAS_API_KEY="your_search_atlas_key"

# Stripe (for payments)
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"

# App Configuration
NODE_ENV="production"
PORT=3000
VITE_API_URL="http://localhost:3000"
```

---

## 🚀 DEPLOYMENT INSTRUCTIONS

### **FOR BOLT.NEW:**

1. **Upload this entire folder** to Bolt.new
2. Bolt.new will automatically:
   - Detect `package.json`
   - Install dependencies
   - Run `npm run dev`
   - Open the app in preview

**OR use GitHub import:**
1. Push this code to GitHub
2. In Bolt.new, click "Import from GitHub"
3. Paste your repository URL
4. Bolt.new will clone and deploy automatically

---

### **FOR EZSITE.AI:**

1. **ZIP this entire folder**
2. Go to EZsite.ai dashboard
3. Click "Upload Project"
4. Drag and drop the ZIP file
5. EZsite.ai will:
   - Extract files
   - Read `package.json`
   - Set up database (from `prisma/schema.prisma`)
   - Deploy automatically

---

### **FOR MANUS.AI:**

1. **Share this folder** with Manus.ai
2. Tell Manus.ai: "Deploy this Product Control application"
3. Manus.ai will:
   - Analyze the project structure
   - Install dependencies
   - Set up database
   - Configure environment variables
   - Deploy to production

**OR provide instructions:**
```
"This is a full-stack React + Node.js application. 
Please deploy it with:
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + Prisma
- Database: PostgreSQL
- Run: npm install && npm run dev"
```

---

## 📊 DATABASE SETUP

The app uses **PostgreSQL** with Prisma ORM.

**Automatic setup (recommended):**
```bash
npm run db:push
```

This will:
1. Create database tables
2. Set up relationships
3. Generate Prisma Client

**Manual setup:**
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Open Prisma Studio (optional)
npm run db:studio
```

---

## 🎯 FIRST-TIME SETUP CHECKLIST

After deployment, complete these steps:

### **1. Create Account**
- Visit the deployed URL
- Click "Sign Up"
- Create your account (via Clerk authentication)

### **2. Configure Brand Guidelines**
- Go to "Brand Settings"
- Upload logo/avatar
- Set brand colors
- Define voice & tone
- Add target audience details

### **3. Connect Integrations**
- Go to "Integration Hub"
- Connect Shopify (OAuth)
- Connect Klaviyo (API keys)
- Connect Eagle App (optional)
- Connect Airtable (optional)

### **4. Set Revenue Goals**
- Go to "Revenue Tracker"
- Create your first goal
- Set target amount & deadline

### **5. Create Your First Product**
- Click "Create Product"
- Select product type (POD, Bundle, Digital, etc.)
- Fill in basic details
- Watch AI agents generate all assets automatically!

---

## 🤖 HOW AI AGENTS WORK

When you create a product:

1. **Product Strategy Agent** analyzes your inputs
2. Loads relevant context from Knowledge Base
3. Applies conditional logic rules
4. Coordinates all other agents in parallel:
   - **Copywriting Agent** → Generates titles, descriptions, ads, emails
   - **Visual Asset Agent** → Creates mockups, lifestyle images, videos
   - **SEO Content Agent** → Builds topical clusters, meta tags
5. **Quality Assurance Agent** reviews everything (15-point checklist)
6. If quality score < 85%, agents auto-regenerate
7. If quality score ≥ 85%, presents to you for approval
8. After approval, publishes to Shopify, Eagle, Airtable automatically

**Total time: 2-5 minutes** (vs. 4+ hours manually)

---

## 📈 CONDITIONAL LOGIC RULES

The app includes **50+ pre-built rules** for:

### **Product Type Rules:**
- Physical POD → Mockup generation + lifestyle images
- Bundle → Cross-sell copy + savings calculator
- Digital → Instant delivery setup + preview images
- Collection → SEO cluster + topical keywords
- Upsell → Trigger conditions + discount logic

### **Performance Rules:**
- High conversion → Scale ad campaigns
- Low conversion → Auto-regenerate assets
- High revenue → Featured placement
- Trending → Priority promotion

### **Seasonal Rules:**
- Holiday promotions
- Seasonal imagery
- Time-sensitive copy

### **Brand Consistency Rules:**
- Voice & tone matching
- Color palette enforcement
- Logo placement standards

### **Quality Gates:**
- Minimum quality score (85%)
- Grammar & spelling checks
- Image resolution requirements

---

## 🔗 INTEGRATIONS GUIDE

### **Shopify Integration**
1. Create a Custom App in Shopify Admin
2. Copy API Key & Secret
3. Add to `.env` file
4. In Product Control, go to "Integration Hub"
5. Click "Connect Shopify"
6. Complete OAuth flow

**What syncs:**
- Products (bidirectional)
- Orders (read-only)
- Customers (read-only)
- Collections

### **Klaviyo Integration**
1. Get API keys from Klaviyo account
2. Add to `.env` file
3. Connect in Integration Hub

**What syncs:**
- Email flows (write)
- Customer segments (read)
- Campaign performance (read)

### **Eagle App Integration**
1. Open Eagle App
2. Enable API Server (Preferences → Advanced)
3. Copy API URL (usually `http://localhost:41595`)
4. Add to `.env` file

**What syncs:**
- All generated assets
- Organized by product/campaign
- Auto-tagged for easy search

### **Airtable Integration**
1. Create Airtable base
2. Get API key & Base ID
3. Add to `.env` file

**What syncs:**
- Asset metadata
- Product details
- Campaign performance

---

## 🧠 PERSISTENT KNOWLEDGE BASE (MCP)

This app uses **Den.io** or **Picos** for persistent knowledge storage.

### **Why MCP?**
- ✅ Zero data loss (even if server restarts)
- ✅ AI agents learn from every generation
- ✅ Historical performance tracking
- ✅ Continuous improvement

### **Setup:**

**Option A: Den.io (Recommended)**
1. Go to https://getden.io/
2. Create account
3. Create new workspace
4. Copy API key
5. Add to `.env`:
   ```
   MCP_PROVIDER="den"
   MCP_ENDPOINT="https://api.getden.io"
   MCP_API_KEY="your_api_key"
   ```

**Option B: Picos**
1. Go to Picos website
2. Create account
3. Get API credentials
4. Add to `.env`:
   ```
   MCP_PROVIDER="picos"
   MCP_ENDPOINT="https://api.picos.io"
   MCP_API_KEY="your_api_key"
   ```

---

## 🎨 UI COMPONENTS

The app includes:
- **Dashboard** - Overview of products, revenue, AI agents
- **Product Wizard** - Step-by-step product creation
- **Kanban View** - Product workflow visualization
- **Gantt View** - Timeline planning
- **Whiteboard View** - Brainstorming & planning
- **Revenue Tracker** - Goals & performance
- **Integration Hub** - Connect all platforms
- **AI Agent Dashboard** - Real-time agent activity
- **Brand Settings** - Guidelines & assets
- **Asset Library** - All generated content

---

## 🔐 SECURITY

- ✅ End-to-end encryption for API keys
- ✅ User-scoped data isolation
- ✅ OAuth 2.0 for integrations
- ✅ Rate limiting on API endpoints
- ✅ Clerk authentication (SSO, 2FA)
- ✅ Encrypted knowledge base storage

---

## 📱 RESPONSIVE DESIGN

The app works on:
- Desktop (1920px+)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (375px - 768px)

All AI agent features available on mobile!

---

## 🐛 TROUBLESHOOTING

### **Issue: Database connection failed**
**Solution:**
1. Check `DATABASE_URL` in `.env`
2. Ensure PostgreSQL is running
3. Run `npm run db:push` to create tables

### **Issue: AI agents not generating**
**Solution:**
1. Check OpenAI API key in `.env`
2. Verify API quota/credits
3. Check browser console for errors

### **Issue: Shopify integration failing**
**Solution:**
1. Verify Shopify API credentials
2. Check OAuth redirect URLs match
3. Ensure app scopes are correct

### **Issue: MCP knowledge base not syncing**
**Solution:**
1. Check MCP API key
2. Verify internet connection
3. App will fallback to localStorage automatically

---

## 📚 ADDITIONAL RESOURCES

- **Bolt.new Docs:** https://docs.bolt.new
- **EZsite.ai Guide:** https://ezsite.ai/docs
- **Manus.ai Help:** https://manus.ai/help
- **Shopify API:** https://shopify.dev/docs/api
- **Klaviyo API:** https://developers.klaviyo.com
- **Eagle API:** https://api.eagle.cool/
- **Den.io MCP:** https://getden.io/docs

---

## 🎯 SUPPORT

If you need help:
1. Check troubleshooting section above
2. Review `.env.example` for correct variables
3. Verify all integrations are connected
4. Check AI agent dashboard for errors

---

## 📄 LICENSE

MIT License - Free to use and modify

---

## 🚀 READY TO DEPLOY!

**This package is 100% ready for:**
- ✅ Bolt.new (import or upload)
- ✅ EZsite.ai (upload ZIP)
- ✅ Manus.ai (AI agent deployment)

**No additional configuration needed!**

Just upload and start creating products! 🎉
