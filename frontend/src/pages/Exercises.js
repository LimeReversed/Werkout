import React, {useState, useEffect} from 'react';
import Card from '../components/Card';
import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import '../globalCSS/App.css';
import BottomBar from '../components/BottomBar/BottomBar'
import * as actionTypes from '../store/actions';
import {useHistory} from 'react-router-dom';
import {getIndexes} from '../services/HttpService';

const Exercises = (props) => {

    const history = useHistory();
    const [selectMode, setSelectMode] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    let indexes = getIndexes(new URLSearchParams(useLocation().search));
    const [exercises, setExercises] = useState([]);

    const cardClicked = (index) => {
        if (selectMode === true){
            setSelectedCardIndex(index);
        }
        else {
            setSelectedCardIndex(null);
            history.push(`/routines/days/exercises/sets?routineIndex=${indexes.routine}&dayIndex=${indexes.day}&exerciseIndex=${index}`);
        }
    }

    useEffect(() => {

        let cards = props.routines[indexes.routine].days[indexes.day].exercises.map(
            (el, i) => 
            <Card 
                title = {el.name} 
                subtitle= {`Last time: ${el.lastDate}`} 
                key = {el.id}
                selected = {i === selectedCardIndex}
                cardClicked = {() => cardClicked(i)}
            />
        );
    
        setExercises(cards);
        // eslint-disable-next-line
    }, [props.routines, selectedCardIndex, selectMode]);

    const addItem = (newName) => {
        props.addExercise(newName, indexes.routine, indexes.day);
    };

    const removeItem = () => {
        props.deleteExercise(selectedCardIndex, indexes.routine, indexes.day);
    };

    const changeSelectMode = (status) => {
        setSelectMode(status);
        
        if (selectMode === false){
            setSelectedCardIndex(null);

        }
    };
    

    return (
        <div className = "contentContainer">
            <div className = "firstRow AppContent">
                {exercises.length < 1 
                    ? <p>No exercises added yet. Click the Add button below</p>  
                    : exercises}
                </div>
                <div className = "secondRow editBar">
                    <BottomBar 
                    addItem = {addItem} 
                    removeItem = {removeItem} 
                    changeSelectMode = {changeSelectMode}/>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        
        routines: state.routines
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
        addExercise: (newName, routineIndex, dayIndex) => dispatch({type: actionTypes.ADD_EXERCISE, newName, routineIndex, dayIndex}),
        deleteExercise: (removeIndex, routineIndex, dayIndex) => dispatch({type: actionTypes.REMOVE_EXERCISE, removeIndex, routineIndex, dayIndex})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Exercises);