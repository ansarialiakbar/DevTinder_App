import axios from "axios"
import { API_BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);


    const getFeed = async () => {
        if(feed) return;

        try {
              const res = await axios.get(`${API_BASE_URL}/user/feed`, {
                withCredentials: true
              });
              console.log(res.data);
              dispatch(addFeed(res.data));
            
        } catch (error) {
            console.error("Failed to fetch feed", error);
            
        }
    }
    useEffect(()=> {
        getFeed();

    }, [])
    return  (
        feed && (
            <div className="flex justify-center my-10" >
                <UserCard user={feed} />
            </div>
        )
    )

}
export default Feed;