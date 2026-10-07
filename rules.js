/*
 * Hush rules — the only file you need to edit to hide something new.
 * 숨길 대상을 추가하려면 이 파일만 고치면 됩니다.
 *
 * Each list is independent. Add one line, reload the extension, done.
 * 각 목록은 독립적입니다. 한 줄 추가 → 확장 프로그램 새로고침 → 끝.
 */
globalThis.HUSH_RULES = {
  // Hide links whose href CONTAINS any of these strings.
  // href 에 이 문자열이 들어간 링크를 숨깁니다.
  hrefs: [
    "one.google.com/about",
    "one.google.com/storage",
    "one.google.com/explore-plan",
    "one.google.com/ai",
    "gemini.google/subscriptions",
    "gemini.google.com/upgrade",
    "workspace.google.com/pricing",
    "youtube.com/premium",
    "/upgrade?",
  ],

  // Hide elements whose aria-label CONTAINS any of these (case-sensitive).
  // aria-label 에 이 문자열이 들어간 요소를 숨깁니다.
  labels: [
    "Upgrade",
    "업그레이드",
    "Google One",
    "Google AI Pro",
    "Google AI Ultra",
  ],

  // Raw CSS selectors, for anything the lists above can't express.
  // 위 목록으로 안 되는 경우 CSS 선택자를 직접 적습니다.
  selectors: [
    'a[href$="/upgrade"]',
    '[data-test-id="upgrade-button"]',
    '[data-test-id="bard-mode-menu-upgrade"]',
  ],

  // Hide buttons/links whose visible TEXT matches (regex, case-insensitive).
  // 버튼·링크의 보이는 글자가 이 정규식과 맞으면 숨깁니다 (대소문자 무시).
  text: [
    /^(upgrade|업그레이드)$/,
    /^(upgrade|업그레이드)( to| now|하기)?\b/,
    /google one\s*(으로|로)?\s*(업그레이드|upgrade)/,
    /(get|try|사용해 보기|구독).*(google ai (pro|ultra)|gemini advanced)/,
    /(google ai (pro|ultra)|gemini advanced).*(get|try|사용해 보기|구독|업그레이드)/,
    /^(get more storage|저장용량 (늘리기|추가|구매))$/,
  ],

  // Per-site rules: only applied when the hostname ends with the key.
  // 사이트별 규칙: 호스트 이름이 키로 끝날 때만 적용됩니다.
  sites: {
    // "mail.google.com": { selectors: ['.some-gmail-promo'] },
  },
};
