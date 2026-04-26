const UserCard = ({ user }) => {
    const {firstName, lastName, age, gender, about, photoUrl} = user;
    // "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
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
      <button className="bg-primary text-white font-semibold  px-4 py-2 rounded">Ignore</button>
      <button className="bg-secondary text-white font-semibold  px-4 py-2 rounded">Interested</button>
    </div>
  </div>
</div>
    )
}
export default UserCard;