import { Button, div } from "react-bootstrap";
import { useSelector } from "react-redux";
import { api } from "../json-server/api";
import { useNavigate } from "react-router-dom";
import { ModalViewComment } from "./ModalViewComment";
import { useEffect, useRef, useState } from "react";
import { SVG_Heart, SVG_Heart_Fill } from "./SVG/SVG_heart";
const avatar_url = process.env.REACT_APP_API_IMAGE_POST_URL;

export default function PostsCardHome({ post, index, fetchPosts }) {
  const nav = useNavigate();
  const [show, setShow] = useState("");
  const [comments, setComments] = useState([]);
  const ref = useRef(1);
  const [like, setLike] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [totalLike, setTotalLike] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const userSelector = useSelector((state) => state.auth);
  const fetchComment = async (page = 0) => {
    await api.get(`/comment/${post.id}?page=${page}`).then((result) => {
      setComments(result.data.data);
      setTotalComments(result.data.total_comments);
      setTotalPage(result.data.number_of_page);
    });
  };
  const postComment = async (e) => {
    if (!userSelector?.id) {
      return nav(`/login`);
    }
    if (!document.getElementById(`comment-${post.id}`).value) return;
    await api
      .post(`/comment/${post.id}`, {
        comment: document.getElementById(`comment-${post.id}`).value,
        user_id: Number(userSelector?.id),
        post_id: Number(post.id),
      })
      // .then((result) => console.log(result))
      .catch((err) => console.log(err));
    fetchComment(ref.current);
    document.getElementById(`comment-${post.id}`).value = "";
  };
  const handlelike = async () => {
    if (!userSelector?.id) return nav(`/login`);
    await api
      .post(`/like/${post.id}`, { user_id: userSelector?.id })
      .then((result) => setLike(result.data.result));
  };
  const islike = async () => {
    await api
      .get(`/like/${post.id}?user_id=${userSelector?.id}`)
      .then((result) => setLike(result.data.result));
    await api.get;
  };

  useEffect(() => {
    fetchComment(1);
  }, []);
  useEffect(() => {
    islike();
  }, [userSelector.id]);

  return (
    <div style={{ maxWidth: "470px" }} key={index} className="d-flex">
      <div className="my-2 border-bottom border-secondary-subtle py-3">
        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
          <div className="d-flex align-items-center w-100">
            <div
              className={`rounded-circle border border-secondary`}
              style={{ maxHeight: "41px", aspectRatio: "1/1" }}
            >
              <div>
                <img
                  src={post.user.image_url}
                  alt=""
                  width="32px"
                  style={{ borderRadius: "50%" }}
                  // alt={`avatar-${post.user.username}`}
                />
              </div>
            </div>
            <div className="ml-2 d-flex flex-column">
              <div>
                <b>{post.user.username}</b>
              </div>
              <div>{post.user.bio}</div>
            </div>
          </div>
          <div style={{ float: "right" }}>
            <img
              src={"https://img.icons8.com/?size=1x&id=61873&format=png"}
              alt="three dots - more symbol"
            />
          </div>
        </div>
        <div>
          <img src={avatar_url + post.image_url} style={{ maxWidth: "100%" }} />
        </div>
        <div className="d-flex ml-3 my-1 mt-2" style={{ gap: "10px" }}>
          <span onClick={handlelike} className="d-flex">
            {like ? (
              <span type="button" className="text-danger">
                <SVG_Heart_Fill />
              </span>
            ) : (
              <span type="button">
                <SVG_Heart />
              </span>
            )}
          </span>
          <img
            src="https://img.icons8.com/?size=1x&id=143&format=png"
            alt="comments icon"
            width={"24px"}
          />
          <img
            src="https://img.icons8.com/?size=512&id=2837&format=png"
            alt="paper plane icon"
            width={"24px"}
          />
        </div>
        <div className="mr-3 my-1">
          Liked by <b>{`aneh`}</b> and <b>{`10,000`} others</b>
        </div>
        <div className="mr-3 my-1">
          <b>{post?.user?.username}</b>
          {"  "}
          <span className="mr-1">{post.caption}</span>
        </div>
        {totalComments ? (
          <div
            className="mr-3 my-1 text-secondary"
            type="button"
            onClick={() => setShow("ViewComment")}
          >
            View all {totalComments} comments
          </div>
        ) : null}
        <ModalViewComment
          post={post}
          setShow={setShow}
          show={show}
          fetchComment={fetchComment}
          totalComments={totalComments}
          totalLike={totalLike}
          comments={comments}
          userSelector={userSelector}
          page={ref.current}
          totalPage={totalPage}
        />
        <div>
          <form>
            <input
              type="text"
              id={`comment-${post.id}`}
              placeholder="Add a comment..."
              style={{ width: "100%" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  document.getElementById(`button-${post.id}`).click();
                  e.preventDefault();
                }
              }}
            />
            <Button
              id={`button-${post.id}`}
              hidden
              onClick={(e) => postComment(e)}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
