import './signup.css';
import logo from '../../assets/kyndo-light.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

 const SignUp = ()=>{

    useEffect(() => {
        document.title = "Kyndo - Sign Up"
    }, []);
    return(
        <>
        <div className="fluid-container sign-container">
            <div className="logo-div">
                <img src={logo} alt="" className="logo" />
                <div className="kyndo">Kyndo</div>
            </div>
            <div className="main-form">
                <div className="signup">
                    <p className='heading'>Create an account</p>
                    <div className="sign-form">
                        <div className="username">
                            <p className="t">Username</p>
                            <input type="text" placeholder="Enter your username" className="input-box"/>
                        </div>
                        <div className="email">
                            <p className="t">Email Address</p>
                            <input type="email" placeholder="Enter your email address" className="input-box"/>
                        </div>
                        <div className="password">
                            <p className="t">Password</p>
                            <input type="password" placeholder="Enter your password" className="input-box"/>
                        </div>
                        <div className="re-password">
                            <p className="t">Confirm Password</p>
                            <input type="password" placeholder="Re-enter your password to confirm" className="input-box"/>
                        </div>
                    </div>
                    <button className="sign-up-button">Sign Up</button>
                    <div className="link">
                        <Link to='/signin'>Already got an account? Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default SignUp;