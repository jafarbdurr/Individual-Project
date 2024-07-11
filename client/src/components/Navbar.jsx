import { Link, redirect, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { getUserData } from "../features/user/userSlice"

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem("access_token")
    navigate('/login')
  }

  const [user, setUser] = useState({
    id: 0,
    email: '',
    role: '',
    status: ''
  })


  const fetchUser = async () => {
    const { data } = await axios.get("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    setUser(data)
  }

  useEffect(() => {
    if (localStorage.access_token) {
      fetchUser()
    }
  }, [])

  const isLogin = useMemo(() => {
    return !!localStorage.getItem("access_token")
  })

  const handleOnUpgrade = async () => {
    const { data } = await axios.get("http://localhost:3000/payment/midtrans/initiate", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    
    // console.log(data);
    window.snap.pay(data.token, {

      onSuccess: async(res)=> {
        // console.log(res,'<<<<')
        const requestBody = {
          orderId: res.order_id
        }
        const {data} = await axios.patch(
          "http://localhost:3000/users/me/upgrade",
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
          }
        )
        console.log(data);
        dispatch(getDataPassword())
      }
    })
  }
  const isPremium = user.status === "premium"


  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container d-flex">
                    <Link to='/home' className="navbar-brand">PassMan</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div>
                       {!isPremium ? <button onClick={handleOnUpgrade} className="btn btn-ghost text-xl ">Upgrade to Premium</button> : <h5>You're a premium user</h5>}
                    </div>
                        
                        <div>
                        <button onClick={handleLogout} type="button" className="btn btn-outline-danger">Logout</button>
                        </div>
                        
                </div>
            </nav>
    </>
  )
}