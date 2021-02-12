import React, {useEffect} from 'react';
import style from './BottomBar.module.css';
import '../../globalCSS/App.css';

 const Editbar = ({toggleEdit, confirmEdit, changeEditMode}) => {
    
    useEffect(() => {
        changeEditMode(true);

    // eslint-disable-next-line
    }, [])

    const goBack = () => {
        changeEditMode(false);
        toggleEdit(false);
    }

    const confirm = () => {
        confirmEdit();
        changeEditMode(false);
        toggleEdit(false);
    }

    return (
        <div className={style.container}>
            <div 
                className = {`firstColumn ${style.triangleLeft}`}
                onClick = {goBack}
            ></div>
            <div className = "secondColumn">
                Edit default values
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

export default Editbar;