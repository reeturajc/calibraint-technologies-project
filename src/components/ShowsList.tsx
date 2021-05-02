import { Button, Card, Col, Image, Row, Space } from "antd";
import Interweave from "interweave";

export default function ShowsList(props: any) {
  return (
    <div>
      <Space direction="vertical" size="large">
        {props.showData &&
          props.showData.length >= 0 &&
          props.showData.map((item: any, index: number) => {
            let data = item.show;
            if (item.show) {
              data = item.show;
            } else {
              data = item;
            }
            return (
              <Card
                key={data.id}
                style={{
                  boxShadow: "5px 8px 15px 5px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Row gutter={24}>
                  <Col md={6} sm={9} lg={4} xl={3}>
                    <Image
                      width={"100%"}
                      src={data.image ? data.image.medium : ""}
                    />
                  </Col>
                  <Col md={18} sm={15} lg={20} xl={21}>
                    <h2>{data.name}</h2>
                    <Interweave content={data.summary} />
                    <Button
                      type="primary"
                      onClick={() => props.gotoShowDetails(data.id)}
                    >
                      Show Episode
                    </Button>
                  </Col>
                </Row>
              </Card>
            );
          })}
        {props.showData &&
          props.showData.length === 0 &&
          !props.loadingFlag && <h3>No data available</h3>}
      </Space>
    </div>
  );
}
