import { useSelector } from "react-redux";
import { SVGinstagram } from "../components/SVG_Instagram";
import { Container } from "react-bootstrap";
import FetchStory from "../components/FetchStory";
import FetchPosts from "../components/FetchPosts";
import Sidebar from "../components/Sidebar";
import "../components/style.css";

export const Home = () => {
  const userSelector = useSelector((state) => state.auth);
  return (
    <>
      <Container className="p-0" style={{ maxWidth: "630px" }}>
        <Container
          style={{
            position: "sticky",
            top: "0px",
            backgroundColor: "white",
            zIndex: 2,
          }}
        >
          <div className="d-flex justify-content-around align-items-center mt-3">
            <SVGinstagram />
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
        <Container className="p-0 d-flex justify-content-center">
          <FetchPosts />
        </Container>
        <Container
          style={{ position: "sticky", bottom: "0", backgroundColor: "white" }}
        >
          <Sidebar />
        </Container>
      </Container>
    </>
  );
};
