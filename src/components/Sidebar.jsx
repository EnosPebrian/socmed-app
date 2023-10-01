import { useState } from "react";
import { ModalNewPost } from "./ModalNewPost";
import { SVGinstagram } from "./SVG/SVG_Instagram";
import { SVG_logoInstagram } from "./SVG/SVG_logo_Instagram";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ fetchPosts, flexdir = "flex-column" }) {
  const [showModal, setShowModal] = useState("");
  const nav = useNavigate();
  const userSelector = useSelector((state) => state.auth);

  return (
    <>
      <div className={"d-flex p-2 gap-4 " + flexdir}>
        <div className="pb-2 pl-2 d-md-block d-none">
          <div className="my-4">
            <SVG_logoInstagram />
            <div className="d-none d-xxl-block">
              <SVGinstagram />
            </div>
          </div>
        </div>
        <div></div>
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
        <a
          className="d-flex align-items-center pl-2 gap-2"
          href="/search_page"
          style={{ height: "50px" }}
        >
          <img
            src="https://img.icons8.com/?size=1x&id=DZe3wFKTc8IK&format=gif"
            alt="search icon"
            width={"24px"}
          />
          <span className="ml-2 d-none d-xxl-block">Search</span>
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
        <div
          className="d-flex align-items-center pl-2 gap-2"
          style={{ height: "50px" }}
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
