import React, {useState, useEffect} from 'react';
import Card from '../components/Card';
import {requestToMongo} from '../services/HttpService';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import '../globalCSS/App.css';
import BottomBar from '../components/BottomBar/BottomBar'
import {useHistory} from 'react-router-dom';

 const Routines = (props) => {

    const history = useHistory();
    const [cards, setCards] = useState();
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [selectMode, setSelectMode] = useState(false);
   
    const cardClicked = (index) => {
        
        if (selectMode === true){
            setSelectedCardIndex(index);
        }
        else {
            setSelectedCardIndex(null);
            
            history.push(`/routines/days?routineIndex=${index}`);
        }
    }

    useEffect(() => {

        requestToMongo(`/routines/${props.user.routinesId}`, props.tokenObject).then((resp) => {
            if (resp){
                props.loadRoutines(resp.routines);
            }
        });

        requestToMongo(`/history/${props.user.historyId}`, props.tokenObject).then((resp) => {
            if (resp){
                props.loadHistory(resp.history);
            }
        });

    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let cards = props.routines && props.routines.map(
            (el, i) => 
            <Card 
                title = {el.name} 
                subtitle= {`Last time: ${el.lastDate}`} 
                key = {el.id}
                selected = {i === selectedCardIndex}
                cardClicked = {() => cardClicked(i)}
            />)
        setCards(cards);
        
    // eslint-disable-next-line
    }, [props.routines, selectedCardIndex, selectMode]);

    const addItem = (newName) => {
        props.addRoutine(newName);
    };

    const removeItem = () => {
        props.deleteRoutine(selectedCardIndex);
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
                {cards && cards.length < 1 
                    ? <p>No routines added yet. Click the Add button below</p> 
                    : cards}
            </div>
            <div className = "secondRow editBar">
                <BottomBar 
                    addItem = {addItem} 
                    removeItem = {removeItem} 
                    changeSelectMode = {changeSelectMode}
                    />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {

        routines: state.routines,
        tokenObject: state.tokenObject,
        user: state.user
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        loadRoutines: (routines) => dispatch({type: actionTypes.LOAD_ROUTINES, routines}),
        loadHistory: (history) => dispatch({type: actionTypes.LOAD_HISTORY, history}),
        addRoutine: (newName) => dispatch({type: actionTypes.ADD_ROUTINE, newName}),
        deleteRoutine: (data) => dispatch({type: actionTypes.REMOVE_ROUTINE, removeIndex: data})
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(Routines);