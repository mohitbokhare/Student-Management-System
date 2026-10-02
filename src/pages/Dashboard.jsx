import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const STUDENTS_API =
  "https://student-management-system-rvgr.onrender.com/api/students/";

const CLASSES_API =
  "https://student-management-system-rvgr.onrender.com/api/classes/";

const ATTENDANCE_API =
  "https://student-management-system-rvgr.onrender.com/api/attendance/";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // Fetch dashboard data
  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchAttendance();
  }, []);

  // ================================
  // FETCH STUDENTS
  // ================================

  const fetchStudents = async () => {
    try {
      const response = await fetch(STUDENTS_API);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      setStudents(data);

      console.log("Students:", data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // ================================
  // FETCH CLASSES
  // ================================

  const fetchClasses = async () => {
    try {
      const response = await fetch(CLASSES_API);

      if (!response.ok) {
        throw new Error("Failed to fetch classes");
      }

      const data = await response.json();

      setClasses(data);

      console.log("Classes:", data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // ================================
  // FETCH ATTENDANCE
  // ================================

  const fetchAttendance = async () => {
    try {
      const response = await fetch(ATTENDANCE_API);

      if (!response.ok) {
        throw new Error("Failed to fetch attendance");
      }

      const data = await response.json();

      setAttendance(data);

      console.log("Attendance:", data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // ================================
  // ACTIVE CLASSES
  // ================================

  const activeClasses = classes.filter(
    (item) => item.status === "Active"
  ).length;

  // ================================
  // ATTENDANCE PERCENTAGE
  // ================================

  const totalAttendance = attendance.length;

  const presentAttendance = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const attendancePercentage =
    totalAttendance > 0
      ? Math.round(
          (presentAttendance / totalAttendance) * 100
        )
      : 0;

  // ================================
  // RECENT STUDENTS
  // ================================

  const recentStudents = students
    .slice(-4)
    .reverse();

  // ================================
  // PAGE
  // ================================

  return (
    <div className="dashboard-page">

      {/* ================================
          SIDEBAR
      ================================= */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-logo">
            SM
          </div>

          <span>
            StudentHub
          </span>

        </div>

        <nav className="sidebar-nav">

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className="nav-item active"
          >
            Dashboard
          </Link>

          {/* Students */}
          <Link
            to="/students"
            className="nav-item"
          >
            Students
          </Link>

          {/* Classes */}
          <Link
            to="/classes"
            className="nav-item"
          >
            Classes
          </Link>

          {/* Attendance */}
          <Link
            to="/attendance"
            className="nav-item"
          >
            Attendance
          </Link>

          {/* Fees */}
          <Link
            to="/fees"
            className="nav-item"
          >
            Fees
          </Link>

        </nav>

        <div className="sidebar-info">

          <strong>
            Student Management System
          </strong>

          <p>
            Manage student records, attendance,
            classes and fees.
          </p>

        </div>

      </aside>

      {/* ================================
          MAIN CONTENT
      ================================= */}

      <main className="dashboard-main">

        {/* Header */}

        <header className="dashboard-header">

          <div>

            <h1>
              Dashboard
            </h1>

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

        {/* ================================
            STATISTICS
        ================================= */}

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

          {/* Today's Attendance */}

          <div className="stat-card orange">

            <span>
              Today's Attendance
            </span>

            <strong>
              {attendancePercentage}%
            </strong>

          </div>

          {/* Pending Fees */}

          <div className="stat-card purple">

            <span>
              Pending Fees
            </span>

            <strong>
              18
            </strong>

          </div>

        </section>

        {/* ================================
            RECENT STUDENTS
        ================================= */}

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

                    <tr
                      key={student.student_id}
                    >

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
                      style={{
                        textAlign: "center"
                      }}
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