import './signup.css';
import logo from '../../assets/kyndo-light.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { createUser } from '../../redux/reducer/formReducer';
import { Notification } from '../Notification';

const SignUp = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const accountExists = `/${id}/signin`;
    const [name, setUsername] = useState('');
    const [isTutor, setIsTutor] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleUsername = (event) => setUsername(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const handleCPassword = (event) => setCPassword(event.target.value);

    const handleSubmit = async () => {
        try {
            const user = { name, email, password, cpassword, isTutor };
            const result = await dispatch(createUser(user));
            if (createUser.fulfilled.match(result)) {
                setShowModal(true);
                setMessage(result.payload.message);
                setIsError(false);
                setUsername('');
                setCPassword('');
                setPassword('');
                setEmail('');
                setTimeout(() => {
                    setShowModal(false);
                    navigate(accountExists);
                }, 3000);
            } else {
                setShowModal(true);
                setMessage(result.payload.message);
                setIsError(true);
                setTimeout(() => { setShowModal(false); }, 3000);
            }
        } catch (error) {
            console.error("Error during registration:", error.message);
            setShowModal(true);
            setMessage(error.message);
            setIsError(true);
            setTimeout(() => { setShowModal(false); }, 3000);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Kyndo - Sign Up";
        setIsTutor(id === "tutor");
    }, [id]);

    const goToHomePage = () => {
        navigate('/');
    };

    return (
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
                                    value={name}
                                    onChange={handleUsername} />
                            </div>
                            <div className="email">
                                <p className="t">Email Address</p>
                                <input type="email" placeholder="Enter your email address" className="input-box"
                                    value={email}
                                    onChange={handleEmail} />
                            </div>
                            <div className="password">
                                <p className="t">Password</p>
                                <input type="password" placeholder="Enter your password" className="input-box"
                                    value={password}
                                    onChange={handlePassword} />
                            </div>
                            <div className="re-password">
                                <p className="t">Confirm Password</p>
                                <input type="password" placeholder="Re-enter your password to confirm" className="input-box"
                                    value={cpassword}
                                    onChange={handleCPassword} />
                            </div>
                        </div>
                        <button className="sign-up-button" onClick={handleSubmit}>Sign Up</button>
                        <div className="link">
                            <Link to={accountExists}>Already got an account? Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Notification show={showModal} 
                message={message}
                onHide={() => setShowModal(false)}
                isError={isError}/>
        </>
    );
};

export default SignUp;

