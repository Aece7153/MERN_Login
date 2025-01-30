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
        // Set the background color of the entire page to blue
        document.body.style.backgroundColor = "#0c0c1f"; // Set blue background for the body

        setUser(getUserInfo());
    }, []);

    if (!user) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Card className="text-center bg-secondary text-light " style={{ width: '100%', maxWidth: '500px' }}>
                <Card.Body>
                    <h4 style={{ fontSize: '2.5rem', color: '#FFA500' }}>Log in to view this page.</h4>
                </Card.Body>
            </Card>
        </div>
    );

    const { id, email, username } = user;

    return (
        <div className="color: #FFA500 text-light py-4">
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
