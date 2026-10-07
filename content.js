// Hides buttons/links whose visible text is an upgrade prompt.
(() => {
  const PATTERNS = [
    /^\s*(upgrade|업그레이드)\s*$/i,
    /^\s*(upgrade|업그레이드)( to| now|하기)?\b.*$/i,
    /google one (으로|로)?\s*(업그레이드|upgrade)/i,
    /(get|try|사용해 보기|구독).*(google ai (pro|ultra)|gemini advanced)/i,
    /(google ai (pro|ultra)|gemini advanced).*(get|try|사용해 보기|구독|업그레이드)/i,
    /^\s*(get more storage|저장용량 (늘리기|추가|구매))\s*$/i,
  ];
  const CLICKABLE = 'a, button, [role="button"], [role="link"], [role="menuitem"]';

  const matches = (el) => {
    const text = (el.innerText || el.textContent || "").trim();
    return text.length > 0 && text.length < 80 && PATTERNS.some((p) => p.test(text));
  };

  const scan = (root) => {
    if (!root.querySelectorAll) return;
    for (const el of root.querySelectorAll(CLICKABLE)) {
      if (el.dataset.gnuHidden) continue;
      if (matches(el)) {
        el.style.setProperty("display", "none", "important");
        el.dataset.gnuHidden = "1";
      }
    }
  };

  let pending = false;
  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      scan(document);
    });
  };

  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  document.addEventListener("DOMContentLoaded", schedule);
  schedule();
})();
