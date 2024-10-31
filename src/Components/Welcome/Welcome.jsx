import React from 'react'
import './Welcome.css'
import Form from './Form'
function Welcome() {
    return (
        <section className=' position-relative text-center text-white'>
            <div className='tabs rounded d-flex flex-column justify-content-center align-items-center position-absolute'>
                <div className="buttons d-flex" id="pills-tab" role="tablist">
                    <button className="active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Log In</button>
                    <button className="" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Sign Up</button>
                </div>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0"><Form type="login" /></div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0"><Form type="signup" /></div>
                </div>
            </div>
        </section>
    )
}

export default Welcome