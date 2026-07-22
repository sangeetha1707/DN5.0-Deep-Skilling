import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourses: Course[] = [];

  enroll(course: Course): void {
    if (!this.isEnrolled(course.id)) {
      this.enrolledCourses.push(course);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourses = this.enrolledCourses.filter(c => c.id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourses.some(c => c.id === courseId);
  }

  getEnrolledCourses(): Course[] {
    return this.enrolledCourses;
  }
}