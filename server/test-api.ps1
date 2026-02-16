# PowerShell script to test the RBAC API

Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "Testing TechStorm RBAC API" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:5000/api"

# Test 1: Health Check
Write-Host "[TEST 1] Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "Status: $($health.status)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure the server is running on port 5000" -ForegroundColor Yellow
    exit 1
}

# Test 2: Login as Admin
Write-Host "[TEST 2] Login as Core User (Admin)..." -ForegroundColor Yellow
$loginBody = @{
    email = "admin@techstorm.com"
    password = "TechStorm2024!"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    $adminToken = $loginResponse.token
    Write-Host "Login successful!" -ForegroundColor Green
    Write-Host "Role: $($loginResponse.user.role)" -ForegroundColor Cyan
    Write-Host "Permissions: $($loginResponse.user.permissions -join ', ')" -ForegroundColor Cyan
    Write-Host ""
} catch {
    Write-Host "Login failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 3: Get Profile
Write-Host "[TEST 3] Get User Profile..." -ForegroundColor Yellow
$headers = @{
    Authorization = "Bearer $adminToken"
}

try {
    $profile = Invoke-RestMethod -Uri "$baseUrl/auth/profile" -Headers $headers -Method Get
    Write-Host "Name: $($profile.user.name)" -ForegroundColor Green
    Write-Host "Email: $($profile.user.email)" -ForegroundColor Green
    Write-Host "Role: $($profile.user.role)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Get All Users (Core permission)
Write-Host "[TEST 4] Get All Users (Core permission)..." -ForegroundColor Yellow
try {
    $users = Invoke-RestMethod -Uri "$baseUrl/users" -Headers $headers -Method Get
    Write-Host "Total users: $($users.pagination.totalUsers)" -ForegroundColor Green
    Write-Host "Users retrieved: $($users.data.Count)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Login as Coordinator
Write-Host "[TEST 5] Login as Coordinator..." -ForegroundColor Yellow
$coordLoginBody = @{
    email = "coordinator@techstorm.com"
    password = "coordinator123"
} | ConvertTo-Json

try {
    $coordResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $coordLoginBody -ContentType "application/json"
    $coordToken = $coordResponse.token
    Write-Host "Login successful!" -ForegroundColor Green
    Write-Host "Role: $($coordResponse.user.role)" -ForegroundColor Cyan
    Write-Host "Permissions: $($coordResponse.user.permissions -join ', ')" -ForegroundColor Cyan
    Write-Host ""
} catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: Try to create event as Coordinator (should fail)
Write-Host "[TEST 6] Try to create event as Coordinator (should fail)..." -ForegroundColor Yellow
$coordHeaders = @{
    Authorization = "Bearer $coordToken"
}

$eventData = @{
    title = "Test Event"
    description = "Testing permissions"
    eventType = "workshop"
    date = "2026-03-01T10:00:00Z"
    location = "Test Hall"
} | ConvertTo-Json

try {
    $createResult = Invoke-RestMethod -Uri "$baseUrl/events" -Method Post -Headers $coordHeaders -Body $eventData -ContentType "application/json"
    Write-Host "Unexpected: Event created (should have been blocked)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 403) {
        Write-Host "Correctly blocked: 403 Forbidden" -ForegroundColor Green
        Write-Host "Coordinator cannot create events (no CREATE permission)" -ForegroundColor Cyan
    } else {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
    }
    Write-Host ""
}

# Test 7: Create event as Core user (should succeed)
Write-Host "[TEST 7] Create event as Core user (should succeed)..." -ForegroundColor Yellow
try {
    $createResult = Invoke-RestMethod -Uri "$baseUrl/events" -Method Post -Headers $headers -Body $eventData -ContentType "application/json"
    Write-Host "Event created successfully!" -ForegroundColor Green
    Write-Host "Event ID: $($createResult.event._id)" -ForegroundColor Cyan
    Write-Host "Title: $($createResult.event.title)" -ForegroundColor Cyan
    $eventId = $createResult.event._id
    Write-Host ""
} catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 8: Login as Volunteer
Write-Host "[TEST 8] Login as Volunteer..." -ForegroundColor Yellow
$volunteerLoginBody = @{
    email = "volunteer@techstorm.com"
    password = "volunteer123"
} | ConvertTo-Json

try {
    $volunteerResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $volunteerLoginBody -ContentType "application/json"
    $volunteerToken = $volunteerResponse.token
    Write-Host "Login successful!" -ForegroundColor Green
    Write-Host "Role: $($volunteerResponse.user.role)" -ForegroundColor Cyan
    Write-Host "Permissions: $($volunteerResponse.user.permissions -join ', ')" -ForegroundColor Cyan
    Write-Host ""
} catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 9: Get events as Volunteer (should succeed - read only)
Write-Host "[TEST 9] Get events as Volunteer (read-only access)..." -ForegroundColor Yellow
$volunteerHeaders = @{
    Authorization = "Bearer $volunteerToken"
}

try {
    $events = Invoke-RestMethod -Uri "$baseUrl/events" -Headers $volunteerHeaders -Method Get
    Write-Host "Events retrieved successfully!" -ForegroundColor Green
    Write-Host "Total events: $($events.pagination.totalEvents)" -ForegroundColor Cyan
    Write-Host ""
} catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Summary
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""
Write-Host "RBAC System Status:" -ForegroundColor Yellow
Write-Host "  Core users (admin):      CREATE, READ, UPDATE, DELETE" -ForegroundColor Green
Write-Host "  Coordinators:            READ, UPDATE only" -ForegroundColor Yellow
Write-Host "  Volunteers:              READ only" -ForegroundColor Cyan
Write-Host ""
Write-Host "All tests completed!" -ForegroundColor Green
Write-Host "API is ready to use at: $baseUrl" -ForegroundColor Cyan
Write-Host ""
