import React, {useState} from 'react';
import style from './SetsTable.module.css';

 const LoggableTableRow = (
    {
         selectedRow, setSelectedRow, logSet, 
         placeholderWeight, placeholderReps, 
         placeholderTime, placeholderRest, index,
         onChange, selectMode
    }) => 
    
{

    const rowClicked = () => {
        if (selectMode === true){
            setSelectedRow(index);
        }
    };

    const logClicked = () => {
        if (selectMode === false){
            logSet(index);
            startNewInterval();
        }
        
    }

    const [time, setTime] = useState(Number(placeholderRest));
    let intervalFunction = null;
    
    function startNewInterval(){
        clearInterval(intervalFunction);
        intervalFunction = setInterval(() => {

           
                setTime((prev) => {
                    if (prev < 1){
                        clearInterval(intervalFunction);
                        setTime(Number(placeholderRest));
        
                    };
                    return prev - 1});
            
            
        }, 1000); 
    };
    

    return (
        <tr 
            className = {selectedRow === index ? style.selected : null}
            onClick = {rowClicked}
            >
            <td>
                <div 
                    className={style.logButton}
                    onClick={logClicked}    
                >{index + 1}</div>
            </td>
            <td>
                <input 
                    type="text" 
                    name= "weight"
                    placeholder={placeholderWeight}
                    onInput = {(e) => onChange(e, index)}
                    className={style.inputClass}
                    />
            </td>
            <td>
                <input 
                    type="text" 
                    name= "reps"
                    placeholder={placeholderReps}
                    onInput = {(e) => onChange(e, index)}
                />
            </td>
            <td>
                <div style={{backgroundColor: 'var(--transparentWhite)', height: '100%'}}>
                    {time}
                </div>
            </td>
        </tr>
    )
}

export default LoggableTableRow;