import { Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from "./componentes/Home/Home";
import { Landing } from "./componentes/Landing/Landing";
import { LogUserInfo } from './componentes/Login/LogUserInfo'
import { ProfileUser } from "./componentes/ProfileUser/ProfileUser";
import ProtectedRoute from "./componentes/ProtectedRoute/ProtectedRoute";
import { Settings } from "./componentes/Settings/Settings";
import SuperChat from "./componentes/Chat/SuperChat";
import { Map } from "./componentes/Map/Map";
function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={
          <ProtectedRoute>
            <Landing />
          </ProtectedRoute>
        } />
        <Route path="/home" element={
          <ProtectedRoute>

            <Home />
          </ProtectedRoute>
        } />
        <Route path="/profileuser" element={
        <ProfileUser/>
        } />
        <Route path="/settings" element={
       
          <Settings />


        
        
        } />
         <Route path="/chat" element={<SuperChat />} />
        <Route path="/chat/:id" element={<SuperChat />} />
        <Route path="/onboarding" element={<LogUserInfo />} />
        <Route path="/map" element={<Map />} />
      </Routes>
      
    </div>
  );
}

export default App;
