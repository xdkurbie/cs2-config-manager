# ===========================================
# CS2 Config Manager - GitHub Upload Script
# ===========================================

Write-Host "Starting GitHub upload process..."

# Configuration
$REPO_NAME = "cs2-config-manager"
$GITHUB_USER = "xdkurbie"
$REPO_URL = "https://github.com/$GITHUB_USER/$REPO_NAME.git"
$PROJECT_PATH = "C:\Users\Shrood\Desktop\cs2-config-manager"
$DESCRIPTION = "CS2 Config Manager - Full config management with pro presets and case opening simulator"

# ===========================================
# Step 1: Initialize Git Repository
# ===========================================
Write-Host "Step 1: Initialize Git Repository..." -ForegroundColor Cyan

Set-Location $PROJECT_PATH

if (-not (Test-Path .git)) {
    Write-Host "Initializing git repository..."
    git init
    git branch -M main
    Write-Host "✓ Git initialized" -ForegroundColor Green
} else {
    Write-Host "Git repository already initialized" -ForegroundColor Yellow
}

# ===========================================
# Step 2: Add All Project Files
# ===========================================
Write-Host "Step 2: Adding project files..." -ForegroundColor Cyan

git add .
$fileCount = (git ls-files | Measure-Object).Count
Write-Host "✓ Added $fileCount files to git" -ForegroundColor Green

# ===========================================
# Step 3: Create Initial Commit
# ===========================================
Write-Host "Step 3: Creating initial commit..." -ForegroundColor Cyan

$commitMessage = @"

Initial commit: CS2 Config Manager with all features

Full config management (Video, Audio, Gameplay, Crosshair, ViewModel, Network, HUD, Radar)
Pro player presets (s1mple, ZywOo, NiKo, device, ropz)
Case opening simulator with realistic drop rates
Monaco-powered raw config editor with validation
Dark themed UI with CS2-inspired styling
localStorage for data persistence
" @

git commit -m $commitMessage
Write-Host "✓ Initial commit created" -ForegroundColor Green

# ===========================================
# Step 4: Check for gh CLI
# ===========================================
Write-Host "Step 4: Checking for GitHub CLI..." -ForegroundColor Cyan

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "✓ GitHub CLI (gh) is available" -ForegroundColor Green
    $hasGhCLI = $true
} else {
    Write-Host "⚠ GitHub CLI not found. Switching to web approach..." -ForegroundColor Yellow
    $hasGhCLI = $false
}

# ===========================================
# Step 5a: Create Repository with GitHub CLI
# ===========================================
if ($hasGhCLI) {
    Write-Host "Step 5a: Creating GitHub repository via gh CLI..." -ForegroundColor Cyan
    
    gh repo create --public --source $PROJECT_PATH --description $DESCRIPTION xdkurbie/$REPO_NAME
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✓ GitHub repository created: github.com/$GITHUB_USER/$REPO_NAME" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to create repository. Check errors above." -ForegroundColor Red
        exit 1
    }
}

# ===========================================
# Step 5b: Alternative: Clone Empty Repo and Copy Files
# ===========================================
if (-not $hasGhCLI) {
    Write-Host "Step 5b: Creating repository via web approach..." -ForegroundColor Cyan
    Write-Host "⚠ You'll need to manually:"
    Write-Host ""
    Write-Host "1. Go to https://github.com/new" -ForegroundColor Yellow
    Write-Host "2. Repository name: $REPO_NAME" -ForegroundColor Yellow
    Write-Host "3. Visibility: Public" -ForegroundColor Yellow
    Write-Host "4. Description: $DESCRIPTION" -ForegroundColor Yellow
    Write-Host "5. Click 'Create repository'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "6. After creation:" -ForegroundColor Yellow
    Write-Host "   git remote add origin $REPO_URL" -ForegroundColor Yellow
    Write-Host "   git push -u origin main" -ForegroundColor Yellow
    Write-Host ""
}

# ===========================================
# Step 6: Add Remote and Push (if gh CLI available)
# ===========================================
if ($hasGhCLI) {
    Write-Host "Step 6: Adding remote and pushing..." -ForegroundColor Cyan
    
    git remote add origin $REPO_URL
    
    Write-Host "Pushing to GitHub (this may take a minute or two)..."
    git push -u origin main
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🎉 Your repository is live at: https://github.com/$GITHUB_USER/$REPO_NAME" -ForegroundColor Green
        Write-Host ""
        Write-Host "📦 You can now:" -ForegroundColor Yellow
        Write-Host "   - Clone: git clone https://github.com/$GITHUB_USER/$REPO_NAME.git" -ForegroundColor Yellow
        Write-Host "   - View: https://github.com/$GITHUB_USER/$REPO_NAME" -ForegroundColor Yellow
    Write-Host "   - Star: Click the ⭐ on GitHub" -ForegroundColor Yellow
    } else {
        Write-Host "✗ Failed to push. Check errors above." -ForegroundColor Red
        exit 1
    }
}

# ===========================================
# Step 7: Create MIT License (Optional)
# ===========================================
Write-Host "Step 7: Creating MIT License..." -ForegroundColor Cyan

$licenseContent = @"
MIT License

Copyright (c) 2025 xdkurbie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the ""Software""), to deal
in the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE."

Set-Content -Path $PROJECT_PATH\LICENSE -Value $licenseContent

git add LICENSE
git commit -m "Add MIT license"
Write-Host "✓ MIT license added" -ForegroundColor Green

# ===========================================
# Step 8: Create v1.0.0 Release Tag (Optional)
# ===========================================
Write-Host "Step 8: Creating v1.0.0 release tag..." -ForegroundColor Cyan

Read-Host "Do you want to create a v1.0.0 release tag? (y/n): "

if ($response -eq 'y' -or $response -eq 'Y') {
    git tag -a v1.0.0 -m "v1.0.0 Initial release"
    git push origin main --tags
    Write-Host "✓ Release tag created and pushed" -ForegroundColor Green
}

# ===========================================
# Cleanup and Summary
# ===========================================
Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "     UPLOAD COMPLETE!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repository: https://github.com/$GITHUB_USER/$REPO_NAME" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps you may want to consider:" -ForegroundColor Yellow
Write-Host "1. Enable GitHub Pages for deployment (optional)" -ForegroundColor Yellow
Write-Host "2. Add a custom domain" -ForegroundColor Yellow
Write-Host "3. Add GitHub Actions for CI/CD" -ForegroundColor Yellow
Write-Host "4. Set up project documentation wiki" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Cyan
Read-Host

# ===========================================
# How to Run This Script
# ===========================================
Write-Host ""
Write-Host "OPTION 1 - Run directly in PowerShell:" -ForegroundColor Yellow
Write-Host "  1. Open PowerShell" -ForegroundColor Yellow
Write-Host "  2. Copy and paste this script" -ForegroundColor Yellow
Write-Host "  3. Save as `upload-to-github.ps1`" -ForegroundColor Yellow
Write-Host "  4. Navigate to project directory" -ForegroundColor Yellow
Write-Host "   5. Run: .\upload-to-github.ps1" -ForegroundColor Yellow
Write-Host ""
Write-Host "OPTION 2 - Run via File Explorer:" -ForegroundColor Yellow
Write-Host "   1. Right-click the script below" -ForegroundColor Yellow
Write-Host "  2. Save to `upload-to-github.ps1`" -ForegroundColor Yellow
Write-Host "  3. Navigate to C:\Users\Shrood\Desktop\cs2-config-manager" -ForegroundColor Yellow
Write-Host " 4. Double-click upload-to-github.ps1 to run it" -ForegroundColor Yellow
Write-Host ""
Write-Host "OPTION 3 - Run from Command Prompt:" -ForegroundColor Yellow
Write-Host "  1. Save script as `upload.bat`" (for CMD compatibility)" -ForegroundColor Yellow
Write-Host " 2. Navigate to project directory" -ForegroundColor Yellow
Write-Host " 3. Run: upload.bat" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠ TROUBLESHOOTING? If gh CLI isn't found, the script will provide web-based instructions" -ForegroundColor Yellow

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "READY TO EXECUTE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""