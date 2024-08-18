import { styled, Box, Typography, Button } from '@mui/material';

const Container = styled(Box)`
    border: 1px solid #e0e0e0;
    border-radius: 15px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 450px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
`;

const ImageContainer = styled(Box)`
    width: 100%;
    height: 180px;
    border-radius: 15px 15px 0 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e0e0e0;
`;

const Image = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
});

const Text = styled(Typography)`
    color: #666666;
    font-size: 14px;
    margin: 5px 0;
`;

const Heading = styled(Typography)`
    font-size: 22px;
    font-weight: 700;
    color: #333333;
    margin: 10px 0;
    text-align: center;
    padding: 0 15px;
`;

const Details = styled(Typography)`
    font-size: 16px;
    color: #555555;
    word-break: break-word;
    text-align: center;
    padding: 0 20px;
    flex-grow: 1;
    margin-bottom: 15px;
`;

const ReadMoreButton = styled(Button)`
    background-color: #1976d2;
    color: white;
    text-transform: none;
    border-radius: 20px;
    padding: 8px 20px;
    margin-bottom: 20px;
    &:hover {
        background-color: #125aa8;
    }
`;

const Post = ({ post }) => {
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 

    return (
        <Container>
            <ImageContainer>
                <Image src={url} alt="post" />
            </ImageContainer>
            <Text>{post.categories}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addEllipsis(post.description, 15)}</Details>
            <ReadMoreButton>Read More</ReadMoreButton>
        </Container>
    );
}

export default Post;
