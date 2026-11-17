'use strict';
/* ApkStart 开机动画脚本：接收主进程的进度更新，控制淡出 */

const api = window.apkstartSplash;
if (!api) { /* preload 未注入时静默退出 */ }

const $ = (id) => document.getElementById(id);

// 版本号
api?.version?.().then((v) => { if ($('ver')) $('ver').textContent = v || ''; }).catch(() => {});

// 首次安装标记 + 组件是否随包自带
Promise.all([
  api?.isFirstRun?.().catch(() => false),
  api?.bundled?.().catch(() => false),
]).then(([first, bundled]) => {
  if (!first || !$('firstRun')) return;
  $('firstRun').hidden = false;
  const listKey = bundled ? 'splash.firstRunBundledList' : 'splash.firstRunList';
  const titleKey = bundled ? 'splash.firstRunBundledTitle' : 'splash.firstRunTitle';
  if ($('firstRunTitle')) $('firstRunTitle').textContent = window.t ? window.t(titleKey) : (bundled ? '首次启动 · 本地准备中（无需联网）' : '首次使用 · 自动配置中');
  if ($('firstRunList')) {
    const rawItems = window.t ? window.t(listKey) : null;
    const items = Array.isArray(rawItems) ? rawItems : (bundled ? [
      '运行时组件已随安装包内置，不再下载任何东西',
      '把系统镜像展开到用户目录（约 1 分钟，只需一次）',
      '准备硬件加速与中文输入法',
      '完成后双击 APK 或桌面图标即可秒开应用',
    ] : [
      '下载 Android 运行时引擎（约 200MB，只需一次）',
      '下载系统镜像（约 1.5GB，只需一次）',
      '配置硬件加速与网络',
      '完成后即可双击 APK 或桌面图标秒开应用',
    ]);
    $('firstRunList').innerHTML = items.map((it) => `<li>${it}</li>`).join('');
  }
}).catch(() => {});

// 进度更新
api?.onProgress?.((p) => {
  if (!p) return;
  if (p.percent != null && $('progressBar')) {
    $('progressBar').style.width = Math.min(100, Math.max(0, p.percent)) + '%';
  }
  if (p.message && $('status')) {
    $('status').textContent = p.message;
  }
});

// 完成 → 淡出
api?.onDone?.(() => {
  const splash = $('splash');
  if (splash) {
    splash.classList.add('out');
    setTimeout(() => { api?.close?.(); }, 520);
  }
});
