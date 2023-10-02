import { Button, Col, Container, Row } from "react-bootstrap";
import { topnav } from "../components/SVG/SVGReels and photo";
import { useEffect, useRef, useState } from "react";
import { api } from "../json-server/api";
import { useDispatch, useSelector } from "react-redux";
import FetchStory from "../components/FetchStory";
import Sidebar from "../components/Sidebar";
import { SVG_setting } from "../components/SVG/SVG_setting";
import { ModalEditProfile } from "../components/ModalEditProfile";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ModalViewComment } from "../components/ModalViewComment";
import { userLogout } from "../redux/middleware/auth-middleware";
import { useToast } from "@chakra-ui/react";

import logo from "../asset/RepligramLogo.png";

const avatar_url = process.env.REACT_APP_API_IMAGE_AVATAR_URL;
const post_url = process.env.REACT_APP_API_IMAGE_POST_URL;
const api_url = process.env.REACT_APP_API;

export const CardPics = (props) => {
  const [show, setShow] = useState("");

  return (
    <div
      className="p-0 m-0"
      key={`cardpics-` + props.index}
      onClick={() => setShow("ViewComment")}
      type="button"
    >
      <ModalViewComment post={props} show={show} setShow={setShow} />
      <img
        src={post_url + props?.image_url}
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
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { username } = useParams();
  const [post, setPost] = useState([]);
  const userSelector = useSelector((state) => state.auth);
  const page = useRef(1);
  const totaldata = useRef(0);
  const limit = 9;
  const [account, setAccount] = useState({});
  const [showModal, setShowModal] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isFollow, setIsFollow] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const toast = useToast();

  const fetchPost = async () => {
    await api
      .get(`/post/profile/${username}?limit=${limit}&page=${page.current}`)
      .then((result) => {
        setPost(result.data.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchUser = async () => {
    try {
      const { data } = await api.get(`/user/username/` + username);
      setAccount(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFollow = async () => {
    try {
      const { data } = await api.get(
        `/follow/${account.id}?user_id=${userSelector.id}`
      );
      setIsFollow(data.isFollow);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFolow = async () => {
    try {
      if (!localStorage.getItem("instagram-auth")) return nav(`/login`);
      const { data } = await api.post(
        `/follow/${account.id}?user_id=${userSelector.id}`
      );
      setIsFollow(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const resendVerifLink = () => {
    api
      .post(`/user/resend_verification_link/${userSelector.id}`, {})
      .then(() =>
        toast({
          title: "success",
          description: "a new verification email has been sent",
          duration: 3000,
          isClosable: true,
          status: "success",
        })
      )
      .catch((err) => console.log(err?.message));
  };

  useEffect(() => {
    if (account.id) fetchFollow();
  }, [account.id]);

  useEffect(() => {
    fetchUser();
    setAvatar(`${api_url}user/render_image?username=${username}`);
    fetchPost();
  }, []);
  return (
    <>
      <ModalEditProfile
        setShowModal={setShowModal}
        show={showModal}
        setAvatar={setAvatar}
      />
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
          <Container style={{ maxWidth: "975px", padding: "0" }}>
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
                        src={avatar}
                        style={{
                          maxWidth: "140px",
                          width: "140px",
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
                    {userSelector?.username === username ? (
                      <>
                        <Button
                          variant="secondary"
                          onClick={() => setShowModal("OpenModalEditProfile")}
                          style={{ fontSize: "calc(10px + 0.2vw)" }}
                        >
                          Edit Profile
                        </Button>
                        <Button
                          variant="secondary"
                          style={{ fontSize: "calc(10px + 0.2vw)" }}
                        >
                          View Archive
                        </Button>
                        <div
                          type="button"
                          onClick={() => setShowSetting(!showSetting)}
                          className="position-relative"
                        >
                          <SVG_setting />
                          {showSetting ? (
                            <div
                              className="position-absolute bg-white d-flex flex-column p-2 gap-2"
                              style={{ right: "0px" }}
                            >
                              <div
                                onClick={() => {
                                  dispatch(userLogout());
                                  return nav(`/home`);
                                }}
                                className="rounded-pill border border-dark"
                                style={{ width: "100px", padding: "0 4px" }}
                              >
                                Log out
                              </div>
                              {userSelector.is_verified ? null : (
                                <div
                                  className="px-1 rounded-pill border border-dark"
                                  type="button"
                                  onClick={resendVerifLink}
                                >
                                  Verify
                                </div>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </>
                    ) : (
                      <>
                        <Button variant="secondary" onClick={handleFolow}>
                          {isFollow ? "Unfollow" : "Follow"}
                        </Button>
                        <Button variant="secondary">
                          <a href={`/message/${username}`}>Send Message</a>
                        </Button>
                      </>
                    )}
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
                dataLength={post.length} //This is important field to render the next data
                next={() => {
                  page.current = page.current + 1;
                  totaldata.current += limit;
                  fetchPost();
                }}
                hasMore={totaldata.current < post.length}
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
        </Col>
      </Row>
      <div className="d-flex d-md-none position-sticky bottom-0 align-items-center justify-content-center bg-white vw-100">
        <Sidebar flexdir="flex-row" />
      </div>
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
