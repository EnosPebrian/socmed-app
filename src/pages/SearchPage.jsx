import { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { api } from "../json-server/api";
import { CardPics } from "./Profile";
import Sidebar from "../components/Sidebar";
import InfiniteScroll from "react-infinite-scroll-component";
import logo from "../asset/RepligramLogo.png";

export const SearchPage = () => {
  const [post, setPost] = useState([]);
  const [queryText, setQueryText] = useState("");
  const limit = 9;
  const ref = useRef(1);
  const totalPost = useRef(limit);

  const fetchPost = async (queryText) => {
    await api
      .get(`/post/q?limit=${limit}&text=${queryText}&page=${ref.current}`)
      .then((result) => {
        setPost(result.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    ref.current = 1;
    totalPost.current = 0;
    const execute_search = setTimeout(
      () => fetchPost(queryText, ref.current),
      500
    );
    return () => clearTimeout(execute_search);
  }, [queryText]);

  console.log(totalPost.current, post.length);

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
          <Sidebar fetchPosts={fetchPost} />
        </Col>
        <Col
          xxl={10}
          xl={11}
          lg={11}
          md={11}
          style={{
            padding: "0",
            display: "flex",
            justifyContent: "center",
            minHeight: "95vh",
          }}
        >
          <Container style={{ maxWidth: "975px" }}>
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
                  <img src={logo} style={{ maxHeight: "50px" }} />
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
            <Form>
              <Form.Group className="mb-3" controlId="search_page_form">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  name="search_page_search_box"
                  placeholder="any name or words"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setQueryText(e.target.value);
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => setQueryText(e.target.value)}
                />
              </Form.Group>
            </Form>
            <InfiniteScroll
              dataLength={post.length}
              next={() => {
                ref.current += 1;
                totalPost.current += limit;
                setTimeout(() => fetchPost(queryText), 500);
              }}
              hasMore={totalPost.current < post.length}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "4px",
              }}
            >
              {post.length
                ? post.map((pics, index) => (
                    <CardPics {...pics} index={index} />
                  ))
                : null}
            </InfiniteScroll>
          </Container>
        </Col>
      </Row>
      <div className="d-flex d-md-none position-sticky bottom-0 align-items-center justify-content-center bg-white vw-100">
        <Sidebar flexdir="flex-row" />
      </div>
    </>
  );
};
