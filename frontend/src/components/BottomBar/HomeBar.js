import React from 'react';
import style from './BottomBar.module.css';
import '../../globalCSS/App.css';

 const HomeBar = ({toggleAdd, toggleRemove, toggleEdit, showEditButton}) => {

     let editButton = (
        <div onClick = {() => toggleEdit(true)} 
            className = {style.button}>
        <div style = {{padding: '0px 20px', borderRight: 'solid 2px white'}}>
            Edit
        </div>
    </div>
    );

    return (
        <div className={style.homeContainer}>

                <div onClick = {() => toggleAdd(true)} className = {style.button}>
                    <div style = {{padding: '0px 20px', borderRight: 'solid 2px white'}}>
                        Add
                    </div>
                </div>
                {showEditButton && editButton}
                <div onClick = {() => toggleRemove(true)} 
                    className = {style.button}>
                    <div style = {{padding: '0px 20px'}}>
                        Delete
                    </div>
                </div>

        </div>
    )
}

export default HomeBar;