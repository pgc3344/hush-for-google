<p align="center"><img src="icons/icon128.png" width="96" alt="Hush"></p>
<h1 align="center">Hush for Google</h1>
<p align="center"><b>Google, without the upsell.</b><br>구글, 업그레이드 권유 없이.</p>

<p align="center"><a href="#english">English</a> · <a href="#한국어">한국어</a></p>

---

## English

Hush is a tiny Chrome extension that hides **Upgrade / Google One / Google AI Pro** promo buttons across Google services — Gmail, Drive, Photos, Gemini, Docs, Search, YouTube and more.

- 🪶 **Lightweight** — two small scripts, no background worker
- 🔒 **Private** — no permissions, no network requests, no data collection
- 🧩 **Easy to extend** — every rule lives in one file, [`rules.js`](rules.js)

### Install
1. Clone or [download](../../archive/refs/heads/main.zip) this repo.
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and pick this folder.

### Add a rule
Found a button Hush missed? Open [`rules.js`](rules.js) and add **one line** to the list that fits:

| List | Hides… | Example |
|---|---|---|
| `hrefs` | links whose URL contains the string | `"one.google.com/offers"` |
| `labels` | elements whose `aria-label` contains the string | `"Get Premium"` |
| `selectors` | anything matching a CSS selector | `'[data-promo="upsell"]'` |
| `text` | buttons/links whose visible text matches a regex | `/^try pro$/` |
| `sites` | rules for one site only | `"mail.google.com": { selectors: [...] }` |

Then hit ↻ on the extension in `chrome://extensions` and refresh the page.
Tip: right-click the button → **Inspect** to find its `href`, `aria-label` or text.

See [CONTRIBUTING.md](CONTRIBUTING.md) to send it upstream.

---

## 한국어

Hush는 구글 서비스(Gmail, 드라이브, 포토, Gemini, 문서, 검색, YouTube 등) 곳곳의 **업그레이드 / Google One / Google AI Pro** 권유 버튼을 숨겨 주는 작은 크롬 확장 프로그램입니다.

- 🪶 **가벼움** — 작은 스크립트 두 개, 백그라운드 작업 없음
- 🔒 **개인정보 보호** — 권한 요청·네트워크 요청·데이터 수집 없음
- 🧩 **쉬운 확장** — 모든 규칙이 [`rules.js`](rules.js) 한 파일에

### 설치
1. 이 저장소를 클론하거나 [ZIP으로 내려받습니다](../../archive/refs/heads/main.zip).
2. `chrome://extensions` 에서 **개발자 모드**를 켭니다.
3. **압축해제된 확장 프로그램을 로드합니다**를 눌러 이 폴더를 고릅니다.

### 규칙 추가하기
안 숨겨진 버튼이 있나요? [`rules.js`](rules.js) 를 열고 알맞은 목록에 **한 줄**만 추가하세요.

| 목록 | 숨기는 대상 | 예시 |
|---|---|---|
| `hrefs` | 링크 주소에 이 문자열이 들어간 것 | `"one.google.com/offers"` |
| `labels` | `aria-label` 에 이 문자열이 들어간 것 | `"Get Premium"` |
| `selectors` | CSS 선택자에 맞는 모든 것 | `'[data-promo="upsell"]'` |
| `text` | 보이는 글자가 정규식에 맞는 버튼·링크 | `/^프로 사용해 보기$/` |
| `sites` | 특정 사이트에서만 쓰는 규칙 | `"mail.google.com": { selectors: [...] }` |

저장 후 `chrome://extensions` 에서 확장 프로그램의 ↻ 버튼을 누르고 페이지를 새로고침하면 됩니다.
팁: 버튼에서 우클릭 → **검사**를 누르면 `href`, `aria-label`, 글자를 확인할 수 있어요.

다른 사람과 공유하려면 [CONTRIBUTING.md](CONTRIBUTING.md) 를 참고하세요.

---

<p align="center"><sub>Not affiliated with Google. · 구글과 관련 없는 비공식 프로젝트입니다. · MIT License</sub></p>
