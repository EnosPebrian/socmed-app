import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { async } from "q";
import { API_URL, api } from "../json-server/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const api_url = process.env.REACT_APP_API;

export const MessageRoom = () => {
  const userSelector = useSelector((state) => state.auth);
  const [roomList, setRoomList] = useState([]);
  const nav = useNavigate();
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
                  <div className="d-flex align-items-center gap-2 px-2 py-2">
                    <a href={`/message/${room?.user_receivers?.username}`}>
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
                    </a>
                    <a href={`/message/${room?.user_receivers?.username}`}>
                      {room?.user_receivers?.username}
                    </a>
                  </div>
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
