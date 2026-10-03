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

  function addPreferencesButton() {
    if (!currentConsent || document.getElementById('analytics-consent-settings')) return
    var button = document.createElement('button')
    button.id = 'analytics-consent-settings'
    button.className = 'analytics-consent-settings'
    button.type = 'button'
    button.textContent = 'Privacidade'
    button.addEventListener('click', showPreferences)
    document.body.appendChild(button)
  }

  function showPreferences() {
    if (document.getElementById('analytics-consent-dialog')) return
    var dialog = document.createElement('section')
    dialog.id = 'analytics-consent-dialog'
    dialog.className = 'analytics-consent'
    dialog.setAttribute('role', 'dialog')
    dialog.setAttribute('aria-modal', 'true')
    dialog.setAttribute('aria-labelledby', 'analytics-consent-title')
    dialog.innerHTML =
      '<div class="analytics-consent__content">' +
        '<strong id="analytics-consent-title">Sua privacidade importa</strong>' +
        '<p>Usamos o Google Analytics para entender as visitas e melhorar o site. As métricas só são ativadas após sua autorização, sem uso para publicidade.</p>' +
        '<a href="/privacidade.html">Leia a Política de Privacidade</a>' +
      '</div>' +
      '<div class="analytics-consent__actions">' +
        '<button type="button" data-consent="denied">Recusar métricas</button>' +
        '<button type="button" class="analytics-consent__accept" data-consent="granted">Aceitar métricas</button>' +
        (currentConsent ? '<button type="button" class="analytics-consent__close" data-consent-close>Fechar</button>' : '') +
      '</div>'
    dialog.querySelectorAll('[data-consent]').forEach(function (button) {
      button.addEventListener('click', function () {
        saveConsent(button.getAttribute('data-consent'))
        closeDialog()
        addPreferencesButton()
      })
    })
    var closeButton = dialog.querySelector('[data-consent-close]')
    if (closeButton) closeButton.addEventListener('click', closeDialog)
    document.body.appendChild(dialog)
    window.requestAnimationFrame(function () {
      var firstButton = dialog.querySelector('button')
      if (firstButton && document.body.contains(dialog)) firstButton.focus()
    })
  }

  window.DrEvaldoAnalytics = {
    isGranted: function () { return currentConsent === 'granted' },
    showPreferences: showPreferences,
    trackEvent: function (eventName, parameters) {
      if (currentConsent !== 'granted') return
      loadAnalytics()
      window.gtag('event', eventName, parameters || {})
    },
  }

  if (currentConsent === 'granted') loadAnalytics()

  function initializeConsentUi() {
    if (currentConsent) addPreferencesButton()
    else showPreferences()
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeConsentUi)
  else initializeConsentUi()
})()
