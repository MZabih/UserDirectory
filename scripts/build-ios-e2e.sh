#!/bin/bash
# Build script for iOS E2E testing
# Ensures Expo config is generated before building

set -e

echo "🔧 Generating Expo config..."
npx expo config --type public > /dev/null 2>&1 || true

echo "🏗️  Building iOS app for simulator..."
cd ios
xcodebuild -workspace UserDirectory.xcworkspace \
  -scheme UserDirectory \
  -configuration Debug \
  -sdk iphonesimulator \
  -derivedDataPath build \
  CODE_SIGNING_ALLOWED=NO \
  | xcpretty || xcodebuild -workspace UserDirectory.xcworkspace \
  -scheme UserDirectory \
  -configuration Debug \
  -sdk iphonesimulator \
  -derivedDataPath build \
  CODE_SIGNING_ALLOWED=NO

cd ..
echo "✅ Build complete!"
