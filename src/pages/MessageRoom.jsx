import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL, api } from "../json-server/api";
import { io } from "socket.io-client";
import { SVG_chatDotFill } from "../components/SVG/SVG_cat_dot_fill";
const socketConnection = io(API_URL);
const api_url = process.env.REACT_APP_API;

export const MessageRoom = () => {
  const userSelector = useSelector((state) => state.auth);
  const [roomList, setRoomList] = useState([]);
  const nav = useNavigate();
  const [notification, setNotification] = useState(new Set());
  const fetchMessageRoom = async () => {
    try {
      const { data } = await api.get(`/message/chatroom/` + userSelector.id);
      setRoomList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem(`instagram-auth`)) return nav(`/login`);
    fetchMessageRoom();
    socketConnection.connect();
    socketConnection.on(`newMessage_${userSelector.id}`, (receiver) =>
      setNotification(new Set([...Array.from(notification), receiver]))
    );

    return () => {
      socketConnection.disconnect();
    };
  }, []);
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
          <Sidebar />
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
          {roomList.length &&
            roomList.map((room, idx) => (
              <Card
                style={{
                  maxWidth: "300px",
                  width: "100%",
                  paddingTop: "10px",
                }}
              >
                <Card.Header>Your Chat Room</Card.Header>
                <Card>
                  <a
                    href={`/message/${room?.user_receivers?.username}`}
                    className="d-flex align-items-center gap-2 px-2 py-2 position-relative"
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        src={
                          api_url +
                          `user/render_image?username=` +
                          room?.user_receivers?.username
                        }
                        alt={`avatar-` + room?.user_receivers?.username}
                        style={{
                          borderRadius: "50%",
                          aspectRatio: "1/1",
                          width: "32px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div>{room?.user_receivers?.username}</div>
                    <span
                      className="text-danger position-absolute"
                      style={{
                        right: "10px",
                        display: notification.has(room?.user_receiver_id)
                          ? "block"
                          : "none",
                      }}
                      onClick={() =>
                        notification.delete(room?.user_receiver_id)
                      }
                    >
                      <SVG_chatDotFill />
                    </span>
                  </a>
                </Card>
              </Card>
            ))}
        </Col>
      </Row>
      <div className="d-flex d-md-none position-sticky bottom-0 align-items-center justify-content-center bg-white vw-100">
        <Sidebar flexdir="flex-row" />
      </div>
    </>
  );
};
