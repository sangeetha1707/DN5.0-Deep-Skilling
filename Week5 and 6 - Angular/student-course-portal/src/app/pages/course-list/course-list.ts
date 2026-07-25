import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selector';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  selectedCourseId: number | null = null;
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;
  searchTerm = '';

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.errorMessage$ = this.store.select(selectCoursesError);
  }

  ngOnInit() {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') || '';
    this.store.dispatch(loadCourses());
  }

  trackByCourseId(index: number, course: Course) {
    return course.id;
  }

  onEnroll(courseId: number) {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  onCardClick(courseId: number) {
    this.loadStudentsForCourse(courseId);
    this.router.navigate(['courses', courseId]);
  }

  onSearch() {
    this.router.navigate(['courses'], { queryParams: { search: this.searchTerm } });
  }

  // switchMap cancels the previous inner Observable when a new courseId arrives
  // This prevents out-of-order responses when user clicks courses quickly
  loadStudentsForCourse(courseId: number) {
    of(courseId).pipe(
      switchMap(id => this.courseService.getStudentsByCourse(id))
    ).subscribe({
      next: students => console.log('Students for course:', students),
      error: err => console.error(err)
    });
  }
}