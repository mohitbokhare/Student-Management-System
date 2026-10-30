
import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo">S</div>
          <h2>StudentHub</h2>
        </div>

        <nav className="sidebar-nav">

          <NavLink to="/dashboard" className="nav-item">
            Dashboard
          </NavLink>

          <NavLink to="/students" className="nav-item">
            Students
          </NavLink>

          <NavLink to="/classes" className="nav-item">
            Classes
          </NavLink>

          <NavLink to="/attendance" className="nav-item">
            Attendance
          </NavLink>

        </nav>

        <div className="sidebar-info">
          <p>Student Management System</p>
        </div>

      </aside>

      <main className="layout-main">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;
