// import React from "react";
// import "./dashbord.css";
// import { CourseData } from "../../context/CourseContext";
// import CourseCard from "../../components/courseCard/CourseCard";

// const Dashbord = () => {
//   const { mycourse } = CourseData();
//   return (
//     <div className="student-dashboard">
//       <h2>All Enrolled Courses</h2>
//       <div className="dashboard-content">
//         {mycourse && mycourse.length > 0 ? (
//           mycourse.map((e) => (<CourseCard key={e._id} course={e} />))
//         ) : (
//           <p>No course Enrolled Yet</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashbord;
import React, { useEffect, useState } from "react";
import "./dashbord.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/courseCard/CourseCard";

const Dashboard = () => {
  const { mycourse, fetchMyCourse } = CourseData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fetchMyCourse) {
      fetchMyCourse(); // ✅ Ensure function is called
      setLoading(false);
    }
  }, []);

  return (
    <div className="student-dashboard">
      <h2>All Enrolled Courses</h2>
      <div className="dashboard-content">
        {loading ? (
          <p>Loading courses...</p>
        ) : mycourse && mycourse.length > 0 ? (
          mycourse.map((course) => <CourseCard key={course._id} course={course} />)
        ) : (
          <p>No courses enrolled yet. Explore courses to start learning!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
