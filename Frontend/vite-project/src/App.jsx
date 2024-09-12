import Signup from "../components/Signup"
import Login from "../components/Login"
import {BrowserRouter,Route,Routes} from 'react-router-dom'

function App() {

 return (
    <>
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </>
  )
}

export default App
