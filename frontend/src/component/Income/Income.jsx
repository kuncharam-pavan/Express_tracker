import React, { useEffect, useState } from 'react'
import "./Income.css"
import axios from "axios"
const Income = ({incomeAllTrans ,incomeSetAllTrans}) => {
const [transaction ,setTransaction] = useState("")
const [amount ,setAmount] = useState("")



// for testing code
// function handlesubmit(e){
//       e.preventDefault()
//       const newtrans ={id:Date.now(),transaction,amount}
//       incomesetalltrans([...incomealltrans,newtrans]);
//       settransaction("")
//     
//       setamount("")
// }

// function deletefun(id){
//       const filterdata = incomealltrans.filter((item)=>
//         item.id !== id
//       )
//       incomesetalltrans(filterdata)

// }



// useEffect(()=>{
//   console.log(incomealltrans);
// },[incomealltrans])

// real code frontend backend has been added
async function handleSubmit(e){
  e.preventDefault()
  try {
    const token = localStorage.getItem("token")
    const response  = await axios.post(
      "http://localhost:3000/trans/addtrans",
      {
        title:transaction,
        amount:amount
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    // console.log(response.data.data);
    alert("income added")
    fetchData()
    setTransaction("")
    setAmount("")
    
  } catch (error) {
    console.log(error.message);
    alert("not enter valid data in fields")
    
  }
  }

  // fetch data latest one
  async function fetchData(){
    try {
          const token = localStorage.getItem("token")
        const response = await axios.get(
              "http://localhost:3000/trans/alltrans",
            {
          headers:{
            Authorization:`Bearer ${token}`
          }
      }
    )
    // console.log("response data ",response.data.data);
    incomeSetAllTrans(response.data.data)
    } catch (error) {
      console.log(error);
      
    }
    
  }
  async function deleteFun(id){
    try {
      const token =  localStorage.getItem("token")
      const response = await axios.delete(
        `http://localhost:3000/trans/deletetrans/${id}`,
        {
          headers:{
                    Authorization:`Bearer ${token}`
          }
        }
      )
      // console.log("deleteIncome",response);
      alert("income deleted")
      fetchData()
      
    } catch (error) {
      console.log(error);
      
    }
 
}
 useEffect(()=>{
  fetchData()
},[])


  return (
   
     <div className='incomeMainParentDiv' >
      
        <div >
              <div>
                <h1>Income page</h1>
                
              </div>
              
        </div>
      
      <form  className='incomeForm' onSubmit={ handleSubmit}>
        
        <br />
        <label >source</label>
        <input type="text"  placeholder="ex:salary,youtube" value={transaction} onChange={(e)=>{setTransaction(e.target.value)}}/><br /><br />
        <label >amount  </label>
        <input type="number"  value={amount} onChange={(e)=>{setAmount(e.target.value)}}/><br /><br />
        <button style={{border:"2px solid black"}}>submit</button><br />
      </form>
     
      <div className='incomeTable'>
          <table>
            <thead>
              <tr>
                <th>source</th>
                <th>Amount</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
            {incomeAllTrans.map((item)=>
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.amount}</td>
                    <td>
                       <button onClick={()=>deleteFun(item._id)}>Delete</button>
                    </td>
                  </tr>  
              )}
            </tbody>
          </table>
      </div>
      </div>
    
  )
}

export default Income