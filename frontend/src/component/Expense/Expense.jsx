import React, { useEffect, useState } from 'react'
import "./Expense"
import axios from "axios"
const Expense = ({expenseAllTrans =[] ,expenseSetAllTrans = []}) => {
    //        console.log("expenseAllTrans:", expenseAllTrans);
    // console.log("expenseSetAllTrans:", expenseSetAllTrans);
const [transaction ,setTransaction] = useState("")
const [amount ,setAmount] = useState("")

async function deleteFun(id){

    try {

        const token = localStorage.getItem("token")

        const response = await axios.delete(
            `https://express-tracker-backend-9qkt.onrender.com/${id}`,
            // `http://localhost:3000/trans/deletetrans/${id}`,

            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )

        // console.log(response.data)

        alert("transaction deleted")

        fetchData()

    } catch (error) {

        console.log(error)

        alert("delete failed")
    }
}


async function handleSubmit(e){

    e.preventDefault()

    try {

        const token = localStorage.getItem("token")
        const Api = "https://express-tracker-backend-9qkt.onrender.com"
        const response = await axios.post(

            `${Api}/trans/addtrans`,

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

        // console.log(response.data)

        alert("transaction added")

       fetchData()

        setTransaction("")
        setAmount("")

    } catch (error) {

        console.log(error)

        alert("transaction failed")
    }
}

// fetch data function is to get the data from backend
async function fetchData(){
      try {
          const token = localStorage.getItem("token")
          const Api = "https://express-tracker-backend-9qkt.onrender.com"
          const response = await axios.get(
            `${Api}/trans/alltrans`,
            {
              headers:{
                    Authorization:`Bearer ${token}`
              }
            }
          )
          // console.log(response.data);
         expenseSetAllTrans(response.data.data)
          
      } catch (error) {
          console.log(error);
      }
}
useEffect(()=>{
      fetchData()
},[])

  return (
   
     <div className='expenseMainParentDiv'>
      
        <div >
              <div>
                <h1>Expenses</h1>
                <h2>track your all expense</h2><br />
              </div>
              
        </div>
      
      <form  className='userDataForm' onSubmit={handleSubmit}>
        
        <br />
        <label >transaction </label>
        <input type="text"  placeholder="ex:petrol,books" value={transaction} onChange={(e)=>{setTransaction(e.target.value)}}/><br /><br />
        <label >amount  </label>
        <input type="number"  value={amount} onChange={(e)=>{setAmount(e.target.value)}}/><br /><br />
        <button style={{border:"2px solid black"}}>submit</button><br />
      </form>
      
      <div className='transDetails'>
          <table className='expenseTable'>
            <thead>
              <tr>
                <th>trans</th>
                <th>Amount</th>
                <th>action/delete</th>
              </tr>
            </thead>
            <tbody>
            {expenseAllTrans .map((item)=>
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

export default Expense