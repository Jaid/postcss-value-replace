import gulp from "gulp"
import gulpPostcss from "gulp-postcss"

import plugin from "."
import replaceValues from "./test/test.js"

gulp.task("run", () => {
    return gulp.src(["./test/*.css"])
        .pipe(gulpPostcss([plugin({
            replace: replaceValues
        })]))
        .pipe(gulp.dest("./test/compiled"))
})
