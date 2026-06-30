import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const Login = () => {

    const[email,setEmail] = useState("")
    const[pass,setPass] = useState("")
    const navigate = useNavigate()
   async function submitFun(e){
      e.preventDefault()
              if(!email || !pass){
                alert("email and password is mandatory"
                );
                return // this return for not to execute function further 
                // when alert raise the previous data will not be removed
              }
              // console.log(email);
              // console.log(pass);

              // try start from here
              const API = "https://express-tracker-backend-9qkt.onrender.com"

             try {
              const response = await axios.post(
                  `${API}/users/login`,
                  {
                    email:email,
                    password:pass
                  }                  

              )
              console.log(response.data);
              localStorage.setItem(
                "token",
                response.data.token
              )
              alert("login successful")
              navigate("/Home")
              setEmail("")
              setPass("")
              
              //          let k = JSON.parse(localStorage.getItem("siginfo")) //o/p will be object
              // // console.log(k.name,k.email,k.pass);
              // if(!k){
              //   alert("no signup data is found")
              //   return 
              // }


              // navigate is used for next page
              // if( email===k.email && pass === k.pass){
              //       alert("Login successful")  
                   
              // }
              // else{
              //       alert("Invalid credentials")   
              // }
              
             } catch (error) {
                       console.log(error);
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
          <h1>login form</h1>
        <label htmlFor="email">email:</label>
        <input type="email"  id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/><br /><br />
        <label htmlFor="pass">password:</label>
        <input type="password" id="pass" value={pass} onChange={(e)=>{setPass(e.target.value)}} /><br /><br />
       <button type="submit">submit</button>
      </form>
    </div>
  )
}
export default Login