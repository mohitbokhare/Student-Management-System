import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const STUDENTS_API = "http://127.0.0.1:8000/api/students/";
const CLASSES_API = "http://127.0.0.1:8000/api/classes/";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  // Fetch dashboard data
  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(STUDENTS_API);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch(CLASSES_API);

      if (!response.ok) {
        throw new Error("Failed to fetch classes");
      }

      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // Count active classes
  const activeClasses = classes.filter(
    (item) => item.status === "Active"
  ).length;

  // Show latest 4 students
  const recentStudents = students.slice(-4).reverse();

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo">SM</div>
          <span>StudentHub</span>
        </div>

        <nav className="sidebar-nav">

          <Link
            to="/dashboard"
            className="nav-item active"
          >
            Dashboard
          </Link>

          <Link
            to="/students"
            className="nav-item"
          >
            Students
          </Link>

          <Link
            to="/classes"
            className="nav-item"
          >
            Classes
          </Link>

          <a className="nav-item">
            Attendance
          </a>

          <a className="nav-item">
            Fees
          </a>

        </nav>

        <div className="sidebar-info">
          <strong>Student Management System</strong>

          <p>
            Manage student records, attendance, classes and fees.
          </p>
        </div>

      </aside>


      {/* Main Content */}
      <main className="dashboard-main">

        {/* Header */}
        <header className="dashboard-header">

          <div>
            <h1>Dashboard</h1>

            <p>
              Welcome back. Here's today's overview.
            </p>
          </div>

          <div className="user-profile">

            <div className="user-avatar">
              M
            </div>

            <span>
              Mohit
            </span>

          </div>

        </header>


        {/* Statistics */}
        <section className="stats-grid">

          {/* Total Students */}
          <div className="stat-card blue">

            <span>
              Total Students
            </span>

            <strong>
              {students.length}
            </strong>

          </div>


          {/* Active Classes */}
          <div className="stat-card green">

            <span>
              Active Classes
            </span>

            <strong>
              {activeClasses}
            </strong>

          </div>


          {/* Attendance */}
          <div className="stat-card orange">

            <span>
              Today's Attendance
            </span>

            <strong>
              92%
            </strong>

          </div>


          {/* Fees */}
          <div className="stat-card purple">

            <span>
              Pending Fees
            </span>

            <strong>
              18
            </strong>

          </div>

        </section>


        {/* Recent Students */}
        <section className="students-section">

          <div className="section-header">

            <h2>
              Recent Student Records
            </h2>

            <Link
              to="/students"
              className="add-student-btn"
            >
              + Add Student
            </Link>

          </div>


          <div className="table-container">

            <table>

              <thead>

                <tr>

                  <th>
                    STUDENT
                  </th>

                  <th>
                    STUDENT ID
                  </th>

                  <th>
                    COURSE
                  </th>

                  <th>
                    STATUS
                  </th>

                </tr>

              </thead>


              <tbody>

                {recentStudents.length > 0 ? (

                  recentStudents.map((student) => (

                    <tr key={student.student_id}>

                      <td>
                        {student.name}
                      </td>

                      <td>
                        {student.student_id}
                      </td>

                      <td>
                        {student.course}
                      </td>

                      <td>

                        <span
                          className={
                            student.status === "Active"
                              ? "status active-status"
                              : "status pending-status"
                          }
                        >
                          {student.status}
                        </span>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      style={{ textAlign: "center" }}
                    >
                      No students found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;