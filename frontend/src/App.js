import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Routines from "./pages/Routines";
import Days from "./pages/Days";
import Exercises from "./pages/Exercises";
import SingleExercise from "./pages/SingleExercise";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import './globalCSS/App.css';



function App(props) {

  return (
    <Router>
      <div className = "AppDimensions">
        <div className="navBar">
          <NavBar/>
        </div>
        <div className = "AppContent">
          <Switch>
            <Route exact path="/" component= {Login}></Route>
            <Route exact path="/routines" component= {Routines}></Route>
            <Route exact path="/routines/days" component= {Days}></Route>
            <Route exact path="/routines/days/exercises" component= {Exercises}></Route>
            <Route path="/routines/days/exercises/:tab" component= {SingleExercise}></Route>
            <Route component= {NotFound}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}



export default App;
