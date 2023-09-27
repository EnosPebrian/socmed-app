import { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { api } from "../json-server/api";
import { CardPics } from "./Profile";
import Sidebar from "../components/Sidebar";
import InfiniteScroll from "react-infinite-scroll-component";


export const SearchPage = () => {
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [queryText, setQueryText] = useState("");
  const ref = useRef(1);

  const fetchPost = async (queryText, page) => {
    await api
      .get(`/post/q?limit=12&text=${queryText}&page=${page}`)
      .then((result) => {
        console.log(result);
        setPost(result.data.data);
        setPage(result.data.number_of_page);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPost(queryText, ref.current);
  }, []);
  useEffect(() => {
    const execute_search = setTimeout(
      () => fetchPost(queryText, ref.current),
      500
    );
    return () => clearTimeout(execute_search);
  }, [queryText]);

  return (
    <>
      <Row>
        <Col lg={2}>
          <Sidebar fetchPost={fetchPost} />
        </Col>
        <Col>
          <Container className="p-0 m-0">
            <Container style={{ maxWidth: "975px" }}>
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
              <Row className="p-0 m-0 d-flex" style={{ gap: "4px" }}>
                <InfiniteScroll
                  dataLength={12}
                  next={() => {
                    ref.current = ref.current + 1;
                    setTimeout(() => fetchPost(queryText, ref.current), 1000);
                  }}
                  hasMore={true}
                  loader={<h4>Loading...</h4>}
                >
                  {post && post.map((pics) => <CardPics {...pics} />)}
                </InfiniteScroll>
              </Row>
            </Container>
          </Container>
        </Col>
      </Row>
    </>
  );
};
