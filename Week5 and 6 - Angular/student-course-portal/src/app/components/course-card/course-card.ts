import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { EnrollmentService } from '../../services/enrollment';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, Highlight, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {

  @Input() course: Course = { id: 0, name: '', code: '', credits: 0, gradeStatus: 'pending', enrolled: false };
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  constructor(private enrollmentService: EnrollmentService) {}

  get isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  get borderColor() {
    if (this.course.gradeStatus === 'passed') return 'green';
    if (this.course.gradeStatus === 'failed') return 'red';
    return 'grey';
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Previous value:', changes['course']?.previousValue);
    console.log('Current value:', changes['course']?.currentValue);
  }

onEnroll() {
  this.enrollmentService.enroll(this.course);
  this.enrollRequested.emit(this.course.id);
}

  onUnenroll() {
    this.enrollmentService.unenroll(this.course.id);
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}

// Getters keep templates clean by moving complex logic to the component class.
// Instead of writing long expressions in HTML, we simply bind to [ngClass]="cardClasses"