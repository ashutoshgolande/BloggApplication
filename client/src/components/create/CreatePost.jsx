import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  padding: '20px',
  background: '#fff',
  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
  borderRadius: '10px',
  [theme.breakpoints.down('md')]: {
    margin: '20px 10px',
    padding: '10px',
  },
}));

const ImageContainer = styled(Box)({
  width: '100%',
  height: '50vh', // Set height to 50% of the viewport height
  borderRadius: '10px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f9f9f9',
});

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Ensure the image covers the container without distortion
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f9f9f9;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 20px;
  font-size: 18px;
  padding: 10px;
  background: #f9f9f9;
  &:focus-visible {
    outline: none;
    border-color: #3f51b5;
  }
`;

const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date(),
};

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState('');
  const { account } = useContext(DataContext);

  useEffect(() => {
    setPost((prevPost) => ({
      ...prevPost,
      categories: location.search?.split('=')[1] || 'All',
      username: account.username,
    }));
  }, [location.search, account.username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'picture') {
      setFile(e.target.files[0]); // Set the selected file
      setPost((prevPost) => ({ ...prevPost, picture: URL.createObjectURL(e.target.files[0]) }));
    } else {
      setPost((prevPost) => ({ ...prevPost, [name]: value }));
    }
  };

  const savePost = async () => {
    if (file) {
      const data = new FormData();
      data.append('name', file.name);
      data.append('file', file);
      const response = await API.uploadFile(data);
      setPost((prevPost) => ({ ...prevPost, picture: response.data }));
    }

    await API.createPost(post);
    navigate('/');
  };

  const url = post.picture
    ? post.picture
    : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  return (
    <Container>
      <ImageContainer>
        <Image src={url} alt="post" />
      </ImageContainer>
      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleChange}
          name="picture"
        />
        <InputTextField
          onChange={handleChange}
          name="title"
          placeholder="Title"
        />
        <Button
          onClick={savePost}
          variant="contained"
          color="primary"
          style={{ padding: '10px 20px' }}
        >
          Publish
        </Button>
      </StyledFormControl>
      <Textarea
        rowsMin={5}
        placeholder="Tell your story..."
        name="description"
        onChange={handleChange}
      />
    </Container>
  );
};

export default CreatePost;

