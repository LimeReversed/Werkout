import React, {useState, useEffect} from 'react';
import style from './NavBar.module.css';
import {useHistory, useLocation} from 'react-router-dom';
import '../globalCSS/App.css';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import {getIndexes} from '../services/HttpService';
import LogoutImage from '../images/Logout.png'
import ArrowImage from '../images/Arrow.png'

 const NavBar = (props) => {
     /*eslint eqeqeq: 0*/
    const location = useLocation();
    const history = useHistory();

    const [title, setTitle] = useState("Error");

    const getTitle = (pathname) => {

        if (pathname == "/"){
            return "Workout"
        }
        else if (pathname == "/routines" || pathname === "/routines/"){
            return "Routines"
        }
        else if (pathname == "/routines/days")
        {
            let indexes = getIndexes(new URLSearchParams(location.search));
            return props.routines[indexes.routine].name; 

        }
        else if (pathname == "/routines/days/exercises")
        {
            let indexes = getIndexes(new URLSearchParams(location.search));
            return props.routines[indexes.routine].days[indexes.day].name;
        }
        else if (pathname == "/routines/days/exercises/sets" || pathname === "/routines/days/exercises/history")
        {
            let indexes = getIndexes(new URLSearchParams(location.search));
            return props.routines[indexes.routine].days[indexes.day].exercises[indexes.exercise].name;
        }
        else
        {
            return "Error"
        }
    };

    const backClick = () => {
        let path = location.pathname;

        if (path == "/routines/" || path == "/routines"){
            props.logout();
            history.push("/")
        }
        else if (path == "/routines/days"){
            history.push("/routines/")
        }
        else if (path == "/routines/days/exercises"){
            let indexes = getIndexes(new URLSearchParams(location.search));
            history.push(`/routines/days?routineIndex=${indexes.routine}`)
        }
        else if (path == "/routines/days/exercises/sets")
        {
            let indexes = getIndexes(new URLSearchParams(location.search));

            if (indexes.exercise === Number(0)){
                history.push(`/routines/days/exercises?routineIndex=${indexes.routine}&dayIndex=${indexes.day}`)
            }
            else {
                indexes.exercise--;
                history.push(`/routines/days/exercises/sets?routineIndex=${indexes.routine}&dayIndex=${indexes.day}&exerciseIndex=${indexes.exercise}`)
            }
        }
        else if (path == "/routines/days/exercises/history")
        {
            let indexes = getIndexes(new URLSearchParams(location.search));

            if (indexes.exercise === Number(0)){
                history.push(`/routines/days/exercises?routineIndex=${indexes.routine}&dayIndex=${indexes.day}`)
            }
            else {
                indexes.exercise--;
                history.push(`/routines/days/exercises/history?routineIndex=${indexes.routine}&dayIndex=${indexes.day}&exerciseIndex=${indexes.exercise}`)
            }
        }
    }

    const forwardClick = () => {

        let indexes = getIndexes(new URLSearchParams(location.search));
        
        if (location.pathname === "/routines/days/exercises/sets" && indexes.exercise < Number(props.routines[indexes.routine].days[indexes.day].exercises.length - 1)){
            indexes.exercise++;
            history.push(`/routines/days/exercises/sets?routineIndex=${indexes.routine}&dayIndex=${indexes.day}&exerciseIndex=${indexes.exercise}`)
        }
        else if (location.pathname === "/routines/days/exercises/history" && indexes.exercise < Number(props.routines[indexes.routine].days[indexes.day].exercises.length - 1)){
            indexes.exercise++;
            history.push(`/routines/days/exercises/history?routineIndex=${indexes.routine}&dayIndex=${indexes.day}&exerciseIndex=${indexes.exercise}`)
        }
    }

    useEffect(() => {
        let title = getTitle(location.pathname);
        setTitle(title);

        if (location.pathname == "/"){
            document.getElementById("leftNavArea").style.display = 'none';
            document.getElementById("rightNavArea").style.display = 'none';
        }
        else if (location.pathname == "/routines/" || location.pathname == "/routines"){
            document.getElementById("leftNavArea").style.display = 'unset';
            document.getElementById("leftNavArea").style.backgroundImage = `url(${LogoutImage})`;
            document.getElementById("leftNavArea").style.transform = 'rotate(0deg)';
        }
        else if (location.pathname == "/routines/days/exercises/history" || location.pathname == "/routines/days/exercises/sets"){
            document.getElementById("leftNavArea").style.display = 'unset';
            document.getElementById("leftNavArea").style.backgroundImage = `url(${ArrowImage})`;
            document.getElementById("leftNavArea").style.transform = 'rotate(180deg)';
            document.getElementById("rightNavArea").style.display = 'unset';

            let indexes = getIndexes(new URLSearchParams(location.search));
            if (indexes.exercise >= Number(props.routines[indexes.routine].days[indexes.day].exercises.length - 1)){
                document.getElementById("rightNavArea").style.display = 'none';
            }
        }
        else {
            document.getElementById("leftNavArea").style.display = 'unset';
            document.getElementById("leftNavArea").style.backgroundImage = `url(${ArrowImage})`;
            document.getElementById("leftNavArea").style.transform = 'rotate(180deg)';
            document.getElementById("rightNavArea").style.display = 'none';
        }

        // eslint-disable-next-line
    }, [location]);

    useEffect(() => {
        let title = getTitle(location.pathname);
        setTitle(title);

        // eslint-disable-next-line
    }, [])


    return (
        <div className={style.container}>
            <div id="leftNavArea" className={`firstColumn ${style.triangleLeft}`} onClick={backClick}>
            </div>
            <div className="secondColumn" style={{fontSize: "2em"}}>
               {title}
            </div>
            <div id="rightNavArea" className={`thirdColumn ${style.triangleRight}`} onClick={forwardClick}>
                <div className={style.triangleRight}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        routines: state.routines
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({type: actionTypes.LOG_OUT}),
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);