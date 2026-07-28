import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CourseList } from './course-list';
import { CourseService } from '../../services/course';
import { of } from 'rxjs';

describe('CourseListComponent', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const mockCourses = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed', enrolled: true },
    { id: 2, name: 'Web Development', code: 'CS102', credits: 3, gradeStatus: 'failed', enrolled: false }
  ];

  const initialState = {
    course: {
      courses: mockCourses,
      loading: false,
      error: null
    },
    enrollment: {
      enrolledCourseIds: []
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList, CommonModule, FormsModule],
      providers: [
        provideRouter([]),
        provideMockStore({ initialState }),
        {
          provide: CourseService,
          useValue: {
            getCourses: () => of(mockCourses),
            getStudentsByCourse: () => of([])
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Step 109: Test component with MockStore
  it('should render course cards from store', () => {
    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(2);
  });

  // Step 110: Test loading state
  it('should show loading indicator when loading is true', () => {
    store.setState({
      course: { courses: [], loading: true, error: null },
      enrollment: { enrolledCourseIds: [] }
    });
    fixture.detectChanges();
    const loading = fixture.debugElement.query(By.css('p'));
    expect(loading.nativeElement.textContent).toContain('Loading');
  });
});