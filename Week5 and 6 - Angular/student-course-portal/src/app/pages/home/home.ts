import { Component, OnInit, OnDestroy } from '@angular/core';
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
   *              Example: [disabled]="!isPortalActive" — component controls the button.
   *              The DOM cannot update the component back.
   *
   * [(ngModel)] = Two-way binding. Data flows BOTH ways between component and DOM.
   *              Example: [(ngModel)]="searchTerm" — when user types in the input,
   *              the component's searchTerm updates automatically and vice versa.
   */

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.coursesCount = this.courseService.getCourses().length;
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy() {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }
}