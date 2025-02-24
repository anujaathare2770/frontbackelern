import React from 'react';
import { MdDashboard } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import './account.css';
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Account = ({user}) => {
    const {setIsAuth, setUser} = UserData();
    const navigate = useNavigate()
    const logoutHandler = () =>{
        localStorage.clear();
        setUser([]);
        setIsAuth(false);
        toast.success("Logged Out ");
        navigate("/login");
    }
  return (
    <div>
        {user && (
            <div className='profile'>
            <h2>My Profile</h2>
            <div className='profile-info'>
                <p>
                    <strong>Name - {user.name}</strong>
                </p>
                <p>
                    <strong>Email - {user.email}</strong>
                </p>
                <button onClick={()=>navigate(`/${user._id}/dashboard`)} className='common-btn'><MdDashboard />Dashboard</button>
                <button onClick={logoutHandler} className='common-btn' style={{
                    background:"rgba(244, 47, 57, 0.8)",marginLeft:"6px"}}><AiOutlineLogout />Logout</button>
            </div>
        </div>
        )}
    </div>
  )
}

export default Account

// import React, { useState } from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// import { AiOutlineLogout } from 'react-icons/ai';

// const ProfileDropdown = ({ user, logoutHandler }) => {
//     const [open, setOpen] = useState(false);

//     return (
//         <div style={{ position: 'relative' }}>
//             <button onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
//                 <FaUserCircle size={30} />
//             </button>
//             {open && (
//                 <div style={{ position: 'absolute', right: 0, marginTop: '10px', width: '200px', background: '#fff', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
//                     <p style={{ margin: '10px 0', fontWeight: 'bold' }}>{user?.name}</p>
//                     <button onClick={logoutHandler} style={{ width: '100%', padding: '8px', border: 'none', background: '#d9534f', color: '#fff', borderRadius: '5px', cursor: 'pointer' }}>
//                         <AiOutlineLogout /> Log out
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProfileDropdown;