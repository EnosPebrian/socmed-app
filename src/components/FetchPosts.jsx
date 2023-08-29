import { Row } from "react-bootstrap";

export default function FetchPosts() {
  return (
    <>
      <Row style={{ maxWidth: "470px" }}>
        {[...Array(10)].map((val) => (
          <div className="my-2 border-top border-secondary pt-3">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="d-flex align-items-center w-100">
                <div
                  className={`rounded-circle border border-secondary`}
                  style={{ maxHeight: "41px", aspectRatio: "1/1" }}
                >
                  <div>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
                      alt="question mark"
                    />
                  </div>
                </div>
                <div className="ml-2">
                  <b>Name</b>
                </div>
              </div>
              <div style={{ float: "right" }}>
                <img
                  src="https://img.icons8.com/?size=1x&id=61873&format=png"
                  alt="three dots - more symbol"
                />
              </div>
            </div>
            <div>
              <img
                src="https://www.nature.com/immersive/d41586-021-00095-y/assets/3TP4N718ac/2021-01-xx_jan-iom_tree-of-life_sh-750x1000.jpeg"
                width={"100%"}
              />
            </div>
            <div className="d-flex ml-3 my-1 mt-2" style={{ gap: "10px" }}>
              <img
                src="https://img.icons8.com/?size=1x&id=87&format=png"
                alt="heart icon"
                width={"24px"}
              />
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
            <div className="mx-3 my-1">
              Liked by <b>{`aneh`}</b> and <b>{`10,000`} others</b>
            </div>
            <div className="mx-3 my-1">
              <b>Name</b>
              <span className="ml-1">
                Are you thinking what i am thinking? 4984984984894984984
              </span>
            </div>
            <div className="mx-3 my-1">View all {`999`} comments</div>
          </div>
        ))}
      </Row>
    </>
  );
}
