// After the site moves: GitHub Pages serves this instead of the app, so every address on the old
// site opens the same page at the new one (/EduCore/t/c/abc?x#y → https://gradileo.com/t/c/abc?x#y,
// keeping sign-in tokens in the hash).
//
//   node scripts/pages-redirect.mjs https://gradileo.com /EduCore/
import { mkdirSync, writeFileSync } from 'node:fs';

const [target, base = '/'] = process.argv.slice(2);
if (!/^https:\/\/[a-z0-9.-]+$/i.test(target ?? '')) {
  console.error('Usage: node scripts/pages-redirect.mjs https://new.domain [/old-base-path/]');
  process.exit(1);
}
const prefix = base.replace(/\/+$/, '');
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Gradileo has moved</title>
    <link rel="canonical" href="${target}/" />
    <script>
      (function () {
        var base = ${JSON.stringify(prefix)};
        var path = location.pathname;
        if (base && path.toLowerCase().indexOf(base.toLowerCase()) === 0) path = path.slice(base.length);
        location.replace(${JSON.stringify(target)} + (path || '/') + location.search + location.hash);
      })();
    </script>
    <noscript><meta http-equiv="refresh" content="0; url=${target}/" /></noscript>
  </head>
  <body style="font-family: system-ui, sans-serif; padding: 2rem">
    <p>Gradileo has moved to <a href="${target}/">${target.replace(/^https:\/\//, '')}</a>.</p>
  </body>
</html>
`;
mkdirSync('pages-redirect', { recursive: true });
// 404.html too, so deep links on the old site redirect as well.
for (const file of ['index.html', '404.html']) writeFileSync(`pages-redirect/${file}`, html);
writeFileSync('pages-redirect/.nojekyll', '');
console.log(`GitHub Pages will redirect ${prefix || '/'} to ${target}`);
