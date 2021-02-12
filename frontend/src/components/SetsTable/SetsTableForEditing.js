import React from 'react';
// import style from './SetsTable.module.css';

 const SetsTableForEditing = ({sets, onChange}) => {

    return (
        <React.Fragment>
           {
            sets.map((el, i) => {
                return (
                    <tr key={el.id}>
                        <td>
                            <div style = {{backgroundColor: 'var(--transparentWhite)', height: '100%'}}>
                                {i + 1}
                            </div>
                        </td>
                        <td>
                            <input 
                            type="text" 
                            name="placeholderWeight"
                            placeholder={el.placeholderWeight}
                            onInput = {(e) => onChange(e, i)}
                            
                            />
                        </td>
                        <td>
                            <input 
                                type="text" 
                                name="placeholderReps"
                                placeholder={el.placeholderReps}
                                onInput = {(e) => onChange(e, i)}
                                />
                        </td>
                        <td>
                            <input 
                                type="text" 
                                name="placeholderRest"
                                placeholder={el.placeholderRest}
                                onInput = {(e) => onChange(e, i)}
                                />
                        </td>
                    </tr>
                );
            })
           }
           </React.Fragment>
    )
}

export default SetsTableForEditing;