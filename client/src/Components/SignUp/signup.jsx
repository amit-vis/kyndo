import './signup.css';
import logo from '../../assets/kyndo-light.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../Footer';

 const SignUp = ()=>{

    const { id } = useParams();
    const accountExists = `/${id}/signin`;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Kyndo - Sign Up"
    }, []);

    const goToHomePage = () => {
        navigate('/')
    }

    const loadDashboard = () => {
        navigate(`/${id}-dashboard`)
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
                    <p className='heading'>Create an account</p>
                    <div className="sign-form">
                        <div className="username">
                            <p className="t">Username</p>
                            <input type="text" placeholder="Enter your username" className="input-box"
                            onChange={handleUsername} />
                        </div>
                        <div className="email">
                            <p className="t">Email Address</p>
                            <input type="email" placeholder="Enter your email address" className="input-box"
                            onChange={handleEmail}/>
                        </div>
                        <div className="password">
                            <p className="t">Password</p>
                            <input type="password" placeholder="Enter your password" className="input-box"
                            onChange={handlePassword}/>
                        </div>
                        <div className="re-password">
                            <p className="t">Confirm Password</p>
                            <input type="password" placeholder="Re-enter your password to confirm" className="input-box"/>
                        </div>
                    </div>
                    <button className="sign-up-button"
                        onClick={loadDashboard}>
                            Sign Up
                        </button>
                    <div className="link">
                        <Link to={accountExists}>Already got an account? Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default SignUp;