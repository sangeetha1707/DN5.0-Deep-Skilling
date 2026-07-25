import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourseService } from '../../services/course';
import { loadCourses, loadCoursesSuccess, loadCoursesFailure } from './course.actions';

export const loadCoursesEffect = createEffect(
  (actions$ = inject(Actions), courseService = inject(CourseService)) =>
    actions$.pipe(
      ofType(loadCourses),
      switchMap(() =>
        courseService.getCourses().pipe(
          map(courses => loadCoursesSuccess({ courses })),
          catchError(error => of(loadCoursesFailure({ error: error.message })))
        )
      )
    ),
  { functional: true }
);