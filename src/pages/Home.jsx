import { useSelector } from "react-redux";
import { SVGinstagram } from "../components/SVG/SVG_Instagram";
import { Col, Container, Row } from "react-bootstrap";
import FetchStory from "../components/FetchStory";
import PostsCardHome from "../components/PostsCardHome";
import Sidebar from "../components/Sidebar";
import "../components/style.css";
import { useEffect, useRef, useState } from "react";
import { api } from "../json-server/api";
import InfiniteScroll from "react-infinite-scroll-component";

export const Home = () => {
  const userSelector = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [queryText, setQueryText] = useState("");
  const ref = useRef(1);
  const totalData = useRef(0);
  const limit = 5;
  const fetchPosts = async (queryString = "") => {
    await api
      .get(`/post/q?limit=${limit}&text=${queryText}&page=${ref.current}`)
      .then((result) => {
        setPage(result.data.number_of_page);
        setPosts(result.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchPosts(queryText);
  }, []);

  const handleNext = () => {
    ref.current += 1;
    totalData.current += 5;
    setTimeout(() => fetchPosts(queryText), 1000);
  };

  return (
    <>
      <Row
        className="flex-nowrap d-flex justify-content-center"
        style={{ maxWidth: "99vw", margin: "0" }}
      >
        <Col
          md={`auto`}
          lg={`auto`}
          xl={`auto`}
          xxl={2}
          className="border-end border-secondary-subtle vh-100 d-none d-md-block d-lg-block d-xl-block d-xxl-block"
          style={{ position: "sticky", top: "0", padding: "0", margin: "0" }}
        >
          <Sidebar fetchPosts={fetchPosts} />
        </Col>
        <Col
          xxl={10}
          xl={11}
          lg={11}
          md={11}
          style={{ padding: "0", display: "flex", justifyContent: "center" }}
        >
          <Container className="p-0" style={{ maxWidth: "975px" }}>
            <Container
              style={{
                position: "sticky",
                top: "0px",
                backgroundColor: "white",
                zIndex: 2,
              }}
            >
              <div className="d-flex d-md-none justify-content-around align-items-center mt-3">
                <div>
                  <SVGinstagram />
                </div>
                <div className="d-flex flex-row" style={{ gap: "20px" }}>
                  <a>
                    <img
                      src="https://img.icons8.com/?size=1x&id=FFls4U4qS13I&format=png"
                      alt="plus logo"
                      style={{ maxWidth: "24px" }}
                    />
                  </a>
                  <a>
                    <img
                      src="https://img.icons8.com/?size=1x&id=lFyaayFdhpED&format=gif"
                      alt="plus logo"
                      style={{ maxWidth: "24px" }}
                    />
                  </a>
                  <a>
                    <img
                      src="https://img.icons8.com/?size=512&id=20202&format=png"
                      alt="messanger logo"
                      style={{ maxWidth: "24px" }}
                    />
                  </a>
                </div>
              </div>
            </Container>
            <Container
              id="story-container"
              className="d-flex flex-row my-3 p-0 ml-2"
              style={{
                gap: "10px",
                overflowX: "scroll",
                maxWidth: "630px",
              }}
            >
              <FetchStory />
            </Container>
            <Container className="p-0">
              <InfiniteScroll
                dataLength={posts.length} //This is important field to render the next data
                next={handleNext}
                hasMore={totalData.current < posts.length}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {posts.map((post, index) => (
                  <PostsCardHome
                    post={post}
                    index={index}
                    fetchPosts={fetchPosts}
                  />
                ))}
              </InfiniteScroll>
            </Container>
            <Container
              style={{
                position: "sticky",
                bottom: "0",
                backgroundColor: "white",
              }}
            ></Container>
          </Container>
        </Col>
      </Row>
      <div className="d-flex d-md-none position-sticky bottom-0 align-items-center justify-content-center bg-white vw-100">
        <Sidebar flexdir="flex-row" />
      </div>
    </>
  );
};
