
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

  // Dynamic user profile
  const userEmail = localStorage.getItem("userEmail") || "";

  const userName = userEmail
    ? userEmail
        .split("@")[0]
        .split(/[._-]/)
        .filter(Boolean)
        .map((word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
        )
        .join(" ")
    : "User";

  const userInitial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchAttendance();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(STUDENTS_API);
      if (!response.ok) throw new Error("Failed to fetch students");

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch(CLASSES_API);
      if (!response.ok) throw new Error("Failed to fetch classes");

      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await fetch(ATTENDANCE_API);
      if (!response.ok) throw new Error("Failed to fetch attendance");

      const data = await response.json();
      setAttendance(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // Active Classes
  const activeClasses = classes.filter(
    (item) => item.status === "Active"
  ).length;

  // Attendance Percentage
  const totalAttendance = attendance.length;

  const presentAttendance = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const attendancePercentage =
    totalAttendance > 0
      ? Math.round((presentAttendance / totalAttendance) * 100)
      : 0;

  // Recent Students
  const recentStudents = students.slice(-4).reverse();

  return (
    <div className="dashboard-page">
      <main className="dashboard-main">

        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back. Here's today's overview.</p>
          </div>

          {/* Dynamic User Profile */}
          <div className="user-profile">
            <div className="user-avatar">{userInitial}</div>
            <span>{userName}</span>
          </div>
        </header>

        {/* Statistics */}
        <section className="stats-grid">

          <div className="stat-card blue">
            <span>Total Students</span>
            <strong>{students.length}</strong>
          </div>

          <div className="stat-card green">
            <span>Active Classes</span>
            <strong>{activeClasses}</strong>
          </div>

          <div className="stat-card orange">
            <span>Today's Attendance</span>
            <strong>{attendancePercentage}%</strong>
          </div>

        </section>

        {/* Recent Student Records */}
        <section className="students-section">

          <div className="section-header">
            <h2>Recent Student Records</h2>

            <Link to="/students" className="add-student-btn">
              + Add Student
            </Link>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>STUDENT ID</th>
                  <th>COURSE</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {recentStudents.length > 0 ? (
                  recentStudents.map((student) => (
                    <tr key={student.student_id}>
                      <td>{student.name}</td>
                      <td>{student.student_id}</td>
                      <td>{student.course}</td>
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
                    <td colSpan="4" style={{ textAlign: "center" }}>
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
