import axios from "axios"
import { useEffect, useState } from "react"
import { Link, redirect, useNavigate } from "react-router-dom"



export default function Register() {

  const [form, setFrom] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()


  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:3000/register', form)
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
 
      <div className="d-flex">
        <div className="d-flex justify-content-center align-items-center" style={{ width: '50vw', height: '100vh' }}>
          <img src="/register.png" alt="pct" style={{ width: '50vw' }} />
        </div>
        <div className="d-flex justify-content-center align-items-center bg-body-secondary" style={{ width: '50vw', height: '100vh' }}>
          <div className=" d-flex flex-column justify-content-center align-items-center bg-body-secondary">
            <h2>Create Your Account</h2>
            <h5 className="opacity-25">Secure Your World with Confidence</h5>
            <br />
            {/* <form onSubmit={handleSubmit}> */}
            <form onSubmit={handleOnSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={form.email}
                  onChange={(e) => {
                    setFrom((prev) => {
                      return {
                        ...prev,
                        email: e.target.value
                      }
                    })
                  }}
                />
                <div id="emailHelp" className="form-text opacity-50">we will send verify code to your email.</div>

              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={form.password}
                  onChange={(e) => {
                    setFrom((prev) => {
                      return {
                        ...prev,
                        password: e.target.value
                      }
                    })
                  }}
                />
              </div>
              <button type="submit" className="btn btn-info" style={{ width: '40vh' }}>
                Submit
              </button>
            </form>
            <br />
            <p>You have account? <Link to='/login'>Login</Link> </p>

          </div>
        </div>
      </div>
    </>
  )
}
