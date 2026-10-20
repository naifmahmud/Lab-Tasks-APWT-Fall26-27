
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

@Injectable()
export class CourseService {
  private courses: any[] = [];
  private nextId = 1;

  getAllCourses() {
    return {
      message: 'All courses fetched successfully',
      data: this.courses,
    };
  }

  getCourseById(id: string) {
    const course = this.courses.find((c) => c.id === Number(id));

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return {
      message: 'Course fetched successfully',
      data: course,
    };
  }

  createCourse(dto: CreateCourseDto) {
    const course = {
      id: this.nextId++,
      ...dto,
    };

    this.courses.push(course);

    return {
      message: 'Course created successfully',
      data: course,
    };
  }

  updateCourse(id: string, dto: UpdateCourseDto) {
    const course = this.courses.find((c) => c.id === Number(id));

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    Object.assign(course, dto);

    return {
      message: 'Course updated successfully',
      data: course,
    };
  }

  patchCourse(id: string, dto: UpdateCourseDto) {
    const course = this.courses.find((c) => c.id === Number(id));

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    Object.assign(course, dto);

    return {
      message: 'Course patched successfully',
      data: course,
    };
  }

  deleteCourse(id: string) {
    const index = this.courses.findIndex((c) => c.id === Number(id));

    if (index === -1) {
      throw new NotFoundException('Course not found');
    }

    this.courses.splice(index, 1);

    return {
      message: 'Course deleted successfully',
      id: Number(id),
    };
  }

  uploadCourseMaterial(id: string, file: Express.Multer.File) {
    return {
      message: 'Material uploaded successfully',
      courseId: id,
      filename: file.filename,
      path: file.path,
    };
  }
}
