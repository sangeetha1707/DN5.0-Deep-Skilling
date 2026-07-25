import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Course } from '../../models/course';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, Highlight, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges, OnDestroy {

  @Input() course: Course = { id: 0, name: '', code: '', credits: 0, gradeStatus: 'pending', enrolled: false };
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  isEnrolled = false;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('Previous value:', changes['course']?.previousValue);
    console.log('Current value:', changes['course']?.currentValue);
    this.subscription.unsubscribe();
    this.subscription = this.store.select(selectEnrolledIds).pipe(
      map(ids => ids.includes(Number(this.course.id)))
    ).subscribe(enrolled => this.isEnrolled = enrolled);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  onEnroll() {
    this.store.dispatch(enrollInCourse({ courseId: Number(this.course.id) }));
    this.enrollRequested.emit(Number(this.course.id));
  }

  onUnenroll() {
    this.store.dispatch(unenrollFromCourse({ courseId: Number(this.course.id) }));
  }

  toggleEnroll() {
    if (this.isEnrolled) {
      this.onUnenroll();
    } else {
      this.onEnroll();
    }
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}