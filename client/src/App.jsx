
import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserData } from './features/user/userSlice.js'

function App() {
    const dispatch =  useDispatch()
    useEffect(() => {
        if(localStorage.access_token){
            dispatch(getUserData())
        }
    }, [])
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App