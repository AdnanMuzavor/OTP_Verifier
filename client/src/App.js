import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import { Route } from "react-router-dom";
import Navbar from "./Components/Nav";
function App() {
  return (
    <>
      <Navbar />
  
        <Route exact path="/" render={() => <SignUp  />} />
        <Route exact path="/login" render={() => <Login />} />
     
    
    </>
  );
}

export default App;
