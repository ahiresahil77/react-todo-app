import { useState } from "react";
function Inputhandle(){
  const[name,setName]=useState("")
return(
  <>
  <input onChange={(event)=>setName(event.target.value)}></input>
  <h2>Hello, {name}</h2>
  </>
)
}
export default Inputhandle;