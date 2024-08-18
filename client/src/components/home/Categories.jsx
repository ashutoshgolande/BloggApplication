import React from 'react';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

// CSS keyframes for slow unfolding animation
const unfoldAnimation = `
    @keyframes unfold {
        0% {
            transform: scaleY(0);
        }
        100% {
            transform: scaleY(1);
        }
    }
`;

// Styled components with slow unfolding animation
const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
    margin-top: 20px;
    animation: unfold 1s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; /* Apply slow unfold animation */
    transform-origin: top; /* Origin for scaling */
`;

const StyledButton = styled(Button)`
    margin: 20px 0;
    width: 100%;
    background-color: #1976d2; /* Material blue */
    color: #fff;
    text-transform: uppercase;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(25, 118, 210, 0.3); /* Light shadow */
    transition: background-color 0.3s ease, transform 0.2s ease-out, box-shadow 0.3s ease;

    &:hover {
        background-color: #1565c0; /* Darker shade of blue */
        transform: translateY(-2px); /* Lift slightly */
        box-shadow: 0 6px 12px rgba(25, 118, 210, 0.4); /* Slightly stronger shadow */
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #333;
    transition: color 0.3s ease-in-out;

    &:hover {
        color: #1976d2; /* Material blue on hover */
    }
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <style>{unfoldAnimation}</style> {/* Inject the animation keyframes */}
            <Typography variant="h5" align="center" gutterBottom>
                Choose a Category
            </Typography>
            
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none', display: 'block' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>
            
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to={"/"}>
                                <Typography variant="subtitle1">All Categories</Typography>
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map(category => (
                        <TableRow key={category.id}>
                            <TableCell>
                                <StyledLink to={`/?category=${category.type}`}>
                                    <Typography variant="body1">{category.type}</Typography>
                                </StyledLink>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </div>
    );
}

export default Categories;

