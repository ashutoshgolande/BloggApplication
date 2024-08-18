import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

// Styled components for cleaner and more readable code
const Banner = styled(Box)(({ theme }) => ({
    backgroundImage: `url('http://mrtaba.ir/image/bg2.jpg')`,
    width: '50%',
    height: '100vh',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
}));

const ContentWrapper = styled(Box)({
    display: 'flex',
    height: '100vh',
});

const Wrapper = styled(Box)({
    width: '50%',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
});

const Text = styled(Typography)({
    color: '#878787',
    marginTop: '20px',
});

const Contact = () => {
    return (
        <ContentWrapper>
            {/* Banner section */}
            <Banner />

            {/* Content section */}
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>
                
                <Text variant="h5">
                    {/* Instagram link */}
                    Reach out to me on
                    <Link href="https://www.instagram.com/ashutoshgolande/" color="inherit" target="_blank" rel="noopener noreferrer">
                        <Instagram sx={{ marginLeft: '10px', marginRight: '10px' }} />
                    </Link>
                    <br />
                    
                    {/* Email link */}
                    or send me an Email 
                    <Link href="mailto:ashutoshgolande0608@gmail.com?Subject=This%20is%20a%20subject" target="_blank" color="inherit" rel="noopener noreferrer">
                        <Email sx={{ marginLeft: '10px' }} />
                    </Link>.
                </Text>
            </Wrapper>
        </ContentWrapper>
    );
}

export default Contact;
