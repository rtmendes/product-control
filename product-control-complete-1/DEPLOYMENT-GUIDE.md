# 🚀 DEPLOYMENT GUIDE FOR BOLT.NEW / EZSITE.AI / MANUS.AI

## 📋 TABLE OF CONTENTS
1. [Bolt.new Deployment](#boltnew-deployment)
2. [EZsite.ai Deployment](#ezsiteai-deployment)
3. [Manus.ai Deployment](#manusai-deployment)
4. [Environment Setup](#environment-setup)
5. [Quick Test](#quick-test)
6. [Troubleshooting](#troubleshooting)

---

## 🔥 BOLT.NEW DEPLOYMENT

### **Method 1: Direct Upload (Fastest)**

**Step-by-Step Instructions:**

| Step | Action | What to Click | Expected Result | Time |
|------|--------|--------------|-----------------|------|
| 1 | Open Bolt.new | Go to https://bolt.new | Bolt.new homepage opens | 5 sec |
| 2 | Start New Project | Click "New Project" button | Empty project screen | 5 sec |
| 3 | Upload Files | Click "Upload Folder" or drag-drop this entire folder | Files uploading | 30 sec |
| 4 | Wait for Analysis | Bolt.new will scan package.json | "Ready to Install" message | 10 sec |
| 5 | Install Dependencies | Click "Install Dependencies" | npm install runs automatically | 60-90 sec |
| 6 | Configure Environment | Click "Environment Variables" | .env editor opens | 5 sec |
| 7 | Add API Keys | Copy values from .env.example | Variables saved | 2 min |
| 8 | Start Development Server | Click "Run Dev" | App starts at localhost:5173 | 20 sec |
| 9 | Open Preview | Click "Open Preview" button | App loads in browser | 10 sec |

**TOTAL TIME: ~5 minutes**

---

### **Method 2: GitHub Import (Recommended for Teams)**

**Step-by-Step Instructions:**

| Step | Action | What to Click | Expected Result | Time |
|------|--------|--------------|-----------------|------|
| 1 | Push to GitHub | Create repo, push this code | GitHub repository created | 2 min |
| 2 | Open Bolt.new | Go to https://bolt.new | Bolt.new homepage | 5 sec |
| 3 | Import from GitHub | Click "Import" → "From GitHub" | GitHub auth popup | 10 sec |
| 4 | Authorize Bolt.new | Click "Authorize" in popup | Access granted | 5 sec |
| 5 | Select Repository | Choose your repo from list | Repository selected | 5 sec |
| 6 | Import Project | Click "Import Project" | Cloning repository | 30 sec |
| 7 | Auto-Setup | Bolt.new reads package.json | Dependencies installing | 90 sec |
| 8 | Configure Environment | Add environment variables | Variables saved | 2 min |
| 9 | Deploy | Click "Deploy to Production" | Live URL generated | 60 sec |

**TOTAL TIME: ~6 minutes**

**GitHub Repository Structure:**
```
your-github-username/product-control/
├── All files from this folder
└── .gitignore (auto-created)
```

---

### **What Bolt.new Does Automatically:**

✅ Detects `package.json`  
✅ Installs all dependencies  
✅ Reads `vite.config.ts` for build settings  
✅ Sets up database from `prisma/schema.prisma`  
✅ Configures TypeScript from `tsconfig.json`  
✅ Sets up hot-reload development server  
✅ Provides live preview with URL  
✅ Enables one-click production deployment  

---

## 🌐 EZSITE.AI DEPLOYMENT

### **Step-by-Step Instructions:**

| Step | Action | What to Click | Expected Input | Expected Output | Time |
|------|--------|--------------|----------------|-----------------|------|
| 1 | Create ZIP File | Right-click this folder → "Compress" | Entire folder | product-control.zip | 30 sec |
| 2 | Open EZsite.ai | Go to https://ezsite.ai | N/A | Dashboard loads | 5 sec |
| 3 | Create New Project | Click "+ New Project" | N/A | Project creation modal | 5 sec |
| 4 | Name Project | Enter "Product Control" | Project name | Name saved | 5 sec |
| 5 | Upload ZIP | Click "Upload Files" → Select ZIP | product-control.zip | Upload progress bar | 45 sec |
| 6 | Automatic Extraction | EZsite.ai extracts files | N/A | File tree appears | 10 sec |
| 7 | Dependency Detection | EZsite reads package.json | N/A | "Installing..." message | 90 sec |
| 8 | Database Setup | EZsite reads prisma/schema.prisma | N/A | PostgreSQL provisioned | 30 sec |
| 9 | Environment Variables | Click "Settings" → "Environment" | API keys from .env.example | Variables saved | 3 min |
| 10 | Build & Deploy | Click "Deploy" button | N/A | Build log streams | 120 sec |
| 11 | Get Live URL | Copy URL from dashboard | N/A | https://your-app.ezsite.ai | 5 sec |

**TOTAL TIME: ~8 minutes**

---

### **What EZsite.ai Does Automatically:**

✅ Extracts ZIP file  
✅ Analyzes project structure  
✅ Installs Node.js dependencies  
✅ Provisions PostgreSQL database  
✅ Runs Prisma migrations  
✅ Provisions Redis instance  
✅ Sets up AWS S3 bucket (if needed)  
✅ Configures domain & SSL  
✅ Enables CI/CD from GitHub  
✅ Provides usage analytics  

---

### **EZsite.ai Dashboard Features:**

After deployment, you'll see:
- **Live Preview:** Real-time app preview
- **Logs:** Build and runtime logs
- **Metrics:** Performance monitoring
- **Database:** Direct database access
- **Environment:** Manage env variables
- **Domains:** Custom domain setup
- **Scaling:** Auto-scaling controls

---

## 🤖 MANUS.AI DEPLOYMENT

### **Method 1: Conversational Deployment**

**Step-by-Step Instructions:**

| Step | Action | What to Say/Type | Expected Response | Time |
|------|--------|------------------|-------------------|------|
| 1 | Open Manus.ai | Go to https://manus.ai | Chat interface loads | 5 sec |
| 2 | Share Folder | Upload this entire folder | "Files received" | 30 sec |
| 3 | Request Deployment | "Deploy this Product Control app for me" | "Analyzing project..." | 10 sec |
| 4 | AI Analyzes | Manus reads all config files | Deployment plan shown | 30 sec |
| 5 | Confirm Plan | Type "yes" or "proceed" | "Starting deployment..." | 5 sec |
| 6 | Environment Setup | Manus asks for API keys | Provide keys from .env.example | 3 min |
| 7 | Auto-Build | Manus runs npm install & build | Build progress updates | 120 sec |
| 8 | Database Setup | Manus provisions PostgreSQL | "Database ready" | 40 sec |
| 9 | Deploy | Manus deploys to production | Live URL provided | 90 sec |
| 10 | Test | "Test the deployed app" | Manus runs health checks | 30 sec |

**TOTAL TIME: ~8 minutes**

---

### **Method 2: GitHub Integration**

**Step-by-Step Instructions:**

| Step | Action | What to Say/Type | Expected Response | Time |
|------|--------|------------------|-------------------|------|
| 1 | Push to GitHub | Create repo, push code | GitHub URL copied | 2 min |
| 2 | Open Manus.ai | Go to https://manus.ai | Chat interface | 5 sec |
| 3 | Share Repo URL | Paste GitHub URL in chat | "Cloning repository..." | 10 sec |
| 4 | Request Deployment | "Deploy this repo to production" | Deployment plan shown | 30 sec |
| 5 | Configure | Manus asks for env variables | Provide API keys | 3 min |
| 6 | Deploy | Confirm deployment | "Deploying..." | 120 sec |
| 7 | Live URL | Manus provides URL | Click to open app | 5 sec |

**TOTAL TIME: ~6 minutes**

---

### **What Manus.ai Does Automatically:**

✅ Reads entire project structure  
✅ Understands dependencies from package.json  
✅ Analyzes Prisma schema for database needs  
✅ Provisions all required services  
✅ Sets up environment variables securely  
✅ Runs build commands  
✅ Deploys to production infrastructure  
✅ Configures domain & SSL  
✅ Sets up monitoring & alerts  
✅ Provides conversational management  

---

### **Manus.ai Conversational Commands:**

After deployment, you can ask Manus:
- "Show me the application logs"
- "What's the current uptime?"
- "Scale to 3 instances"
- "Add a custom domain example.com"
- "Set OPENAI_API_KEY to sk-..."
- "Restart the application"
- "Show database connection details"

---

## 🔐 ENVIRONMENT SETUP

### **Minimum Required Variables (for all platforms):**

```bash
# Essential for app to run
DATABASE_URL="postgresql://..."
VITE_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
OPENAI_API_KEY="sk-..."
MCP_PROVIDER="den"
MCP_ENDPOINT="https://api.getden.io"
MCP_API_KEY="den_..."
```

**How to Get These Keys:**

| Service | Where to Get | Sign-Up URL | Free Tier |
|---------|-------------|-------------|-----------|
| **Database** | Platform provides | N/A | ✅ Yes |
| **Clerk Auth** | Clerk Dashboard | https://clerk.com | ✅ 10K MAU |
| **OpenAI** | OpenAI Platform | https://platform.openai.com | ❌ $5 min |
| **Den MCP** | Den Dashboard | https://getden.io | ✅ 1GB storage |

---

### **Optional Variables (add later):**

```bash
# Add these as you connect integrations
SHOPIFY_API_KEY="..."
KLAVIYO_PRIVATE_API_KEY="..."
EAGLE_API_URL="http://localhost:41595"
AIRTABLE_API_KEY="..."
AWS_ACCESS_KEY_ID="..."
```

---

## 🧪 QUICK TEST

### **After Deployment - Test Checklist:**

| Test | How to Test | Expected Result | If it Fails |
|------|------------|-----------------|-------------|
| **App Loads** | Visit deployed URL | Dashboard appears | Check environment variables |
| **Authentication** | Click "Sign Up" | Clerk modal opens | Verify CLERK keys |
| **AI Agents** | Click "Create Product" | Product wizard opens | Check OPENAI_API_KEY |
| **Database** | Create test product | Product saved | Check DATABASE_URL |
| **MCP Sync** | Refresh page | Data persists | Check MCP credentials |

---

### **Quick Test Script:**

```bash
# Run this after deployment to verify everything works
curl https://your-app-url.com/api/health

# Expected response:
{
  "status": "ok",
  "database": "connected",
  "mcp": "connected",
  "ai": "ready"
}
```

---

## 🐛 TROUBLESHOOTING

### **Issue: "Module not found" error**

**Cause:** Dependencies not installed  
**Solution:**
- Bolt.new: Click "Reinstall Dependencies"
- EZsite.ai: Go to Settings → "Rebuild"
- Manus.ai: Type "reinstall dependencies"

---

### **Issue: Database connection failed**

**Cause:** Invalid DATABASE_URL  
**Solution:**
1. Check DATABASE_URL format: `postgresql://user:pass@host:5432/db`
2. Verify database is running
3. Check firewall allows connections

**Platform-Specific:**
- Bolt.new: Uses built-in SQLite (auto-works)
- EZsite.ai: Auto-provisions PostgreSQL (check logs)
- Manus.ai: Ask "show database connection details"

---

### **Issue: AI agents not generating**

**Cause:** Missing or invalid OpenAI API key  
**Solution:**
1. Verify OPENAI_API_KEY starts with `sk-`
2. Check API quota at https://platform.openai.com/usage
3. Test key: `curl https://api.openai.com/v1/models -H "Authorization: Bearer YOUR_KEY"`

---

### **Issue: Clerk authentication not working**

**Cause:** Missing or incorrect Clerk keys  
**Solution:**
1. Go to https://clerk.com dashboard
2. Copy both PUBLISHABLE_KEY and SECRET_KEY
3. Ensure PUBLISHABLE_KEY in .env and VITE_CLERK_PUBLISHABLE_KEY match
4. Verify domain is added to Clerk allowed origins

---

### **Issue: MCP knowledge base not syncing**

**Cause:** Invalid MCP credentials or offline  
**Solution:**
1. Test MCP connection: Visit MCP_ENDPOINT in browser
2. Verify API key is correct
3. App will fallback to localStorage automatically
4. Check browser console for error messages

---

### **Issue: Build fails on deployment**

**Cause:** TypeScript errors or missing dependencies  
**Solution:**
1. Check build logs for specific error
2. Verify all dependencies in package.json
3. Run `npm install` locally to test
4. Check TypeScript compiler errors

**Platform Commands:**
- Bolt.new: View "Build Logs" tab
- EZsite.ai: Go to "Logs" → "Build Logs"
- Manus.ai: Ask "show build errors"

---

### **Issue: Assets not uploading to Eagle/Airtable**

**Cause:** Integration not configured  
**Solution:**
1. Go to "Integration Hub" in app
2. Click on Eagle/Airtable card
3. Enter API credentials
4. Click "Connect"
5. Test connection

**Note:** These are optional - app works without them

---

## 📞 PLATFORM SUPPORT

### **Bolt.new Support:**
- Discord: https://discord.gg/bolt
- Docs: https://docs.bolt.new
- Email: support@bolt.new

### **EZsite.ai Support:**
- Live Chat: Available in dashboard
- Docs: https://ezsite.ai/docs
- Email: help@ezsite.ai

### **Manus.ai Support:**
- Just ask Manus! Type "I need help with..."
- Docs: https://manus.ai/help
- Email: support@manus.ai

---

## ✅ SUCCESS CHECKLIST

After deployment, verify:

- [ ] App loads without errors
- [ ] Can create account / sign in
- [ ] Dashboard displays correctly
- [ ] "Create Product" wizard opens
- [ ] AI agents dashboard shows all 7 agents
- [ ] Can upload brand logo/avatar
- [ ] Can set revenue goals
- [ ] Database persists data after refresh
- [ ] MCP knowledge base syncing (check console)

**If all checked ✅ - YOU'RE READY TO USE THE APP!** 🎉

---

## 🎯 WHAT'S NEXT?

After successful deployment:

1. **Set Up Brand Guidelines** (5 min)
2. **Connect Shopify** (10 min)
3. **Create First Product** (3 min with AI agents!)
4. **Review Generated Assets** (2 min)
5. **Publish to Shopify** (1 min)
6. **Launch Email Campaign** (5 min)
7. **Set Up Ad Campaigns** (10 min)

**Total onboarding time: ~30 minutes**

---

## 📚 ADDITIONAL RESOURCES

- **Video Tutorial:** Coming soon
- **API Documentation:** `/docs` route in deployed app
- **Knowledge Base Articles:** Built-in help center
- **Community Forum:** Link in app footer

---

**Ready to deploy? Pick your platform and follow the guide above!** 🚀
