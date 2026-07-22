import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesCount = 0;

  /*
   * Difference between [property] and [(ngModel)]:
   * [property] = One-way binding. Data flows only FROM component TO the DOM.
   * [(ngModel)] = Two-way binding. Data flows BOTH ways between component and DOM.
   */

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe({
      next: courses => {
        this.coursesCount = courses.length;
        this.cdr.detectChanges();
        console.log('HomeComponent initialised — courses loaded');
      },
      error: err => console.error(err)
    });
  }

  ngOnDestroy() {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }
}