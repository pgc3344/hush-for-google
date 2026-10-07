// Hush engine — reads rules.js; you shouldn't need to edit this file.
(() => {
  const base = globalThis.HUSH_RULES || {};
  const host = location.hostname;

  // Merge global rules with any matching per-site rules.
  const rules = { hrefs: [], labels: [], selectors: [], text: [] };
  const sources = [base, ...Object.entries(base.sites || {})
    .filter(([site]) => host === site || host.endsWith("." + site))
    .map(([, r]) => r)];
  for (const src of sources)
    for (const key of Object.keys(rules)) rules[key].push(...(src[key] || []));

  // 1) CSS rules: applied instantly, before the page paints.
  const q = (s) => JSON.stringify(s);
  const css = [
    ...rules.hrefs.map((h) => `a[href*=${q(h)}]`),
    ...rules.labels.map((l) => `[aria-label*=${q(l)}]`),
    ...rules.selectors,
  ];
  const style = document.createElement("style");
  style.id = "hush-rules";
  style.textContent = css.map((s) => `${s}{display:none!important}`).join("\n");
  (document.head || document.documentElement).appendChild(style);

  // 2) Text rules: scanned as the page changes.
  const patterns = rules.text.map((p) => new RegExp(p.source, p.flags.includes("i") ? p.flags : p.flags + "i"));
  const CLICKABLE = 'a, button, [role="button"], [role="link"], [role="menuitem"]';

  const hide = (el) => {
    el.style.setProperty("display", "none", "important");
    el.dataset.hush = "1";
  };

  // A hidden button often leaves its wrappers behind as an empty gap (Google
  // sets fixed widths on them). Walk up and hide every wrapper whose children
  // are all hidden, stopping at the first one that still shows something.
  const isHidden = (el) => el.dataset.hush || getComputedStyle(el).display === "none";
  const collapse = (el) => {
    let p = el.parentElement;
    for (let i = 0; i < 12 && p && p !== document.body; i++, p = p.parentElement) {
      const ownText = [...p.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (ownText || ![...p.children].every(isHidden)) break;
      hide(p);
    }
  };

  const cssSelector = css.join(",");
  const scan = () => {
    if (cssSelector)
      for (const el of document.querySelectorAll(cssSelector))
        if (!el.dataset.hush) { el.dataset.hush = "1"; collapse(el); }
    for (const el of document.querySelectorAll(CLICKABLE)) {
      if (el.dataset.hush) continue;
      const text = (el.innerText || el.textContent || "").trim();
      if (text && text.length < 80 && patterns.some((p) => p.test(text))) {
        hide(el);
        collapse(el);
      }
    }
  };

  let pending = false;
  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; scan(); });
  };
  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true, subtree: true, characterData: true,
  });
  schedule();
})();
