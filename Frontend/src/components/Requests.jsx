import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useEffect } from "react";

const Requests = () => {
        const requests = useSelector((store) => store.requests);
        const dispatch = useDispatch();
         
        const reviewRequest = async(status, _id) => {
           try {
            const res = await axios.post(`${API_BASE_URL}/connection/review/${status}/${_id}`, {}, { withCredentials: true });
            dispatch(removeRequest(_id));
            
           } catch (error) {
            
           }
        }
        const fetchRequests = async () => {
            const res = await axios.get(`${API_BASE_URL}/user/pending/request`, { withCredentials: true });
            console.log("requests:", res.data.data);
            dispatch(addRequests(res.data.data))

        }
    
        useEffect(() => {
            fetchRequests();
        }, []);
       if(!requests) return;
    if(requests.length === 0) return <h1 className="text-3xl text-center font-bold mb-4">No requests yet</h1>;
                 


    return (
        <div className="flex flex-col items-center  h-screen">
            <h1 className="text-3xl font-bold mb-4">Connection Requests</h1>
            <p className="text-gray-600">Here you can see your pending requests.</p>
            {requests.map((request) => {
                const {firstName, lastName, photoUrl, about, age, gender} = request.fromUserId;
                return (
                    <div key={request._id}  className="flex justify-between items-center space-x-4 p-4 border rounded-lg w-2/3 max-auto my-4">
                        <div> 
                            <img src = {photoUrl} alt="photo" className="w-20 h-20 rounded-full" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{firstName} {lastName}</h2>
                            {age && gender && <p>{age}, {gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div>
                            <button className="bg-primary text-white px-4 py-2 mx-2 rounded" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                            <button className="bg-secondary text-white px-4 py-2  rounded" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                        </div>
                        
                    </div>
                )
            })}

        </div>
    )
}
export default Requests;