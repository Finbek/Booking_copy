import "./navbar.css"
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"

export const Navbar = () => {
  const { user}= useContext(AuthContext);
  const navigate = useNavigate()
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
          <span className="logo">IamLogo</span>
        </Link>
        {user ? user.username :
        <div className="navItems">
          <button className="navButton" onClick={()=>navigate("/login")}>Register</button>
          <button className="navButton" onClick={()=>navigate("/login")}>Login</button>
        </div>
        }
      </div>
    </div>
  )
}
