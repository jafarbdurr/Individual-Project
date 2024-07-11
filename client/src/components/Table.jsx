import { useEffect, useState } from "react"
import axios from "axios";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataPassword } from "../features/fetch/asyncAction";
export default function Table() {
  const [data, setData] = useState([])
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const pw = useSelector((state) => state.dataPassword.dataPassword)


  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:3000/savePassword/${id}`, {
        headers:
          { Authorization: `Bearer ${localStorage.access_token}` }
      })
      dispatch(getDataPassword())
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // fetchData()
    dispatch(getDataPassword())
    // console.log(pw);
  }, [])

  return (
    <>
     
      <div className="container d-flex justify-content-center mt-4">
      <div className="table-responsive shadow-sm border-bottom border-dark w-75 mt-4">
        <table className="table table-hover text-sm text-left">
          <thead className="thead-light text-xs text-uppercase">
            <tr>
              <th scope="col" className="px-3 py-2 w-25 text-center">
                Name
              </th>
              <th scope="col" className="px-3 py-2 w-25 text-center">
                Password
              </th>
              <th scope="col" className="px-3 py-2 w-25 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {pw.map((e) => (
              <tr key={e.id} className="bg-white border-bottom">
                <th className="px-3 py-3 font-weight-normal text-dark w-25 text-center">
                  {e.name}
                </th>
                <td className="px-3 py-2 w-200 text-dark d-flex justify-content-between align-items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={e.password}
                    className="text-center w-100 form-control"
                    readOnly
                  />
                  <div className="d-flex justify-content-center">
                    <label
                      className="m-auto"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <BiSolidHide /> : <BiSolidShow />}
                    </label>
                  </div>
                </td>
                <td className="px-3 py-2 text-right w-25 text-center">
                  <button className="btn btn-primary mx-1">Edit</button>
                  <button onClick={() => handleDelete(e.id)} className="btn btn-danger mx-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    </>

  )
}