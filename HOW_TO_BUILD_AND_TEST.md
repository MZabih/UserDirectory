# 🚀 How to Build & Test - Simple Guide

## 📖 About This Document

**Purpose:** Step-by-step guide for **building the iOS/Android app** and running tests.

**When to use this:**
- ✅ You need to build the app (for development, testing, or E2E)
- ✅ Build is failing and you need troubleshooting
- ✅ You want to understand the build process
- ✅ You need to configure Xcode settings

**Related documents:**
- **[E2E_TESTING.md](./E2E_TESTING.md)** - Detailed E2E testing guide (test structure, test IDs, Detox config)
- **[README.md](./README.md)** - Project overview and quick start

**Note:** This guide covers building for **all purposes** (development, unit tests, E2E tests). For E2E-specific details, see [E2E_TESTING.md](./E2E_TESTING.md).

---

## ⚠️ Important: Build in Xcode (Recommended)

Due to Expo SDK 54 build issues, **building directly in Xcode is the most reliable method.**

**🔴 CRITICAL FIRST STEP:** Before building, you **MUST** configure Xcode's DerivedData path (see Step 4 below). Without this, Detox tests will fail with "Info.plist not found" or "bundle identifier" errors.

### Step-by-Step Xcode Build:

#### 1. Open Project in Xcode

```bash
open ios/UserDirectory.xcworkspace
```

**Important:** Open the `.xcworkspace` file, NOT the `.xcodeproj` file!

#### 2. Select Simulator

1. At the top of Xcode, click the device selector (next to the play button)
2. Choose **"iPhone 15 Pro"** (or any iPhone simulator)
3. **Important:** Make sure it says "iPhone 15 Pro" (simulator), NOT a physical device!

#### 3. Build the App

1. Press **⌘ + B** (Command + B) to build
   - OR click **Product → Build** in the menu

2. **Wait for build to complete** (3-5 minutes)
   - You'll see progress in the top bar
   - Look for "Build Succeeded" ✅

#### 4. Configure Xcode DerivedData Path (REQUIRED!)

**⚠️ IMPORTANT: You MUST change this before building, or Detox tests will fail!**

**Problem:** 
- Xcode's default DerivedData path is: `~/Library/Developer/Xcode/DerivedData/`
- Detox expects the app at: `ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app`
- Building to default location causes:
  - App not found errors
  - Missing or unprocessed Info.plist (variables like `$(PRODUCT_BUNDLE_IDENTIFIER)` not replaced)
  - Detox can't find the app bundle

**Solution: Change Xcode DerivedData Path**

1. In Xcode: **Xcode → Settings** (or **Preferences** on older versions)
2. Go to **Locations** tab
3. Under **Derived Data**, you'll see the current path (default: `~/Library/Developer/Xcode/DerivedData/`)
4. Click the **arrow** (→) next to the path to open Finder
5. Navigate to your project folder
6. Set the path to: `ios/build` (relative to your project root)
   - Example: If your project is at `/path/to/UserDirectory/`, set it to `/path/to/UserDirectory/ios/build`
   - You can type this directly or navigate in Finder
7. Close Settings

**After changing the path:**
1. **Clean build folder:** Product → Clean Build Folder (⌘ + Shift + K)
2. **Rebuild:** Press ⌘ + B
3. **Verify:** Check that app is at `ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app/`

**Why this is required:**
- ✅ Xcode builds directly to where Detox expects it
- ✅ Info.plist is properly processed (all variables replaced)
- ✅ No manual copying needed
- ✅ Consistent build location every time

#### 5. Verify Build Succeeded

After building, check:

```bash
ls -la ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app/Info.plist
```

**If file exists:** ✅ Build successful!

**If not found or Info.plist is missing:** 

This means the build didn't properly process Info.plist. Try:

1. **Configure Xcode DerivedData path** (Step 4 above) - This is the most reliable fix
2. **Clean and rebuild:**
   - In Xcode: **Product → Clean Build Folder** (⌘ + Shift + K)
   - Rebuild: **⌘ + B**
3. **Check Xcode build settings:**
   - In Xcode: Select project → Target "UserDirectory" → Build Settings
   - Search for "Info.plist"
   - Verify `INFOPLIST_FILE` is set to `UserDirectory/Info.plist`
4. **Manual workaround (if above doesn't work):**
   ```bash
   # Copy Info.plist manually to built app
   cp ios/UserDirectory/Info.plist ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app/
   
   # Replace build variables with actual values (required!)
   /usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier com.anonymous.UserDirectory" \
     -c "Set :CFBundleExecutable UserDirectory" \
     -c "Set :CFBundleName UserDirectory" \
     -c "Set :CFBundleDevelopmentRegion en" \
     -c "Set :CFBundlePackageType APPL" \
     ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app/Info.plist
   ```
   **Note:** This is a temporary fix. The proper solution is configuring DerivedData path so Xcode processes Info.plist correctly.

#### 6. Run E2E Tests

Once the build succeeds:

```bash
npm run test:e2e:ios
```

### 🎯 Quick Xcode Summary

```bash
# 1. Open in Xcode
open ios/UserDirectory.xcworkspace

# 2. In Xcode: Press ⌘ + B to build

# 3. Wait for "Build Succeeded" ✅

# 4. Run tests
npm run test:e2e:ios
```

### 🐛 If Build Fails in Xcode

#### Common Fixes (Try in order):

1. **Clean Build Folder:**
   - In Xcode: **Product → Clean Build Folder** (⌘ + Shift + K)

2. **Reinstall Pods:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Fix Scheme Configuration (If build still fails):**
   
   Sometimes Xcode schemes get corrupted or aren't properly shared. Here's how to fix it:
   
   **Option A: Create/Share Scheme (Recommended)**
   - In Xcode: **Product → Scheme → Manage Schemes**
   - Find `UserDirectory` scheme
   - Check ✅ **Shared** checkbox
   - Click **Close**
   - Try building again (⌘ + B)
   
   **Option B: Recreate Scheme (If Option A doesn't work)**
   - In Xcode: **Product → Scheme → Manage Schemes**
   - Select `UserDirectory` scheme
   - Click **-** to delete it
   - Click **+** to create new scheme
   - Name: `UserDirectory`
   - Target: `UserDirectory`
   - Check ✅ **Shared**
   - Click **OK**
   - Try building again (⌘ + B)

4. **If still failing, try:**
   ```bash
   # Clean everything
   rm -rf ios/build
   cd ios && pod deintegrate && pod install && cd ..
   
   # Then rebuild in Xcode (⌘ + B)
   ```

**Note:** Detox doesn't require a Unit Testing Bundle target. If creating one helped, it was likely because creating/sharing the scheme fixed the Xcode configuration, not because the test target itself was needed.

**This is the most reliable way to build for E2E testing!** 🚀

---

## 📋 Alternative: Build via Command Line

### Step 1: Build the App

Open your terminal and run:

```bash
npm run build:e2e:ios
```

**Note:** This may fail with:
- Expo Constants error → Use Xcode method above
- **ReactCodegen errors** (missing generated files) → **Use Xcode GUI instead** - codegen runs more reliably in Xcode

**What happens:**
- ✅ Generates Expo config files (fixes the error you saw)
- ✅ Finds an available iPhone simulator automatically
- ✅ Builds the app (you'll see progress in the terminal)
- ✅ Shows you when it's done

**Time:** 3-5 minutes (first time)

**What you'll see:**
```
🔨 Building iOS app for E2E testing...

📝 Step 1/4: Generating Expo config...
  ✅ Config generated

📱 Step 2/4: Finding available simulator...
  ✅ Found: iPhone 15 Pro (06271431-...)

🏗️  Step 3/4: Building app (this will take 3-5 minutes)...
  📍 You'll see compilation progress below...
  
[Lots of compilation output...]

✅ Step 4/4: Verifying build...
  ✅ Build SUCCESSFUL!
  
📍 App location:
   ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app

🚀 Ready to run E2E tests!
   Run: npm run test:e2e:ios
```

---

### Step 2: Check If Build Succeeded

After the build finishes, you'll see either:

**✅ SUCCESS:**
```
✅ Build SUCCESSFUL!
🚀 Ready to run E2E tests!
```

**❌ FAILED:**
```
❌ Build FAILED
💡 Common solutions:
   1. Check the error messages above
   2. Try: npx expo prebuild --clean --platform ios
```

---

### Step 3: Run E2E Tests

Once the build succeeds, run:

```bash
npm run test:e2e:ios
```

**What happens:**
- 📱 Simulator launches automatically
- 📦 App installs on simulator
- 🧪 Tests run automatically
- 📊 Results shown in terminal

---

## 🔍 How to Monitor Build Progress

### While Building:

The terminal will show you:
- **"Compiling..."** messages
- **File names** being compiled
- **Progress** as it builds

**Don't close the terminal!** You'll see everything happening in real-time.

### Check Build Status:

You can check if the build is done by running:

```bash
ls -la ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app/Info.plist
```

**If file exists:** ✅ Build succeeded!
**If error:** ⏳ Still building or failed

---

## 📍 Where Is the Built App?

The built app is located at:

```
ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app
```

This is a **folder** (not a file) that contains your complete iOS app.

---

## 🐛 Troubleshooting

### Build Takes Too Long?

**Normal:** First build = 3-5 minutes
**If longer than 10 minutes:** Check terminal for errors

### Build Failed with "Constants" Error?

The new script should fix this automatically. If it still fails:

```bash
# Clean and rebuild
npx expo prebuild --clean --platform ios
cd ios && pod install && cd ..
npm run build:e2e:ios
```

**Or use Xcode method above** - it's more reliable!

### Build Failed with "ReactCodegen" / "Build input file cannot be found" Errors?

**Error looks like:**
```
error: Build input file cannot be found: 
'/Users/.../ios/build/generated/ios/react/renderer/components/rnscreens/States.cpp'
```

**This is a React Native New Architecture codegen issue.** Codegen files aren't being generated when building from command line.

**Solution: Use Xcode GUI (Recommended)**
```bash
# Open in Xcode
open ios/UserDirectory.xcworkspace

# In Xcode: Press ⌘ + B to build
# Xcode handles codegen automatically and more reliably
```

**Why?** Xcode runs codegen build phases in the correct order, while command-line builds sometimes skip or fail codegen steps.

**Alternative: Try cleaning and rebuilding**
```bash
# Clean everything
rm -rf ios/build
cd ios && pod install && cd ..

# Try building again (may still fail - use Xcode if it does)
npm run build:e2e:ios
```

### "No simulator found" Error?

```bash
# List available simulators
xcrun simctl list devices available

# Or create one in Xcode
open -a Xcode
```

### Xcode Build Issues?

1. **Clean Build Folder:**
   - In Xcode: **Product → Clean Build Folder** (⌘ + Shift + K)

2. **Reinstall Pods:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Try building again** (⌘ + B)

---

## ✅ Quick Checklist

Before running tests, make sure:

- [ ] Build completed successfully
- [ ] You see "✅ Build SUCCESSFUL!" message
- [ ] App file exists at: `ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app/Info.plist`

Then run: `npm run test:e2e:ios`

---

## 🔄 When to Rebuild After Code Changes

### Do I Need to Rebuild?

**✅ YES - Rebuild needed for:**
- JavaScript/TypeScript code changes (src/, components, screens)
- Native code changes (iOS/Android native files)
- New dependencies (npm packages with native code)
- Configuration changes (app.json, native configs)

**❌ NO - Rebuild NOT needed for:**
- Test file changes only (e2e/*.e2e.ts)
- Documentation changes (markdown files)

**Why?** Detox runs a standalone native app. Your JavaScript code is bundled into the app during build, so JS/TS changes require a rebuild.

### Quick Rebuild Workflow

```bash
# After making code changes:

# 1. Rebuild (choose one)
#    Option A: Xcode (open workspace, press ⌘ + B)
#    Option B: npm run build:e2e:ios

# 2. Verify build
ls -la ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app/Info.plist

# 3. Run tests
npm run test:e2e:ios
```

---

## 🎯 Complete Workflow (Copy & Paste)

### Option 1: Xcode Build (Recommended)

```bash
# 1. Open in Xcode
open ios/UserDirectory.xcworkspace

# 2. In Xcode: Press ⌘ + B to build

# 3. Wait for "Build Succeeded" ✅

# 4. Run tests
npm run test:e2e:ios
```

### Option 2: Command Line Build

```bash
# 1. Build the app (watch the output!)
npm run build:e2e:ios

# 2. Wait for "✅ Build SUCCESSFUL!" (3-5 minutes)

# 3. Run tests
npm run test:e2e:ios
```

---

**That's it!** The build script will show you everything that's happening. 🚀
