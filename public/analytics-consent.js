(function () {
  'use strict'

  var measurementId = 'G-GN5Y43B9F4'
  var storageKey = 'dr_evaldo_analytics_consent'
  var debugMode = new URLSearchParams(window.location.search).get('ga_debug') === '1'
  var currentConsent = null
  var analyticsLoaded = false

  try {
    currentConsent = window.localStorage.getItem(storageKey)
  } catch (_) {
    currentConsent = null
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments) }
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  })

  function loadAnalytics() {
    if (analyticsLoaded) return
    analyticsLoaded = true
    window.gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted',
    })
    window.gtag('set', {
      ads_data_redaction: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    })
    window.gtag('js', new Date())
    window.gtag('config', measurementId, debugMode ? { debug_mode: true } : {})

    var script = document.createElement('script')
    script.async = true
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId)
    script.dataset.analyticsConsent = 'loaded'
    document.head.appendChild(script)
  }

  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim()
      if (name === '_ga' || name.indexOf('_ga_') === 0) {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax'
        document.cookie = name + '=; Max-Age=0; path=/; domain=.' + window.location.hostname + '; SameSite=Lax'
      }
    })
  }

  function saveConsent(value) {
    var wasLoaded = analyticsLoaded
    currentConsent = value
    try { window.localStorage.setItem(storageKey, value) } catch (_) {}
    if (value === 'granted') {
      loadAnalytics()
    } else {
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      })
      clearAnalyticsCookies()
      if (wasLoaded) window.location.reload()
    }
  }

  function closeDialog() {
    var dialog = document.getElementById('analytics-consent-dialog')
    if (dialog) dialog.remove()
  }

  // Styles live here (not in each page) so the banner looks the same on every page that loads this script.
  function addStyles() {
    if (document.getElementById('analytics-consent-styles')) return
    var style = document.createElement('style')
    style.id = 'analytics-consent-styles'
    style.textContent =
      '.analytics-consent{position:fixed;z-index:10000;left:0;right:0;bottom:20px;margin-inline:auto;width:min(420px,calc(100vw - 40px));box-sizing:border-box;padding:18px 18px 16px;color:#33415c;background:#fff;border:1px solid #dbe4f3;border-radius:18px;box-shadow:0 16px 48px rgba(0,27,98,.18);font-family:inherit;font-size:.875rem;line-height:1.5;animation:analytics-consent-in .28s ease-out both}' +
      '.analytics-consent__head{display:flex;align-items:center;gap:10px;margin-bottom:8px}' +
      '.analytics-consent__icon{flex:0 0 auto;width:32px;height:32px;display:grid;place-items:center;color:#005bb7;background:#eaf2fc;border-radius:50%}' +
      '.analytics-consent__head strong{color:#001b62;font-size:.98rem;line-height:1.25;letter-spacing:-.01em}' +
      '.analytics-consent p{margin:0;text-align:left;hyphens:manual}' +
      '.analytics-consent a{color:#005bb7;font-weight:700;text-decoration:underline;text-underline-offset:2px}' +
      '.analytics-consent__actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}' +
      '.analytics-consent__actions button{min-height:44px;padding:10px 12px;border:1px solid #c9d6ea;border-radius:999px;color:#001b62;background:#fff;font-family:inherit;font-size:.84rem;font-weight:700;line-height:1.2;cursor:pointer;transition:background .18s,border-color .18s}' +
      '.analytics-consent__actions button:hover{border-color:#005bb7;background:#f3f7fd}' +
      '.analytics-consent__actions .analytics-consent__accept{color:#fff;background:#005bb7;border-color:#005bb7}' +
      '.analytics-consent__actions .analytics-consent__accept:hover{background:#004a96;border-color:#004a96}' +
      '.analytics-consent__actions button:focus-visible,.analytics-consent a:focus-visible{outline:3px solid #7fb3ea;outline-offset:2px}' +
      '.analytics-consent__actions .analytics-consent__close{grid-column:1/-1;min-height:36px;border-color:transparent;color:#4a5875;background:transparent}' +
      '@media(max-width:699px){' +
        '.analytics-consent{left:0;right:0;bottom:0;width:auto;padding:16px 16px calc(14px + env(safe-area-inset-bottom));border-width:1px 0 0;border-radius:20px 20px 0 0;box-shadow:0 -10px 32px rgba(0,27,98,.16);font-size:.84rem;animation-name:analytics-consent-up}' +
        '.analytics-consent__head{margin-bottom:6px}' +
        '.analytics-consent__icon{width:28px;height:28px}' +
        '.analytics-consent__actions{margin-top:12px}' +
      '}' +
      '@keyframes analytics-consent-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}' +
      '@keyframes analytics-consent-up{from{transform:translateY(100%)}to{transform:none}}' +
      '@media(prefers-reduced-motion:reduce){.analytics-consent{animation:none}}'
    document.head.appendChild(style)
  }

  function showPreferences(options) {
    if (document.getElementById('analytics-consent-dialog')) return
    var openedByVisitor = !(options && options.automatic)
    addStyles()
    var dialog = document.createElement('section')
    dialog.id = 'analytics-consent-dialog'
    dialog.className = 'analytics-consent'
    dialog.setAttribute('role', 'dialog')
    dialog.setAttribute('aria-modal', 'false')
    dialog.setAttribute('aria-labelledby', 'analytics-consent-title')
    dialog.setAttribute('aria-describedby', 'analytics-consent-text')
    dialog.innerHTML =
      '<div class="analytics-consent__head">' +
        '<span class="analytics-consent__icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>' +
        '<strong id="analytics-consent-title">Sua privacidade</strong>' +
      '</div>' +
      '<p id="analytics-consent-text">Usamos o Google Analytics para entender as visitas e melhorar o site, só com sua autorização e sem publicidade. <a href="/privacidade.html">Política de Privacidade</a></p>' +
      '<div class="analytics-consent__actions">' +
        '<button type="button" data-consent="denied">Recusar</button>' +
        '<button type="button" class="analytics-consent__accept" data-consent="granted">Aceitar</button>' +
        (currentConsent ? '<button type="button" class="analytics-consent__close" data-consent-close>Fechar</button>' : '') +
      '</div>'
    dialog.querySelectorAll('[data-consent]').forEach(function (button) {
      button.addEventListener('click', function () {
        saveConsent(button.getAttribute('data-consent'))
        closeDialog()
      })
    })
    var closeButton = dialog.querySelector('[data-consent-close]')
    if (closeButton) closeButton.addEventListener('click', closeDialog)
    document.body.appendChild(dialog)
    // Only move focus when the visitor opened it; the automatic first-visit banner must not steal focus.
    if (openedByVisitor) window.requestAnimationFrame(function () {
      var firstButton = dialog.querySelector('button')
      if (firstButton && document.body.contains(dialog)) firstButton.focus()
    })
  }

  window.DrEvaldoAnalytics = {
    isGranted: function () { return currentConsent === 'granted' },
    showPreferences: function () { showPreferences() },
    trackEvent: function (eventName, parameters) {
      if (currentConsent !== 'granted') return
      loadAnalytics()
      window.gtag('event', eventName, parameters || {})
    },
  }

  if (currentConsent === 'granted') loadAnalytics()

  function initializeConsentUi() {
    // Ask on the first visit; afterwards the choice can be changed from the footer.
    if (!currentConsent) showPreferences({ automatic: true })
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeConsentUi)
  else initializeConsentUi()
})()
