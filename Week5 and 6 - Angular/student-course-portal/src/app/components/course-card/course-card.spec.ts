import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { CourseCard } from './course-card';
import { vi } from 'vitest';

describe('CourseCardComponent', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed' as const,
    enrolled: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideMockStore({
          initialState: {
            enrollment: { enrolledCourseIds: [] }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
  });

  // Step 102: Test component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 103: Test @Input rendering
  it('should display course name', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    const h3 = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3.textContent).toContain('Data Structures');
  });

  // Step 104: Test @Output
  it('should emit enrollRequested when enroll is clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.enrollRequested, 'emit');
    component.onEnroll();
    expect(emitSpy).toHaveBeenCalledWith(1);
  });

  // Step 105: Test ngOnChanges
  it('should log on ngOnChanges', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    component.ngOnChanges({
      course: new SimpleChange(undefined, mockCourse, true)
    });
    expect(consoleSpy).toHaveBeenCalled();
  });
});