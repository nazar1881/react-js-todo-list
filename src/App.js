import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Alert } from "./components/Alert";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { AlertState } from "./context/alert/AlertState";
import { FirebaseState } from "./context/firebase/FirebaseState";

function App() {
  return (

    <FirebaseState>
      <AlertState>
        <BrowserRouter>
          <Navbar />
          <div className="container pt-4">
            <Alert />
            <Routes>
              <Route path={'/'} exact element={<Home/>}/>
              <Route path={'/about'} element={<About/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </AlertState> 
    </FirebaseState>
    
  );
}

export default App;
