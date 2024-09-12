import Signup from "../components/Signup";
import Login from "../components/Login";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Quote from "../components/quote";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quote" element={<Quote/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
