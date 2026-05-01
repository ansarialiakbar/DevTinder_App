import axios from "axios";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
const UserCard = ({ user }) => {
    const {_id, firstName, lastName, age, gender, about, photoUrl} = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
       try {
           const res = await axios.post(`${API_BASE_URL}/connection/send/${status}/${userId}`, {}, {withCredentials: true });
           dispatch(removeUserFromFeed(userId));
        
       } catch (error) {
            console.error("Failed to send connection request", error);
       }
    }
   
    return(
        <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      
      src={photoUrl || "https://m.media-amazon.com/images/M/MV5BMzkwYTAzMDMtMzBlMC00NDEwLTg2YjAtM2ZhMzg2M2Y2N2M3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
    {age && gender && <p>{age}, {gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center m-2">
      <button className="bg-primary text-white font-semibold  px-4 py-2 rounded" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
      <button className="bg-secondary text-white font-semibold  px-4 py-2 rounded" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
    </div>
  </div>
</div>
    )
}
export default UserCard;