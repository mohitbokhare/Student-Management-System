import { useState } from 'react'

const students = [
  { name: 'Aarav Sharma', id: 'STU-101', course: 'BCA', status: 'Active' },
  { name: 'Priya Patel', id: 'STU-102', course: 'BCA', status: 'Active' },
  { name: 'Rahul Verma', id: 'STU-103', course: 'BSc CS', status: 'Active' },
  { name: 'Sneha Kulkarni', id: 'STU-104', course: 'BCA', status: 'Pending' },
]

function App() {
  const [page, setPage] = useState('Dashboard')
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    setShowForm(false)
    setMessage('Student record added successfully.')
  }

  const menuItems = ['Dashboard', 'Students', 'Classes', 'Attendance']

  return (
    <div className="app">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Arial, sans-serif; background: #f5f7fb; color: #172033; }
        button { font: inherit; cursor: pointer; }
        .app { min-height: 100vh; display: flex; }
        .sidebar { width: 240px; background: #172b4d; color: white; padding: 28px 16px; }
        .brand { display: flex; align-items: center; gap: 10px; margin: 0 10px 38px; font-size: 18px; font-weight: 700; }
        .brand-icon { width: 34px; height: 34px; display: grid; place-items: center; background: #4f8cff; border-radius: 9px; }
        .nav-button { width: 100%; border: 0; border-radius: 8px; background: transparent; color: #c6d3e8; text-align: left; padding: 13px 14px; margin: 4px 0; }
        .nav-button:hover, .nav-button.active { background: #294a78; color: white; }
        .help-card { margin: 42px 8px 0; background: #294a78; border-radius: 10px; padding: 15px; color: #dbeafe; font-size: 13px; line-height: 1.5; }
        .main { flex: 1; padding: 30px 42px; }
        .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        h1 { margin: 0; font-size: 28px; }
        .subtitle { margin: 7px 0 0; color: #6b778c; }
        .profile { display: flex; align-items: center; gap: 10px; color: #4a5568; font-weight: 600; }
        .avatar { width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; color: white; background: #4f8cff; }
        .cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 28px; }
        .card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 3px 14px rgba(20, 42, 76, .07); border-left: 4px solid #4f8cff; }
        .card:nth-child(2) { border-color: #16a085; }
        .card:nth-child(3) { border-color: #f39c12; }
        .card:nth-child(4) { border-color: #9b59b6; }
        .card-label { color: #6b778c; font-size: 14px; }
        .card-value { font-size: 30px; font-weight: 700; margin-top: 10px; }
        .content-card { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 3px 14px rgba(20, 42, 76, .07); }
        .content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        h2 { margin: 0; font-size: 20px; }
        .primary { border: 0; background: #2563eb; color: white; padding: 11px 16px; border-radius: 7px; font-weight: 600; }
        .primary:hover { background: #1d4ed8; }
        table { width: 100%; border-collapse: collapse; }
        th { color: #6b778c; font-size: 12px; text-transform: uppercase; text-align: left; padding: 12px; border-bottom: 1px solid #e7ebf3; }
        td { padding: 15px 12px; border-bottom: 1px solid #eef1f6; font-size: 14px; }
        .student-name { font-weight: 700; }
        .status { padding: 5px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; }
        .active-status { background: #dcfce7; color: #15803d; }
        .pending-status { background: #fef3c7; color: #a16207; }
        .notice { margin: 0 0 20px; padding: 12px 14px; background: #dcfce7; color: #166534; border-radius: 7px; }
        .modal-backdrop { position: fixed; inset: 0; display: grid; place-items: center; background: rgba(15, 23, 42, .45); }
        .modal { width: min(430px, 90vw); background: white; padding: 25px; border-radius: 12px; }
        .modal h2 { margin-bottom: 18px; }
        label { display: block; margin: 12px 0 6px; font-size: 14px; font-weight: 600; }
        input, select { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; }
        .form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
        .secondary { padding: 10px 14px; border: 1px solid #cbd5e1; background: white; border-radius: 7px; }
        @media (max-width: 900px) { .sidebar { width: 190px; } .main { padding: 25px; } .cards { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

      <aside className="sidebar">
        <div className="brand"><span className="brand-icon">SM</span> StudentHub</div>
        {menuItems.map((item) => (
          <button
            key={item}
            className={`nav-button ${page === item ? 'active' : ''}`}
            onClick={() => setPage(item)}
          >
            {item}
          </button>
        ))}
        <div className="help-card">
          <strong>Student Management System</strong><br />
          Frontend prototype for class records, attendance, and student information.
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            <h1>{page}</h1>
            <p className="subtitle">Welcome back. Here is today’s overview.</p>
          </div>
          <div className="profile"><span className="avatar">M</span> Mohit</div>
        </div>

        {message && <div className="notice">{message}</div>}

        <section className="cards">
          <div className="card"><div className="card-label">Total Students</div><div className="card-value">248</div></div>
          <div className="card"><div className="card-label">Active Classes</div><div className="card-value">12</div></div>
          <div className="card"><div className="card-label">Today’s Attendance</div><div className="card-value">92%</div></div>
          <div className="card"><div className="card-label">Pending Fees</div><div className="card-value">18</div></div>
        </section>

        <section className="content-card">
          <div className="content-header">
            <h2>Recent Student Records</h2>
            <button className="primary" onClick={() => setShowForm(true)}>+ Add Student</button>
          </div>
          <table>
            <thead>
              <tr><th>Student</th><th>Student ID</th><th>Course</th><th>Status</th></tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="student-name">{student.name}</td>
                  <td>{student.id}</td>
                  <td>{student.course}</td>
                  <td><span className={`status ${student.status === 'Active' ? 'active-status' : 'pending-status'}`}>{student.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {showForm && (
        <div className="modal-backdrop">
          <form className="modal" onSubmit={handleAdd}>
            <h2>Add Student</h2>
            <label>Full name</label>
            <input required placeholder="Enter student name" />
            <label>Student ID</label>
            <input required placeholder="Example: STU-105" />
            <label>Course</label>
            <select defaultValue="BCA"><option>BCA</option><option>BSc CS</option><option>BBA</option></select>
            <div className="form-actions">
              <button type="button" className="secondary" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="primary" type="submit">Save Student</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default App