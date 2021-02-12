import React from 'react';
import style from './LogsTable.module.css';
import LogItem from './LogItem'

 const LogsTable = ({logs}) => {

    return (
        <div id="logTable" className={style.logsContainer}>
            {logs && logs.map((el, i) => {
                return (
                    <LogItem key={i} logItem = {el}/>
                );
            })}
        </div>
    )
}

export default LogsTable;