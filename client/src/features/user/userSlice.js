import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  status: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setUser : (state, action) => {
      state.status = action.payload.status
    }
  },
})


export const { setStatus, setUser } = userSlice.actions

export const setDataUser = (data) => {
  return (dispatch) => {
    dispatch(setStatus(data.status))
  }
}

export const getUserData = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('http://localhost:3000/get-user-data', {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      dispatch(setUser(data))
    } catch (error) {
      console.log(error);
    }
  }
}

export default userSlice.reducer