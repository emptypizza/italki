// Public copy from the handoff. Each page is rendered in full at build time.
const copy = {
  en: {
    practice: "Lesson flow",
    how: "How we practice",
    steps: [
      ["Choose a familiar topic.", "Start with something you enjoy talking about."],
      ["Take your time to speak.", "Try a short sentence and build on it."],
      ["Find a natural expression.", "Refine a sentence together and try it again."],
      ["Review a few useful phrases.", "Leave with a short set of expressions to practice."],
    ],
    examples: "Conversation examples",
    topics: "Start with something you enjoy",
    topicPrompt: "Choose a topic to see how one short sentence can become a conversation.",
    topicLabels: ["Daily life", "Games", "Ideas & technology"],
    turns: ["Start with a sentence", "Marc’s follow-up", "Build on your answer"],
    about: "Meet Marc",
    profile: [
      "Hi! I'm Marc Choi, a native Korean speaker with a background in game design and development. I studied Computer and Information Engineering at Inha University and have worked on game localization for overseas markets.",
      "I have designed tutorials that introduce new players to games step by step and organized a university game development group. I would like to bring that same clear, practical approach to Korean conversation practice.",
      "We can talk about daily life, hobbies, travel, work, or games you enjoy. If you are interested in games or technology, we can also practice explaining your ideas and projects in Korean.",
      "I will adjust the pace to your level, help you find more natural expressions, and give you time to try again. At the end of each lesson, I will share a short review of useful expressions and sentences to practice. I can also offer simple explanations in English when needed.",
      "These lessons are a good fit if you can read Hangul and want to turn short sentences into everyday conversations. Mistakes are welcome. Let's start with something you enjoy talking about!",
    ],
    fullProfile: "More about my approach",
    background: "Education and industry experience",
    experience: [
      ["Inha University", "Computer and Information Engineering · Bachelor’s degree"],
      ["Ntreev Soft", "Game design experience, including step-by-step player tutorials and content for overseas service."],
      ["KONG Studios", "Experience in game design and development."],
      ["University game development group", "Organized a university game development group."],
    ],
    video: "Introduction preview",
    recorded: "Video introduction",
    previewLabel: "AI-narrated introduction preview",
    previewNote: "This preview uses a still image and an AI-generated voice.",
    captions: "Original speech (Korean and English)",
    playFile: "Open the introduction video",
    transcript: "Read the transcript",
    faqTitle: "Questions before we begin",
    questions: [
      ["Do I need to know Hangul?", "These conversation lessons are a good fit if you can read Hangul and make short sentences. We can use those sentences to build everyday conversations."],
      ["Can you explain things in English?", "Yes. I can offer simple explanations in English when needed, while keeping Korean conversation at the center of the lesson."],
      ["What if I make mistakes?", "Mistakes are welcome. You will have time to think, try a sentence, and say it again with a more natural expression."],
      ["Do we only talk about games?", "No. We can talk about daily life, hobbies, travel, work, or other topics you enjoy. Games and technology are optional interests we can explore together."],
      ["Will I receive something to review?", "At the end of each lesson, I will share a short review of useful expressions and sentences to practice."],
    ],
    next: "Let’s start with your interests",
    preparation: "My Korean conversation lessons are in preparation. Booking details will be added here when available.",
    sample: "Explore conversation topics",
    viewProfile: "View my italki profile",
    book: "Book a lesson",
  },
  ko: {
    practice: "수업 진행 방식",
    how: "이렇게 연습해요",
    steps: [
      ["익숙한 주제 고르기", "즐겁게 말할 수 있는 이야기부터 시작합니다."],
      ["충분히 말해 보기", "짧은 문장으로 시작하고 이야기를 이어 갑니다."],
      ["자연스러운 표현 찾기", "문장을 함께 다듬고 다시 말해 봅니다."],
      ["유용한 표현 복습하기", "다시 연습할 표현과 문장을 짧게 정리합니다."],
    ],
    examples: "대화 예시",
    topics: "좋아하는 이야기로 시작해요",
    topicPrompt: "주제를 골라 보세요. 한 문장에서 시작해 질문을 주고받으며 대화를 이어 갑니다.",
    topicLabels: ["일상", "게임", "아이디어와 IT"],
    turns: ["첫 문장 말하기", "마크의 질문", "이야기 이어 가기"],
    about: "마크를 소개합니다",
    profile: [
      "안녕하세요, 마크입니다. 저는 인하대학교에서 컴퓨터정보공학을 공부했고, 게임 기획과 개발, 해외 시장을 위한 게임 현지화 관련 업무를 경험했습니다.",
      "새로운 플레이어가 게임을 차근차근 익히도록 돕는 튜토리얼을 기획했고, 대학 게임 개발 모임을 조직한 경험도 있습니다. 이런 경험을 바탕으로 한국어 회화도 이해하기 쉽고 실용적인 방식으로 함께 연습하고 싶습니다.",
      "일상생활, 취미, 여행, 일처럼 익숙한 주제로 이야기할 수 있습니다. 게임이나 IT에 관심이 있다면 좋아하는 게임이나 캐릭터, 만들고 있는 프로젝트와 아이디어를 한국어로 설명하는 연습도 할 수 있습니다.",
      "여러분의 수준에 맞춰 속도를 조절하고, 더 자연스러운 표현을 함께 찾아보겠습니다. 충분히 생각하고 다시 말할 시간을 드리며, 수업이 끝나면 복습할 표현과 문장을 짧게 정리해 드립니다. 필요하면 영어로 간단히 설명할 수도 있습니다.",
      "한글을 읽을 수 있고 짧은 문장을 실제 대화로 이어 가고 싶은 분에게 잘 맞습니다. 실수해도 괜찮습니다. 여러분이 좋아하는 이야기부터 시작해 볼까요?",
    ],
    fullProfile: "마크의 수업 이야기 더 보기",
    background: "학력과 게임 업계 경력",
    experience: [
      ["인하대학교", "컴퓨터정보공학 전공 · 학사"],
      ["엔트리브소프트", "단계별 플레이어 튜토리얼과 해외 서비스 관련 콘텐츠를 포함한 게임 기획 경험"],
      ["콩스튜디오", "게임 기획·개발 경험"],
      ["대학 게임 개발 모임", "대학 게임 개발 모임을 조직한 경험"],
    ],
    video: "소개 영상 미리보기",
    recorded: "소개 영상",
    previewLabel: "AI 음성으로 제작한 소개 영상 미리보기",
    previewNote: "정지 이미지와 AI 음성으로 구성한 소개 영상입니다.",
    captions: "원어 자막 (한국어 및 영어)",
    playFile: "소개 영상 열기",
    transcript: "대본 보기",
    faqTitle: "수업 전 자주 묻는 질문",
    questions: [
      ["한글을 알아야 하나요?", "한글을 읽고 짧은 문장을 만들 수 있는 분에게 잘 맞는 회화 연습입니다. 알고 있는 문장을 실제 대화로 이어 가 봅니다."],
      ["영어로 설명해 줄 수 있나요?", "네. 필요할 때 영어로 간단히 설명할 수 있습니다. 수업의 중심은 한국어 대화 연습입니다."],
      ["실수하면 어떻게 하나요?", "실수해도 괜찮습니다. 생각하고 말할 시간을 충분히 드리고, 더 자연스러운 표현으로 다시 말해 봅니다."],
      ["게임 이야기만 하나요?", "일상생활, 취미, 여행, 일처럼 다양한 주제로 이야기할 수 있습니다. 게임과 IT는 관심이 있을 때 함께 다룰 수 있는 주제입니다."],
      ["수업 후 복습 자료가 있나요?", "수업이 끝나면 다시 연습할 유용한 표현과 문장을 짧게 정리해 드립니다."],
    ],
    next: "여러분의 관심사로 시작해 볼까요?",
    preparation: "한국어 회화 수업을 준비하고 있습니다. 예약 정보가 준비되면 이곳에 안내하겠습니다.",
    sample: "대화 주제 살펴보기",
    viewProfile: "italki 프로필 보기",
    book: "수업 예약하기",
  },
};

const topics = [
  { id: "daily", turns: [
    ["오늘은 조금 바빴어요.", "I was a little busy today."],
    ["무엇 때문에 바빴어요?", "What kept you busy?"],
    ["할 일이 많았어요. 그래도 저녁에 산책해서 기분이 좋아졌어요.", "I had a lot to do. But I felt better after taking a walk in the evening."],
  ] },
  { id: "games", turns: [
    ["저는 게임을 좋아해요.", "I like games."],
    ["어떤 게임을 좋아하고, 왜 좋아해요?", "What kinds of games do you like, and why?"],
    ["저는 탐험하는 게임을 좋아해요. 새로운 장소를 발견하는 게 재미있어요.", "I like exploration games. Discovering new places is fun."],
  ] },
  { id: "ideas", turns: [
    ["지금 작은 게임을 만들고 있어요.", "I’m making a small game now."],
    ["어떤 게임이고, 어떤 부분을 만들고 있어요?", "What kind of game is it, and which part are you working on?"],
    ["퍼즐 게임이에요. 플레이어가 쉽게 배울 수 있도록 첫 번째 스테이지를 만들고 있어요.", "It’s a puzzle game. I’m building the first stage so players can learn easily."],
  ] },
];

function escapeHtml(text) {
  return text.replaceAll("&", "&amp;").replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function paragraphs(items) {
  return items.map(item => `<p>${escapeHtml(item)}</p>`).join("\n");
}

function renderTopics(c) {
  const links = topics.map(({ id }, index) =>
    `<a href="#dialogue-${id}" id="tab-${id}" data-topic="${id}">${c.topicLabels[index]}</a>`).join("");
  const panels = topics.map(({ id, turns }, index) => `
    <article class="dialogue-sheet" id="dialogue-${id}" data-topic-panel="${id}" aria-labelledby="dialogue-heading-${id}">
      <h3 id="dialogue-heading-${id}">${c.topicLabels[index]}</h3>
      <ol class="dialogue-lines">
        ${turns.map(([korean, english], turn) => `<li>
          <span class="turn-label">${c.turns[turn]}</span>
          <p lang="ko">${korean}</p><p lang="en">${english}</p>
        </li>`).join("")}
      </ol>
    </article>`).join("");
  return `<section class="topics-band section" id="topics" aria-labelledby="topics-title">
    <div class="container topics-layout">
      <div class="topic-selector">
        <p class="eyebrow">${c.examples}</p>
        <h2 class="section-title" id="topics-title">${c.topics}</h2>
        <p class="topic-prompt">${c.topicPrompt}</p>
        <div class="topic-choices" role="group" data-topic-list aria-labelledby="topics-title">${links}</div>
      </div>
      <div class="dialogue-stack">${panels}</div>
    </div>
  </section>`;
}

function renderVideo(c, video, transcript) {
  const preview = video.kind !== "recorded";
  const title = preview ? c.video : c.recorded;
  const disclosure = preview ? `<figcaption class="video-disclosure" id="preview-note">
      <strong>${c.previewLabel}</strong><p>${c.previewNote}</p>
    </figcaption>` : "";
  const caption = video.caption ? `<track kind="captions" srclang="mul" label="${c.captions}" src="${escapeHtml(video.caption)}">` : "";
  const script = transcript.trim().split(/\r?\n\s*\r?\n/).map(paragraph =>
    `<p lang="${/[가-힣]/u.test(paragraph) ? "ko" : "en"}">${escapeHtml(paragraph)}</p>`).join("");
  const poster = escapeHtml(video.poster);
  return `<section id="video" class="section video-band" aria-labelledby="video-title">
    <div class="container video-layout">
      <h2 class="section-title" id="video-title">${title}</h2>
      <div class="video-content">
        <figure class="preview-figure">
          <video class="preview-video" poster="${poster}" loading="lazy" controls playsinline preload="none"
            width="${video.width}" height="${video.height}" aria-labelledby="video-title"${preview ? ' aria-describedby="preview-note"' : ''}>
            <source src="${escapeHtml(video.src)}" type="video/mp4">
            ${caption}
            <a href="${escapeHtml(video.src)}">${c.playFile}</a>
          </video>
          ${disclosure}
        </figure>
        <details class="text-disclosure transcript"><summary>${c.transcript}</summary>
          <div class="long-copy">${script}</div>
        </details>
      </div>
    </div>
  </section>`;
}

function renderNext(c, config) {
  const canBook = config.bookingStatus === "available" && config.bookingUrl;
  const href = canBook || config.italkiProfileUrl || "#topics";
  const label = canBook ? c.book : config.italkiProfileUrl ? c.viewProfile : c.sample;
  return `<section id="next" class="section next-section" aria-labelledby="next-title">
    <div class="container">
      <div class="next-box">
        <div><h2 class="section-title" id="next-title">${c.next}</h2>
          ${canBook ? "" : `<p>${c.preparation}</p>`}
        </div>
        <a class="button next-action" href="${escapeHtml(href)}">${label}</a>
      </div>
    </div>
  </section>`;
}

export function renderSections(lang, config, transcript) {
  const c = copy[lang];
  return `
    <section class="section practice-section" id="how" aria-labelledby="how-title">
      <div class="container">
        <p class="eyebrow">${c.practice}</p>
        <h2 class="section-title" id="how-title">${c.how}</h2>
        <ol class="practice-steps">
          ${c.steps.map(([title, description], index) => `<li>
            <span class="step-index" aria-hidden="true">0${index + 1}</span>
            <h3>${title}</h3><p>${description}</p>
          </li>`).join("")}
        </ol>
      </div>
    </section>
    ${renderTopics(c)}
    <section id="about" class="section profile-section" aria-labelledby="about-title">
      <div class="container about-layout">
        <h2 class="section-title" id="about-title">${c.about}</h2>
        <div class="profile-copy">
          ${paragraphs(c.profile.slice(0, 2))}
          <details class="text-disclosure"><summary>${c.fullProfile}</summary>
            <div class="long-copy">${paragraphs(c.profile.slice(2))}</div>
          </details>
        </div>
      </div>
    </section>
    <section id="background" class="section experience-section" aria-labelledby="background-title">
      <div class="container about-layout">
        <h2 class="section-title" id="background-title">${c.background}</h2>
        <dl class="experience-list">
          ${c.experience.map(([name, detail]) => `<div><dt>${name}</dt><dd>${detail}</dd></div>`).join("")}
        </dl>
      </div>
    </section>
    ${renderVideo(c, config.video, transcript)}
    <section id="faq" class="section faq-section" aria-labelledby="faq-title">
      <div class="container faq-layout">
        <h2 class="section-title" id="faq-title">${c.faqTitle}</h2>
        <div class="faq-list">
          ${c.questions.map(([question, answer]) => `<details class="text-disclosure">
            <summary>${question}</summary><p>${answer}</p>
          </details>`).join("")}
        </div>
      </div>
    </section>
    ${renderNext(c, config)}`;
}
