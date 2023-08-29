export default function FetchStory() {
  const isVisited = new Set();
  return (
    <>
      {[...Array(20)].map((val) => (
        <div>
          <div
            className={
              isVisited
                ? `rounded-circle border border-secondary`
                : `rounded-circle border border-danger`
            }
            style={{
              maxHeight: "130px",
              maxWidth: "130px",
              aspectRatio: "1/1",
            }}
          >
            <div
              className="rounded-circle"
              style={{ maxHeight: "66px", width: "66px" }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
                alt="question mark"
                width={"100px"}
              />
            </div>
          </div>
          <div className="w-100 text-center">Name</div>
        </div>
      ))}
    </>
  );
}
