import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import API_URL from '../Util/Servers';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface Preferences {
    preferred_sources: string[];
    preferred_categories: string[];
    preferred_authors: string[];
}

const Preferences: React.FC = () => {
    const [preferences, setPreferences] = useState<Preferences>({
        preferred_sources: [],
        preferred_categories: [],
        preferred_authors: [],
    });

    const [sources, setSources] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [authors, setAuthors] = useState<string[]>([]);
    const [showMoreAuthors, setShowMoreAuthors] = useState(false);

    const token = useSelector((state: RootState) => state.auth.token) || localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            // Fetch available sources, categories, and authors from the API
            axios.get(`${API_URL}/available-sources`, { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => setSources(response.data))
                .catch((error) => console.error('Error fetching sources', error));

            axios.get(`${API_URL}/available-categories`, { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => setCategories(response.data))
                .catch((error) => console.error('Error fetching categories', error));

            axios.get(`${API_URL}/available-authors`, { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => setAuthors(response.data))
                .catch((error) => console.error('Error fetching authors', error));

            // Fetch current preferences
            axios.get(`${API_URL}/preferences`, { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => setPreferences(response.data || {}))
                .catch((error) => console.error('Error fetching preferences', error));
        }
    }, [token]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, type: keyof Preferences) => {
        const { value, checked } = event.target;
        const updatedPreferences = { ...preferences };

        if (checked) {
            updatedPreferences[type].push(value);
        } else {
            updatedPreferences[type] = updatedPreferences[type].filter((item: string) => item !== value);
        }

        setPreferences(updatedPreferences);
    };

    const handleSubmit = () => {
        if (token) {
            // Include token in the header for authenticated requests
            axios.post(`${API_URL}/preferences`, preferences, { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    alert('Preferences updated successfully!');
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error updating preferences', error);
                });
        }
    };

    const toggleShowMoreAuthors = () => {
        setShowMoreAuthors(!showMoreAuthors);
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                {/* Centering the Column */}
                <Col md={8} lg={6} sm={10} xs={12} className="mx-auto">
                    <Card className="mb-4 shadow-lg">
                        <Card.Body>
                            <h3 className="text-center my-4">Select Your Preferences</h3>
                            <Form>
                                {/* Preferred Sources */}
                                <Row>
                                    <Col md={4} sm={6}>
                                        <h4>Preferred Sources</h4>
                                        {sources.map((source) => (
                                            <Form.Check
                                                key={source}
                                                type="checkbox"
                                                label={source}
                                                value={source}
                                                checked={preferences.preferred_sources?.includes(source)}
                                                onChange={(e) => handleChange(e, 'preferred_sources')}
                                                className="mb-2"
                                            />
                                        ))}
                                    </Col>

                                    {/* Preferred Categories */}
                                    <Col md={4} sm={6}>
                                        <h4>Preferred Categories</h4>
                                        {categories.map((category) => (
                                            <Form.Check
                                                key={category}
                                                type="checkbox"
                                                label={category}
                                                value={category}
                                                checked={preferences.preferred_categories?.includes(category)}
                                                onChange={(e) => handleChange(e, 'preferred_categories')}
                                                className="mb-2"
                                            />
                                        ))}
                                    </Col>

                                    {/* Preferred Authors */}
                                    <Col md={4} sm={6}>
                                        <h4>Preferred Authors</h4>
                                        {authors.slice(0, showMoreAuthors ? authors.length : 5).map((author) => (
                                            <Form.Check
                                                key={author}
                                                type="checkbox"
                                                label={author}
                                                value={author}
                                                checked={preferences.preferred_authors?.includes(author)}
                                                onChange={(e) => handleChange(e, 'preferred_authors')}
                                                className="mb-2"
                                            />
                                        ))}
                                        <Button variant="link" onClick={toggleShowMoreAuthors}>
                                            {showMoreAuthors ? 'Show Less' : 'Show More'}
                                        </Button>
                                    </Col>
                                </Row>

                                {/* Save Button */}
                                <div className="text-center mt-4">
                                    <Button variant="primary" size="lg" onClick={handleSubmit}>Save Preferences</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Preferences;