import { Link } from "react-router-dom"
import "./Nav.css"
const Nav = () => {
  return (
        <div >
            <div className="child"><Link to="/Home">Home</Link><br /><br /></div>
            <div className="child"> <Link to="/Expense">Expense</Link><br /><br /></div>
            <div className="child"> <Link to="/Income">Income</Link><br /><br /></div>
        </div>
  )
}

export default Nav