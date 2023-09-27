export default function FetchStory() {
  const isVisited = new Set();
  return (
    <>
      {[...Array(20)].map((val, index) => (
        <div key={index}>
          <div
            className={
              isVisited
                ? `rounded-circle border border-secondary d-flex justify-content-center align-items-center`
                : `rounded-circle border border-danger d-flex justify-content-center align-items-center`
            }
            style={{
              maxHeight: "130px",
              maxWidth: "130px",
              aspectRatio: "1/1",
            }}
          >
            <div
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{ maxHeight: "88px", width: "88px" }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
                alt="question mark"
                width="77px"
              />
            </div>
          </div>
          <div className="w-100 text-center">Name</div>
        </div>
      ))}
    </>
  );
}
