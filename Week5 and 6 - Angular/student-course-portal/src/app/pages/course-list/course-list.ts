import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit, OnDestroy {
  selectedCourseId: number | null = null;
  isLoading = true;
  courses: Course[] = [];
  errorMessage = '';
  searchTerm = '';
  private timer: any;

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') || '';
    this.isLoading = true;
    this.courseService.getCourses().subscribe({
      next: courses => {
        this.courses = courses;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMessage = err.message;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
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