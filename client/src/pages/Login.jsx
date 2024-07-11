import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setDataUser } from "../features/user/userSlice"

export default function Login() {
  const nav = useNavigate()
  const dispatch = useDispatch()

  const [form, setFrom] = useState({
    email: "",
    password: ""
  })

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:3000/login', form)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }


  const handleCredentialResponse = async (response) => {
    const google_token = response.credential
    console.log(response.credential, '<<<<<<<<<<<<<<<<<<<<<<<<<<');
    const { data } = await axios.post("http://localhost:3000/google-login", { google_token })
    localStorage.access_token = data.access_token
    dispatch(setDataUser(data))
    nav('/home')
  }
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "395741714104-doh4ctgpolm86c7125nk055lfh2rejhs.apps.googleusercontent.com",
      callback: handleCredentialResponse
    })
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
  }, [])

  return (
    <>
  
      <div className="d-flex">
            <div className="d-flex justify-content-center align-items-center" style={{ width: '50vw', height: '100vh' }}>
                <img src="/login.png" alt="pct" style={{ width: '50vw' }} />
            </div>
            <div className="d-flex justify-content-center align-items-center bg-body-secondary" style={{ width: '50vw', height: '100vh' }}>
                <div className=" d-flex flex-column justify-content-center align-items-center bg-body-secondary">
                    <h2>Login to Your Account</h2>
                    <h5 className="opacity-25">Access Your Vault Safely and Easily</h5>
                    <br />
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
                            Login
                        </button>
                    </form>
                    <br/>
                    <div id="buttonDiv" type="button">
                    </div>
                    <br />
                    <p>Don't have an account? <Link to='/register'>Register</Link> </p>

                </div>
            </div>
        </div>
    </>
  )
}

