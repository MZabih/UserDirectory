#!/bin/bash

echo "🔍 Checking build status..."
echo ""

BUILD_PATH="ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app/Info.plist"

if [ -f "$BUILD_PATH" ]; then
  echo "✅ Build is READY!"
  echo ""
  echo "📍 App location:"
  echo "   ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app"
  echo ""
  echo "📊 App size:"
  du -sh ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app 2>/dev/null
  echo ""
  echo "🚀 You can now run:"
  echo "   npm run test:e2e:ios"
else
  echo "⏳ Build is still in progress or failed..."
  echo ""
  echo "💡 To build the app, run:"
  echo "   npm run build:e2e:ios"
  echo ""
  echo "💡 To check build progress, look at the terminal where you ran the build command"
fi
