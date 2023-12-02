import React from "react";

const VideoComponent = ({ title, type, height, width }) => {
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#262134",
    height: height,
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "white",
    textAlign: "center",
  };

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{title || "Default Title"}</div>
      <div class="mb-3 ">
        <label for="formFile" class="form-label text-white">
          Add Video
        </label>
        <input class="form-control" type="file" id="formFile" />
        <div class="mt-3">
          <label for="formFile" class="form-label text-white">
            Preferences
          </label>
          <div className="row">
            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label
                  className="form-check-label text-white"
                  htmlFor="defaultCheck1"
                >
                  Checkbox 1
                </label>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck2"
                />
                <label
                  className="form-check-label text-white"
                  htmlFor="defaultCheck2"
                >
                  Checkbox 2
                </label>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck3"
                />
                <label
                  className="form-check-label text-white"
                  htmlFor="defaultCheck3"
                >
                  Checkbox 3
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck2"
                />
                <label
                  className="form-check-label text-white"
                  htmlFor="defaultCheck2"
                >
                  Checkbox 2
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck2"
                />
                <label
                  className="form-check-label text-white"
                  htmlFor="defaultCheck2"
                >
                  Checkbox 2
                </label>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck3"
                />
                <label
                  className="form-check-label text-white"
                  htmlFor="defaultCheck3"
                >
                  Checkbox 3
                </label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end p-2">
            <button type="button" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
