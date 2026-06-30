import { useState } from "react"
import "../Auth/login_signup.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const Signup = () => {

  const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[pass,setPass] = useState("")

    const navigate = useNavigate()
   async function submitFun(e){
    // console.log("signup clicked");
    
        e.preventDefault()
          if(!name || !email || !pass){
            alert("name and email and password is mandatory"
            );
            return // this return for not to execute function further 
            // when alert raise the previous data will not be removed
          }
          const API = "https://express-tracker-backend-9qkt.onrender.com"
         try {
              const response = await axios.post(
                `${API}/users/signup`,
                {
                  name:name,
                  email:email,
                  password:pass
              }
            )
              console.log(response.data);
              alert("signup successfully")
            // localStorage.setItem("siginfo",JSON.stringify(data))
            // navigation to signup page
            navigate("/Login")
        
            setName("")
            setEmail("")
            setPass("")

          }
          catch (error) {
            console.log(error);
            if(!error.response){
              alert(error.message)
              return
            }
               if(error.response.data.errors){
                  alert(
                      error.response.data.errors[0].msg
                  )
                }
                else{
                  alert(error.response.data.msg)
                }
            
          }
    }
    
  return (
    
    <div className="signupParent">
      <form    onSubmit={submitFun} >
        <h1>signup form</h1> <br />
        <label htmlFor="name">name:</label>
        <input type="text"  id="name" value={name} onChange={(e)=>{setName(e.target.value)}} /><br /><br />
        <label htmlFor="email">email:</label>
        <input type="email"  id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/><br /><br />
        <label htmlFor="pass">password:</label>
        <input type="password" id="pass" value={pass} onChange={(e)=>{setPass(e.target.value)}} /><br /><br />
       <button type="submit">submit</button>
      </form>
    </div>
  )
}
export default Signup