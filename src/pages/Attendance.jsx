import { useEffect, useState } from "react";
import "../Attendance.css";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [student, setStudent] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  // Render Backend API
  const API_URL =
    "https://student-management-system-rvgr.onrender.com/api";

  // ============================
  // LOAD STUDENTS
  // ============================
  useEffect(() => {
    fetch(`${API_URL}/students/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load students");
        }

        return response.json();
      })
      .then((data) => {
        setStudents(data);
        console.log("Students:", data);
      })
      .catch((error) => {
        console.error("Error loading students:", error);
      });
  }, []);

  // ============================
  // LOAD ATTENDANCE
  // ============================
  const loadAttendance = () => {
    fetch(`${API_URL}/attendance/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load attendance");
        }

        return response.json();
      })
      .then((data) => {
        setAttendance(data);
        console.log("Attendance:", data);
      })
      .catch((error) => {
        console.error("Error loading attendance:", error);
      });
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  // ============================
  // SAVE ATTENDANCE
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student || !date || !status) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/attendance/`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          student: student,
          date: date,
          status: status,
        }),
      });

      const data = await response.json();

      console.log("POST status:", response.status);
      console.log("POST response:", data);

      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }

      alert("Attendance saved successfully.");

      // Clear form
      setStudent("");
      setDate("");
      setStatus("Present");

      // Reload attendance records
      loadAttendance();
    } catch (error) {
      console.error("Attendance error:", error);

      alert(`Unable to save attendance: ${error.message}`);
    }
  };

  // ============================
  // PAGE
  // ============================
  return (
    <div className="attendance-page">

      {/* ============================
          HEADER
      ============================ */}
      <div className="attendance-header">
        <div>
          <h1>Attendance</h1>

          <p>
            Manage student attendance records.
          </p>
        </div>
      </div>

      {/* ============================
          MARK ATTENDANCE
      ============================ */}
      <div className="attendance-card">

        <h2>Mark Attendance</h2>

        <form
          onSubmit={handleSubmit}
          className="attendance-form"
        >

          {/* STUDENT */}
          <div className="form-group">

            <label>
              Student
            </label>

            <select
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              required
            >

              <option value="">
                Select student
              </option>

              {students.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.student_id} - {item.name}
                </option>
              ))}

            </select>

            {students.length === 0 && (
              <small>
                No students found. Add students first.
              </small>
            )}

          </div>

          {/* DATE */}
          <div className="form-group">

            <label>
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

          </div>

          {/* STATUS */}
          <div className="form-group">

            <label>
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >

              <option value="Present">
                Present
              </option>

              <option value="Absent">
                Absent
              </option>

            </select>

          </div>

          {/* SAVE BUTTON */}
          <button
            type="submit"
            className="attendance-button"
            disabled={students.length === 0}
          >
            Save Attendance
          </button>

        </form>

      </div>

      {/* ============================
          ATTENDANCE RECORDS
      ============================ */}
      <div className="attendance-card">

        <div className="attendance-records-header">

          <div>
            <h2>Attendance Records</h2>

            <p>
              View all recorded student attendance.
            </p>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={loadAttendance}
          >
            Refresh
          </button>

        </div>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>STUDENT</th>
                <th>DATE</th>
                <th>STATUS</th>
              </tr>

            </thead>

            <tbody>

              {attendance.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    className="no-records"
                  >
                    No attendance records found.
                  </td>

                </tr>

              ) : (

                attendance.map((record) => {

                  const studentData = students.find(
                    (item) => item.id === record.student
                  );

                  return (
                    <tr key={record.id}>

                      <td>
                        {studentData
                          ? `${studentData.student_id} - ${studentData.name}`
                          : record.student}
                      </td>

                      <td>
                        {record.date}
                      </td>

                      <td>

                        <span
                          className={
                            record.status === "Present"
                              ? "status present"
                              : "status absent"
                          }
                        >
                          {record.status}
                        </span>

                      </td>

                    </tr>
                  );
                })

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Attendance;