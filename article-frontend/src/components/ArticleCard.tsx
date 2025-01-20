import React from 'react';
import { Card } from 'react-bootstrap';
import './ArticleCard.css'

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, imageUrl, publishedAt, source }) => {
  return (
    <Card className="article-card mb-4 shadow-sm">
      <Card.Img variant="top" src={imageUrl} alt={title} width={'250px'} height={'220px'} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description.substring(0, 100)}...</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <small>
          Published on {publishedAt} -{' '}
          <a href={source} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </small>
      </Card.Footer>
    </Card>
  );
};

export default ArticleCard;
