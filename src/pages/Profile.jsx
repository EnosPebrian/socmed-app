import { Button, Col, Container, Row } from "react-bootstrap";
import { topnav } from "../components/SVG/SVGReels and photo";
import { useEffect, useRef, useState } from "react";
import { api } from "../json-server/api";
import { useSelector } from "react-redux";
import FetchStory from "../components/FetchStory";
import Sidebar from "../components/Sidebar";
import { SVG_setting } from "../components/SVG/SVG_setting";
import { ModalEditProfile } from "../components/ModalEditProfile";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
const avatar_url = process.env.REACT_APP_API_IMAGE_POST_URL;

export const CardPics = (props) => {
  return (
    <div className="p-0 m-0">
      <img
        src={avatar_url + props.image_url}
        alt={props.caption}
        style={{
          aspectRatio: "1/1",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export const Profile = () => {
  const { username } = useParams();
  const [post, setPost] = useState([]);
  const userSelector = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const ref = useRef(1);
  const [showModal, setShowModal] = useState("");

  const fetchPost = async (page) => {
    await api
      .get(`/post/profile/${username}?page=${page}`)
      .then((result) => {
        setPost(result.data.data);
        setPage(result.data.number_of_page);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPost(ref.current);
  }, []);
  useEffect(() => {
    fetchPost(ref.current);
  }, [userSelector.id]);
  return (
    <>
      <ModalEditProfile setShowModal={setShowModal} show={showModal} />
      <Row className="flex-nowrap m-0">
        <Col
          md={1}
          lg={1}
          xl={1}
          xxl={2}
          className="border-end border-secondary-subtle vh-100 d-none d-md-block d-lg-block d-xl-block d-xxl-block"
          style={{ position: "sticky", top: "0", padding: "0 0 0 10px" }}
        >
          <Sidebar fetchPosts={fetchPost} />
        </Col>
        <Col
          xxl={10}
          xl={11}
          lg={11}
          md={11}
          style={{ padding: "0", display: "flex", justifyContent: "center" }}
        >
          <Container
            style={{
              padding: "0",
              margin: "0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Container style={{ maxWidth: "975px", padding: "0" }}>
              <div className="my-4">
                <Row style={{ margin: "0" }}>
                  <Col
                    md={3}
                    lg={4}
                    className="d-flex justify-content-center p-0"
                  >
                    <div
                      className="d-flex justify-content-center align-items-center border border-seconndary"
                      style={{
                        borderRadius: "100%",
                        maxWidth: "150px",
                        aspectRatio: "1/1",
                      }}
                    >
                      <div>
                        <img
                          id="avatarImage"
                          src={`http://localhost:2000/user/render_image?username=${username}`}
                          style={{
                            maxWidth: "140px",
                            aspectRatio: "1/1",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div
                      className="d-flex align-items-center"
                      style={{ height: "40px", gap: "10px" }}
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{ height: "40px" }}
                      >
                        {userSelector?.username}
                      </div>
                      <Button
                        variant="secondary"
                        onClick={() => setShowModal("OpenModalEditProfile")}
                      >
                        Edit Profile
                      </Button>
                      <Button variant="secondary">View Archive</Button>
                      <div>
                        <SVG_setting />
                      </div>
                    </div>
                    <div className="d-flex" style={{ gap: "15px" }}>
                      <div className="d-flex">
                        <span>6 </span>
                        <span style={{ marginLeft: "4px" }}>posts</span>
                      </div>
                      <div className="d-flex">
                        <span>11</span>
                        <span style={{ marginLeft: "4px" }}>followers</span>
                      </div>
                      <div className="d-flex">
                        <span>121</span>
                        <span style={{ marginLeft: "4px" }}>following</span>
                      </div>
                    </div>
                    <div className="mt-3">Satu persatu tapi pasti</div>
                    <div>Growing gradually</div>
                  </Col>
                </Row>
              </div>
              <div
                id="story-container"
                className="d-flex flex-row my-3 p-0"
                style={{
                  gap: "30px",
                  overflowX: "scroll",
                  maxWidth: "100%",
                }}
              >
                <FetchStory />
              </div>
              <div
                id="posts-reels-tags-container"
                className="d-flex justify-content-center"
                style={{ height: "52px", gap: "20px" }}
              >
                {topnav.map((item) => (
                  <Option {...item}></Option>
                ))}
              </div>
              <div>
                <InfiniteScroll
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "4px",
                    justifyItems: "center",
                  }}
                  dataLength={12} //This is important field to render the next data
                  next={() => {
                    ref.current = ref.current + 1;
                    fetchPost(ref.current);
                  }}
                  hasMore={ref.current <= page}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  {post.map((pics) => (
                    <CardPics {...pics} />
                  ))}
                </InfiniteScroll>
              </div>
            </Container>
          </Container>
        </Col>
      </Row>
    </>
  );
};

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
