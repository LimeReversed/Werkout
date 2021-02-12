import React, {useState} from 'react';
import '../../globalCSS/App.css';
import HomeBar from './HomeBar';
import AddBar from './AddBar';
import RemoveBar from './RemoveBar';
import EditBar from './EditBar';

 /*eslint eqeqeq: 0*/
 
 const BottomBar = ({addItem, removeItem, changeSelectMode, changeEditMode, confirmEdit, nameRequiredForAdd = true}) => {

    const [showHome, setShowHome] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const toggleAdd = (status) => {
        if (nameRequiredForAdd == true){
            setShowAdd(status);
            setShowHome(!status);
        }
        else {
            addItem();
        }
        
    }

    const toggleRemove = (status) => {
        setShowRemove(status);
        setShowHome(!status);
    }

    const toggleEdit = (status) => {
        setShowEdit(status);
        setShowHome(!status);
    }
    
    return (
        <React.Fragment>
            {showHome && <HomeBar 
                toggleAdd = {toggleAdd}
                toggleRemove = {toggleRemove}
                toggleEdit = {toggleEdit}
                showEditButton = {changeEditMode ? true : false}
                />}
            {showAdd && <AddBar
                toggleAdd = {toggleAdd}
                addItem = {addItem}
                />}
            {showRemove && <RemoveBar
                toggleRemove = {toggleRemove}
                removeItem = {removeItem}
                changeSelectMode = {changeSelectMode}
                />}
            {showEdit && <EditBar
                toggleEdit = {toggleEdit}
                confirmEdit = {confirmEdit}
                changeEditMode = {changeEditMode}
                />}
        </React.Fragment>
    )
}

export default BottomBar;