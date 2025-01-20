import React from 'react';
import ArticleCard from './ArticleCard';  // Import BlogCard component


interface Article {
  title: string;
  description: string;
  image_url: string;
  source: string;
  published_at: string;
}

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div className="row">
      {articles.map((post, index) => (
        <div key={index} className="col-md-4 mb-4">
          <ArticleCard
            title={post.title}
            description={post.description}
            imageUrl={post.image_url}
            source={post.source}
            publishedAt={post.published_at}
          />
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
