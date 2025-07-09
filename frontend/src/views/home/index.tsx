import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getNews, getCategories, getSources } from "../../store/action";
import { capitaLize } from '../../util';
import Loader from '../../components/Loader';
import { Col, Row, FormControl, FormSelect } from "react-bootstrap";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { v4 as uuidv4 } from "uuid";
import NewsItem from '../../components/NewsItem/NewsItem';
import NoImage from '../../assets/images/no_image.png';

interface News {
  id: string;
  title: string;
  description: string;
  published_at: string;
  url_to_image: string | null;
  url: string;
}

interface Category {
  id: string;
  name: string;
}

interface Source {
  id: string;
  name: string;
}

const Home = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [news, setNews] = useState<News[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sources, setSources] = useState<Source[]>([]);

  type DateValue = Date | [Date, Date] | null | any;

  const [publishedAt, setPublishedAt] = useState<DateValue>(null);
  const [sourceId, setSourceId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
  };

  const debounceValue = useDebounce(searchKeyword, 2000);

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sourceId, publishedAt]);

  const fetchNews = () => {
    const { getNews } = props;
    setLoading(true);

    let articlePublishedAt: string | null = null;
    if (publishedAt) {
      const publicationDate = new Date(publishedAt);
      articlePublishedAt = `${publicationDate.getFullYear()}-${publicationDate.getMonth() + 1}-${publicationDate.getDate()}`;
    }

    getNews({
      onSuccess: (response:any) => {
        if (response.success) {
          setNews(response.data.news);
        }
        setLoading(false);
      },
      onError: (error: any) => {
        setLoading(false);
        console.error("error news api", error);
      },
      params: {
        source_id: sourceId,
        category_id: categoryId,
        search_keyword: searchKeyword,
        published_at: articlePublishedAt
      }
    });
  };

  useEffect(() => {
    const { getCategories, getSources } = props;
    setLoading(true);

    getSources({
      onSuccess: (response: any) => {
        if (response.success) {
          setSources(response.data.sources);
        }
      },
      onError: (error: any) => {
        setLoading(false);
        console.error("error sources api", error);
      }
    });

    getCategories({
      onSuccess: (response: any) => {
        if (response.success) {
          setCategories(response.data.categories);
        }
      },
      onError: (error: any) => {
        setLoading(false);
        console.error("error categories api", error);
      }
    });

    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='news-container'>
      <Row className="text-center mt-4 mb-1">
        <Col sm={12} md={6} lg={3} xl={3} className='mb-4'>
          <FormControl
            type='text'
            placeholder='Search article...'
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </Col>
        <Col sm={12} md={6} lg={3} xl={3} className='mb-4'>
          <DatePicker
            className="form-control"
            value={publishedAt}
            onChange={(date) => setPublishedAt(date)}
          />
        </Col>
        <Col sm={12} md={6} lg={3} xl={3} className='mb-4'>
          <FormSelect
            onChange={(e) => setSourceId(e.target.value)}
            value={sourceId}
          >
            <option value="">Select Source</option>
            {sources.map((source) => (
              <option value={source.id} key={uuidv4()}>
                {source.name}
              </option>
            ))}
          </FormSelect>
        </Col>
        <Col sm={12} md={6} lg={3} xl={3} className='mb-4'>
          <FormSelect
            onChange={(e) => setCategoryId(e.target.value)}
            value={categoryId}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option value={category.id} key={uuidv4()}>
                {capitaLize(category.name)}
              </option>
            ))}
          </FormSelect>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : (
        <Row>
          {news.map((element) => (
            <Col sm={12} md={6} lg={4} xl={4} className='news-card' key={uuidv4()}>
              <NewsItem
                title={element.title}
                description={element.description}
                published={element.published_at}
                channel=""
                alt="News image"
                publishedAt={element.published_at}
                imageUrl={element.url_to_image === null ? NoImage : element.url_to_image}
                urlNews={element.url}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default connect(null, {
  getNews,
  getCategories,
  getSources
})(Home);
