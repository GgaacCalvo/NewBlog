import { Route, Routes } from "react-router-dom";

import './App.css';
import { Home } from "./componentes/Home/Home";
import { Landing } from "./componentes/Landing/Landing";
import { Log } from './componentes/Login/Log'
import ProtectedRoute from "./componentes/ProtectedRoute/ProtectedRoute";
import { Settings } from "./componentes/Settings/Settings";
function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={
          <ProtectedRoute>
            <Landing />
          </ProtectedRoute>
        } />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={
        

          <Settings />
        
        
        } />
      </Routes>
      
    </div>
  );
}

export default App;
