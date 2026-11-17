# ApkStart

<p align="center"><img src="docs/images/logo.png" alt="ApkStart Logo" width="160" /></p>

<p align="center">
  <a href="README.md">简体中文</a> |
  <b>English</b> |
  <a href="README_vi.md">Tiếng Việt</a>
</p>

[![CI](https://github.com/RoutineMiku/apkstart/actions/workflows/ci.yml/badge.svg)](https://github.com/RoutineMiku/apkstart/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/RoutineMiku/apkstart?include_prereleases&sort=semver)](https://github.com/RoutineMiku/apkstart/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%2010%2F11%20x64-0078D6.svg)](#)

**Android App Runner for Windows — Run Android applications just like native Windows desktop software.**

> *Note: This project is in its early stages as an independent open-source project by the author during spare time. It is completely free, open-source, and contains no ads.*

- 🖱️ **Double-click .apk to Install**: After registering the `.apk` file association, simply double-click any APK in Windows File Explorer to parse, install, and generate desktop shortcuts automatically without opening an emulator dashboard.
- 🧩 **Dedicated Desktop Shortcuts**: High-resolution icons are extracted offline directly from inside the APK and converted to multi-size Windows `.ico` files. Double-clicking the shortcut launches the app directly, identical to native Windows apps.
- 🪟 **Apps Run in Independent Windows**: The Android runtime runs with its display enabled. ApkStart dynamically retitles the window, assigns the authentic app icon, adjusts window geometry to phone/tablet aspect ratios, and supports seamless **Fullscreen** (filling monitor height centered) and **Windowed** modes (freely resizable with persistent window dimensions per app).
- 🔍 **Searchable via Windows Search**: Each installed app automatically creates shortcuts in both Desktop and Start Menu (`Programs\ApkStart\`), allowing you to launch apps instantly by searching their names in the Start Menu, with dedicated taskbar grouping per application.
- 📁 **Seamless Two-way File Sharing**: `%USERPROFILE%\ApkStartShared` continuously synchronizes in real time with Android's `/sdcard/ApkStartShared`. Files saved inside Android apps appear immediately on your host Windows PC.
- 🪶 **Zero-Dependency Lightweight Shell**: The Electron wrapper shell contains zero third-party npm dependencies (ZIP, PNG, ICO, and Android binary XML parser are all custom hand-crafted implementations). The background runtime spins up on demand and parks automatically when idle.

![Main UI](docs/images/app.png)

```
┌────────────────────────────────────────────────────────────┐
│  Desktop Shortcut (Genuine app icon .lnk)                  │
│      │  Double click                                       │
│      ▼                                                     │
│  ApkStart.exe --launch <package_name>                      │
│      │  Runtime offline? → Auto boot (Emulator + API 34)   │
│      ▼                                                     │
│  Launch via system-resolved LAUNCHER Activity              │
│      │  18s health monitor: crash retry / reset data       │
│      ▼                                                     │
│  Emulator Window = App Window (Retitled, icon, aspect fit) │
└────────────────────────────────────────────────────────────┘
```

## Ready to Use (Prebuilt Downloads)

Both release sources contain identical binaries:

- GitHub: [github.com/RoutineMiku/apkstart/releases](https://github.com/RoutineMiku/apkstart/releases)
- Gitee: [gitee.com/daily-miku/apkstart/releases](https://gitee.com/daily-miku/apkstart/releases) (Recommended for users in mainland China)

Available Package Formats:

| Format | Filename | Best For |
|---|---|---|
| Microsoft Store | `ApkStart_<quad_version>_x64.msix` | Install via Microsoft Store. Built-in full runtime, offline ready, auto-updates handled by Store. |
| Full Portable | `ApkStart-v*-win64-full.zip` (~830 MB, extracts to ~1.3 GB) | **No installation, no waiting for downloads**: Extract and play immediately; full runtime (emulator + system image) included. |
| Installer | `ApkStart-v*-Setup.exe` (~1.3 GB) | Standard Windows installer with Start Menu, Desktop shortcuts, and Uninstaller. |
| Lightweight Portable | `ApkStart-v*-win64-portable.zip` (~96 MB, extracts to ~227 MB) | Small download; downloads runtime automatically upon first launch. |

> All `ApkStart.exe` builds are stamped with branded icons and Windows version info (FileDescription = `ApkStart Android App Runner`, CompanyName = `RoutineMiku`).

### How Screen Aspect Ratio and Letterboxing Are Solved

The emulator's **physical panel orientation** (`hw.lcd.width/height`) dictates the hardware canvas. When panel orientation does not match the app's declared `screenOrientation`, Android forces a pillarboxed/letterboxed viewport with black borders that cannot be removed by altering window sizes or `wm size`.

ApkStart solves this by **offline parsing `AndroidManifest.xml` during installation**, determining whether the app is portrait or landscape (evaluating launch Activity properties and sensor overrides), and recording this in `apps.json`:

- Portrait apps (e.g., short drama/reading/TikTok apps) → 720×1280 portrait panel with 190 dpi (sw606dp), activating Android tablet split layouts.
- Landscape apps (e.g., games, video apps) → 1280×720 landscape panel.

When switching between orientation modes, the runtime restarts once (~40s), after which all apps sharing that orientation launch instantly. You can rotate anytime via the title bar button (saved per app) or lock orientation in Settings → Application Window.

### Online Updates (Fastest Mirror Auto-Selection)

Open Settings → **Software Update** → "Check for Updates", or right-click the system tray icon → "Check for Updates".

1. Concurrently queries latest releases on GitHub and Gitee, selecting whichever has the higher version tag;
2. Probes direct releases, Gitee mirrors, and public reverse proxies (256 KB speed test per candidate, measuring post-TTFB throughput);
3. Sorts by measured throughput and downloads blocks in parallel using the fastest mirror.

### Default Out-of-the-Box Behavior

- Runs in the system tray on Windows boot; double-clicking desktop shortcuts launches apps instantly.
- Automatically generates Desktop and Start Menu shortcuts with high-resolution app icons.
- Apps render natively (not screencasting): full screen scales to monitor height centered; windowed mode remembers individual window dimensions. Toggle anytime via `F11` or right-clicking tray.
- Automatically grants runtime permissions to avoid system permission popups blocking your launch.
- Uses QEMU user-mode NAT network sharing your physical host connection: **no virtual network adapters, TAP drivers, or hypervisor network switches created**.

## Building from Source

```powershell
# 1. Install dependencies (including Electron)
npm install

# 2. Start dev environment and complete runtime provisioning
npm start

# 3. (Optional) Register .apk file association
npm run assoc:on

# 4. Build portable package
npm run pack
# Output: dist/ApkStart-win64-portable/ApkStart.exe

# 5. Compress into release zip
node build/zip.js dist/ApkStart-win64-portable ApkStart-win64-portable.zip
```

### Full Standalone Installer (Zero Online Downloads on Target Machines)

```powershell
# Optimize engine runtime into distribution package (compresses system.img with xz/LZMA2 3.1GB -> 1.1GB)
npm run runtime

# Package into NSIS installer EXE
npm run build:exe
# Output: dist/release/ApkStart-<version>-Setup.exe
```

## Runtime Architecture: Fully Independent and Isolated

ApkStart is completely self-contained. All runtime components are managed under `%APPDATA%\apkstart\runtime`.

| Component | Source | Size | Purpose |
|---|---|---|---|
| adb (platform-tools) | dl.google.com official | ~8 MB | App installation, launching, and lifecycle control |
| Android Emulator | dl.google.com official (8 threads) | ~440 MB | QEMU-based VM engine with hardware acceleration & GPU translation |
| Android 14 System Image (Google Play x86_64) | dl.google.com official | ~3.1 GB (xz: ~1.1 GB) | Universal Android 14 foundation: supports x86, ARM64 translation, and GMS |
| AEHD Driver (Optional) | dl.google.com official | ~0.2 MB | Hardware virtualization acceleration driver (or native WHPX) |

### Device Compatibility & Resilience

- **Hardware Acceleration Fallback**: Automatically falls back to software emulation if virtualization is disabled, auto-retrying up to 4 fallback parameter sets.
- **Resource Optimization**: CPU cores and RAM are calculated dynamically (2–4 GB / 2–4 cores).
- **Diagnostics**: Errors are translated into clear localized explanations with repair recommendations. Export diagnostic reports directly from Settings.
- **No Conflict with Other Emulators**: ApkStart runs on an isolated port (5044) and does not interact with, hijack, or depend on MuMu, LDPlayer, BlueStacks, or WSA.

### Container-like Storage Architecture

- **Read-Only Base Layer**: `system-images/` is stored once on the machine and shared across all apps.
- **Thin Writable Layer**: A single AVD uses differential user data + named quickboot snapshots. When closing all windows, memory state is preserved into snapshots for 10-second instant resume next time.
- **Auto Data Partition Creation**: Automatically formats ext4 `/data` with file-level encryption and SELinux extended attributes using embedded `qemu-img` and `resize2fs`.
- **Command Window Suppression**: Automatically suppresses console windows (`conhost.exe`, `netsimd.exe`, `emulator.exe`) from flashing on your desktop.

## Project Structure

```
apkstart/
├─ src/
│  ├─ main.js              Main Process: windows, tray, single-instance, CLI, IPC
│  ├─ preload.js           Security bridge & renderer API exposure
│  ├─ splash-preload.js    Splash window preload & i18n
│  ├─ locales/             Multi-language translation files (zh-CN, en-US, vi-VN)
│  ├─ ui/                  Renderer layer (vanilla HTML/CSS/JS, zero frameworks)
│  │  ├─ index.html        Main application dashboard & settings
│  │  ├─ app.js            Main UI logic, app grid, settings handling
│  │  ├─ i18n-client.js    Client-side reactive i18n runtime engine
│  │  ├─ splash.html / .js First-run setup & download splash screen
│  │  └─ shell.html / .js  Standalone app container window
│  └─ core/
│     ├─ i18n.js           Node.js i18n engine with locale resolution & interpolation
│     ├─ zip.js            Lightweight streaming ZIP reader
│     ├─ axml.js           Android binary XML decoder
│     ├─ arsc.js           resources.arsc parser for app names and icons
│     ├─ apk.js            APK metadata extractor: package, icon, activity, ABI
│     ├─ png.js            Zero-dependency PNG encoder & icon generator
│     ├─ shortcut.js       Multi-resolution Windows ICO & .lnk shortcut generator
│     ├─ assoc.js          .apk file association (HKCU registry, no admin needed)
│     ├─ adb.js            Embedded ADB client
│     ├─ engine.js         Android runtime VM supervisor & snapshot manager
│     ├─ sharer.js         Host <-> Android bidirectional folder synchronization
│     ├─ installer.js      APK installation pipeline coordinator
│     └─ store.js          Application settings and metadata store
├─ engine/                 Runtime download cache (emulator, system-images)
├─ tools/platform-tools/   Portable ADB binaries
├─ test/                   Unit tests & integration tests
└─ build/pack.js           Portable distribution packaging
```

## Command Line Usage

```
ApkStart.exe                      Open main manager UI
ApkStart.exe <path\to\app.apk>    Install an APK file directly
ApkStart.exe --launch <pkg_name>  Launch an installed app in standalone window
```

## Testing

```powershell
npm test                                   # Unit tests & engine pipeline tests (offline)
npm run test:boot                          # Boot validation test using 61MB Alpine guest
npm run selftest                           # Runtime self-check: install, launch, screenshot, shared dir
electron test/electron-integration.js      # ICO & shortcut integration test
electron . --smoke test\shot.png           # Smoke screenshot test
```

## Troubleshooting FAQ

### "Hardware acceleration not enabled"

Android Emulator supports two acceleration paths on Windows:
1. **WHPX** (Windows Hypervisor Platform): Built-in Windows feature. Open Windows Features and check **Windows Hypervisor Platform**, then reboot your PC.
2. **AEHD** (Android Emulator Hypervisor Driver): Google kernel driver. Click "Fix" in ApkStart Settings → Hardware Checkup to auto-install.

### Desktop icons displaying as ApkStart logo or blank

1. Open **Settings → System Integration → Rebuild Shortcuts**;
2. Or delete the shortcut and right-click the app in ApkStart to recreate it.

### Connecting via ADB command line

ApkStart runs its dedicated ADB daemon on port **5044**:

```powershell
$env:ANDROID_ADB_SERVER_PORT = 5044
adb devices
```

*(Note: Do not run `adb connect 127.0.0.1:5555` manually, as this triggers USB authorization dialogs inside the guest system).*

## Author & Community

ApkStart is created and maintained by **RoutineMiku**.

- GitHub: <https://github.com/RoutineMiku/apkstart>
- Gitee: <https://gitee.com/daily-miku/apkstart>

<p align="center"><i>Powered by <b>RoutineMiku</b></i></p>

## License

[MIT](LICENSE). Distribution builds contain only ApkStart code and the Electron runtime. Android system images and QEMU binaries are downloaded on-demand from official Google sources on first run by the user, respecting their respective licenses.
