import React, { useContext } from "react";
import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';
import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const Container = styled(Box)({
    marginBottom: 24, /* Increase this value for more spacing */
    padding: 16,
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ccffcc',
    border: '5px solid #dddddd',  // Adding a border
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.02)',
        cursor: 'pointer',
    },
    
});

const UserInfo = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
});

const Name = styled(Typography)({
    fontWeight: 600,
    fontSize: 18,
    marginRight: 12,
});

const DateText = styled(Typography)({
    fontSize: 14,
    color: '#666666',
});

const CommentText = styled(Typography)({
    fontSize: 16,
    lineHeight: '1.5',
});

const DeleteIcon = styled(Delete)({
    marginLeft: 'auto',
    color: '#FF3D00',
    cursor: 'pointer',
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
        color: '#FF6E40',
    },
});

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);

    const removeComment = async () => {
        await API.deleteComment(comment._id);
        setToggle(prev => !prev);
    };

    return (
        <Container>
            <UserInfo>
                <Name>{comment.name}</Name>
                <DateText>{new Date(comment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</DateText>
                { comment.name === account.username && <DeleteIcon onClick={removeComment} /> }
            </UserInfo>
            <CommentText>{comment.comments}</CommentText>
        </Container>
    );
};

export default Comment;
