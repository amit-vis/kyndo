import logo from '../../assets/kyndo-light.png';

const SignInStudent = ()=>{
    return(
        <>
        <div className="fluid-container sign-container">
            <div className="logo-div">
                <img src={logo} alt="" className="logo" />
                <div className="kyndo">Kyndo</div>
            </div>
            <div className="main-form">
                <div className="signup">
                    <p className='heading'>Sign in</p>
                    <div className="sign-form">
                        <div className="username">
                            <p className="t">Email Address</p>
                            <input type="email" placeholder="Enter your email address" className="input-box"/>
                        </div>
                        <div className="password">
                            <p className="t">Password</p>
                            <input type="password" placeholder="Enter your password" className="input-box"/>
                        </div>
                    </div>
                    <button className="sign-up-button">Sign in</button>
                    <div className="link">
                        <a href="">Don't have an account? Sign Up</a>
                    </div>
                    <div className="link link-pass">
                        <a href="">Forgot Password</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default SignInStudent;