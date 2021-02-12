import React from 'react';
import style from './BottomBar.module.css';
import '../../globalCSS/App.css';

 const AddBar = ({toggleAdd, addItem}) => {

    let newName = "";

    const confirm = () => {
        addItem(newName);
        toggleAdd(false);
    }

    return (
        <div className={style.container}>
            <div 
                className = {`firstColumn ${style.triangleLeft}`}
                onClick = {() => toggleAdd(false)}
                >
            </div>
            <div className = "secondColumn">
                <input 
                    type="text" 
                    placeholder="Name" 
                    name = "New Name"
                    className = {style.addName}
                    onInput = {(e) => newName = e.target.value}
                    />
            </div>
            <div 
                className = {`thirdColumn ${style.button}`}
                onClick = {confirm}
                >
                OK
            </div>
        </div>
    )
}

export default AddBar;