import React, {useEffect} from 'react';
import style from './BottomBar.module.css';
import '../../globalCSS/App.css';

 const RemoveBar = ({toggleRemove, removeItem, changeSelectMode}) => {
  
    useEffect(() => {
        changeSelectMode(true);
        
        // eslint-disable-next-line
    }, [])

    const goBack = () => {
        changeSelectMode(false);
        toggleRemove(false);
    };

    const confirm = () => {
        removeItem();
        changeSelectMode(false);
        toggleRemove(false);
    }

    return (
        <div className={style.container}>
            <div 
                className = {`firstColumn ${style.triangleLeft}`}
                onClick = {goBack}
            >
            </div>
            <div className = {`secondColumn ${style.button}`}>
                <div>
                Delete Selected    
                </div>
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

export default RemoveBar;