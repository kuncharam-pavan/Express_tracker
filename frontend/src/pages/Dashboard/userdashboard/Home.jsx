import "./Home.css";
import {useNavigate} from "react-router-dom"
// passing the states from expenses and income in the form of props
const Home = ({ expenseAllTrans = [], incomeAllTrans=[] }) => {
    //  console.log("expenseAllTrans:", expenseAllTrans);
    // console.log("incomeAllTrans:", incomeAllTrans);
    const navigate = useNavigate()
      
  const totalExpense = (expenseAllTrans || []).reduce((acc, item) => {
    return acc + Number(item.amount);
  }, 0);

  const totalIncome = (incomeAllTrans || []).reduce((acc, item) => {
    return acc + Number(item.amount);
  }, 0);

  const balance = totalIncome - totalExpense;
function btnFun(){
  navigate("/Login")
}
  return (
    <div >
      
      {/* Header Section */}
      <div className="homeParent1">

        <div >
          <h1>welcome to the express tracker!</h1>
          <button onClick={btnFun}>logout</button>
        </div>

        <div >
            
          <h1>previous transaction</h1>
          {/* <p>{totalExpense}</p> */}
        </div>

      </div>

      {/* Cards Section */}
      <div className="homeParent2">

        <div className="homeChild2">
          <h1>💰 Total Balance</h1>
          <p>{balance}</p>
        </div>

        <div className="homeChild2">
          <h1>📈 Total Income</h1>
          <p>{totalIncome}</p>
        </div>

        <div className="homeChild2">
          <h1>📉 Total Expenses</h1>
          <p>{totalExpense}</p>
        </div>

      </div>

      {/* Expense Table */}
      <div className="homeParent3">

        <h1>expenses all details</h1>

        <table className="homeChild3">
          <thead >
            <tr >
              <th>trans</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>

            {expenseAllTrans?.length > 0 ? (
                expenseAllTrans.map((item,index) => (
              <tr key={index}>
                <td>{item.title}</td>
               
                <td>{item.amount}</td>
              </tr>
            ))
          ):(
              <tr>
                <td>No expense records</td>
              </tr>
            
            )}

          </tbody>
        </table>

      </div>

      {/* Income Table */}
      <div className="homeParent4">

        <h1>all income details</h1>

        <table className="homeChild4">
          <thead>
            <tr>
              <th>source</th>
              
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>

            {incomeAllTrans?.length > 0 ? (incomeAllTrans.map((item,index) => (
              <tr key={index}>
                <td>{item.title}</td>
              
                <td>{item.amount}</td>
              </tr>
            ))):
            (
              <tr>
                <td> No income records</td>
              </tr>
            )
            }

          </tbody>
        </table>

      </div>

    </div>
  );
};

export default Home;