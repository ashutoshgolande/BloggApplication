import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Global } from '@emotion/react';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Background = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
    background-image: url('https://www.searchenginejournal.com/wp-content/uploads/2020/08/7-ways-a-blog-can-help-your-business-right-now-5f3c06b9eb24e-1280x720.png');
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.9;
`;

const Component = styled(Box)`
    width: 400px;
    padding: 40px 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.9);
`;

const Image = styled('img')({
    width: 120,
    display: 'block',
    margin: '0 auto 30px',
});

const Wrapper = styled(Box)`
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 24px;
    &:hover {
        background: #E05514;
    }
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 24px;
    border: 1px solid #2874f0;
    box-shadow: none;
    &:hover {
        background: #f1f1f1;
    }
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 14px;
    text-align: center;
`;

const Error = styled(Typography)`
    font-size: 12px;
    color: #ff6161;
    line-height: 1.5;
    font-weight: 600;
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [loginErrors, setLoginErrors] = useState({});
    const [signupErrors, setSignupErrors] = useState({});
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_1280.png';

    useEffect(() => {
        setLoginErrors({});
        setSignupErrors({});
    }, [account]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const validateLogin = () => {
        let errors = {};
        if (!login.username) errors.username = 'Username is required';
        if (!login.password) errors.password = 'Password is required';
        setLoginErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateSignup = () => {
        let errors = {};
        if (!signup.name) errors.name = 'Name is required';
        if (!signup.username) errors.username = 'Username is required';
        if (!signup.password) errors.password = 'Password is required';
        else if (signup.password.length < 6) errors.password = 'Password must be at least 6 characters long';
        setSignupErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const loginUser = async () => {
        if (validateLogin()) {
            let response = await API.userLogin(login);
            if (response.isSuccess) {
                setLoginErrors({});
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({ name: response.data.name, username: response.data.username });
                isUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigate('/');
            } else {
                setLoginErrors({ general: response.message || 'Invalid username or password' });
            }
        }
    };

    const signupUser = async () => {
        if (validateSignup()) {
            let response = await API.userSignup(signup);
            if (response.isSuccess) {
                setSignupErrors({});
                setSignup(signupInitialValues);
                toggleAccount('login');
            } else {
                setSignupErrors({ general: response.message || 'Something went wrong! Please try again later' });
            }
        }
    };

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    return (
        <>
            <Global
                styles={{
                    '*': {
                        margin: 0,
                        padding: 0,
                        boxSizing: 'border-box',
                    },
                    'html, body': {
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden',
                    },
                    'body': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    '::-webkit-scrollbar': {
                        display: 'none',
                    },
                    'html': {
                        scrollbarWidth: 'none',
                        '-ms-overflow-style': 'none',
                    },
                }}
            />
            <Background>
                <Component>
                    <Image src={imageURL} alt="blog" />
                    {
                        account === 'login' ?
                            <Wrapper>
                                <TextField 
                                    variant="outlined" 
                                    value={login.username} 
                                    onChange={onValueChange} 
                                    name='username' 
                                    label='Enter Username' 
                                    fullWidth 
                                    error={!!loginErrors.username}
                                    helperText={loginErrors.username}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField 
                                    variant="outlined" 
                                    value={login.password} 
                                    onChange={onValueChange} 
                                    name='password' 
                                    label='Enter Password' 
                                    type="password" 
                                    fullWidth 
                                    error={!!loginErrors.password}
                                    helperText={loginErrors.password}
                                    InputLabelProps={{ shrink: true }}
                                />

                                {loginErrors.general && <Error>{loginErrors.general}</Error>}

                                <LoginButton variant="contained" onClick={loginUser} fullWidth>Login</LoginButton>
                                <Text>OR</Text>
                                <SignupButton onClick={toggleSignup} fullWidth>Create an account</SignupButton>
                            </Wrapper> :
                            <Wrapper>
                                <TextField 
                                    variant="outlined" 
                                    onChange={onInputChange} 
                                    name='name' 
                                    label='Enter Name' 
                                    fullWidth 
                                    error={!!signupErrors.name}
                                    helperText={signupErrors.name}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField 
                                    variant="outlined" 
                                    onChange={onInputChange} 
                                    name='username' 
                                    label='Enter Username' 
                                    fullWidth 
                                    error={!!signupErrors.username}
                                    helperText={signupErrors.username}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField 
                                    variant="outlined" 
                                    onChange={onInputChange} 
                                    name='password' 
                                    label='Enter Password' 
                                    type="password" 
                                    fullWidth 
                                    error={!!signupErrors.password}
                                    helperText={signupErrors.password}
                                    InputLabelProps={{ shrink: true }}
                                />

                                {signupErrors.general && <Error>{signupErrors.general}</Error>}

                                <SignupButton onClick={signupUser} fullWidth>Signup</SignupButton>
                                <Text>OR</Text>
                                <LoginButton variant="contained" onClick={toggleSignup} fullWidth>Already have an account</LoginButton>
                            </Wrapper>
                    }
                </Component>
            </Background>
        </>
    );
};

export default Login;





