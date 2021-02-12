import React from 'react';
import style from './Login.module.css';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import {signUp, signIn} from '../services/HttpService';


 const Login = (props) => {

    const history = useHistory();

    let userInfo = {
        email: "",
        password: ""
    };

    const signInHandler = async () => {
        let success = await signIn(userInfo.email, userInfo.password, props.setTokenObject, props.setUser);
        if (success === true){
            
            history.push("/routines");
        }

    };

    const signUpHandler = async () => {
        let success = await signUp(userInfo.email, userInfo.password, props.setTokenObject, props.setUser);
        if (success === true){
            history.push("/routines");
        };
    };
    
    const onInput = (e) => {
        userInfo = {...userInfo, [e.target.name]: e.target.value};
    }

    return (
        <React.Fragment>
            <div className={style.container}>
                <input onInput = {onInput} className={style.input} type="text" placeholder="Username" name="email"/>
                <input onInput = {onInput} className={style.input} type="password" placeholder="Password" name="password"/>
                <div className={style.buttonSetContainer}>
                    <div className={style.buttonContainer} onClick={signInHandler}>
                        <button className={style.button}>Sign In</button>
                    </div>    
                    <div className={style.buttonContainer} onClick={signUpHandler}>
                        <button className={style.button}>Sign Up</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        tokenObject: state.tokenObject
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTokenObject: (tokenObject) => dispatch({type: actionTypes.SET_TOKEN_OBJECT, tokenObject}),
        createUser: (email) => dispatch({type: actionTypes.CREATE_USER, email}),
        setUser: (user) => dispatch({type: actionTypes.SET_USER, user})
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(Login);