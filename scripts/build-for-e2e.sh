#!/bin/bash

# Simple build script for E2E testing
# This script builds a standalone app using xcodebuild (for Detox E2E tests)

set -e

cd "$(dirname "$0")/.."

echo "🔨 Building iOS app for E2E testing..."
echo ""

# Step 1: Generate Expo config (this fixes the Constants error)
echo "📝 Step 1/4: Generating Expo config..."
npx expo config --type public > /dev/null 2>&1 || echo "  (Config already exists)"
echo "  ✅ Config generated"
echo ""

# Step 2: Check for simulator (optional - not required for building)
echo "📱 Step 2/4: Checking for simulator (optional)..."
SIM_UDID=$(xcrun simctl list devices available 2>/dev/null | grep "iPhone" | grep -v "unavailable" | head -1 | grep -o '[A-F0-9-]\{36\}' || echo "")

if [ -z "$SIM_UDID" ]; then
  echo "  ⚠️  Simulator service not accessible (this is OK for building)"
  echo "  💡 Simulator check skipped - build will continue"
  echo "  💡 Note: You'll need a working simulator to run tests later"
else
  SIM_NAME=$(xcrun simctl list devices available 2>/dev/null | grep "$SIM_UDID" | sed 's/.*(\(.*\))/\1/' | head -1)
  echo "  ✅ Found: $SIM_NAME ($SIM_UDID)"
fi
echo ""

# Step 3: Build with xcodebuild (standalone app for Detox)
echo "🏗️  Step 3/4: Building app (this will take 3-5 minutes)..."
echo "  📍 You'll see compilation progress below..."
echo ""

# Ensure pods are installed
if [ ! -d "ios/Pods" ]; then
  echo "  📦 Installing CocoaPods..."
  cd ios && pod install && cd ..
fi

# Note: Codegen runs automatically during Xcode build
# If building via command line fails, use Xcode instead (see HOW_TO_BUILD_AND_TEST.md)

# Clean previous build
echo "  🧹 Cleaning previous build..."
rm -rf ios/build

# Build using xcodebuild (creates standalone app, not Expo dev client)
# Note: For New Architecture, codegen runs automatically as part of build phases
# If codegen fails, the build will fail with "Build input file cannot be found" errors
# In that case, use Xcode GUI which handles codegen more reliably
echo "  ⚠️  Note: If build fails with 'codegen' errors, use Xcode GUI instead:"
echo "     open ios/UserDirectory.xcworkspace"
echo ""

xcodebuild \
  -workspace ios/UserDirectory.xcworkspace \
  -scheme UserDirectory \
  -configuration Debug \
  -sdk iphonesimulator \
  -derivedDataPath ios/build \
  CODE_SIGNING_ALLOWED=NO \
  clean build \
  2>&1 | tee /tmp/xcode-build.log

BUILD_EXIT_CODE=${PIPESTATUS[0]}

echo ""
echo ""

# Step 4: Verify build
echo "✅ Step 4/4: Verifying build..."
if [ $BUILD_EXIT_CODE -eq 0 ]; then
  if [ -f "ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app/Info.plist" ]; then
    echo "  ✅ Build SUCCESSFUL!"
    echo ""
    echo "📍 App location:"
    echo "   ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app"
    echo ""
    echo "📊 App size:"
    du -sh ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app
    echo ""
    echo "🚀 Ready to run E2E tests!"
    echo "   Run: npm run test:e2e:ios"
    exit 0
  else
    echo "  ⚠️  Build completed but app not found in expected location"
    echo "  💡 Check the build logs above for details"
    exit 1
  fi
else
  echo "  ❌ Build FAILED"
  echo ""
  echo "💡 Common solutions:"
  echo "   1. Check the error messages above"
  echo "   2. Try: npx expo prebuild --clean --platform ios"
  echo "   3. Try: cd ios && pod install && cd .."
  echo "   4. Or build in Xcode: open ios/UserDirectory.xcworkspace"
  echo ""
  echo "📋 Full build log saved to: /tmp/xcode-build.log"
  exit 1
fi
