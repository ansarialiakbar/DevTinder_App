import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
     const user = useSelector((state) => state.user);
    //  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const handleLogout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/login");

          
        } catch (error) {
          console.error("Logout failed", error);
        }
      }
    return (
        <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link className="btn btn-ghost text-xl" to="/">
      DevTinder
    </Link>
  </div>
  { user && (
    <div className="flex gap-2">
      <div>Welcome, {user.firstName}! </div>
    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
    
      <div className="dropdown dropdown-end mx-5">
        
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link className="justify-between" to="/profile">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  
  </div>
 )}
</div>

    );
}

export default NavBar;