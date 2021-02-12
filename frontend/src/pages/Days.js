import React, {useState, useEffect} from 'react';
import Card from '../components/Card';
import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import '../globalCSS/App.css';
import BottomBar from '../components/BottomBar/BottomBar'
import * as actionTypes from '../store/actions';
import {useHistory} from 'react-router-dom';
import {getIndexes} from '../services/HttpService';

const Days = (props) => {

    const history = useHistory();
    const [selectMode, setSelectMode] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    let indexes = getIndexes(new URLSearchParams(useLocation().search));

    const cardClicked = (index) => {
        if (selectMode === true){
            setSelectedCardIndex(index);
        }
        else {
            setSelectedCardIndex(null);
            history.push(`/routines/days/exercises?routineIndex=${indexes.routine}&dayIndex=${index}`);
        }
    }

    const addItem = (newName) => {
        

        props.addDay(newName, indexes.routine);
    };

    const removeItem = () => {
        props.deleteDay(selectedCardIndex, indexes.routine);
    };

    const changeSelectMode = (status) => {
        setSelectMode(status);
        
        if (selectMode === false){
            setSelectedCardIndex(null);
        }
    };


    const [days, setDays] = useState([]);

    useEffect(() => {

        let cards = props.routines[indexes.routine].days.map(
            (el, i) => 
            <Card 
                title = {el.name} 
                subtitle= {`Last time: ${el.lastDate}`} 
                key = {el.id}
                selected = {i === selectedCardIndex}
                cardClicked = {() => cardClicked(i)}
            />
        );
    
        setDays(cards);
        // eslint-disable-next-line
    }, [props.routines, selectedCardIndex, selectMode]);
    

    return (
        <div className = "contentContainer">
            <div className = "firstRow AppContent">
                {days.length < 1 
                    ? <p>No days added yet. Click the Add button below</p> 
                    : days}
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
        addDay: (newName, routineIndex) => dispatch({type: actionTypes.ADD_DAY, newName, routineIndex}),
        deleteDay: (removeIndex, routineIndex) => dispatch({type: actionTypes.REMOVE_DAY, removeIndex, routineIndex})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Days);