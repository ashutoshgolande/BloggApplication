import React, { useState, useEffect } from 'react';
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    height: 100vh;
`;

const Banner = styled(Box)`
    background-image: url('https://t3.ftcdn.net/jpg/05/75/74/42/360_F_575744213_xDU4dVUMXMJOERoAOofBUNoIIbzJXxYU.jpg');
    width: 50%;
    height: 100%;
    background-position: center;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 40px 20px;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Heading = styled(Typography)`
    font-weight: bold;
`;

const Text = styled(Typography)`
    color: #878787;
    line-height: 1.8;
    margin-top: 20px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    animation: typewriter 4s steps(40) 1s 1 normal both;
`;

const StyledLink = styled(Link)`
    margin-left: 5px;
    color: inherit;
    &:hover {
        color: #000;
    }
    display: inline-flex;
    align-items: center;
`;

const IconWrapper = styled(Box)`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const About = () => {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        setAnimated(true);
    }, []);

    return (
        <Container>
            <Banner />
            <Wrapper>
                <Heading variant="h3">Code for Interview</Heading>
                <Text variant="h5" className={animated ? 'typewriter-text' : ''}>
                    I'm a Third Year UG Student at IIT Kharagpur<br />
                    If you are interested, you can view some of my favorite projects here.<br />
                    Need something built or simply want to have a chat?<br />
                    Reach out to me on<br />
                </Text>

                <IconWrapper>
                    <StyledLink href="https://github.com/ashutoshgolande" target="_blank">
                        <GitHub fontSize="large" />
                    </StyledLink>
                    <StyledLink href="https://www.instagram.com/ashutoshgolande/" target="_blank">
                        <Instagram fontSize="large" />
                    </StyledLink>
                    <StyledLink href="mailto:ashutoshgolande0608@gmail.com?Subject=This is a subject" target="_blank">
                        <Email fontSize="large" />
                    </StyledLink>
                </IconWrapper>
            </Wrapper>
        </Container>
    );
};

const GlobalCss = `
.typewriter-text {
    overflow: hidden;
    white-space: nowrap;
    animation: typewriter 4s steps(40) 1s 1 normal both;
}

@keyframes typewriter {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}
`;

const AboutWithGlobalCss = () => (
    <>
        <style>{GlobalCss}</style>
        <About />
    </>
);

export default AboutWithGlobalCss;
