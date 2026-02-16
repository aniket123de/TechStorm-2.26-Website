# TechStorm Backend Setup Script
Write-Host "TechStorm Backend Setup Starting..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js detected: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if we're in the correct directory
if (-not (Test-Path "package.json")) {
    Write-Host "package.json not found. Please run this script from the server directory." -ForegroundColor Red
    exit 1
}

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "Dependencies installed successfully" -ForegroundColor Green

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    
    $envContent = @"
# Environment Variables
NODE_ENV=development
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb+srv://AnikPaul:AnikPaul123@cluster0.gvubzsp.mongodb.net/techstorm

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-$(Get-Random)
JWT_EXPIRES_IN=24h

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
"@
    
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host ".env file created" -ForegroundColor Green
} else {
    Write-Host ".env file already exists" -ForegroundColor Blue
}

Write-Host "Setting up initial database users..." -ForegroundColor Yellow
node setup.js

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database setup completed" -ForegroundColor Green
} else {
    Write-Host "Database setup encountered issues. You may need to run 'node setup.js' manually later." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the server:" -ForegroundColor Cyan
Write-Host "  Development: npm run dev" -ForegroundColor White
Write-Host "  Production:  npm start" -ForegroundColor White
Write-Host ""
Write-Host "API will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Default test credentials:" -ForegroundColor Yellow
Write-Host "  Core:        admin@techstorm.com / TechStorm2024!" -ForegroundColor White
Write-Host "  Coordinator: coordinator@techstorm.com / coordinator123" -ForegroundColor White  
Write-Host "  Volunteer:   volunteer@techstorm.com / volunteer123" -ForegroundColor White
Write-Host ""
Write-Host "IMPORTANT: Change the admin password after first login!" -ForegroundColor Red
