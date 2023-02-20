import pkg from 'gulp';
const { src, dest, series, watch } = pkg;
import GulpCleanCss from 'gulp-clean-css';
import GulpUglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import webp from 'imagemin-webp';
import rename from 'gulp-rename';
import extReplace from 'gulp-ext-replace';

export const html = () => {
  return src('./src/index.html')
    .pipe(dest('./build/'))
}

export const css = () => {
  return src('./src/css/*.css')
    .pipe(GulpCleanCss())
    .pipe(dest('build/css/'))
}

export const scripts = () => {
  return src('./src/index.js')
  .pipe(GulpUglify())
  .pipe(dest('./build/'))
}

export const webP = () => {
  return src('./src/assets/img/**')
    .pipe(imagemin([
      webp({ quality: 50 })
    ]))
    .pipe(extReplace('.webp'))
    .pipe(dest('build/assets/img/'))
}

export const icons = () => {
  return src('./src/assets/icons/*.svg')
    .pipe(imagemin())
    .pipe(dest('./build/assets/icons'))
}

export const watcher = () => {
  watch('./src/index.html', html);
  watch('./src/css/*.css', css);
  watch('./src/index.js', scripts);
}

export default series(html, css, scripts, webP, icons, watcher);