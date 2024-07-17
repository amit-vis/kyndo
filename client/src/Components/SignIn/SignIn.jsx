import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from '../../assets/kyndo-light.png';
import { useEffect, useState } from 'react';

const SignIn = ()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { id } = useParams();

    const newAccount = `/${id}/signup`;

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Kyndo - Sign In"
    }, []);

    const goToHomePage = () => {
        navigate('/')
    }

    return(
        <>
        <div className="fluid-container sign-container">
            <div className="logo-div" onClick={goToHomePage}>
                <img src={logo} alt="" className="logo" />
                <div className="kyndo">Kyndo</div>
            </div>
            <div className="main-form">
                <div className="signup">
                    <p className='heading'>Sign in</p>
                    <div className="sign-form">
                        <div className="username">
                            <p className="t">Email Address</p>
                            <input type="email"
                                placeholder="Enter your email address"
                                className="input-box"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="password">
                            <p className="t">Password</p>
                            <input type="password"
                                placeholder="Enter your password"
                                className="input-box"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button className="sign-up-button">Sign in</button>
                    <div className="link">
                        <Link to={newAccount}>Don't have an account? Sign Up</Link>
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

export default SignIn;