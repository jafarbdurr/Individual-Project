
import axios from "axios"
import { setDataPassword } from "./fetchSlice"

export const getDataPassword = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('http://localhost:3000/savePassword', {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      dispatch(setDataPassword(data))
    } catch (error) {
      console.log(error);
    }
  }
}

