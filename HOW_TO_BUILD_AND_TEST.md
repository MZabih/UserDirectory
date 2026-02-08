# 🚀 How to Build & Test - Simple Guide

## ⚠️ Important: Build in Xcode (Recommended)

Due to Expo SDK 54 build issues, **building directly in Xcode is the most reliable method.**

### Step-by-Step Xcode Build:

#### 1. Open Project in Xcode

```bash
open ios/UserDirectory.xcworkspace
```

**Important:** Open the `.xcworkspace` file, NOT the `.xcodeproj` file!

#### 2. Select Simulator

1. At the top of Xcode, click the device selector (next to the play button)
2. Choose **"iPhone 15 Pro"** (or any iPhone simulator)

#### 3. Build the App

1. Press **⌘ + B** (Command + B) to build
   - OR click **Product → Build** in the menu

2. **Wait for build to complete** (3-5 minutes)
   - You'll see progress in the top bar
   - Look for "Build Succeeded" ✅

#### 4. Verify Build Succeeded

After building, check:

```bash
ls -la ios/build/Build/Products/Debug-iphonesimulator/UserDirectory.app/Info.plist
```

**If file exists:** ✅ Build successful!

#### 5. Run E2E Tests

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

1. **Clean Build Folder:**
   - In Xcode: **Product → Clean Build Folder** (⌘ + Shift + K)

2. **Reinstall Pods:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Try building again** (⌘ + B)

**This is the most reliable way to build for E2E testing!** 🚀

---

## 📋 Alternative: Build via Command Line

### Step 1: Build the App

Open your terminal and run:

```bash
npm run build:e2e:ios
```

**Note:** This may fail with Expo Constants error. If it does, use Xcode method above.

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
