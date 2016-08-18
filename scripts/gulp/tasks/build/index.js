'use strict';

const gulp       = require(`gulp`),
      remove     = require(`del`),
      compressor = require('gulp-uglify'),
      header     = require('gulp-header'),
      rename     = require('gulp-rename'),
      sequence   = require(`gulp-sequence`),
      debug      = require(`gulp-debug`);

gulp.task(
    `tasks/build.clear`,
    (cb) => {
        remove.sync(
            [
                `../../dist`
            ],
            {
                force : true
            }
        );

        cb();
    }
);

gulp.task(
    `tasks/build.development`,
    () => {
        return gulp
            .src(`../../src/**/*.js`)
            .pipe(gulp.dest(`../../dist`));
    }
);

gulp.task(
    `tasks/build.production`,
    () => {
        let template = require('../../../../src/license-header-template.json').template,
            pkg      = require('../../../../package.json'),
            data     = {
                name    : pkg.name,
                version : pkg.version,
                author  : pkg.author.name,
                email   : pkg.author.email,
            };

        return gulp
            .src(`../../src/**/*.js`)
            .pipe(compressor())
            .pipe(header(template, data))
            .pipe(rename(
                {
                    extname : '.min.js'
                }
            ))
            .pipe(gulp.dest(`../../dist`));
    }
);

gulp.task(
    `tasks/build`,
    (cb) => {
        sequence(
            `tasks/build.clear`,
            `tasks/build.development`,
            `tasks/build.production`
        )(cb);
    }
);
