import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { SVG_message } from "../components/SVG/SVG_message";
import { SVGinstagram } from "../components/SVG/SVG_Instagram";

export const Message = () => {
  const userSelector = useSelector((state) => state.auth);
  const { username } = useParams();
  const fetchMessage = () => {};

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
          <Container>
            <div
              className="d-grid"
              style={{
                gridTemplateRows: "auto auto 1fr auto",
                height: "98vh",
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
              <div className="d-none d-md-flex"></div>
              <div>Header</div>
              <div>Shalom</div>
              <Row
                className="w-100 sticky-bottom mb-2 m-0"
                style={{ maxHeight: "2vh" }}
              >
                <Col className="border border-secondary-subtle rounded-pill">
                  <input
                    type="text"
                    id="chat-input"
                    placeholder="..."
                    className="w-100"
                  />
                </Col>
                <Col xs={`auto`} className="p-0">
                  <Button>
                    <SVG_message />
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
};
