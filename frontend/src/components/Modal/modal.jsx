import React  from 'react';
import { closeModal } from '../../store/modal';
import { useSelector, useDispatch } from 'react-redux';
import './modal.css'
import LoginForm from '../SessionForms/LoginForm';
import SignupForm from '../SessionForms/SignupForm';
import ReviewForm from '../Review';


function Modal(){
    const dispatch = useDispatch();
    const modal = useSelector( state => state.ui.modal)
    const itinerary = useSelector(state => Object.values(state.itineraries))

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
        case 'createReview':
            component = <ReviewForm/>
            break;
        case 'updateReview':
            component = <ReviewForm update={true}/>
            break;
        default:
            return null;
    }

    const headers = {
        "login": "On the Road to Something Great? Log In!",
        "signup": "Signup now to start your adventure!",
        "createReview": itinerary.length ? "Leave a comment!" : "",
        "updateReview": itinerary.length ? "Update your Comment!" : ""
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