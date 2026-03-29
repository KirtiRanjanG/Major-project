import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


// import Register from './components/register'
// import Newregister from './components/newregister'
import Register from './pages/auth/register' 
import Login from './pages/auth/login' 



export default function App() {
  const { token, user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}





// const App = () => {
//   return (
//     <div className='w-full h-screen bg-gray-900'>
//       {/* <Register />
//       <Newregister /> */}
//       <LoginPage />
//       <Againregister />


//     </div>
//   )
// }

// export default App