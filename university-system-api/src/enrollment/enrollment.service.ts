
import {
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';

import { CourseService } from '../course/course.service.js';
import { NotificationService } from '../notification/notification.service.js';

interface NotificationServicePort {
  sendNotification(studentName: string, message: string): {
    message: string;
    student: string;
    notification: string;
  };
}

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly courseService: CourseService,

    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationServicePort,
  ) {}

  enrollStudent(studentName: string, courseId: string) {
    const course = this.courseService.getCourseById(courseId);

    const notification = this.notificationService.sendNotification(
      studentName,
      'Welcome! Your enrollment was successful.',
    );

    return {
      message: 'Student enrolled successfully',
      student: studentName,
      course,
      notification,
    };
  }

  getEnrollments() {
    return {
      message: 'All enrollments fetched',
      data: [],
    };
  }
}
