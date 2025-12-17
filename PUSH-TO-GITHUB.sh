#!/bin/bash

# Product Control - GitHub Push Script
# For GitHub user: rtmendes

echo "🚀 Product Control - GitHub Setup Script"
echo "========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   https://git-scm.com/downloads"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "   Please run this script from the product-control-complete folder"
    exit 1
fi

echo "✅ Found Product Control project"
echo ""

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Configure git user (update with your details)
echo ""
echo "⚙️  Configuring Git..."
read -p "Enter your GitHub username (default: rtmendes): " github_user
github_user=${github_user:-rtmendes}

read -p "Enter your email: " github_email

git config user.name "$github_user"
git config user.email "$github_email"
echo "✅ Git configured"

# Stage all files
echo ""
echo "📝 Staging files..."
git add .
echo "✅ Files staged"

# Commit
echo ""
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Product Control v1.0 - AI-powered product management platform

Features:
- 7 specialized AI agents
- Automatic asset generation (30-50 per product)
- 15-point quality assurance
- Persistent knowledge base (MCP)
- Shopify, Klaviyo, Eagle, Airtable integrations
- Revenue tracking & analytics
- Optimized for Bolt.new, EZsite.ai, Manus.ai deployment

Time savings: 95-98% (4-6 hours → 3-5 minutes per product)"

echo "✅ Commit created"

# Add remote
echo ""
echo "🔗 Setting up GitHub remote..."
repo_name="product-control"
remote_url="https://github.com/$github_user/$repo_name.git"

# Remove existing remote if present
git remote remove origin 2>/dev/null

git remote add origin "$remote_url"
echo "✅ Remote added: $remote_url"

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
echo ""
echo "⚠️  IMPORTANT:"
echo "   1. Make sure you've created the repository on GitHub first:"
echo "      https://github.com/new"
echo "   2. Repository name: $repo_name"
echo "   3. Make it PUBLIC so deployment platforms can access it"
echo ""
read -p "Have you created the GitHub repository? (y/n): " created

if [ "$created" != "y" ]; then
    echo ""
    echo "📋 Please create the repository first:"
    echo "   1. Go to: https://github.com/new"
    echo "   2. Name: $repo_name"
    echo "   3. Description: AI-Powered Product Management & Marketing Automation Platform"
    echo "   4. Select: Public"
    echo "   5. Don't initialize with README"
    echo "   6. Click 'Create repository'"
    echo ""
    echo "Then run this script again!"
    exit 0
fi

# Set main branch
git branch -M main

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Repository pushed to GitHub!"
    echo ""
    echo "📍 Your repository is now live at:"
    echo "   https://github.com/$github_user/$repo_name"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Visit your repo: https://github.com/$github_user/$repo_name"
    echo "   2. Add topics: ai, automation, shopify, react, typescript"
    echo "   3. Deploy to Bolt.new: Import from GitHub"
    echo "   4. Deploy to EZsite.ai: Import from GitHub"
    echo "   5. Deploy to Manus.ai: Share GitHub URL"
    echo ""
    echo "✅ You're all set!"
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "   1. Repository doesn't exist on GitHub"
    echo "   2. Authentication failed (check credentials)"
    echo "   3. Network connection issue"
    echo ""
    echo "💡 Try:"
    echo "   - Create repo at: https://github.com/new"
    echo "   - Check GitHub authentication"
    echo "   - Run script again"
fi
