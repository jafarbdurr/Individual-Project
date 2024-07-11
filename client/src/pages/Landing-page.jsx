import { Link } from "react-router-dom"



export default function LandingPage() {

  const backgroundImageStyle = {
    backgroundImage: 'url("/client/public/login.png")', // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: 'white'
  };


  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center" style={backgroundImageStyle}>
        <div className="text-center bg-dark p-5 rounded" style={{ opacity: 0.8 }}>
          <h1>Welcome to PassMan</h1>
          <p>Your secure password manager</p>
          <Link to={"/login"}>
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
      </div>
    </>
  )
}