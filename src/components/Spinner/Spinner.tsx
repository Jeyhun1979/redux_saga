import "./Spinner.css";

const spinnerImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif";

export const Spinner = () => (
  <div className="spinner-wrap" role="status" aria-label="Loading">
    <img src={spinnerImageUrl} alt="Loading" className="spinner-image" />
  </div>
);
