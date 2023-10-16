import React,{ useState } from 'react';
import './Dropdown.css';
import { useNavigate, useLocation } from 'react-router-dom';

const DropDown = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isProductPage = location.pathname.startsWith("/product/");
    const isProductsPage = location.pathname.startsWith("/showProducts");
    const isCartPage = location.pathname.startsWith("/cart");
    const isAdmin = localStorage.getItem("isAdmin");
    const token = localStorage.getItem('access_token');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
    const workshop = () => {
        navigate('/workshops')
        toggleDropdown();
    }
    const edit = () => {
        navigate('/editprofile')
        toggleDropdown();
    }
    const cart = () => {
        navigate('/cart')
        toggleDropdown();
    }
    const dashboard = () => {
        navigate('/dashboard/admin/*')
        toggleDropdown();
    }
    const addProduct = () => {
      if(isAdmin === "true") {
        navigate('/dashboard/admin/createproduct')
        toggleDropdown();
      }else{
        navigate('/addproduct')
        toggleDropdown();
      }
    }
    const myProduct = () => {
      if(isAdmin === "true") {
        navigate('/dashboard/admin/products')
        toggleDropdown();
      }else{
        navigate('/MyProducts')
        toggleDropdown();
      }
    };
    const chat = () => {
      navigate('/mychat')
      toggleDropdown();
    }
  return (
    <>
      <label className="popup">
        <input type="checkbox" checked={isOpen} onChange={toggleDropdown} />
        <div className="burger" tabIndex="0">
            More
        </div>
        <nav className={`popup-window ${isOpen ? 'open' : ''}`}>
          <ul>
          {isAdmin === "true" && (
              <li>
              <button onClick={dashboard}>
              <svg
  strokeLinejoin="round"
  strokeLinecap="round"
  strokeWidth="2"
  stroke="currentColor"
  fill="none"
  viewBox="0 0 24 24"
  height="14"
  width="14"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M4 21h4V5H4v16zM10 21h4V10h-4v11zM16 21h4V16h-4v5z"></path>
</svg>
                <span>Dashboard</span>
              </button>
            </li>
            )}
            <li>
              <button onClick={workshop}>
              <svg
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
      height="14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="8" y1="9" x2="16" y2="9"></line>
      <line x1="8" y1="13" x2="14" y2="13"></line>
      <line x1="8" y1="17" x2="12" y2="17"></line>
    </svg>
                <span>Workshops</span>
              </button>
            </li>
              <li>
              <button onClick={myProduct}>
              <svg
    strokeLinejoin="round"
    strokeLinecap="round"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 24 24"
    height="14"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="8" y1="12" x2="16" y2="12"></line>
    <line x1="12" y1="8" x2="12" y2="16"></line>
  </svg>
                <span>My Products</span>
              </button>
            </li>
            
              <li>
              <button onClick={addProduct}>
              <svg
    strokeLinejoin="round"
    strokeLinecap="round"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 24 24"
    height="14"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="8" y1="12" x2="16" y2="12"></line>
    <line x1="12" y1="8" x2="12" y2="16"></line>
  </svg>
                <span>Add Products</span>
              </button>
            </li>
            
            
            {!isProductPage  && !isProductsPage && !isCartPage &&
            <li>
              <button onClick={cart}>
              <svg
    strokeLinejoin="round"
    strokeLinecap="round"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 24 24"
    height="14"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 9H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-5"></path>
    <rect x="2" y="2" width="20" height="5" rx="1" ry="1"></rect>
  </svg>
                <span>My Cart</span>
              </button>
            </li>}
            
            {token && (
              <li>
            <button onClick={edit}>
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                height="14"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
              </svg>
              <span>Edit Profile</span>
            </button>
          </li>
            )}
            {token && (
              <li>
            <button onClick={chat}>
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                height="14"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
              </svg>
              <span>My Chats</span>
            </button>
          </li>
            )}
          </ul>
        </nav>
      </label>
    </>
  );
};

export default DropDown;
