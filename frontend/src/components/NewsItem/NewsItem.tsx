import React from "react";
import { Button, Card } from "react-bootstrap";
// import Details from "./Details/Details";
import ArrowIcon from "../../assets/images/arrow.svg";

import "./NewsItem.css";

interface NewsItemProps {
  imageUrl: string;
  alt: string;
  description: string;
  title: string;
  channel: string;
  published: string;
  urlNews: string;
  publishedAt:any;
}

const NewsItem: React.FC<NewsItemProps> = ({
  imageUrl,
  alt,
  description,
  title,
  channel,
  published,
  urlNews,
}) => {
  return (
    <Card className="card">
      <Card.Img className="card-img" variant="top" src={imageUrl} alt={alt} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
        {/* <Details channel={channel} published={published} /> */}
        <Button className="card-btn" href={urlNews} target="_blank" rel="noopener noreferrer">
          Read more <img src={ArrowIcon} className="arrow-icon" alt="arrow" />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NewsItem;
