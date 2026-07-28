import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed', enrolled: true },
    { id: 2, name: 'Web Development', code: 'CS102', credits: 3, gradeStatus: 'failed', enrolled: false }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Step 107: Test getCourses
  it('should get courses', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  // Step 108: Test error handling
  it('should handle error', () => {
    return new Promise<void>((resolve) => {
      service.getCourses().subscribe({
        next: () => {},
        error: err => {
          expect(err.message).toBe('Failed to load courses. Please try again.');
          resolve();
        }
      });

      let req = httpMock.expectOne('http://localhost:3000/courses');
      req.flush('Error', { status: 500, statusText: 'Server Error' });

      req = httpMock.expectOne('http://localhost:3000/courses');
      req.flush('Error', { status: 500, statusText: 'Server Error' });

      req = httpMock.expectOne('http://localhost:3000/courses');
      req.flush('Error', { status: 500, statusText: 'Server Error' });
    });
  });
});