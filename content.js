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

  const scan = () => {
    for (const el of document.querySelectorAll(CLICKABLE)) {
      if (el.dataset.hush) continue;
      const text = (el.innerText || el.textContent || "").trim();
      if (text && text.length < 80 && patterns.some((p) => p.test(text))) {
        el.style.setProperty("display", "none", "important");
        el.dataset.hush = "1";
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
