import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled, CircularProgress } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

// New styled component for the post description
const Description = styled(Box)(({ theme }) => ({
    backgroundColor: '#f0f0f0', // Example background color
    border: '5px solid #ccc', // Example border color and width
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px', // Adjust spacing as needed
    minHeight: '100px',
    whiteSpace: 'pre-wrap' // Preserve newlines and whitespace
}));

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState(null); // Initialize with null for loading state
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                } else {
                    // Handle error or show error message
                }
            } catch (error) {
                // Handle error or show error message
            }
        }
        fetchData();
    }, [id]);

    const deleteBlog = async () => {  
        try {
            await API.deletePost(post._id);
            navigate('/');
        } catch (error) {
            // Handle error or show error message
        }
    }

    if (!post) {
        return <CircularProgress />; // Loading state while fetching data
    }

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            <Box style={{ float: 'right' }}>
                {   
                    account.username === post.username && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error" />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{ fontWeight: 600 }}>{post.username}</span></Typography>
                </Link>
                <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            {/* Apply the new styled component to create a colored container with border */}
            <Description>
                <Typography>{post.description}</Typography>
            </Description>

            <Comments post={post} />
        </Container>
    );
}

export default DetailView;
