import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import AllCourse from '../pages/allCourse';
import ax from '../conf/ax';

jest.mock('../conf/ax'); 

describe('AllCourse Component', () => {
  test('Should Display No Courses Message When No Courses Available', async () => {
    ax.get.mockResolvedValueOnce({ data: { data: [] } });

    render(
      <Router> 
        <AllCourse />
      </Router>
    );
    
    await screen.findByText(/No courses available/i);
    
    const noCoursesMessage = screen.getByText(/No courses available/i);
    expect(noCoursesMessage).toBeInTheDocument();
  });

  test('Should Display Courses When Courses Are Available', async () => {
    const mockCourses = [
      {
        id: 1,
        title: 'Course Title 1',
        description: 'Description 1',
        duration: 10,
        teacher: { username: 'Teacher 1' },
        likeCount: 5
      },
      {
        id: 2,
        title: 'Course Title 2',
        description: 'Description 2',
        duration: 15,
        teacher: { username: 'Teacher 2' },
        likeCount: 10
      }
    ];

    ax.get.mockResolvedValueOnce({ data: { data: mockCourses } });

    render(
      <Router> 
        <AllCourse />
      </Router>
    );

    await screen.findByText(/Course Title 1/i);
    await screen.findByText(/Course Title 2/i);

    const courseTitle1 = screen.getByText(/Course Title 1/i);
    expect(courseTitle1).toBeInTheDocument();

    const courseTitle2 = screen.getByText(/Course Title 2/i);
    expect(courseTitle2).toBeInTheDocument();
  });
});
