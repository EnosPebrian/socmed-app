import underconstruction from "../asset/underconstruction.avif";

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
                src={underconstruction}
                alt="question mark"
                width="77px"
                style={{ borderRadius: "50%" }}
              />
            </div>
          </div>
          <div className="w-100 text-center">Soon</div>
        </div>
      ))}
    </>
  );
}
