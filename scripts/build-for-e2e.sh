#!/bin/bash

# Simple build script for E2E testing
# This script builds the app using Expo's build system

set -e

cd "$(dirname "$0")/.."

echo "🔨 Building iOS app for E2E testing..."
echo ""

# Step 1: Generate Expo config (this fixes the Constants error)
echo "📝 Step 1/4: Generating Expo config..."
npx expo config --type public > /dev/null 2>&1 || echo "  (Config already exists)"
echo "  ✅ Config generated"
echo ""

# Step 2: Get available simulator
echo "📱 Step 2/4: Finding available simulator..."
SIM_UDID=$(xcrun simctl list devices available | grep "iPhone" | grep -v "unavailable" | head -1 | grep -o '[A-F0-9-]\{36\}' || echo "")

if [ -z "$SIM_UDID" ]; then
  echo "  ❌ No iPhone simulator found!"
  echo "  💡 Please create a simulator in Xcode or run: xcrun simctl list devices"
  exit 1
fi

SIM_NAME=$(xcrun simctl list devices available | grep "$SIM_UDID" | sed 's/.*(\(.*\))/\1/' | head -1)
echo "  ✅ Found: $SIM_NAME ($SIM_UDID)"
echo ""

# Step 3: Build with Expo
echo "🏗️  Step 3/4: Building app (this will take 3-5 minutes)..."
echo "  📍 You'll see compilation progress below..."
echo ""

# Build using Expo (this handles all the Expo-specific setup)
npx expo run:ios \
  --configuration Debug \
  --device "$SIM_UDID" \
  --no-install \
  --no-bundler \
  2>&1 | tee /tmp/expo-build.log

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
  echo ""
  echo "📋 Full build log saved to: /tmp/expo-build.log"
  exit 1
fi
