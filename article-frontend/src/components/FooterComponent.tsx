import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './FooterComponet.css'

const FooterComponent: React.FC = () => {
  return (
      <footer className="bg-dark text-white py-3 mt-auto">
        <Container fluid>
          <Row>
            <Col className="text-center">
              <p>&copy; 2025 ReArticle. All Rights Reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
  );
};

export default FooterComponent;

