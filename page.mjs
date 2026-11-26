import { renderSections } from './sections.mjs';

const copy = {
  en: {
    title: 'Marc Choi | Korean Conversation',
    description: 'Practice Korean with Marc Choi through daily life, games, and technology. Build everyday conversations at your own pace.',
    brand: 'Korean conversation', navLabel: 'Main navigation', languageLabel: 'Language',
    menu: 'Menu', skip: 'Skip to content', headerCta: 'Explore lessons',
    nav: ['Lessons', 'Topics', 'About', 'Video', 'FAQ'],
    kicker: 'Korean conversation with Marc Choi',
    headline: 'Practice Korean<br>through the things<br><em>you enjoy.</em>',
    intro: 'Hi, I’m Marc Choi, a native Korean speaker with a background in game design and development. We can talk about daily life, travel, games, and technology—with time to try again and find more natural expressions.',
    shortIntro: 'Hi, I’m Marc Choi, a native Korean speaker with a background in game design. If you can read Hangul and make short sentences, let’s talk about daily life, travel, or the games you enjoy.',
    primary: 'Explore conversation lessons', secondary: 'Meet Marc',
    audienceLabel: 'Who it’s for',
    audience: 'A good fit if you can read Hangul and want to turn short sentences into everyday conversations.',
    alt: 'Portrait of Marc Choi wearing a dark jacket and a striped tie',
    preview: 'Watch the intro', previewKind: 'AI-narrated preview', recordedKind: 'Introduction video',
    lessonKicker: 'The lessons', lessonTitle: 'Turn short sentences into conversation.',
    lessons: [
      ['You can read Hangul.', 'You can read Korean and make short sentences.'],
      ['You want more speaking practice.', 'You want to turn those sentences into everyday conversations.'],
      ['You learn through your interests.', 'You enjoy talking about familiar topics, from daily life to games and technology.'],
    ],
    back: 'Back to top',
  },
  ko: {
    title: 'Marc Choi | 마크와 함께하는 한국어 회화',
    description: '마크와 함께 일상, 게임, IT처럼 좋아하는 주제로 한국어를 연습하세요. 짧은 문장에서 시작해 자신의 속도로 대화를 이어 가 보세요.',
    brand: '한국어 회화', navLabel: '주 메뉴', languageLabel: '언어',
    menu: '메뉴', skip: '본문 바로가기', headerCta: '수업 알아보기',
    nav: ['수업', '대화 주제', '마크 소개', '영상', 'FAQ'],
    kicker: '마크와 함께하는 한국어 회화',
    headline: '좋아하는 이야기로,<br>한국어 대화를<br><em>시작하세요.</em>',
    intro: '안녕하세요, 마크입니다. 저는 게임 기획과 개발을 해 온 한국어 원어민입니다. 일상이나 여행처럼 익숙한 이야기부터 게임과 IT까지, 여러분이 즐겁게 말할 수 있는 주제로 한국어 회화를 연습합니다.',
    shortIntro: '안녕하세요, 마크입니다. 저는 게임을 기획하고 개발해 온 한국어 원어민입니다. 한글을 읽고 짧은 문장을 만들 수 있다면 일상, 여행, 좋아하는 게임 이야기로 한국어 대화를 시작해 보세요.',
    primary: '수업 알아보기', secondary: '마크 소개 보기',
    audienceLabel: '이런 분께 추천해요',
    audience: '한글을 읽고 짧은 문장을 만들 수 있다면, 이제 자연스러운 대화로 이어 가 보세요.',
    alt: '짙은색 재킷에 줄무늬 넥타이를 착용한 마크(Marc Choi)의 사진',
    preview: '소개 영상 보기', previewKind: 'AI 내레이션 미리보기', recordedKind: '소개 영상',
    lessonKicker: '수업 소개', lessonTitle: '짧은 문장에서 자연스러운 대화로.',
    lessons: [
      ['한글을 읽을 수 있어요.', '한글을 읽고 짧은 문장을 만들 수 있는 분.'],
      ['말하기 연습이 필요해요.', '알고 있는 표현을 실제 대화로 이어 가고 싶은 분.'],
      ['관심 있는 주제로 배우고 싶어요.', '일상부터 게임과 IT까지 익숙한 이야기를 나누고 싶은 분.'],
    ],
    back: '맨 위로',
  },
};

const paths = {
  brand: '<path fill="#57816c" d="M12 12h13a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6h-1v4l-6-4h-6a6 6 0 0 1-6-6v-5a6 6 0 0 1 6-6Z"/><path fill="#1e4937" stroke="var(--paper)" stroke-width="1.2" d="M8 2h13a7 7 0 0 1 7 7v5a7 7 0 0 1-7 7h-8l-8 5v-6a6 6 0 0 1-4-6V9a7 7 0 0 1 7-7Z"/><g fill="#f9f7eb"><circle cx="9" cy="11.7" r="1.55"/><circle cx="15" cy="11.7" r="1.55"/><circle cx="21" cy="11.7" r="1.55"/></g>',
  book: '<path d="M2.5 5.3C6 4.2 9.2 5 12 7c2.8-2 6-2.8 9.5-1.7V19c-3.5-1.1-6.7-.2-9.5 1.6-2.8-1.8-6-2.7-9.5-1.6zM12 7v13"/>',
  speech: '<path d="M4 4h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4.5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M19 9h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-.5V23l-4-3H11"/><path d="M6 9h7"/>',
  game: '<path d="M8.5 5.5h7c3.7 0 4.8 1.8 5.7 5.3l1.1 5.5c.7 3.2-1.7 4.5-3.7 2.7l-3.1-2.7h-7L5.4 19c-2 1.8-4.4.5-3.7-2.7l1.1-5.5c.9-3.5 2-5.3 5.7-5.3Z"/><path d="M7.5 9v5M5 11.5h5"/><circle cx="16" cy="12.2" r=".9"/><circle cx="18.5" cy="9.6" r=".9"/>',
  play: '<path fill="currentColor" stroke="none" d="M8 4.8c0-.8.8-1.1 1.5-.7l11 7.1c.7.5.7 1.2 0 1.6l-11 7.1c-.7.4-1.5.1-1.5-.7Z"/>',
  menu: '<path d="M3 7h18M3 12h18M3 17h18"/>',
  up: '<path d="m5 14 7-7 7 7"/>',
};

function icon(name) {
  const brand = name === 'brand';
  return `<svg viewBox="0 0 ${brand ? '34 35' : '24 24'}" aria-hidden="true" focusable="false" fill="none" ${brand ? '' : 'stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"'}>${paths[name]}</svg>`;
}

function wordmark(t) {
  return `<a class="brand" href="#top">${icon('brand')}<span class="brand-type"><strong>Marc Choi</strong><small>${t.brand}</small></span></a>`;
}

function header(lang, t) {
  const sections = ['lessons', 'topics', 'about', 'video', 'faq'];
  return `<header class="site-header"><div class="container header-inner">
    ${wordmark(t)}
    <nav class="main-nav" id="main-nav" aria-label="${t.navLabel}">${sections.map((id, i) => `<a href="#${id}">${t.nav[i]}</a>`).join('')}</nav>
    <div class="header-actions">
      <nav class="languages" aria-label="${t.languageLabel}">${[['en','EN','index.html'],['ko','한국어','ko.html']].map(([key, label, file]) => `<a href="./${file}" data-locale="${key}" lang="${key}" hreflang="${key}" ${lang === key ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
      <a class="header-cta" href="#lessons">${t.headerCta}</a>
      <button class="menu-toggle" type="button" aria-label="${t.menu}" aria-controls="main-nav" aria-expanded="false">${icon('menu')}</button>
    </div>
  </div></header>`;
}

function hero(t, video) {
  const duration = Math.round(video.durationSeconds);
  const durationLabel = Number.isFinite(duration) && duration > 0
    ? ` · ${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}` : '';
  return `<section class="hero container" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="eyebrow hero-eyebrow">${t.kicker}</p>
      <h1 id="hero-title">${t.headline}</h1>
      <p class="hero-intro"><span class="wide-copy">${t.intro}</span><span class="compact-copy">${t.shortIntro}</span></p>
      <div class="hero-actions"><a href="#lessons" class="button">${icon('book')}<span class="wide-copy">${t.primary}</span><span class="compact-copy">${t.headerCta}</span></a><a class="plain-link" href="#about">${t.secondary}</a></div>
    </div>
    <div class="portrait-scene">
      <div class="notepaper" aria-hidden="true"></div>
      <figure class="photograph">
        <span class="photo-tape" aria-hidden="true"></span>
        <img src="./assets/images/marc-choi-portrait.jpg" alt="${t.alt}" width="212" height="284" fetchpriority="high">
        <figcaption>Marc Choi</figcaption>
      </figure>
      <span class="greeting" lang="ko">안녕하세요!</span>
      <a class="intro-ticket" href="#video"><span class="play-disc">${icon('play')}</span><span><strong>${t.preview}</strong><small>${video.kind === 'ai-narrated-still-preview' ? t.previewKind : t.recordedKind}${durationLabel}</small></span></a>
    </div>
  </section>
  <aside class="audience"><div class="container audience-inner"><span class="audience-label">${icon('speech')}${t.audienceLabel}</span><p>${t.audience}</p></div></aside>`;
}

function lessons(t) {
  const icons = ['<span class="hangul" lang="ko" aria-hidden="true">가</span>', icon('speech'), icon('game')];
  return `<section class="section container lessons" id="lessons" aria-labelledby="lessons-title">
    <p class="eyebrow">${t.lessonKicker}</p><h2 class="section-title" id="lessons-title">${t.lessonTitle}</h2>
    <div class="lesson-grid">${t.lessons.map(([title, body], i) => `<article class="lesson-card"><span class="lesson-icon">${icons[i]}</span><h3>${title}</h3><p>${body}</p></article>`).join('')}</div>
  </section>`;
}

export function renderPage(lang, config, transcript) {
  const t = copy[lang];
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f8f6ef">
  <title>${t.title}</title>
  <meta name="description" content="${t.description}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'ko_KR'}">
  <meta property="og:title" content="${t.title}">
  <meta property="og:description" content="${t.description}">
  <meta property="og:image" content="https://emptypizza.github.io/italki/${config.video.poster.replace(/^\.\//,'')}">
  <link rel="alternate" hreflang="en" href="./index.html">
  <link rel="alternate" hreflang="ko" href="./ko.html">
  <link rel="icon" type="image/svg+xml" href="./assets/favicon.svg">
  <link rel="stylesheet" href="./styles.css">
  <link rel="stylesheet" href="./sections.css">
  <script src="./app.js" defer></script>
</head>
<body id="top">
  <a class="skip-link" href="#main">${t.skip}</a>
  ${header(lang, t)}
  <main id="main" tabindex="-1">
    ${hero(t, config.video)}
    ${lessons(t)}
    ${renderSections(lang, config, transcript).trim()}
  </main>
  <footer class="site-footer"><div class="container">${wordmark(t)}<a class="back-top" href="#top">${t.back}${icon('up')}</a></div></footer>
</body></html>\n`;
}
