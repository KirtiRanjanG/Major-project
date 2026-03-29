import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";


import Register from './components/register'
import Newregister from './components/newregister'
import LoginPage from './pages/auth/login'
import Againregister from './pages/auth/register'  



export default function App() {
  const { token, user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
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