import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { api } from "../json-server/api";
import { useRef, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { CommentLine } from "./commentLine";
import { useNavigate } from "react-router-dom";

export const ModalViewComment = ({
  post,
  setShow,
  show,
  fetchComment,
  totalComments,
  totalLike,
  comments,
  page,
  userSelector,
  totalPage,
}) => {
  const [index, setIndex] = useState(0);
  const nav = useNavigate();
  const ref = useRef(page);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const handleClose = () => {
    setShow("");
  };

  const postComment = async (e) => {
    if (!userSelector?.id) {
      nav(`/login`);
    }
    if (!document.getElementById(`comment-modal-${post.id}`).value) return;
    await api
      .post(`/comment/${post.id}`, {
        comment: document.getElementById(`comment-modal-${post.id}`).value,
        user_id: Number(userSelector?.id),
        post_id: Number(post.id),
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    fetchComment(page);
    document.getElementById(`comment-modal-${post.id}`).value = "";
  };

  return (
    <Container>
      <Modal show={show === "ViewComment"} size="xl" onHide={handleClose}>
        <Row className="m-0">
          <Col lg={6} className="p-0">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item className="d-flex justify-content-center">
                <img
                  src={
                    "https://www.nature.com/immersive/d41586-021-00095-y/assets/3TP4N718ac/2021-01-xx_jan-iom_tree-of-life_sh-750x1000.jpeg"
                  }
                  style={{ maxHeight: "700px" }}
                />
              </Carousel.Item>
              {/* <Carousel.Item>
                <img src={post.image_url} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={post.image_url} />
              </Carousel.Item> */}
            </Carousel>
          </Col>
          <Col lg={6} className="p-0">
            <div className="d-flex align-items-center justify-content-between w-100 px-3 mt-3">
              <div className="d-flex align-items-center w-100">
                <div
                  className={`rounded-circle border border-secondary`}
                  style={{ maxHeight: "41px", aspectRatio: "1/1" }}
                >
                  <div>
                    <img
                      src={post.user.image_url}
                      alt="question mark"
                      width={"32px"}
                    />
                  </div>
                </div>
                <div className="mx-3">
                  <b>{post.user.username}</b>
                </div>
              </div>
              <div style={{ float: "right" }}>
                <img
                  src={"https://img.icons8.com/?size=1x&id=61873&format=png"}
                  alt="three dots - more symbol"
                />
              </div>
            </div>
            <hr />
            <div
              style={{ maxHeight: "600px", overflowY: "auto" }}
              className="hideScroll"
            >
              {comments.map((comment, index) => (
                <CommentLine comment={comment} index={index} />
              ))}
            </div>
            <div className="d-flex justify-content-center">
              {ref.current <= totalPage ? (
                <span
                  type="button"
                  onClick={() => {
                    ref.current = ref.current + 1;
                    fetchComment(ref.current);
                  }}
                >
                  Load more content
                </span>
              ) : null}
            </div>
            <div>
              <form className="d-flex justify-content-between px-3">
                <input
                  type="text"
                  id={`comment-modal-${post.id}`}
                  placeholder="Add a comment..."
                  style={{ width: "100%" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      document
                        .getElementById(`button-modal-${post.id}`)
                        .click();
                      e.preventDefault();
                    }
                  }}
                />
                <Button
                  id={`button-modal-${post.id}`}
                  onClick={(e) => postComment(e)}
                  variant="light"
                  className="text"
                >
                  Submit
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Modal>
    </Container>
  );
};
