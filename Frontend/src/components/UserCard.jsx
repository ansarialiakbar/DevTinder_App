const UserCard = ({ user }) => {
    const {firstName, lastName, age, gender, about, photoUrl} = user;
    // "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    return(
        <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      
      src={photoUrl || "https://i.pinimg.com/videos/thumbnails/originals/98/24/e7/9824e748a0f2d32104ae51840ea719dd.0000000.jpg"}
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