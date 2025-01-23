import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const HomePage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        return navigate('/'); // Navigate to the home page after logging out
    };

    useEffect(() => {
        // Set the background color of the entire page to gray
        document.body.style.backgroundColor = "#212429"; // Set gray background for the body
        document.body.style.color = "black"; // Ensure text color is readable on gray background

        setUser(getUserInfo());
    }, []); // Only runs on component mount

    if (!user) return (
        <div><h4>Log in to view this page.</h4></div>
    );

    const { id, email, username } = user;

    return (
        <div className="bg-dark text-light py-4">
            <Card className="h-100 bg-secondary text-light border-light card">
                <Card.Body>
                    <Card.Text>
                        <strong>Username: </strong> <i>{username}</i>
                        <br />
                        <strong>User ID: </strong> <i>{id}</i>
                        <br />
                        <strong>Email:  </strong> <i>{email}</i>
                    </Card.Text>
                </Card.Body>
            </Card>

            {/* Log Out Button */}
            <div className="text-center mt-3">
                <Button variant="danger" onClick={(e) => handleClick(e)}>Log Out</Button>
            </div>
        </div>
    );
};

export default HomePage;
