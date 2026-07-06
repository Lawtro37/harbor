# PowerShell script to delete Gradle caches and rebuild the Android APK

Write-Host "Step 1: Removing Gradle caches..." -ForegroundColor Cyan
Remove-Item -Recurse -Force "$env:USERPROFILE\.gradle\caches"

Write-Host "Step 2: Removing local project Gradle cache..." -ForegroundColor Cyan
Remove-Item -Recurse -Force "src-tauri/gen/android/.gradle"

Write-Host "Step 3: Starting Android APK build (armv7)..." -ForegroundColor Cyan
pnpm run tauri android build --target armv7 -- --rerun-tasks

Write-Host "Build script completed." -ForegroundColor Green
