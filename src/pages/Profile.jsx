import { Col, Container, Row } from "react-bootstrap";
import { image, topnav } from "../components/SVGReels and photo";
import { useEffect, useState } from "react";
import { api } from "../json-server/api";
import { useSelector } from "react-redux";
import FetchStory from "../components/FetchStory";

export default function Profile() {
  const [post, setPost] = useState([]);
  const userSelector = useSelector((state) => state.auth);
  const [offset, setOffset] = useState(0);

  const fetchPost = async (offset) => {
    await api
      .get(`/post/profile/${userSelector.id}?offset=${offset}`)
      .then((result) => setPost(result.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPost(offset);
  }, []);
  useEffect(() => {
    fetchPost(offset);
  }, [userSelector.id]);
  return (
    <>
      <Row>
        <Col lg={2}></Col>
        <Col>
          <Container className="p-0 m-0">
            <Container style={{ maxWidth: "975px" }}>
              <Row>
                <Col md={2} lg={4}></Col>
                <Col></Col>
              </Row>
              <div
                id="story-container"
                className="d-flex flex-row my-3 p-0"
                style={{
                  gap: "10px",
                  overflowX: "scroll",
                  maxWidth: "975px",
                }}
              >
                <FetchStory />
              </div>
              <div
                id="posts-reels-tags-container"
                className="w-100 d-flex justify-content-around"
                style={{ height: "52px" }}
              >
                {topnav.map((item) => (
                  <Option {...item}></Option>
                ))}
              </div>
              <Row className="p-0 m-0" style={{ gap: "4px" }}>
                {post.map((pics) => (
                  <FetchPics {...pics} />
                ))}
              </Row>
            </Container>
          </Container>
        </Col>
      </Row>
    </>
  );
}

function Option(props) {
  return (
    <a
      className="d-flex align-items-center posts-reels-tags"
      style={{ height: "100%" }}
    >
      {props.svg}
      <span className="opt1">{props.option}</span>
    </a>
  );
}

function FetchPics(props) {
  return (
    <Col
      xs={4}
      className="p-0 m-0 d-flex"
      style={{ gap: "4px", aspectRatio: "1/1" }}
    >
      <img src={props.image_url} alt={props.caption} width={"100%"} />
    </Col>
  );
}
