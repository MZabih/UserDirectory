#!/bin/bash

# Build script for Detox E2E testing
# This script builds the app using xcodebuild with proper codegen handling

set -e

cd "$(dirname "$0")/.."

echo "🔨 Building iOS app for Detox E2E testing..."

# Step 1: Ensure native project is set up
if [ ! -d "ios" ] || [ ! -f "ios/UserDirectory.xcworkspace/contents.xcworkspacedata" ]; then
  echo "📱 Running expo prebuild..."
  npx expo prebuild --platform ios --clean
fi

# Step 2: Ensure pods are installed
echo "📦 Checking CocoaPods..."
cd ios
if [ ! -d "Pods" ]; then
  echo "Installing CocoaPods dependencies..."
  pod install
fi
cd ..

# Step 3: Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf ios/build

# Step 4: Build with xcodebuild
# The build process should automatically run codegen as part of the build phases
echo "🏗️  Building with xcodebuild (codegen will run automatically)..."
xcodebuild \
  -workspace ios/UserDirectory.xcworkspace \
  -scheme UserDirectory \
  -configuration Debug \
  -sdk iphonesimulator \
  -derivedDataPath ios/build \
  CODE_SIGNING_ALLOWED=NO \
  ONLY_ACTIVE_ARCH=NO \
  clean build

# Verify build output exists
if [ -f "ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app/Info.plist" ]; then
  echo "✅ Build complete! App is ready for Detox testing."
  echo "📍 App location: ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app"
else
  echo "❌ Build failed. App not found in expected location."
  echo "💡 Try running: npx expo prebuild --clean --platform ios"
  exit 1
fi
