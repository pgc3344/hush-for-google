# Google No Upgrade

Chrome extension (Manifest V3) that hides **Upgrade / 업그레이드 / Google One / Google AI Pro** promo buttons across Google services — Gmail, Drive, Photos, Gemini, Docs, Search, YouTube and more.

## How it works
- `content.css` hides links that point to paid upgrade pages (`one.google.com`, `gemini.google/subscriptions`, `youtube.com/premium`, …) and elements with upgrade aria-labels.
- `content.js` watches the page and hides clickable elements whose text is an upgrade prompt (English + Korean).

No permissions, no network requests, no data collection.

## Install
1. Clone or download this repo.
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and select this folder.

## Contributing
Google changes its UI often. If you see an upgrade button that isn't hidden, open an issue with the page URL and a screenshot, or send a PR adding a selector/pattern.

## License
MIT
