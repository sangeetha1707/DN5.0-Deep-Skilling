import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-enrollment-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentForm {
  studentName = '';
  studentEmail = '';
  courseId = null;
  preferredSemester = 'Odd';
  agreeToTerms = false;
  submitted = false;

  constructor(private courseService: CourseService) {}

  onSubmit(form: NgForm) {
    console.log('Form Value:', form.value);
    console.log('Form Valid:', form.valid);
    if (form.valid) {
      this.courseService.createCourse({
        name: this.studentName,
        code: 'NEW',
        credits: 3,
        gradeStatus: 'pending',
        enrolled: false
      }).subscribe({
        next: course => {
          console.log('Course created:', course);
          this.submitted = true;
        },
        error: err => console.error(err)
      });
    }
  }

  onReset(form: NgForm) {
    form.resetForm();
    this.submitted = false;
  }
}