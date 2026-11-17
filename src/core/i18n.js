'use strict';
/**
 * ApkStart 国际化 (i18n) 模块
 * 支持语言：zh-CN (简体中文), en-US (English), vi-VN (Tiếng Việt)
 */
const fs = require('fs');
const path = require('path');

const SUPPORTED_LOCALES = ['zh-CN', 'en-US', 'vi-VN'];
const DEFAULT_LOCALE = 'en-US';

let cachedDictionaries = null;

function loadDictionaries() {
  if (cachedDictionaries) return cachedDictionaries;
  const localesDir = path.join(__dirname, '..', 'locales');
  const dicts = {};
  for (const loc of SUPPORTED_LOCALES) {
    try {
      const file = path.join(localesDir, `${loc}.json`);
      if (fs.existsSync(file)) {
        dicts[loc] = JSON.parse(fs.readFileSync(file, 'utf8'));
      }
    } catch (e) {
      console.error(`[i18n] Failed to load locale file for ${loc}:`, e.message);
    }
  }
  cachedDictionaries = dicts;
  return dicts;
}

/**
 * 检测系统默认语言
 */
function detectSystemLocale() {
  try {
    const { app } = require('electron');
    if (app && typeof app.getLocale === 'function') {
      const sys = String(app.getLocale() || '').toLowerCase();
      if (sys.startsWith('vi')) return 'vi-VN';
      if (sys.startsWith('zh')) return 'zh-CN';
      return 'en-US';
    }
  } catch (_) { /* ignore if electron app is not ready */ }

  try {
    const envLang = String(process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LANG || '').toLowerCase();
    if (envLang.startsWith('vi')) return 'vi-VN';
    if (envLang.startsWith('zh')) return 'zh-CN';
  } catch (_) {}

  try {
    const intlLoc = String(Intl.DateTimeFormat().resolvedOptions().locale || '').toLowerCase();
    if (intlLoc.startsWith('vi')) return 'vi-VN';
    if (intlLoc.startsWith('zh')) return 'zh-CN';
  } catch (_) {}

  return DEFAULT_LOCALE;
}

/**
 * 解析用户当前设置的语言
 */
function resolveLocale(langSetting) {
  if (!langSetting || langSetting === 'auto') {
    return detectSystemLocale();
  }
  if (SUPPORTED_LOCALES.includes(langSetting)) {
    return langSetting;
  }
  return DEFAULT_LOCALE;
}

/**
 * 从对象中通过点分路径提取文本
 */
function getNestedValue(obj, keyPath) {
  if (!obj || !keyPath) return null;
  const parts = keyPath.split('.');
  let cur = obj;
  for (const part of parts) {
    if (cur == null || typeof cur !== 'object') return null;
    cur = cur[part];
  }
  return cur;
}

/**
 * 翻译字符串
 * @param {string} key 键名，例如 "settings.title"
 * @param {Array|object} [params] 占位参数
 * @param {string} [locale] 指定语言（可选）
 */
function t(key, params, locale) {
  const dicts = loadDictionaries();
  const targetLocale = locale || resolveLocale(getCurrentLanguageSetting());
  
  // 查找目标语言 -> 英文 -> 中文
  let val = getNestedValue(dicts[targetLocale], key);
  if (val == null && targetLocale !== 'en-US') {
    val = getNestedValue(dicts['en-US'], key);
  }
  if (val == null && targetLocale !== 'zh-CN') {
    val = getNestedValue(dicts['zh-CN'], key);
  }

  if (val == null) return key;

  if (Array.isArray(val)) return val;
  if (typeof val !== 'string') return val;

  // 格式化参数 {0}, {1} 或 {key}
  if (params != null) {
    if (Array.isArray(params)) {
      return val.replace(/\{(\d+)\}/g, (match, idx) => {
        const i = parseInt(idx, 10);
        return params[i] !== undefined ? String(params[i]) : match;
      });
    } else if (typeof params === 'object') {
      return val.replace(/\{([\w.-]+)\}/g, (match, prop) => {
        return params[prop] !== undefined ? String(params[prop]) : match;
      });
    } else {
      return val.replace(/\{0\}/g, String(params));
    }
  }

  return val;
}

let currentLangSetting = 'auto';

function setCurrentLanguageSetting(lang) {
  currentLangSetting = lang || 'auto';
}

function getCurrentLanguageSetting() {
  return currentLangSetting;
}

function getDictionaries() {
  return loadDictionaries();
}

module.exports = {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  loadDictionaries,
  detectSystemLocale,
  resolveLocale,
  setCurrentLanguageSetting,
  getCurrentLanguageSetting,
  getDictionaries,
  t,
};
