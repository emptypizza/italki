# Korean Conversation with Marc

마크의 한국어 회화 수업을 소개하는 정적 사이트입니다. 한글을 읽고 짧은 문장을 말할 수 있는 학습자가 수업 방식과 대화 예시를 살펴보고, 마크의 게임 기획·개발 경험과 소개 영상을 확인할 수 있습니다.

빌드는 영어 기본 페이지 `index.html`과 한국어 페이지 `ko.html`을 생성합니다. 본문과 영상 대본이 각 HTML에 들어 있어 JavaScript를 끈 브라우저에서도 읽을 수 있습니다.

## 로컬 실행

Node.js 22 이상과 npm을 사용합니다. 패키지 설치 단계 없이 저장소 루트에서 실행하세요.

```sh
npm run build
npm run check
npm run preview
```

미리보기 주소는 [http://127.0.0.1:4173/italki/](http://127.0.0.1:4173/italki/)입니다. 다른 포트를 쓰려면 `npm run build`를 실행한 뒤 `npm run preview -- 4174`로 시작하세요.

| 명령 | 동작 |
| --- | --- |
| `npm run check` | 임시 빌드의 파일 목록과 내용을 `docs/`와 바이트 단위로 비교합니다. 브라우저 스크립트 문법, 두 언어의 섹션 앵커·자산 경로·자막 시간·전체 대본·영상 표시도 검사합니다. |
| `npm run build` | 공개 파일을 `docs/`에 새로 생성합니다. 소스를 수정한 뒤 다시 실행하세요. |
| `npm run dev` | 빌드하고 `/italki/` 미리보기 서버를 시작합니다. |
| `npm run preview` | 기존 `docs/`로 서버를 시작합니다. 영상 탐색에 쓰이는 HTTP 바이트 범위 요청을 지원합니다. |

npm이 경로에 없는 환경에서는 Node.js로 같은 작업을 실행할 수 있습니다.

```sh
node scripts/build.mjs
node --check app.js
node scripts/check.mjs
node scripts/preview.mjs
```

## 내용 수정

| 수정할 내용 | 파일 |
| --- | --- |
| 문서 제목과 설명, 메뉴, 첫 화면, 대상 학습자 | [page.mjs](page.mjs) |
| 수업 단계, 대화 예시, 프로필, 학력·경력, FAQ, 영상·예약 안내 문구 | [sections.mjs](sections.mjs) |
| 레이아웃과 색, 모바일·포커스·모션 처리 | [styles.css](styles.css), [sections.css](sections.css) |
| 언어 선택, 모바일 메뉴와 주제 선택 동작 | [app.js](app.js) |
| italki 링크, 예약 상태, 영상 종류와 파일 경로 | [site-config.json](site-config.json) |
| 공개 파일 목록과 HTML·자막 생성 | [scripts/build.mjs](scripts/build.mjs) |

`page.mjs`와 `sections.mjs`의 `copy.en`, `copy.ko`에서 두 언어 문구를 함께 갱신하세요. 한국어 예문과 영어 뜻은 `sections.mjs`의 `topics`에 한 번씩 저장합니다. 수정 후 빌드하면 두 언어 페이지에 반영됩니다.

### italki 프로필과 예약

현재 프로필·예약 URL은 모두 `null`이고 `bookingStatus`는 `unavailable`입니다. 상단 수업 버튼은 수업 소개로, 마지막 버튼은 대화 예시로 이동합니다. 교사 상태는 `preparing`이며 확인된 가격이나 일정이 생기면 공개 문구를 갱신하세요.

1. 개인 italki 프로필을 확인하면 `italkiProfileUrl`에 해당 HTTPS 주소를 넣으세요. 마지막 버튼이 프로필로 연결됩니다.
2. 실제 예약 가능 여부를 확인한 뒤 `bookingUrl`을 입력하고 `bookingStatus`를 `available`로 변경하세요. 두 값이 모두 준비되어야 예약 버튼이 표시됩니다.
3. 예약 접수를 중단할 때는 `bookingStatus`를 `unavailable`로 되돌리세요. 유효한 프로필이 있으면 해당 프로필로, 없으면 대화 예시로 연결됩니다.

### 사진·영상·자막

인물 사진은 [marc-choi-portrait.jpg](assets/images/marc-choi-portrait.jpg)입니다. 고해상도 사진으로 교체할 때는 `page.mjs`의 이미지 크기와 두 언어의 대체 텍스트도 맞춰 주세요.

현재 영상은 1280×720 정지 이미지에 AI 내레이션과 자막을 넣은 소개 미리보기입니다. 영문과 한국어 페이지 모두 플레이어 곁에 제작 방식을 표시합니다.

- `site-config.json`의 `video.src`, `poster`, `transcript`에서 MP4, 포스터, UTF-8 대본 파일을 지정합니다. 대본은 빈 줄로 단락을 구분합니다.
- 원본 [SRT](assets/captions/marc-choi-intro.srt)를 `video.captionSource`로 지정하면 빌드가 타임코드와 줄바꿈을 보존해 `video.caption` 경로에 WebVTT를 생성합니다. 완성된 VTT를 쓸 때는 `captionSource`를 `null`로 두고 `caption`에 그 파일을 지정합니다. 기본 자막 표시는 꺼져 있어 MP4 안의 자막과 겹치지 않습니다.
- 새 미디어는 각각 `./assets/video/`, `./assets/images/`, `./assets/captions/`, `./assets/transcripts/` 아래에 둡니다. `width`, `height`, `durationSeconds`도 파일과 일치시킵니다.
- 현재 `video.kind`는 `ai-narrated-still-preview`입니다. 실제 촬영 영상과 대응하는 포스터·자막·대본으로 교체한 뒤 `recorded`로 변경하면 플레이어와 첫 화면의 미리보기 표시가 함께 갱신됩니다.

## GitHub Pages 배포

게시 원본은 `main` 브랜치의 [docs/](docs/)입니다. 빌드가 두 HTML 파일, CSS, JavaScript, 파비콘, 인물 사진과 설정에서 지정한 미디어만 이 폴더에 모으고 `.nojekyll`을 생성합니다.

1. 루트의 원본을 수정한 뒤 `npm run build`와 `npm run check`를 순서대로 실행합니다. 빌드할 때마다 `docs/`를 새로 생성하므로 편집은 위 표에 있는 원본 파일에서 진행하세요.
2. 소스 변경분과 새 `docs/`를 같은 커밋에 담아 `main`에 반영합니다.
3. 처음 게시할 때 저장소 **Settings → Pages → Build and deployment → Source**에서 **Deploy from a branch**를 선택하고, 브랜치 **main**과 폴더 **/docs**를 지정한 뒤 **Save**를 누릅니다.
4. GitHub의 Pages 배포가 성공하면 **Settings → Pages**에 표시된 주소에서 영어·한국어 페이지, 모바일 메뉴, 대화 예시, 영상 재생을 확인합니다. 이 저장소의 프로젝트 경로는 `/italki/`입니다.

Pages는 이후 `main`에 반영되는 `docs/` 변경분을 게시합니다. [GitHub Pages 게시 원본 설정 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
