import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import './Admin.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons


const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`admin-menu ${isMenuOpen ? "open" : ""}`}>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Dashboard</h4>
          <button className="menu-toggle" onClick={toggleMenu}>
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
          <div className="menu-items">
            <NavLink
              to="/dashboard/admin/createproduct"
              className="list-group-item"
            >
              <i className="bi bi-plus-square"></i>
              <span>Create Product</span>
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-workshop"
              className="list-group-item"
            >
              <i className="bi bi-calendar-plus"></i>
              <span>Create Workshop</span>
            </NavLink>
          </div>
          <div className="menu-items">
            <NavLink
              to="/dashboard/admin/products"
              className="list-group-item"
            >
              <i className="bi bi-grid"></i>
              <span>All Products</span>
            </NavLink>
            <NavLink
              to="/dashboard/admin/allworkshop"
              className="list-group-item"
            >
              <i className="bi bi-journal-bookmark"></i>
              <span>All Workshop</span>
            </NavLink>
            <NavLink
              to="/dashboard/admin/userworkshop"
              className="list-group-item"
            >
              <i className="bi bi-people"></i>
              <span>Workshop Users </span>
            </NavLink>
          </div>
          <div className="menu-items">
            <NavLink
              to="/dashboard/admin/users"
              className="list-group-item"
            >
              <i className="bi bi-people"></i>
              <span>All Users</span>
            </NavLink>
            <NavLink
              to="/dashboard/admin/waitingproduct"
              className="list-group-item"
            >
              <i className="bi bi-clock"></i>
              <span>Waiting Products</span>
            </NavLink>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminMenu;
