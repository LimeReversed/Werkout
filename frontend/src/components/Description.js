import React, {useState, useEffect} from 'react';
import style from './Description.module.css';

 const Description = ({description, editMode, descriptionChanged}) => {

    let [expanded, setExpanded] = useState(false);

    let collapsedBox = (
        <p>{description.substring(0, 15)}</p>
    );
    
    let expandedBox = (
        <p>{description}</p>
    );

    const [descriptionState, setDescriptionState] = useState(description);

    let expandedBoxEdit = (
        <textarea onInput={(e) => {
            setDescriptionState(e.target.value)
            descriptionChanged(e.target.value)
        }} value={descriptionState}/>
    );

    const expandArrowClicked = () => {
        if (!editMode){
            setExpanded(!expanded);
        }
    }

    useEffect(() => {
        if (editMode === true){
            setExpanded(true);
        }
    }, [editMode]);

    return (
        <React.Fragment>
            <div className={style.container}>
                <div className = {style.textContainer}>
                    {expanded 
                        ? (editMode ? expandedBoxEdit : expandedBox) 
                        : collapsedBox}
                </div>
                <div className = {
                        expanded ? 
                        style.triangleUp : 
                        style.triangleDown
                    }
                    onClick= {expandArrowClicked}>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Description;