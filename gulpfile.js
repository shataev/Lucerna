var gulp = require('gulp');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');

//JS

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('main.js')) // Собираем их в кучу в новом файле main.js
        /*.pipe(uglify()) // Сжимаем JS файл*/
        .pipe(gulp.dest('assets/js')); // Выгружаем в папку assets/js
});

//LiveReload

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: '' // Директория для сервера - корень
        },
        notify: false // Отключаем уведомления
    });
});

//Watch

gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['scripts']);
});