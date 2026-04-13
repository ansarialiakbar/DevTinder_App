import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar"
import Footer from "./Footer";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (userData) {
            return; // User data already exists, no need to fetch
        }
        try {
            // Implement logic to fetch user data from the backend
            const response = await axios.get(`${API_BASE_URL}/profile/view`, { withCredentials: true });
            // update the user state
            dispatch(addUser(response.data));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
                
            }
              console.dir(error);
           
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);
    return (
       <>
        <NavBar />
        <Outlet />
        <Footer />
       </>

    )
}
export default Body;