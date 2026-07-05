# Helper to build Android aarch64 target with NDK toolchain env vars
param(
    [string]$ndkPath = "$env:LOCALAPPDATA\Android\Sdk\ndk\27.2.12479018",
    [string]$apiLevel = "21"
)

$toolchain = Join-Path $ndkPath "toolchains\llvm\prebuilt\windows-x86_64\bin"

$env:CXX_aarch64_linux_android = Join-Path $toolchain "aarch64-linux-android${apiLevel}-clang++.exe"
$env:AR_aarch64_linux_android = Join-Path $toolchain "llvm-ar.exe"
$env:RANLIB_aarch64_linux_android = Join-Path $toolchain "llvm-ranlib.exe"
$env:CARGO_TARGET_AARCH64_LINUX_ANDROID_LINKER = Join-Path $toolchain "aarch64-linux-android${apiLevel}-clang.cmd"

Write-Host "Building for aarch64-linux-android using NDK: $ndkPath (API $apiLevel)"

cargo build --target aarch64-linux-android
