// AppMobilEdition — logique du site vitrine (vanilla JS)

(function () {
  var STORE_KEY = 'ame-lang';

  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    // Lien Contact dépendant de la langue (formulaire park4night)
    var url = 'https://park4night.com/' + (lang === 'en' ? 'en' : 'fr') + '/contact';
    document.querySelectorAll('[data-contact-link]').forEach(function (a) {
      a.setAttribute('href', url);
    });
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
    var fallback = document.documentElement.getAttribute('data-lang') || 'fr';
    applyLang(saved === 'fr' || saved === 'en' ? saved : fallback);

    document.querySelectorAll('.lang-switch button[data-set]').forEach(function (btn) {
      btn.addEventListener('click', function () { applyLang(btn.getAttribute('data-set')); });
    });
  }

  function initMail() {
    // Construit l'adresse au chargement (évite la récolte par les robots)
    var addr = 'contact' + '@' + 'park4night.com';
    document.querySelectorAll('[data-mail-link]').forEach(function (a) { a.href = 'mailto:' + addr; });
    document.querySelectorAll('[data-mail-text]').forEach(function (s) { s.textContent = addr; });
  }

  function initYear() {
    var y = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(function (s) { s.textContent = y; });
  }

  function init() { initLang(); initMail(); initYear(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
