import React from 'react';
import style from './LogsTable.module.css';

 const LogItem = ({logItem}) => {

    return (
            <div className={style.itemContainer}>
                <div>{logItem.logDate}</div><br/>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Set</th>
                            <th>Weight</th>
                            <th>Reps</th>
                            <th>Rest</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logItem && logItem.entries.map((el) => {
                            return (
                                <tr key={el.setNr}>
                                    <td>{el.setNr}</td>
                                    <td>{el.weight}</td>
                                    <td>{el.reps}</td>
                                    <td>{el.rest}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
    )
}

export default LogItem;