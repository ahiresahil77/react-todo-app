import { useState } from "react";
function Likebutton(){
const[liked,setLiked]=useState(false);


return(
    <div>
        <button onClick={()=>setLiked(!liked)}>
            {liked ? "already liked":"not liked"}
        </button>
        
    </div>
)}
export default Likebutton;