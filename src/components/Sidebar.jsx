import { useEffect, useState } from "react";
import { ModalNewPost } from "./ModalNewPost";
import { SVGinstagram } from "./SVG/SVG_Instagram";
import { SVG_logoInstagram } from "./SVG/SVG_logo_Instagram";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SVG_message } from "./SVG/SVG_message";
import { API_URL, api } from "../json-server/api";
import { io } from "socket.io-client";
import { SVG_chatDotFill } from "./SVG/SVG_cat_dot_fill";
import { SVG_compass } from "./SVG/SVG_compass";
const socketConnection = io(API_URL);
const api_url = process.env.REACT_APP_API;

export default function Sidebar({ fetchPosts, flexdir = "flex-column" }) {
  const [showModal, setShowModal] = useState("");
  const [notification, setNotification] = useState(false);
  const nav = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");
  const userSelector = useSelector((state) => state.auth);
  const api_url = process.env.REACT_APP_API;

  const fetchAccount = async () => {
    const { data } = await api.get("/user?name=" + search);
    setAccounts(data);
  };

  useEffect(() => {
    socketConnection.connect();
    socketConnection.on(
      socketConnection.on(`newMessage_${userSelector.id}`, (receiver) =>
        setNotification(true)
      )
    );

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  useEffect(() => {
    const getData = setTimeout(() => fetchAccount(), 500);

    return () => clearTimeout(getData);
  }, [search]);

  return (
    <>
      {showSearch ? (
        <div
          className="position-fixed bg-white px-1 border border-secondary-subtle rounded"
          style={{ top: "50px", left: "60px", maxWidth: "330px", zIndex: "50" }}
        >
          <div className="mb-2">SEARCH</div>
          <input
            type="text"
            placeholder="search"
            id="account-search-form"
            className="bg-secondary-subtle rounded px-2"
            onChange={(e) => setSearch(e.target.value)}
          />
          <hr />
          <div className="d-flex flex-column gap-2">
            {accounts.length &&
              accounts.map((acc, idx) => (
                <a
                  href={`/${acc?.username}`}
                  key={`account-` + idx}
                  className="d-flex align-items-center gap-2 rounded px-2 py-1 border border-secondary-subtle"
                >
                  <span
                    className="border border-warning rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "34px" }}
                  >
                    <img
                      src={
                        api_url + `user/render_image?username=${acc?.username}`
                      }
                      alt="avatar"
                      style={{
                        width: "32px",
                        aspectRatio: "1/1",
                        borderRadius: "50%",
                      }}
                    />
                  </span>
                  <span>
                    {`${acc?.username}` +
                      `${acc?.fullname ? " (" + acc?.fullname + ")" : ""}`}
                  </span>
                </a>
              ))}
          </div>
        </div>
      ) : null}
      <div className={"d-flex p-2 gap-4 " + flexdir}>
        <div className="pb-2 pl-2 d-md-block d-none">
          <div className="my-4">
            <SVG_logoInstagram />
            <div className="d-none d-xxl-block">
              <SVGinstagram />
            </div>
          </div>
        </div>
        <a
          href="/home"
          className="d-flex align-items-center pl-2 gap-2"
          style={{ height: "50px" }}
        >
          <img
            src="https://img.icons8.com/?size=1x&id=1iF9PyJ2Thzo&format=png"
            alt="home icon"
            width={"24px"}
          />
          <span className="d-none d-xxl-block">Home</span>
        </a>
        <div
          className="d-flex align-items-center pl-2 gap-2 position-relative"
          style={{ height: "50px" }}
          type="button"
          onClick={() => setShowSearch(!showSearch)}
        >
          <img
            src="https://img.icons8.com/?size=1x&id=DZe3wFKTc8IK&format=gif"
            alt="search icon"
            width={"24px"}
          />
          <span className="ml-2 d-none d-xxl-block">Search</span>
        </div>
        <a
          className="d-flex align-items-center pl-2 gap-2"
          href="/search_page"
          style={{ height: "50px" }}
        >
          <SVG_compass />
          <span className="ml-2 d-none d-xxl-block">Explore</span>
        </a>
        <div
          className="d-flex align-items-center pl-2 gap-2"
          style={{ height: "50px" }}
        >
          <img
            src="https://img.icons8.com/?size=512&id=PxI9IPCyBAOD&format=png"
            alt="reels icon"
            width={"24px"}
          />
          <span className="d-none d-xxl-block">Reels</span>
        </div>
        <div
          className="d-flex align-items-center pl-2 gap-2"
          style={{ height: "50px" }}
        >
          <img
            src="https://img.icons8.com/?size=1x&id=M5FruzZetXVn&format=png"
            alt="shopping bag icon"
            width={"24px"}
          />
          <span className="d-none d-xxl-block">Shop</span>
        </div>
        <a
          href={
            userSelector?.username ? `/${userSelector?.username}` : "/login"
          }
          className="d-flex align-items-center pl-2 gap-2"
          style={{ height: "50px" }}
        >
          <img
            src="https://img.icons8.com/?size=512&id=85050&format=png"
            alt="person icon"
            width={"24px"}
          />
          <span className="d-none d-xxl-block">Profile</span>
        </a>
        <a
          href="/message_room"
          className="d-flex align-items-center pl-2 gap-2 position-relative"
          style={{ height: "50px" }}
          onClick={() => setNotification(false)}
        >
          <SVG_message />
          <span className="d-none d-xxl-block">Messages</span>
          <span
            className="text-danger position-absolute"
            style={{
              top: "-1px",
              left: "15px",
              display: notification ? `block` : `none`,
            }}
          >
            <SVG_chatDotFill />
          </span>
        </a>
        <div
          className="d-flex align-items-center pl-2 gap-2"
          style={{ height: "50px" }}
          type="button"
        >
          <img
            src="https://img.icons8.com/?size=512&id=37787&format=png"
            alt="plus icon"
            width={"24px"}
            onClick={() => {
              if (!localStorage.getItem("instagram-auth")) return nav("/login");
              setShowModal("OpenModalNewPost");
            }}
          />
          <span className="d-none d-xxl-block">Create</span>
        </div>
        <ModalNewPost
          setShowModal={setShowModal}
          show={showModal}
          fetchPosts={fetchPosts}
        />
      </div>
    </>
  );
}
