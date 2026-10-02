import { useEffect, useState } from "react";
import "./Classes.css";

const API_URL = "http://127.0.0.1:8000/api/classes/";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    teacher: "",
    students: "",
    room: "",
    status: "Active",
  });

  // ==============================
  // GET ALL CLASSES
  // ==============================
  const fetchClasses = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch classes");
      }

      const data = await response.json();

      const formattedData = data.map((item) => ({
        apiId: item.id,
        id: item.class_id,
        name: item.name,
        course: item.course,
        teacher: item.teacher,
        students: item.students,
        room: item.room,
        status: item.status,
      }));

      setClasses(formattedData);
    } catch (error) {
      console.error("Error fetching classes:", error);
      alert("Unable to load classes from server.");
    } finally {
      setLoading(false);
    }
  };

  // Load classes when page opens
  useEffect(() => {
    fetchClasses();
  }, []);

  // ==============================
  // SEARCH
  // ==============================
  const filteredClasses = classes.filter((item) => {
    const search = searchTerm.toLowerCase();

    return (
      item.id.toLowerCase().includes(search) ||
      item.name.toLowerCase().includes(search) ||
      item.course.toLowerCase().includes(search) ||
      item.teacher.toLowerCase().includes(search) ||
      item.room.toLowerCase().includes(search)
    );
  });

  // ==============================
  // INPUT CHANGE
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ==============================
  // ADD CLASS BUTTON
  // ==============================
  const handleAddClick = () => {
    setEditingId(null);

    setFormData({
      name: "",
      course: "",
      teacher: "",
      students: "",
      room: "",
      status: "Active",
    });

    setShowForm(true);
  };

  // ==============================
  // CREATE CLASS ID
  // ==============================
  const generateClassId = () => {
    if (classes.length === 0) {
      return "CLS-101";
    }

    const numbers = classes
      .map((item) => {
        const match = item.id.match(/CLS-(\d+)/);
        return match ? Number(match[1]) : 100;
      })
      .filter((number) => !isNaN(number));

    const highestNumber = Math.max(...numbers);

    return `CLS-${highestNumber + 1}`;
  };

  // ==============================
  // ADD / UPDATE CLASS
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.course ||
      !formData.teacher ||
      !formData.students ||
      !formData.room
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      // ==========================
      // UPDATE
      // ==========================
      if (editingId) {
        const existingClass = classes.find(
          (item) => item.id === editingId
        );

        if (!existingClass) {
          alert("Class not found.");
          return;
        }

        const response = await fetch(
          `${API_URL}${existingClass.apiId}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              class_id: existingClass.id,
              name: formData.name,
              course: formData.course,
              teacher: formData.teacher,
              students: Number(formData.students),
              room: formData.room,
              status: formData.status,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          console.error("UPDATE ERROR:", errorData);
          throw new Error(`Failed to update class: ${response.status}`);
        }

        await fetchClasses();

        alert("Class updated successfully.");
      }

      // ==========================
      // CREATE
      // ==========================
      else {
        const newClassId = generateClassId();

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            class_id: newClassId,
            name: formData.name,
            course: formData.course,
            teacher: formData.teacher,
            students: Number(formData.students),
            room: formData.room,
            status: formData.status,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();

          console.error("CREATE ERROR:", errorData);

          throw new Error(
            `Failed to create class: ${response.status}`
          );
        }

        await fetchClasses();

        alert("Class added successfully.");
      }

      // Reset form
      setFormData({
        name: "",
        course: "",
        teacher: "",
        students: "",
        room: "",
        status: "Active",
      });

      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  // ==============================
  // EDIT
  // ==============================
  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      name: item.name,
      course: item.course,
      teacher: item.teacher,
      students: item.students,
      room: item.room,
      status: item.status,
    });

    setShowForm(true);
  };

  // ==============================
  // DELETE
  // ==============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const item = classes.find(
        (classItem) => classItem.id === id
      );

      if (!item) {
        alert("Class not found.");
        return;
      }

      const deleteURL = `${API_URL}${item.apiId}/`;

      console.log("DELETE URL:", deleteURL);

      const response = await fetch(deleteURL, {
        method: "DELETE",
      });

      console.log("DELETE STATUS:", response.status);

      if (!response.ok) {
        const errorText = await response.text();

        console.error("DELETE ERROR:", errorText);

        throw new Error(
          `Delete failed. Server returned status ${response.status}`
        );
      }

      await fetchClasses();

      alert("Class deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);

      alert(
        "Unable to delete class.\n\n" +
        error.message +
        "\n\nCheck the browser console for details."
      );
    }
  };

  // ==============================
  // CANCEL
  // ==============================
  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);

    setFormData({
      name: "",
      course: "",
      teacher: "",
      students: "",
      room: "",
      status: "Active",
    });
  };

  // ==============================
  // UI
  // ==============================
  return (
    <div className="classes-page">

      {/* Header */}
      <div className="classes-header">
        <div>
          <h1>Classes</h1>
          <p>Manage classes and class information.</p>
        </div>

        <button
          className="add-class-button"
          onClick={handleAddClick}
        >
          + Add Class
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="classes-card class-form-card">

          <h2>
            {editingId ? "Edit Class" : "Add Class"}
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="class-form-grid">

              <div>
                <label>Class Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="e.g. BCA - Semester 3"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Course</label>

                <input
                  type="text"
                  name="course"
                  placeholder="e.g. BCA"
                  value={formData.course}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Teacher</label>

                <input
                  type="text"
                  name="teacher"
                  placeholder="e.g. Prof. Amit Sharma"
                  value={formData.teacher}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Students</label>

                <input
                  type="number"
                  name="students"
                  placeholder="e.g. 40"
                  value={formData.students}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Room</label>

                <input
                  type="text"
                  name="room"
                  placeholder="e.g. Room 302"
                  value={formData.room}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

            </div>

            <div className="class-form-buttons">

              <button
                type="submit"
                className="save-class-button"
              >
                {editingId ? "Save Changes" : "Add Class"}
              </button>

              <button
                type="button"
                className="cancel-class-button"
                onClick={handleCancel}
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Table */}
      <div className="classes-card">

        <div className="classes-toolbar">

          <input
            type="text"
            placeholder="Search classes..."
            className="search-class-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

        {/* Loading */}
        {loading ? (
          <div
            style={{
              padding: "30px",
              textAlign: "center",
            }}
          >
            Loading classes...
          </div>
        ) : (

          <table className="classes-table">

            <thead>
              <tr>
                <th>Class ID</th>
                <th>Class Name</th>
                <th>Course</th>
                <th>Teacher</th>
                <th>Students</th>
                <th>Room</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredClasses.length > 0 ? (

                filteredClasses.map((item) => (

                  <tr key={item.apiId}>

                    <td>
                      <strong>{item.id}</strong>
                    </td>

                    <td>{item.name}</td>

                    <td>{item.course}</td>

                    <td>{item.teacher}</td>

                    <td>{item.students}</td>

                    <td>{item.room}</td>

                    <td>
                      <span className="class-status">
                        {item.status}
                      </span>
                    </td>

                    <td>

                      <button
                        className="class-edit-button"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="class-delete-button"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="8"
                    style={{ textAlign: "center" }}
                  >
                    No classes found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default Classes;