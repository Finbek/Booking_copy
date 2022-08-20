import { axiosInstance } from "../../config"
import "./login.scss"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password:undefined,
  })
  const { loading, error, dispatch}= useContext(AuthContext)
  const handleChange = (e)=>{
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
  }

  const navigate= useNavigate()
  const handleClick = async e => {
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      if(res.data.isAdmin){
        dispatch({type:"LOGIN_SUCCESS", payload:res.data.details})
        navigate("/")
      }
      else{
        dispatch({type:"LOGIN_FAILURE", payload:{message: "You are not allowed!"}})
      }
    } catch (err) {
      dispatch({type:"LOGIN_FAILURE", payload:err.response.data})
    }
  }
  return (
    <div className="login">
      <div className="lContainer">
        <input type="text" id="username" onChange={handleChange} placeholder="username" className="lInput" />
        <input type="password" id="password" onChange={handleChange} placeholder="password" className="lInput" />
        <button disabled={loading} onClick= {handleClick} className="lButton">Login</button>
        {error&& <span>{error.message}</span>}

      </div>
    </div>
  )
}

export default Login