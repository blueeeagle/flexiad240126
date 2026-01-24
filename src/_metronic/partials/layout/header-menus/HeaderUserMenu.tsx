import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import {toAbsoluteUrl} from '../../../helpers'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth()
  const userString = localStorage.getItem("kt-auth-react-v");

  if (!userString) {
    return <div className="alert alert-danger text-center">No user data found</div>;
  }
  const users = JSON.parse(userString);
  const user = users.data.userDetails;
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('media/avatars/header-logo.jpeg')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
           {user.name||"-"}
             </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
             {user.email||"-"}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={'/profile'} className='menu-link px-5'>
          My Profile 
        </Link>
      </div>

      <div className='menu-item px-5 my-1'>
        <Link to='/' className='menu-link px-5'>
          Account Settings
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
// import { FC } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../../app/modules/auth";
// import { Languages } from "./Languages";
// import { toAbsoluteUrl } from "../../../helpers";

// const HeaderUserMenu: FC = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleSignOut = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate("/auth");
//     logout();
   
//   };

//   return (
//     <div
//       className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
//       data-kt-menu="true"
//     >
//       <div className="menu-item px-3">
//         <div className="menu-content d-flex align-items-center px-3">
//           <div className="symbol symbol-50px me-5">
//             <img
//               alt="Logo"
//               src={toAbsoluteUrl("media/avatars/header-logo.jpeg")}
//             />
//           </div>

//           <div className="d-flex flex-column">
//             <div className="fw-bolder d-flex align-items-center fs-5">
//               Aabidah
//             </div>
//             <a href="#" className="fw-bold text-muted text-hover-primary fs-7">
//               aabidah@flexiclean.me
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="separator my-2"></div>

//       <div className="menu-item px-5">
//         <Link to={"/"} className="menu-link px-5">
//           My Profile
//         </Link>
//       </div>

//       <div className="menu-item px-5 my-1">
//         <Link to="/" className="menu-link px-5">
//           Account Settings
//         </Link>
//       </div>

//       <div className="menu-item px-5">
//         <a onClick={handleSignOut} className="menu-link px-5">
//           Sign Out
//         </a>
//       </div>
//     </div>
//   );
// };

// export { HeaderUserMenu };
