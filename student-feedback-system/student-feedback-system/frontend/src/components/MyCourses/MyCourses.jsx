// import React from 'react';
// import { Link } from 'react-router-dom';
// import './MyCourses.css';

// const MyCourses = () => {
//   const courses = [
//     {
//       id: 1,
//       status: 'Active',
//       title: 'Collaborative Development',
//       professor: 'Prof. James Anderson',
//       schedule: 'MWF 10:00 AM',
//       students: '35 Students'
//     },
//     {
//       id: 2,
//       status: 'Active',
//       title: 'Human - Computer Interaction',
//       professor: 'Prof. Sarah Chen',
//       schedule: 'TTH 2:00 PM',
//       students: '28 Students'
//     },
//     {
//       id: 3,
//       status: 'Active',
//       title: 'Distributed and Cloud Systems Programming',
//       professor: 'Prof. Michael Brown',
//       schedule: 'MWF 2:00 PM',
//       students: '32 Students'
//     }
//   ];

//   return (
//     <div className="my-courses">
//       <header className="courses-header">
//         <h1>My Courses</h1>
//         <h2>Spring Semester 2025</h2>
//       </header>

//       <div className="courses-list">
//         {courses.map((course) => (
//           <div key={course.id} className="course-card">
//             <div className="course-status">{course.status}</div>
//             <h3 className="course-title">{course.title}</h3>
//             <p className="course-professor">{course.professor}</p>
//             <div className="course-details">
//               <p>{course.schedule}</p>
//               <p>{course.students}</p>
//             </div>
//             <Link to="/feedback" className="submit-feedback-btn">
//               Submit Feedback
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyCourses;

import React from 'react';
import { Link } from 'react-router-dom';
import './MyCourses.css';

const MyCourses = () => {
  const courses = [
    {
      id: 1,
      status: 'Active',
      title: 'Collaborative Development',
      professor: 'Prof. James Anderson',
      schedule: 'MWF 10:00 AM',
      students: '35 Students'
    },
    {
      id: 2,
      status: 'Active',
      title: 'Human - Computer Interaction',
      professor: 'Prof. Sarah Chen',
      schedule: 'TTH 2:00 PM',
      students: '28 Students'
    },
    {
      id: 3,
      status: 'Active',
      title: 'Distributed and Cloud Systems Programming',
      professor: 'Prof. Michael Brown',
      schedule: 'MWF 2:00 PM',
      students: '32 Students'
    }
  ];

  return (
    <div className="my-courses">
      <header className="courses-header">
        <h1>My Courses</h1>
        <h2>Spring Semester 2025</h2>
      </header>

      <div className="courses-list">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-status">{course.status}</div>
            <h3 className="course-title">{course.title}</h3>
            <p className="course-professor">{course.professor}</p>
            <div className="course-details">
              <p>{course.schedule}</p>
              <p>{course.students}</p>
            </div>
            <Link
              to={{
                pathname: '/feedback',
              }}
              state={{ courseName: course.title }}
              className="submit-feedback-btn"
            >
              Submit Feedback
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
