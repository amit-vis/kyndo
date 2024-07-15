import './signin-student.css';

const SignInStudent = ()=>{
    return(
        <>
        <div className="container">
            <div className="navbar">
                <div className="logo"></div>
                <div className="kyndo">Kyndo</div>
            </div>
            <div className="signup">
                <div className="heading">
                    <p>Sign in</p>
                </div>
                <div className="form">
                    <div className="email">
                        <p className="t">Email Address</p>
                        <input type="text" placeholder="Enter your email address" className="input-box"/>
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
                <div className="link2">
                    <a href="">Forgot Password</a>
                </div>
            </div>
        </div>
        </>
    )
};

export default SignInStudent();