import { Button, Spin } from "antd";
import Search from "antd/lib/input/Search";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ShowApiRepository } from "../services/show/ShowApiRepository";
import ShowsList from "../components/ShowsList";

interface Props {
  showData: any[];
  loadingFlag: boolean;
  onFetchShows: any;
  onSearchShow: any;
  history: any;
}

interface State {
  pageNo: number;
  query: string;
}

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pageNo: 0,
      query: "",
    };
  }

  componentDidMount = async () => {
    window.addEventListener("scroll", this.loadMoreShows, true);
    if (this.props.showData.length === 0 && this.state.query == "") {
      await this.fetchShows();
    }
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMoreShows, true);
  }

  loadMoreShows = () => {
    // @ts-ignore
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.scrollingElement!.scrollHeight &&
      this.state.query == ""
    ) {
      // Do load more content here!
      this.setState(
        {
          pageNo: this.state.pageNo + 1,
        },
        () => {
          this.fetchShows();
        }
      );
    }
  };

  fetchShows = async () => {
    let { pageNo } = this.state;
    await this.props.onFetchShows(pageNo);
  };

  searchShow = async () => {
    let { query } = this.state;
    if (query !== "") {
      this.props.onSearchShow(query);
    } else {
      this.setState(
        {
          pageNo: 0,
        },
        () => {
          this.props.onSearchShow(query);
        }
      );
    }
  };

  clearSearch = async () => {
    this.setState(
      {
        pageNo: 0,
        query: "",
      },
      () => {
        this.props.onSearchShow("");
      }
    );
  };

  gotoShowDetails = (id: string) => {
    this.props.history.push(`/show-details/${id}`);
  };

  render() {
    let { showData, loadingFlag } = this.props;
    return (
      <div>
        <Search
          onChange={(e: any) => {
            this.setState({ query: e.target.value });
          }}
          value={this.state.query}
          placeholder="Search Shows"
          enterButton="Search"
          style={{ marginBottom: "24px" }}
          size={"large"}
          onSearch={this.searchShow}
          onPressEnter={this.searchShow}
          addonAfter={
            <Button size={"large"} onClick={this.clearSearch}>
              Clear
            </Button>
          }
        />
        {showData && showData.length >= 0 && (
          <ShowsList
            showData={showData}
            loadingFlag={loadingFlag}
            gotoShowDetails={(id: any) => this.gotoShowDetails(id)}
          />
        )}
        {loadingFlag && (
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
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  showData: state.showReducer.showData,
  loadingFlag: state.showReducer.loadingFlag,
});

const mapDispatchToProps = (dispatch: any) => ({
  onFetchShows: (pageNo: number) =>
    dispatch(ShowApiRepository.fetchShows(pageNo)),
  onSearchShow: (query: string) =>
    dispatch(ShowApiRepository.searchShow(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
