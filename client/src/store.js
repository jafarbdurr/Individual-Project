import { configureStore } from '@reduxjs/toolkit'
import fetchSlice from './features/fetch/fetchSlice'
import userSlice from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    dataPassword: fetchSlice,
    user : userSlice
  },
})

