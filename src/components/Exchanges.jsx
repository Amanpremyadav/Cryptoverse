import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar , Button} from 'antd';
import Loader from './Loader';
import { useGetExchangesQuery } from '../services/cryptoExchanges';
import HTMLReactParser from 'html-react-parser';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {

  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data;
  console.log(exchangesList);

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
       <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Country</Col>
        <Col span={6}>Established Year</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.trust_score_rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
                    <Col span={6}>{exchange.country}</Col>
                    <Col span={6}>{exchange.year_established}</Col>
                  </Row>
                )}
              >
                {HTMLReactParser(exchange.description || '')} <br /><div className="button-container">
                  <Button type="primary" href={exchange.url} target="_blank">Know More...</Button>
                </div>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Exchanges
