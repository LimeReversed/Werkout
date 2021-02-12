import React, {useEffect} from 'react';
import LoggableTableRow from './LoggableTableRow';

 const SetsTableForLogging = ({sets, onChange, logSet, selectMode, selectedRow, setSelectedRow}) => {

  

    useEffect(() => {
        setSelectedRow(null);
        // eslint-disable-next-line
    }, [selectMode])
    

    return (
        <React.Fragment>
           {sets.map((el, i) => {
                    return (
                        <LoggableTableRow 
                            key={el.id}
                            selectedRow = {selectedRow}
                            setSelectedRow = {setSelectedRow}
                            logSet = {logSet}
                            placeholderWeight = {el.placeholderWeight}
                            placeholderTime = {el.placeholderTime}
                            placeholderReps = {el.placeholderReps}
                            placeholderRest = {el.placeholderRest}
                            index = {i}
                            onChange = {onChange}
                            selectMode = {selectMode}
                        />
                    );
                })
           }
           </React.Fragment>
    )
}

export default SetsTableForLogging;