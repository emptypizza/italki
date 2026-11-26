const locale = document.documentElement.lang;
const preferenceKey = 'marc-conversation-language';

function restoreLanguage() {
  // Explicit language URLs remain shareable, even when the saved preference differs.
  if (!location.pathname.endsWith('/') || locale !== 'en') return false;
  try {
    if (localStorage.getItem(preferenceKey) === 'ko') {
      location.replace(`./ko.html${location.search}${location.hash}`);
      return true;
    }
  } catch {
    // The static pages and language links work with browser storage disabled.
  }
  return false;
}

function setupLanguageLinks() {
  const links = document.querySelectorAll('[data-locale]');
  const updateDestinations = () => {
    for (const link of links) {
      link.hash = location.hash;
      link.search = location.search;
    }
  };
  updateDestinations();
  window.addEventListener('hashchange', updateDestinations);
  for (const link of links) {
    link.addEventListener('click', () => {
      updateDestinations();
      try {
        localStorage.setItem(preferenceKey, link.dataset.locale);
      } catch {
        // Navigation uses the anchor's real URL.
      }
    });
  }
}

function setupMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById(toggle.getAttribute('aria-controls'));
  const compact = matchMedia('(max-width: 49rem)');
  const setOpen = open => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    setOpen(open);
    if (open) nav.querySelector('a').focus();
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) setOpen(false);
  });
  compact.addEventListener('change', () => setOpen(false));
  document.documentElement.classList.add('menu-ready');
}

function setupTopics() {
  const list = document.querySelector('[data-topic-list]');
  const tabs = [...list.querySelectorAll('[data-topic]')];
  const panels = tabs.map(tab => document.getElementById(tab.hash.slice(1)));
  list.setAttribute('role', 'tablist');
  function select(index) {
    tabs.forEach((tab, i) => {
      const selected = index === i;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
  }

  function selectByHash() {
    const index = tabs.findIndex(tab => tab.hash === location.hash);
    if (index >= 0) select(index);
  }

  function changeTopic(index) {
    select(index);
    // Preserve a shareable example without moving focus or scrolling to the sheet.
    const url = new URL(location.href);
    url.hash = panels[index].id;
    history.replaceState(null, '', url);
    for (const link of document.querySelectorAll('[data-locale]')) link.hash = url.hash;
  }

  tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[i].id);
    panels[i].setAttribute('role', 'tabpanel');
    panels[i].setAttribute('aria-labelledby', tab.id);
    panels[i].tabIndex = 0;
    tab.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      changeTopic(i);
    });
    tab.addEventListener('keydown', event => {
      const keys = {
        ArrowRight: (i + 1) % tabs.length,
        ArrowLeft: (i + tabs.length - 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      };
      if (event.key === ' ') {
        event.preventDefault();
        changeTopic(i);
      } else if (Object.hasOwn(keys, event.key)) {
        event.preventDefault();
        changeTopic(keys[event.key]);
        tabs[keys[event.key]].focus();
      }
    });
  });
  select(0);
  selectByHash();
  window.addEventListener('hashchange', selectByHash);
}

if (!restoreLanguage()) {
  setupLanguageLinks();
  setupMenu();
  setupTopics();
}
