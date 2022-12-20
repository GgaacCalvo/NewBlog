import { Route, Routes } from "react-router-dom";

import './App.css';
import { Home } from "./componentes/Home/Home";
import { Landing } from "./componentes/Landing/Landing";
import { Log } from './componentes/Login/Log'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Landing />} />
      </Routes>
      
    </div>
  );
}

export default App;
