import "../src/App.css"
import Home from "./pages/Dashboard/Home"
import Expense from "./component/Expense/Expense"
import Income from "./component/Income/Income"
import Nav from "./component/Nav/Nav"
import Signup from "./pages/Auth/Signup"
import Login from "./pages/Auth/Login"

import {Routes,Route,useLocation} from "react-router-dom"
import { useEffect, useState } from "react"

function App() {
       const [expenseAllTrans,expenseSetAllTrans] = useState(()=>{
        const savedata = localStorage.getItem("expenses")
        return savedata ? JSON.parse(savedata) : []
       })
      const [incomeAllTrans,incomeSetAllTrans] = useState(()=>{
        const saveTransData = localStorage.getItem("income")
        return saveTransData ? JSON.parse(saveTransData) : []
      })
console.log("checking");

      useEffect(()=>{
        localStorage.setItem(
          "expenses",
          JSON.stringify(expenseAllTrans)
        )
        localStorage.setItem(
          "income",
          JSON.stringify(incomeAllTrans)
        )
      },[expenseAllTrans,incomeAllTrans])

      const location = useLocation()
      // navbar will be hide
      const hideNav = location.pathname === "/" || location.pathname === "/Login"


  return (
   <>
      <div className="parent">
       {
            !hideNav && <div className="child1">
                                  <Nav/>
                        </div>
       }
        <div  className={hideNav ? "fullPage" : "AppChild2"}>
            <Routes>
              <Route path="/" element={<Signup/>}></Route>
              <Route path="/Login" element={<Login/>}></Route>
              <Route path="/Home" element={<Home expenseAllTrans={expenseAllTrans} incomeAllTrans ={incomeAllTrans} />}></Route>
              <Route path="/Expense" element={<Expense expenseAllTrans={expenseAllTrans} expenseSetAllTrans={expenseSetAllTrans} />}></Route>
              <Route path="/Income" element={<Income  incomeAllTrans ={incomeAllTrans} incomeSetAllTrans ={incomeSetAllTrans}/>}></Route>
          </Routes>
        </div>
       </div>
   </>
  )
}

export default App
