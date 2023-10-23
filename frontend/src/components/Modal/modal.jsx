import React from 'react';
import { closeModal } from '../../store/modal';
import { useSelector, useDispatch } from 'react-redux';
import './modal.css'
import LoginForm from '../SessionForms/LoginForm';
import SignupForm from '../SessionForms/SignupForm';

function Modal(){
    const dispatch = useDispatch();
    const modal = useSelector( state => state.ui.modal)

    if (!modal){
        return null;
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(closeModal());
    }

    let component;
    switch (modal) {
        case 'login':
            component = <LoginForm />;
            break;
        case 'signup':
            component = <SignupForm />;
            break;
        default:
            return null;
    }

    const headers = {
        "login": "Login to continue to plan adventures!",
        "signup": "Signup now to start your adventure!"
    }

    return(
        <>
            <div className='modal-background' onClick={handleClick}></div>
            <div className='modal-foreground'>
                <header className='modal-header'>
                    <h3>{headers[modal]}</h3>
                </header>
                <p className='close-button' onClick={handleClick}>X</p>
                <div className='modal-body' onClick={(e) => e.stopPropagation()}>
                    { component }
                </div>
            </div>
        </>
    )
}

export default Modal;