Write-Host "1. Killing stale background compilation locks..." -ForegroundColor Cyan
Stop-Process -Name "java" -Force -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "src-tauri/gen/android/.gradle"

Write-Host "2. Triggering Tauri Native Android Package Assembly..." -ForegroundColor Cyan
# The added -- --rerun-tasks forces Gradle to bypass the buggy local filesystem checks entirely
pnpm run tauri android build --target armv7 -- --rerun-tasks

Write-Host "3. Appending local debug test signature..." -ForegroundColor Cyan
cd "src-tauri\gen\android\app\build\outputs\apk\universal\release"
& "$env:LOCALAPPDATA\Android\Sdk\build-tools\36.1.0\apksigner.bat" sign --ks "$env:USERPROFILE\.android\debug.keystore" --ks-pass pass:android --key-pass pass:android app-universal-release-unsigned.apk

Write-Host "4. Streaming signed application straight to TV..." -ForegroundColor Cyan
adb install -r -g app-universal-release-unsigned.apk

Write-Host "Deployment Completed Successfully!" -ForegroundColor Green
cd ..\..\..\..\..\..\..\..\..
