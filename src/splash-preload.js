'use strict';
const { contextBridge, ipcRenderer } = require('electron');
const i18n = require('./core/i18n');

contextBridge.exposeInMainWorld('apkstartSplash', {
  version: () => ipcRenderer.invoke('splash:version'),
  isFirstRun: () => ipcRenderer.invoke('splash:isFirstRun'),
  bundled: () => ipcRenderer.invoke('splash:bundled'),
  onProgress: (cb) => { ipcRenderer.on('splash:progress', (_e, p) => cb(p)); },
  onDone: (cb) => { ipcRenderer.on('splash:done', () => cb()); },
  close: () => ipcRenderer.send('splash:close'),
  t: (key, params) => i18n.t(key, params),
  getLocale: () => ipcRenderer.invoke('i18n:getLocale'),
  getDictionaries: () => i18n.getDictionaries(),
});
