import { Avatar, border } from "@chakra-ui/react";
import { SVG_Heart } from "./SVG/SVG_heart";

export const CommentLine = ({ comment, index }) => {
  return (
    <div
      className="my-3"
      key={`commentline-` + index}
      style={{ display: "grid", gridTemplateColumns: "40px auto 32px" }}
    >
      <div className="mx-3" style={{ minWidth: "32px" }}>
        <img
          src={comment.users.image_url}
          style={{ width: "32px", borderRadius: "50%" }}
        />
      </div>
      <div style={{ marginLeft: "16px" }}>
        <span style={{ wordBreak: "break-all" }}>
          <b>{comment.users.username}</b>
          {"    "}
          {comment.comment}
        </span>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <SVG_Heart />
      </div>
    </div>
  );
};
