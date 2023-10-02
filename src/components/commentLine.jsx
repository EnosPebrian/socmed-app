import { Avatar, border } from "@chakra-ui/react";
import { SVG_Heart } from "./SVG/SVG_heart";
const api_url = process.env.REACT_APP_API;

export const CommentLine = ({ comment, index }) => {
  return (
    <div
      className="my-3"
      key={`commentline-` + index}
      style={{ display: "grid", gridTemplateColumns: "40px auto 32px" }}
    >
      <div className="mx-3" style={{ minWidth: "32px" }}>
        <img
          src={
            api_url + `user/render_image?username=` + comment?.users?.username
          }
          style={{ width: "32px", borderRadius: "50%", aspectRatio: "1/1" }}
        />
      </div>
      <div style={{ marginLeft: "16px" }} className="pt-1">
        <span style={{ wordBreak: "break-all" }}>
          <b>{comment?.users?.username}</b>
          {"    "}
          {comment?.comment}
        </span>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <SVG_Heart />
      </div>
    </div>
  );
};
