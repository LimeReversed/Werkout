import React, {useState} from 'react';
import style from './SetsTable.module.css';
import SetsTableForLogging from './SetsTableForLogging';
import SetsTableForEditing from './SetsTableForEditing';

 const SetsTable = ({sets, editMode, selectMode, setsUpdated, logSet, selectedRow, setSelectedRow}) => {

    const [setsData, setSetsData] = useState(sets); 

    const onChange = (e, index) => {

        let setsCopy = [...setsData];
        let row = setsCopy[index];
        row = {...row, [e.target.name]: e.target.value};
        setsCopy[index] = row;
        setSetsData(setsCopy);
        setsUpdated(setsCopy);
    };

    return (
            <div id="setsTable" className={style.container}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Log</th>
                            <th>Weight</th>
                            <th>Reps</th>
                            <th>Rest</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            editMode 
                            ? <SetsTableForEditing sets = {sets} onChange = {onChange}/> 
                            : <SetsTableForLogging 
                                sets = {sets} 
                                onChange = {onChange} 
                                logSet = {logSet}
                                selectMode = {selectMode}
                                selectedRow = {selectedRow}
                                setSelectedRow = {setSelectedRow}
                                />
                        }
                    </tbody>
                </table>
            </div>
    )
}

export default SetsTable;