import React, { useState, useEffect } from 'react';
import Description from '../components/Description';
import SetsTable from '../components/SetsTable/SetsTable';
import LogsTable from '../components/LogsTable';
import {useLocation} from 'react-router-dom';
import { connect } from 'react-redux';
import '../globalCSS/App.css';
import BottomBar from '../components/BottomBar/BottomBar'
import * as actionTypes from '../store/actions';
import style from './SingleExercise.module.css';
import {getIndexes} from '../services/HttpService';
 /*eslint eqeqeq: 0*/

 const SingleExercise = (props) => {

    const location = useLocation();


    let indexes = getIndexes(new URLSearchParams(location.search));
    let temporarySetArray = props.routines[indexes.routine].days[indexes.day].exercises[indexes.exercise].sets;
    let temporaryDescription = props.routines[indexes.routine].days[indexes.day].exercises[indexes.exercise].description;
    const [editMode, setEditMode] = useState(false);
    const [selectMode, setSelectMode] = useState(false);
    const [logs, setLogs] = useState();

    const setIndexes = () => {
        indexes = getIndexes(new URLSearchParams(location.search));
    };

    useEffect(() => {
        setIndexes();
        let logResult;
        props.history.map((el) => {

            if (el.nameOfExercise == props.routines[indexes.routine].days[indexes.day].exercises[indexes.exercise].name){   
                logResult = el.logs;
                
            }

            return null;
        });

        setLogs(logResult);
        
    // eslint-disable-next-line
    }, [location, props.history])

    useEffect(() => {
        document.getElementById('set').style.backgroundImage = 'var(--gradientLightOrange)';
        document.getElementById('history').style.backgroundImage = 'unset';
    }, [])

    const addItem = () => {
        props.addSet(indexes.routine, indexes.day, indexes.exercise);
    }

    const [selectedRow, setSelectedRow] = useState(null);

    const removeItem = () => {
        props.removeSet(indexes.routine, indexes.day, indexes.exercise, selectedRow);
    }

    const changeSelectMode = (status) => {
        setSelectMode(status);
    }

    const changeEditMode = (status) => {
        setEditMode(status);

        if(status === false){
            temporarySetArray = props.routines[indexes.routine].days[indexes.day].exercises[indexes.exercise].sets;
        }
    }

    const confirmEdit = (status) => {
        setEditMode(status);
        props.confirmSingleExercise(temporarySetArray, 
            temporaryDescription,
            indexes.routine, 
            indexes.day, 
            indexes.exercise);
        
    }

    const descriptionChanged = (text) => {
        temporaryDescription = text;
    }

    const setsUpdated = (setArray) => {
        temporarySetArray = setArray;
    }

    const logSet = (index) => {
        let name = props.routines[indexes.routine].days[indexes.day].exercises[indexes.exercise].name;
        let date = new Date().toLocaleDateString();
        let setArray = [...temporarySetArray];
        let row = setArray[index];
        let rowWithSetNr = {...row, setNr: index + 1}
        props.logSet(name, date, rowWithSetNr);
        props.updateLastDate(indexes.routine, indexes.day, indexes.exercise);
    }

    const showHistory = (status) => {
        if (status === true){
            document.getElementById("logTable").style.display = 'unset';
            document.getElementById("setsTable").style.display = 'none';
            document.getElementById('history').style.backgroundImage = 'var(--gradientLightOrange)';
            document.getElementById('set').style.backgroundImage = 'unset';
        }
        else{
            document.getElementById("logTable").style.display = 'none';
            document.getElementById("setsTable").style.display = 'unset';
            document.getElementById('set').style.backgroundImage = 'var(--gradientLightOrange)';
            document.getElementById('history').style.backgroundImage = 'unset';
        }
    }

    return (
        <div className = "contentContainer">
            <div className = "firstRow">
                <div style={{height: '100%', width:'100%'}}>
                    <Description 
                        description = {props.routines[indexes.routine].days[indexes.day].exercises[indexes.exercise].description} 
                        editMode = {editMode}
                        descriptionChanged = {descriptionChanged}
                        />
                    <div style={{height: 'auto', width:'100%'}}>
                        <div className={style.tabsContainer}>
                            <div id="set" className={style.tab} onClick={() => showHistory(false)}>Sets</div>
                            <div id="history" className={style.tab} onClick={() => showHistory(true)}>History</div>
                        </div>

                        <SetsTable 
                            sets={props.routines[indexes.routine].days[indexes.day].exercises[indexes.exercise].sets} 
                            editMode = {editMode} 
                            setsUpdated = {setsUpdated}
                            logSet={logSet}
                            selectMode = {selectMode}
                            selectedRow = {selectedRow}
                            setSelectedRow = {setSelectedRow}
                            />
                        <LogsTable logs={logs}/>
                    </div>
                </div>
            </div>
            <div className = "secondRow editBar">
                <BottomBar
                addItem = {addItem}
                removeItem = {removeItem}
                changeSelectMode = {changeSelectMode}
                changeEditMode = {changeEditMode}
                confirmEdit = {confirmEdit}
                nameRequiredForAdd = {false}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        
        routines: state.routines,
        history: state.history 
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
        confirmSingleExercise: (newSetsArray, newDescription, routineIndex, dayIndex, exerciseIndex) => dispatch({type: actionTypes.UPDATE_SINGLE_EXERCISE, newSetsArray, newDescription, routineIndex, dayIndex, exerciseIndex}),
        logSet: (nameOfExercise, dateString, setRow) => dispatch({type: actionTypes.LOG_HISTORY, nameOfExercise, dateString, setRow}),
        addSet: (routineIndex, dayIndex, exerciseIndex) => dispatch({type: actionTypes.ADD_SET, routineIndex, dayIndex, exerciseIndex}),
        removeSet: (routineIndex, dayIndex, exerciseIndex, setIndex) => dispatch({type: actionTypes.REMOVE_SET, routineIndex, dayIndex, exerciseIndex, setIndex}),
        updateLastDate: (routineIndex, dayIndex, exerciseIndex) => dispatch({type: actionTypes.UPDATE_LAST_DATE, routineIndex, dayIndex, exerciseIndex}),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleExercise);