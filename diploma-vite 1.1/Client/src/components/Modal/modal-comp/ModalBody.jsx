import { useState } from 'react'
import './ModalBody.css'
import SignInForm from './Sign/SignInForm'
import SignUpForm from './Sign/SignUpForm'

export default function ModalBody(){
    const [modalActive, setModalActive] = useState('in')

    return(
        <>
            <div className="header_btn">
                <div 
                    className={`btn_sign-in ${modalActive == 'in' ? "active" : ""}`} 
                    onClick={() => setModalActive('in')}>
                        Sign-In
                </div>
                <div 
                    className={`btn_sign-up ${modalActive == 'up' ? "active" : ""}`} 
                    onClick={() => setModalActive('up')}>
                        Sign-Up
                </div>
            </div>
            <div className='body-form'>
                {modalActive == 'in' ? <SignInForm /> : <SignUpForm/>} 
            </div>
        </>
    )
}


