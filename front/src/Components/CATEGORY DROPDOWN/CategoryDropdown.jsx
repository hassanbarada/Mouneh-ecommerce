import React,{ useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CategoryDropDown = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    
    const isAdmin = localStorage.getItem("isAdmin");
    const token = localStorage.getItem('access_token');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
      const All = () => {
        navigate('/showProducts/All')
        toggleDropdown();
      }
      const Food = () => {
        navigate('/showProducts/Food')
        toggleDropdown();
      }
      const Craft = () => {
        navigate('/showProducts/Craft')
        toggleDropdown();
      }
    
  return (
    <>
      <label className="popup">
        <input type="checkbox" checked={isOpen} onChange={toggleDropdown} />
        <div className="burger" tabIndex="0">
            Category
        </div>
        <nav className={`popup-window ${isOpen ? 'open' : ''}`}>
          <ul>
          <li>
            <button onClick={All}>All Product</button>
          </li>
          <li>
            <button onClick={Food}>Food</button>
          </li>
          <li>
            <button onClick={Craft}>Craft</button>
          </li>
          </ul>
        </nav>
      </label>
    </>
  );
};

export default CategoryDropDown;
