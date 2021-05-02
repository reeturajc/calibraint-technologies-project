import { Button, Card, Col, Image, Row, Select, Space, Spin } from "antd";
import { Option } from "antd/lib/mentions";
import Interweave from "interweave";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ShowApiRepository } from "../services/show/ShowApiRepository";
import { LeftOutlined } from "@ant-design/icons";

interface Props {
  onFetchSingleShow: any;
  match: any;
  history: any;
}

interface State {
  data: any;
  seasons: any[];
  episodes: any[];
  selectedEpisodes: any[];
}

class ShowDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
      seasons: [],
      episodes: [],
      selectedEpisodes: [],
    };
  }

  componentDidMount = async () => {
    const showId = this.props.match.params.id;
    const data = await this.props.onFetchSingleShow(showId);
    this.setState({
      data,
      seasons: data._embedded.seasons,
      episodes: data._embedded.episodes,
      selectedEpisodes: [],
    });
    this.handleSeasonChange(1);
  };

  handleSeasonChange = (e: any) => {
    let selectedEpisodes = this.state.episodes.filter((data) => {
      if (data.season == e) {
        return data;
      }
    });
    this.setState({
      selectedEpisodes,
    });
    console.log(selectedEpisodes);
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    let { data } = this.state;
    return (
      <>
        {data && (
          <Row gutter={24}>
            <Col md={24} style={{ marginBottom: "24px" }}>
              <Button icon={<LeftOutlined />} onClick={this.handleBack}>
                Back
              </Button>
            </Col>
            <Col md={12}>
              <h1>{data.name}</h1>
              <Interweave content={data.summary} />
              <Image
                width={"100%"}
                src={data.image ? data.image.original : ""}
              />
            </Col>
            <Col md={12}>
              <Select
                style={{ width: "100%", marginBottom: "24px" }}
                onChange={this.handleSeasonChange}
                placeholder={"Select Season"}
                defaultValue={1}
              >
                {this.state.seasons.map((season: any) => (
                  <Option
                    key={season.id}
                    value={season.number}
                  >{`Season ${season.number}`}</Option>
                ))}
              </Select>
              <Space direction="vertical" size="large">
                {this.state.selectedEpisodes.map((episode: any) => (
                  <Card
                    key={episode.id}
                    style={{
                      width: "100%",
                      boxShadow: "5px 8px 15px 5px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <p style={{ lineHeight: "90%" }}>
                      <b>Episode : {episode.number}</b>
                    </p>
                    <p style={{ lineHeight: "90%" }}>
                      <b>Name : {episode.name}</b>
                    </p>
                    <p style={{ lineHeight: "90%" }}>
                      <b>Total Duration : {episode.runtime} minutes</b>
                    </p>
                    <p style={{ lineHeight: "90%" }}>
                      <b>Release Date : {episode.airdate}</b>
                    </p>
                  </Card>
                ))}
              </Space>
            </Col>
          </Row>
        )}
        {!data && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "50px",
            }}
          >
            <Spin size="large" />
          </div>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onFetchSingleShow: (id: number) =>
    dispatch(ShowApiRepository.fetchSingleShow(id)),
});

export default connect(null, mapDispatchToProps)(ShowDetails);
