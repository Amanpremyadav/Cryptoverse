import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import Loader from './Loader';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const author_img = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

const { Text, Title } = Typography;
const { Option } = Select;
const currentDate = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10);


const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews,  isLoading } = useGetCryptoNewsQuery({
    newsCategory: `${newsCategory}`,
    count: simplified ? 5 : 25,
    currentDate: `${currentDate}`,
  });

  if (isLoading) {
    return <div><Loader /></div>;
  }

  // Function to truncate author name if it's longer than 15 characters
  const truncateAuthorName = (author) => {
    if (author?.length > 15) {
      return author.substring(0, 15) + '...';
    }
    return author;
  };

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}

      {cryptoNews?.articles?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-item">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>{news.title}</Title>
                  <img className="news-image" src={news?.urlToImage || demoImage} alt="" />
                </div>
              </div>
              <p>{news.description?.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                  <div>
                    <Avatar src={author_img} alt="" />
                    <Text className="provider-name">{truncateAuthorName(news.author)}</Text>
                  </div>
                  <Text>{moment(news.publishedAt).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}

    </Row>
  );
};

export default News;