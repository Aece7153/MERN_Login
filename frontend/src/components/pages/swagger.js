import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Row, Col, Container, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Alerts() {
  const [alerts, setAlerts] = useState([]);  // Store alerts data
  const [error, setError] = useState(null);  // Store error message
  const [activeTab, setActiveTab] = useState({}); // Track active tab (Alert or Reason) for each card
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login'); // If no token, redirect to login page
    } else {
      async function fetchData() {
        try {
          const result = await axios(
            'https://api-v3.mbta.com/alerts?sort=banner&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE'
          );
          setAlerts(result.data.data);  // Set fetched alerts data
        } catch (err) {
          setError('Failed to fetch alerts. Please try again later.');  // Handle API errors
        }
      }
      fetchData();
    }
  }, [navigate]);

  // Function to render an image if available
  const renderImage = (imageUrl) => {
    if (imageUrl) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <img
            src={imageUrl}
            alt="Related to the alert"
            style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
          />
        </div>
      );
    }
    return null;
  };

  // Function to handle tab changes (Alert or Reason) for each card
  const handleTabChange = (id, tab) => {
    setActiveTab((prevState) => ({ ...prevState, [id]: tab }));
  };

  if (!alerts.length && !error) {
    return <div className="text-center text-light">Loading...</div>;
  }

  return (
    <Container fluid className="bg-dark text-light py-4">
      <h1 className="text-warning text-center mb-4">Alerts</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <Row>
        {alerts.map((alert) => (
          <Col md={6} lg={4} className="mb-4" key={alert.id}>
            <Card className="h-100 bg-secondary text-light border-light">
              {/* Card Header */}
              <Card.Header as="h4" className="bg-dark text-warning">
                Alert Information
              </Card.Header>

              {/* Card Body */}
              <Card.Body>
                {/* ButtonGroup to toggle between Alert and Reason */}
                <ButtonGroup className="mb-3">
                  <Button
                    variant={activeTab[alert.id] === 'alert' ? 'warning' : 'outline-warning'}
                    onClick={() => handleTabChange(alert.id, 'alert')}
                  >
                    Alert
                  </Button>
                  <Button
                    variant={activeTab[alert.id] === 'reason' ? 'light' : 'outline-light'}
                    onClick={() => handleTabChange(alert.id, 'reason')}
                  >
                    Reason
                  </Button>
                </ButtonGroup>

                {/* Conditionally render content based on active tab */}
                {activeTab[alert.id] === 'reason' ? (
                  <Card.Text>
                    <strong>Reason:</strong> <i>{alert.attributes.cause || 'No reason provided.'}</i>
                  </Card.Text>
                ) : (
                  <>
                    <Card.Title as="h5" className="text-light">
                      {alert.attributes.header}
                    </Card.Title>
                    <Card.Text>{alert.attributes.description}</Card.Text>
                    {renderImage(alert.attributes.image)}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Alerts;
