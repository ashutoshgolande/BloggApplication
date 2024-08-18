import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Component = styled(AppBar)`
    background: linear-gradient(90deg, rgba(33,150,243,1) 0%, rgba(33,203,243,1) 100%);
    color: #FFFFFF;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1100;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        display: flex;
        align-items: center;
        padding: 20px 30px;
        color: #FFFFFF;
        text-decoration: none;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 18px;
        &:hover {
            color: #FFD700;
            transition: color 0.3s;
        }
    }
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 20px 30px;
    color: #FFFFFF;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 18px;
    &:hover {
        color: #FFD700;
        transition: color 0.3s;
    }
`;

const LogoutButton = styled(Button)`
    display: flex;
    align-items: center;
    margin-left: 20px;
    background-color: #FF4081;
    color: #FFFFFF;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    &:hover {
        background-color: #E91E63;
        transition: background-color 0.3s;
    }
`;

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await navigate('/account');
    };

    return (
        <Component position="fixed">
            <Container>
                <StyledLink to='/'>
                    <HomeIcon style={{ marginRight: '8px' }} />
                    HOME
                </StyledLink>
                <StyledLink to='/about'>
                    <InfoIcon style={{ marginRight: '8px' }} />
                    ABOUT
                </StyledLink>
                <StyledLink to='/contact'>
                    <ContactMailIcon style={{ marginRight: '8px' }} />
                    CONTACT
                </StyledLink>
                <LogoutButton onClick={handleLogout}>
                    <ExitToAppIcon style={{ marginRight: '8px' }} />
                    LOGOUT
                </LogoutButton>
            </Container>
        </Component>
    );
};

export default Header;






