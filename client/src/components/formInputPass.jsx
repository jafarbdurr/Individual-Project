import axios from "axios";
import { useState } from "react"
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getDataPassword } from "../features/fetch/asyncAction";

export default function FormInputPass() {
  const [formPass, setFormPass] = useState({
    name: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const [aiGenerate, setAiGenerate] = useState('')
  const dispatch = useDispatch()
  const status = useSelector((state) => state.user.status)

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/savePassword', formPass, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      setFormPass({
        name: "",
        password: ""
      })
      dispatch(getDataPassword())
    } catch (error) {
      console.log(error);
    }
  }
  const handleGenerate = async () => {
    try {
      setShowPassword(true)
      const { data } = await axios.get(`http://localhost:3000/generatePassword/${formPass.password}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      setFormPass((prev) => {
        return {
          ...prev,
          password: data.result
        }
      })
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
  const ai = async () => {
    try {
      const { data } = await axios.post(`http://localhost:3000/aigenerate`, { pass: formPass.password }, {

        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      console.log(data.result);
      setAiGenerate(data.result)
    } catch (error) {

    }
  }

  return (

    <>
      <div className="container-fluid d-flex justify-content-center">
        <div className="bg-light relative overflow-auto shadow border-bottom border-dark rounded w-75 mt-5 d-flex flex-column">
          <label className="my-4 text-center">Save Password</label>
          <form className="w-75 mx-auto d-flex mb-4" onSubmit={handleOnSubmit}>
            <div className="mx-auto">
              <label htmlFor="email" className="form-label text-center text-sm font-medium text-dark">
                Name
              </label>
              <input
                type="name"
                id="name"
                value={formPass.name}
                onChange={(e) => {
                  setFormPass((prev) => {
                    return {
                      ...prev,
                      name: e.target.value
                    };
                  });
                }}
                className="form-control"
              />
            </div>
            <div className="mx-3">
              <div className="d-flex">
                <label htmlFor="password" className="form-label text-sm font-medium text-dark me-2">
                  Password /
                </label>
                <label className="text-sm font-medium text-dark">
                  if you want Generate, input word length and <span onClick={handleGenerate} className="text-decoration-underline">Click Here</span>
                </label>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formPass.password}
                onChange={(e) => {
                  setFormPass((prev) => {
                    return {
                      ...prev,
                      password: e.target.value
                    };
                  });
                }}
                className="form-control"
              />
            </div>
            <div className="my-3 me-3">
              <label onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <BiSolidHide /> : <BiSolidShow />}
              </label>
            </div>
            <button
              type="submit"
              className="my-3 btn btn-dark"
            >
              Save
            </button>
          </form>
          <div className="d-flex flex-wrap justify-content-center pb-3">
            <button className="btn btn-link text-dark" onClick={ai}>Check your password:</button>
            <p className="px-3 text-dark">{aiGenerate}</p>
          </div>
        </div>
      </div>

    </>

  )
}