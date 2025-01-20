import React, { useEffect, useState } from 'react';
import { fetchArticles, fetchUserArticles } from '../features/articles/articleSlice';
import { RootState } from '../store';
import ArticleList from './ArticleList'; // Import your ArticleList component
import Pagination from 'react-bootstrap/Pagination';
import { Container } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, userArticles, currentPage, totalPages, error } = useAppSelector(
    (state: RootState) => state.articles
  );

  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    dispatch(fetchArticles(page, '', '', '','')); // Fetch articles for the homepage
    dispatch(fetchUserArticles(page)); // Fetch user-specific articles
  }, [dispatch, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  //console.log(articles)

  return (
    <Container className="mt-5">
      <div>
        <h3>Latest Articles</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <ArticleList articles={articles} />
      </div>

      <div>
        <h3>Your Articles</h3>
        <ArticleList articles={userArticles} />
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(page > 1 ? page - 1 : 1)} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index} active={index + 1 === page} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(page < totalPages ? page + 1 : totalPages)} />
        </Pagination>
      </div>
    </Container>
  );
};

export default Home;