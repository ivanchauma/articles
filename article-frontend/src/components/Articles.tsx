import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../features/articles/articleSlice';
import { RootState } from '../store';
import ArticleList from './ArticleList'; // Import your ArticleList component
import Pagination from 'react-bootstrap/Pagination';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { logout } from '../features/auth/authSlice';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const Articles: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, currentPage, totalPages, error } = useAppSelector(
    (state: RootState) => state.articles
  );

  // Local state for current page and filters
  const [page, setPage] = useState(currentPage);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [sourceFilter, setSourceFilter] = useState<string>(''); 
  const [dateFilter, setDateFilter] = useState<string>(''); 
  const [categoryFilter, setCategoryFilter] = useState<string>(''); 

  // Fetch articles when page or filters change
  useEffect(() => {
    // Make sure filters are strings
    dispatch(fetchArticles(page, titleFilter, sourceFilter, dateFilter, categoryFilter));
        if (error === 'Token not valid') {
            dispatch(logout());
          }

  }, [dispatch, page, error]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setPage(1); // Reset to the first page on search
    dispatch(fetchArticles(page, titleFilter, sourceFilter, dateFilter, categoryFilter)); // Dispatch search with filters
  };

  return (
    <Container className="mt-5">
      <h3>Latest Articles 2</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Search Filters */}
      <Form className="mb-4">
        <Row className="g-3"> 
          <Col md={4}>
            <Form.Group controlId="titleFilter">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by title"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="categoryFilter">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="sourceFilter">
              <Form.Label>Source</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by source"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="dateFilter">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col xs={12} className="d-flex align-items-end">
            <Button onClick={handleSearch} className="w-100" variant="primary">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      <ArticleList articles={articles} />

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(page > 1 ? page - 1 : 1)} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === page}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(page < totalPages ? page + 1 : totalPages)} />
        </Pagination>
      </div>
    </Container>
  );
};

export default Articles;