import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
const Header = ({isAuth})=>{
    return(
        <header>
            <div className="logo">E-learning</div>
            
            <div className="link">
                <Link to={'/'}>Home</Link>
                <Link to={'/courses'}>Courses</Link>
                <Link to={'/about'}>About</Link>
                {
                    isAuth?(<Link to={'/account'}>Account</Link>):(<Link to={'/login'}>Login</Link>)
                }
               
            </div>
        </header>
    )
}

export default Header;



// import React, { useState, useEffect, useRef } from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// import { AiOutlineLogout } from 'react-icons/ai';
// import toast from 'react-hot-toast';
// import { Link, useNavigate } from "react-router-dom";
// import "./header.css";

// const Header = ({ isAuth, user, setIsAuth, setUser }) => {
//     const [open, setOpen] = useState(false);
//     const navigate = useNavigate();
//     const dropdownRef = useRef(null);

//     const logoutHandler = () => {
//         localStorage.clear();
//         setUser(null);
//         setIsAuth(false);
//         toast.success("Logged Out ");
//         navigate("/login");
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     return (
//         <header>
//             <div className="logo">E-learning</div>
//             <div className="link">
//                 <Link to={'/'}>Home</Link>
//                 <Link to={'/courses'}>Courses</Link>
//                 <Link to={'/about'}>About</Link>
//                 {isAuth ? (
//                     <div style={{ position: 'relative' }} ref={dropdownRef}>
//                         <button onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
//                             <FaUserCircle size={30} />
//                         </button>
//                         {open && (
//                             <div style={{ position: 'absolute', right: 0, marginTop: '10px', width: '200px', background: '#fff', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
//                                 <p style={{ margin: '10px 0' }}>{user?.name}</p>
//                                 <p style={{ margin: '10px 0'}}>{user?.email}</p>
//                                 <p style={{ margin: '10px 0'}}>My Learning</p>
//                                 <p style={{ margin: '10px 0'}}>My cart</p>
//                                 <button onClick={logoutHandler} style={{ width: '100%', padding: '8px', border: 'none', background: '#d9534f', color: '#fff', borderRadius: '5px', cursor: 'pointer' }}>
//                                     <AiOutlineLogout /> Log out
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 ) : (
//                     <Link to={'/login'}>Login</Link>
//                 )}
//             </div>
//         </header>
//     );
// };

// export default Header;