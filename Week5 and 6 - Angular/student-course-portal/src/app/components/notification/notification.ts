import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';
import { EnrollmentService } from '../../services/enrollment';

// Component-level provider creates a NEW instance of NotificationService
// scoped only to this component and its children.
// This is different from providedIn: 'root' which creates a single shared instance.
@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  providers: [NotificationService],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class NotificationComponent implements OnInit {
  messages: string[] = [];

  constructor(
    private notificationService: NotificationService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit() {
    const count = this.enrollmentService.getEnrolledCourses().length;
    this.notificationService.addMessage('Welcome to Student Course Portal!');
    this.notificationService.addMessage(`You have ${count} course(s) enrolled.`);
    this.messages = this.notificationService.getMessages();
  }
}