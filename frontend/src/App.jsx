import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./assets/components/pages/Login";
// import Register from "./assets/components/pages/Register";
// import Dashboard from "./assets/components/pages/Dashboard";

function App() {
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Login />}/>
    <Route path="/dashboard" element={<Login />}/>
  </Routes>
  </BrowserRouter>


}

export default App
