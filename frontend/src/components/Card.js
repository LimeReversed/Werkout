import React from 'react';
import style from './Card.module.css';

 const Card = ({title, subtitle, selected, cardClicked}) => {

    // History.push här istället för link. Så att de går att selectera utan
    // att kopiera koden. Lägg till SelectMode också

    let titleBackground = selected ? style.selected : style.lightOrange;
    let subTitleBackground = selected ? style.selected : style.darkOrange;

    return (
        <div 
            onClick = {cardClicked}
            className={style.parentParallelogram}>
            <div className={`${style.titleParallelogram} ${titleBackground}`}>
                <div className={style.title}>{title}</div>
            </div>
            <div className={`${style.childParallelogram} ${subTitleBackground}`}>
                <div className={style.subTitle}>
                    {subtitle}    
                </div>
            </div>
        </div>
    )
}

export default Card;