import './signup.css';
import logo from '../../assets/kyndo-dark.png';

 const SignUp = ()=>{
    return(
        <>
        <div className="container">
            <div className="navbar">
                <img src={logo} alt="" className="logo" />
                <div className="kyndo">Kyndo</div>
            </div>
            <div className="main-form">
                <div className="signup">
                    <div className="heading">
                        <p>Create an account</p>
                    </div>
                    <div className="form">
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
                        <a href="">Already got an account? Sign in</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default SignUp;