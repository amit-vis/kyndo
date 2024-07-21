import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from '../../assets/kyndo-light.png';
import { useEffect, useState } from 'react';
import { Notification } from '../Notification';
import { useDispatch } from 'react-redux';
import { signuser } from '../../redux/reducer/formReducer';

const SignIn = ()=>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isTutor, setIsTutor] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const { id } = useParams();

    const newAccount = `/${id}/signup`;

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Kyndo - Sign In"
        setIsTutor(id === "tutor")
    }, [id]);

    const goToHomePage = () => {
        navigate('/')
    }

    const handleSignin = async ()=>{
        try {
            const user = {email, password, isTutor};
            const result = await dispatch(signuser(user));
            if(signuser.fulfilled.match(result)){
                setEmail('');
                setPassword('');
                setShowModal(true);
                setMessage("you have logged in successfully!");
                setIsError(false);
                setTimeout(()=>{
                    setShowModal(false)
                    loadDashboard()
                },3000)
            }else{
                setShowModal(true);
                setIsError(true);
                setMessage(result.payload.message);
                setTimeout(()=>{
                    setShowModal(false);
                },3000)
            }
        } catch (error) {
            console.error("Error during registration:", error.message);
            setShowModal(true);
            setMessage(error.message);
            setIsError(true);
            setTimeout(() => { setShowModal(false); }, 3000);
        }
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
                    <p className='heading'>Sign in</p>
                    <div className="sign-form">
                        <div className="username">
                            <p className="t">Email Address</p>
                            <input type="email"
                                placeholder="Enter your email address"
                                className="input-box"
                                value={email}
                                onChange={handleEmail}
                                required
                            />
                        </div>
                        <div className="password">
                            <p className="t">Password</p>
                            <input type="password"
                                placeholder="Enter your password"
                                className="input-box"
                                value={password}
                                onChange={handlePassword}
                                required
                            />
                        </div>
                    </div>
                    <button className="sign-up-button"
                        onClick={handleSignin}>
                            Sign in
                        </button>
                    <div className="link">
                        <Link to={newAccount}>Don't have an account? Sign Up</Link>
                    </div>
                    <div className="link link-pass">
                        <a href="">Forgot Password</a>
                    </div>
                </div>
            </div>
        </div>
        <Notification show={showModal} 
        onHide={()=>setShowModal(false)}
        message={message}
        isError={isError}
        />
        </>
    )
};

export default SignIn;