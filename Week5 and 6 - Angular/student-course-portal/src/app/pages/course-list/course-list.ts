import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

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

 courses = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed', enrolled: true },
    { id: 2, name: 'Web Development', code: 'CS102', credits: 3, gradeStatus: 'failed', enrolled: true },
    { id: 3, name: 'Database Systems', code: 'CS103', credits: 3, gradeStatus: 'pending', enrolled: false },
    { id: 4, name: 'Operating Systems', code: 'CS104', credits: 4, gradeStatus: 'passed', enrolled: false },
    { id: 5, name: 'Computer Networks', code: 'CS105', credits: 3, gradeStatus: 'pending', enrolled: false }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.isLoading = true;
    this.timer = setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }

  trackByCourseId(index: number, course: any) {
    return course.id;
  }

  onEnroll(courseId: number) {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}