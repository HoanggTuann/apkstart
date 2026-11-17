'use strict';
/**
 * ApkStart 前端国际化运行时
 * 自动扫描 DOM 中带有 data-i18n、data-i18n-title、data-i18n-placeholder 的元素并填充对应文本。
 */
(function () {
  const api = window.apkstart || window.apkstartSplash;

  let currentLocale = 'en-US';
  let dictionaries = {};

  function getNested(obj, path) {
    if (!obj || !path) return null;
    const parts = path.split('.');
    let cur = obj;
    for (const p of parts) {
      if (cur == null || typeof cur !== 'object') return null;
      cur = cur[p];
    }
    return cur;
  }

  function formatParams(text, params) {
    if (params == null || typeof text !== 'string') return text;
    if (Array.isArray(params)) {
      return text.replace(/\{(\d+)\}/g, (match, idx) => {
        const i = parseInt(idx, 10);
        return params[i] !== undefined ? String(params[i]) : match;
      });
    } else if (typeof params === 'object') {
      return text.replace(/\{([\w.-]+)\}/g, (match, prop) => {
        return params[prop] !== undefined ? String(params[prop]) : match;
      });
    }
    return text.replace(/\{0\}/g, String(params));
  }

  function t(key, params, fallback) {
    if (!key) return '';
    let val = getNested(dictionaries[currentLocale], key);
    if (val == null && currentLocale !== 'en-US') {
      val = getNested(dictionaries['en-US'], key);
    }
    if (val == null && currentLocale !== 'zh-CN') {
      val = getNested(dictionaries['zh-CN'], key);
    }
    if (val == null) {
      return fallback !== undefined ? fallback : key;
    }
    return formatParams(val, params);
  }

  function applyI18n(root = document) {
    if (!root) return;

    // Text content / HTML
    const elements = root.querySelectorAll('[data-i18n]');
    for (const el of elements) {
      const key = el.getAttribute('data-i18n');
      if (!key) continue;
      const text = t(key);
      if (text != null && text !== key) {
        if (text.includes('<') && text.includes('>')) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    }

    // Placeholders
    const placeholders = root.querySelectorAll('[data-i18n-placeholder]');
    for (const el of placeholders) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (!key) continue;
      const text = t(key);
      if (text != null && text !== key) {
        el.placeholder = text;
      }
    }

    // Titles
    const titles = root.querySelectorAll('[data-i18n-title]');
    for (const el of titles) {
      const key = el.getAttribute('data-i18n-title');
      if (!key) continue;
      const text = t(key);
      if (text != null && text !== key) {
        el.title = text;
      }
    }

    // HTML Lang attribute
    if (document.documentElement) {
      document.documentElement.lang = currentLocale;
    }
  }

  async function init() {
    try {
      if (api?.i18n?.getTranslations) {
        dictionaries = (await api.i18n.getTranslations()) || {};
      } else if (api?.getDictionaries) {
        dictionaries = (await api.getDictionaries()) || {};
      }

      if (api?.i18n?.getLocale) {
        const info = await api.i18n.getLocale();
        if (info?.locale) currentLocale = info.locale;
      } else if (api?.getLocale) {
        const info = await api.getLocale();
        if (info?.locale) currentLocale = info.locale;
      } else {
        // Fallback detect
        const sys = (navigator.language || '').toLowerCase();
        if (sys.startsWith('vi')) currentLocale = 'vi-VN';
        else if (sys.startsWith('zh')) currentLocale = 'zh-CN';
        else currentLocale = 'en-US';
      }
    } catch (e) {
      console.warn('[i18n-client] Init warning:', e);
    }

    applyI18n();

    if (api?.i18n?.onLanguageChange) {
      api.i18n.onLanguageChange(({ locale }) => {
        if (locale) {
          currentLocale = locale;
          applyI18n();
          window.dispatchEvent(new CustomEvent('app:locale-changed', { detail: { locale } }));
        }
      });
    }
  }

  // Export globally
  window.t = t;
  window.applyI18n = applyI18n;
  window.getI18nLocale = () => currentLocale;
  window.setI18nLocale = (loc) => {
    currentLocale = loc;
    applyI18n();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }
})();
