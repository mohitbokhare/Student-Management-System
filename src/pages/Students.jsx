import { useEffect, useState } from "react";
import "./Students.css";

const API_URL = "https://student-management-system-rvgr.onrender.com/api/students/";

function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    email: "",
    phone: "",
    status: "Active",
  });

  // FETCH STUDENTS
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      setStudents(
        data.map((student) => ({
          id: student.student_id,
          name: student.name,
          course: student.course,
          email: student.email,
          phone: student.phone,
          status: student.status,
        }))
      );
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Unable to load students.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ADD STUDENT
  const handleAddStudent = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.course ||
      !formData.email ||
      !formData.phone
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newStudentId = `STU-${101 + students.length}`;

    const studentData = {
      student_id: newStudentId,
      name: formData.name,
      course: formData.course,
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        throw new Error("Failed to add student");
      }

      await fetchStudents();

      setFormData({
        name: "",
        course: "",
        email: "",
        phone: "",
        status: "Active",
      });

      setShowAddForm(false);

      alert("Student added successfully.");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Unable to add student.");
    }
  };

  // DELETE STUDENT
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      await fetchStudents();

      alert("Student deleted successfully.");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Unable to delete student.");
    }
  };

  // OPEN EDIT FORM
  const handleEdit = (student) => {
    setEditingStudent(student);

    setFormData({
      name: student.name,
      course: student.course,
      email: student.email,
      phone: student.phone,
      status: student.status,
    });
  };

  // UPDATE STUDENT
  const handleUpdateStudent = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.course ||
      !formData.email ||
      !formData.phone
    ) {
      alert("Please fill all fields.");
      return;
    }

    const updatedStudent = {
      name: formData.name,
      course: formData.course,
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
    };

    try {
      const response = await fetch(
        `${API_URL}${editingStudent.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudent),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        throw new Error("Update failed");
      }

      await fetchStudents();

      setEditingStudent(null);

      setFormData({
        name: "",
        course: "",
        email: "",
        phone: "",
        status: "Active",
      });

      alert("Student updated successfully.");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Unable to update student.");
    }
  };

  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditingStudent(null);

    setFormData({
      name: "",
      course: "",
      email: "",
      phone: "",
      status: "Active",
    });
  };

  // SEARCH
  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return true;
    }

    return (
      student.id.toLowerCase().includes(search) ||
      student.name.toLowerCase().includes(search) ||
      student.course.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search) ||
      student.phone.includes(search) ||
      student.status.toLowerCase().includes(search)
    );
  });

  return (
    <div className="students-page">

      {/* HEADER */}
      <div className="students-header">
        <div>
          <h1>Students</h1>
          <p>Manage student records.</p>
        </div>

        <button
          className="add-student-button"
          onClick={() => setShowAddForm(true)}
        >
          + Add Student
        </button>
      </div>

      {/* ADD STUDENT FORM */}
      {showAddForm && (
        <div className="students-card">
          <h2>Add New Student</h2>

          <form onSubmit={handleAddStudent}>
            <div className="form-grid">

              <input
                type="text"
                name="name"
                placeholder="Student name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="course"
                placeholder="Course"
                value={formData.course}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>

            </div>

            <div className="form-buttons">

              <button
                type="submit"
                className="add-student-button"
              >
                Add Student
              </button>

              <button
                type="button"
                className="delete-button"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>

            </div>
          </form>
        </div>
      )}

      {/* EDIT STUDENT FORM */}
      {editingStudent && (
        <div className="students-card">
          <h2>Edit Student</h2>

          <form onSubmit={handleUpdateStudent}>
            <div className="form-grid">

              <input
                type="text"
                name="name"
                placeholder="Student name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="course"
                placeholder="Course"
                value={formData.course}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>

            </div>

            <div className="form-buttons">

              <button
                type="submit"
                className="add-student-button"
              >
                Save Changes
              </button>

              <button
                type="button"
                className="delete-button"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>

            </div>
          </form>
        </div>
      )}

      {/* STUDENT TABLE */}
      <div className="students-card">

        <div className="students-toolbar">

          <input
            type="text"
            placeholder="Search students..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

        <table className="students-table">

          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredStudents.length > 0 ? (

              filteredStudents.map((student) => (

                <tr key={student.id}>

                  <td>
                    <strong>{student.id}</strong>
                  </td>

                  <td>{student.name}</td>

                  <td>{student.course}</td>

                  <td>{student.email}</td>

                  <td>{student.phone}</td>

                  <td>
                    <span
                      className={
                        student.status === "Active"
                          ? "status active"
                          : "status pending"
                      }
                    >
                      {student.status}
                    </span>
                  </td>

                  <td>

                    <button
                      className="edit-button"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center" }}
                >
                  No students found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Students;