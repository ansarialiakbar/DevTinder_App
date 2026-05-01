import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { useEffect } from "react";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);
    const fetchConnections = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/user/connections`, {
                withCredentials: true
            });
            console.log("connections:", res.data.data);
            dispatch(addConnections(res.data.data))
        } catch (error) {
            console.error("Failed to fetch connections", error);
        }
    };
    useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections) return;
    if(connections.length === 0) return <h1 className="text-3xl text-center font-bold mb-4">No connections yet</h1>;
                 


    return (
        <div className="flex flex-col items-center  h-screen">
            <h1 className="text-3xl text-center text-yellow-500 cursor-pointer hover:text-yellow-700 font-bold mb-4">Connections</h1>
            <p className="text-gray-600">Here you can see your matches and connections.</p>
            {connections.map((connection) => {
                const {firstName, lastName, photoUrl, about, age, gender} = connection;
                return (
                    <div key={connection._id}  className="flex items-center space-x-4 p-4 border rounded-lg w-full max-w-md my-4">
                        <div> 
                            <img src = {photoUrl} alt="photo" className="w-20 h-20 rounded-full" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{firstName} {lastName}</h2>
                            {age && gender && <p>{age}, {gender}</p>}
                            <p>{about}</p>
                        </div>
                        
                    </div>
                )
            })}

        </div>
    )
}
export default Connections;