@echo off
REM Product Control - GitHub Push Script for Windows
REM For GitHub user: rtmendes

echo.
echo ========================================
echo   Product Control - GitHub Setup
echo ========================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/downloads
    echo.
    pause
    exit /b 1
)

echo [OK] Git is installed
echo.

REM Check if we're in the right directory
if not exist package.json (
    echo ERROR: package.json not found!
    echo Please run this script from the product-control-complete folder
    echo.
    pause
    exit /b 1
)

echo [OK] Found Product Control project
echo.

REM Initialize git if needed
if not exist .git (
    echo Initializing Git repository...
    git init
    echo [OK] Git initialized
) else (
    echo [OK] Git already initialized
)
echo.

REM Configure git user
echo Setting up Git configuration...
set /p github_user="Enter your GitHub username (default: rtmendes): "
if "%github_user%"=="" set github_user=rtmendes

set /p github_email="Enter your email: "

git config user.name "%github_user%"
git config user.email "%github_email%"
echo [OK] Git configured
echo.

REM Stage files
echo Staging files...
git add .
echo [OK] Files staged
echo.

REM Commit
echo Creating initial commit...
git commit -m "Initial commit: Product Control v1.0 - AI-powered product management platform"
echo [OK] Commit created
echo.

REM Set up remote
echo Setting up GitHub remote...
set repo_name=product-control
set remote_url=https://github.com/%github_user%/%repo_name%.git

git remote remove origin 2>nul
git remote add origin %remote_url%
echo [OK] Remote added: %remote_url%
echo.

REM Push instructions
echo.
echo ========================================
echo   IMPORTANT - READ BEFORE CONTINUING
echo ========================================
echo.
echo Before pushing, make sure you have:
echo   1. Created the repository on GitHub
echo   2. Repository name: %repo_name%
echo   3. Made it PUBLIC
echo.
echo Create it here: https://github.com/new
echo.
set /p created="Have you created the GitHub repository? (y/n): "

if /i not "%created%"=="y" (
    echo.
    echo Please create the repository first:
    echo   1. Go to: https://github.com/new
    echo   2. Name: %repo_name%
    echo   3. Description: AI-Powered Product Management Platform
    echo   4. Select: Public
    echo   5. Don't initialize with README
    echo   6. Click "Create repository"
    echo.
    echo Then run this script again!
    echo.
    pause
    exit /b 0
)

REM Set main branch and push
echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! 
    echo ========================================
    echo.
    echo Your repository is live at:
    echo   https://github.com/%github_user%/%repo_name%
    echo.
    echo Next steps:
    echo   1. Add topics to your repo
    echo   2. Deploy to Bolt.new
    echo   3. Deploy to EZsite.ai  
    echo   4. Deploy to Manus.ai
    echo.
) else (
    echo.
    echo ========================================
    echo   PUSH FAILED
    echo ========================================
    echo.
    echo Common issues:
    echo   1. Repository doesn't exist
    echo   2. Authentication failed
    echo   3. Network connection
    echo.
    echo Please check and try again.
    echo.
)

pause
