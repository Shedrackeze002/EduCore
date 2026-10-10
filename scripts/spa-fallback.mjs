// GitHub Pages serves 404.html for unknown paths. Copying index.html there lets
// deep links like /t/c/abc/students load the single-page app.
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
if (existsSync('dist/index.html')) {
  copyFileSync('dist/index.html', 'dist/404.html');
  writeFileSync('dist/.nojekyll', '');
  if (process.env.CUSTOM_DOMAIN) writeFileSync('dist/CNAME', process.env.CUSTOM_DOMAIN.trim() + '\n');
  console.log('SPA fallback written (404.html, .nojekyll' + (process.env.CUSTOM_DOMAIN ? ', CNAME' : '') + ')');
}
