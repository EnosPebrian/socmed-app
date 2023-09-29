import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { SVG_message } from "../components/SVG/SVG_message";
import { SVGinstagram } from "../components/SVG/SVG_Instagram";
import { useEffect, useRef, useState } from "react";
import { API_URL, api } from "../json-server/api";
import { io } from "socket.io-client";
const socketConnection = io(API_URL);
const api_url = process.env.REACT_APP_API;

export const Message = () => {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const page = useRef(1);
  const { username } = useParams();
  const [this_user, setThis_user] = useState({});
  const [messages, setMessages] = useState([]);

  const fetchMessage = async (userid) => {
    try {
      const { data } = await api.get(`/message`, {
        params: {
          sender: userSelector.id,
          receiver: userid,
          page: page.current,
        },
      });
      setMessages(data);
      const chatroom = [userSelector.id, userid].sort((a, b) => a - b);
      socketConnection.on(`chatroom_` + chatroom, (new_message) => {
        setMessages((oldstate) => [new_message, ...oldstate]);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUserReceiver = async () => {
    try {
      const { data } = await api.get(`/user/username/` + username);
      setThis_user(data);
      fetchMessage(data.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendMessage = async () => {
    const message = document.getElementById("chat-input").value;
    try {
      if (!message) return;
      await api.post(
        `message/new_message`,
        { message },
        { params: { sender: userSelector.id, receiver: this_user.id } }
      );

      document.getElementById("chat-input").value = "";
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem(`instagram-auth`)) nav(`/login`);
    socketConnection.connect();
    fetchUserReceiver();

    return () => {
      socketConnection.disconnect();
    };
  }, [localStorage.getItem(`instagram-auth`)]);

  return (
    <>
      <Row
        className="flex-nowrap d-flex justify-content-center"
        style={{ maxWidth: "100vw", margin: "0" }}
      >
        <Col
          md={`auto`}
          lg={`auto`}
          xl={`auto`}
          xxl={2}
          className="border-end border-secondary-subtle vh-100 d-none d-md-block d-lg-block d-xl-block d-xxl-block"
          style={{ position: "sticky", top: "0", padding: "0", margin: "0" }}
        >
          <Sidebar />
        </Col>
        <Col
          xxl={10}
          xl={11}
          lg={11}
          md={11}
          style={{ padding: "0", display: "flex", justifyContent: "center" }}
        >
          <div
            className="d-grid"
            style={{
              gridTemplateRows: "auto auto 1fr auto",
              height: "98vh",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <div className="d-flex d-md-none justify-content-around align-items-center mt-2">
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
            <div className="d-none d-md-flex"></div>
            <div className="d-flex align-items-center gap-2 bg-secondary-subtle py-1">
              <span>
                <img
                  src={`${api_url}user/render_image?username=${username}`}
                  style={{
                    maxWidth: "24px",
                    borderRadius: "50%",
                    aspectRatio: "1/1",
                  }}
                />
              </span>
              <span>{this_user?.username}</span>
            </div>
            <div className="d-flex flex-column-reverse gap-1 position-relative overflow-y-scroll p-2">
              {messages.length
                ? messages.map((message, index) => (
                    <div
                      className={
                        userSelector.id === message.user_sender_id
                          ? "px-3 py-1 border border-secondary rounded-pill text-end bg-primary-subtle text-break float-end position-relative"
                          : "px-3 py-1 border border-secondary rounded-pill text-start bg-success-subtle text-break float-start position-relative"
                      }
                      style={{
                        maxWidth: "65%",
                        marginLeft:
                          userSelector.id === message.user_sender_id
                            ? `auto`
                            : null,
                        marginRight:
                          userSelector.id === message.user_sender_id
                            ? null
                            : `auto`,
                      }}
                    >
                      <p className="m-0">{message.message}</p>
                    </div>
                  ))
                : null}
            </div>
            <Row
              className="w-100 sticky-bottom mx-0"
              style={{ maxHeight: "2vh" }}
            >
              <Col className="border border-secondary-subtle rounded-pill">
                <input
                  type="text"
                  id="chat-input"
                  placeholder="..."
                  className="w-100 px-3"
                />
              </Col>
              <Col xs={`auto`} className="p-0">
                <Button onClick={handleSendMessage}>
                  <SVG_message />
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};
