import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./assets/components/pages/Login";
import Register from "./assets/components/pages/Register";
import Dashboard from "./assets/components/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;