import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const Login = () => {
    const [email, setEmail] = useState("asfar1234@gmail.com");
    const [password, setPassword] = useState("@12345");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
       // Implement login logic here
       try {
         // Example: Send login request to the backend
         const res = await axios.post(`${API_BASE_URL}/login`, { email, password }
            , { withCredentials: true } 
         );
         dispatch(addUser(res.data));
          navigate("/");
        
         
       } catch (error) {
          setError(error?.response?.data || "Login failed");
         
       }
    }


    return (

     <div className="flex  justify-center my-10">  
    <div className="card bg-base-300 w-96 shadow-sm">
      <div className="card-body">
       <h2 className="card-title font-bold justify-center">Login</h2>
       <div>
          <label className="floating-label my-2 w-full">
           <div className="label">
            <span className="label-text">Email</span>
           </div>
           <input
              type="text"
              className="input input-bordered w-full "
              value={email}
              onChange={(e) => setEmail(e.target.value)}

               />
          </label>
           <label className="floating-label my-2 w-full">
           <div className="label">
            <span className="label-text">Password</span>
           </div>
           <input
            type="password" 
             className="input input-bordered w-full "
               value={password}
               onChange={(e) => setPassword(e.target.value)}
              />
          </label>      
       </div>
         <p className="text-red-500">{error}</p>
         <div className="card-actions justify-center m-2">
            <button className="bg-primary text-white px-4 py-2 rounded" onClick={handleLogin}>
              Login
            </button>
         </div>
     </div>
    </div>
    </div>

    )
}
export default Login;