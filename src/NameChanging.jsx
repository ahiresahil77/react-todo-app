import { useState } from "react";
function Namechanging(){
const[name,setName]=useState("");
return(
    <>
    <input 
    value={name} 
    onChange={(event)=>setName(event.target.value)}></input>
    <h2>Hello, {name}</h2>
    <button onClick={()=>setName("Sahil")}>change name</button>
    <button onClick={()=>setName("")}>reset</button>
    </>
)
}
export default Namechanging;