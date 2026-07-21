import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  private timer: any;
  courses: Course[] = [];
  searchTerm = '';

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') || '';
    this.isLoading = true;
    this.timer = setTimeout(() => {
      this.courses = this.courseService.getCourses();
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 1500);
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
    this.router.navigate(['courses', courseId]);
  }

  onSearch() {
    this.router.navigate(['courses'], { queryParams: { search: this.searchTerm } });
  }
}