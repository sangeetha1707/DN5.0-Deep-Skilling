import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit, OnDestroy {
  selectedCourseId: number | null = null;
  isLoading = true;
  private timer: any;
  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
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
}