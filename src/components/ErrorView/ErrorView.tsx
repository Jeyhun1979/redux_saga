import "./ErrorView.css";

const retryImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/8/8d/OOjs_UI_icon_reject.svg";

type ErrorViewProps = {
  error: string;
  onRetry: () => void;
};

export const ErrorView = ({ error, onRetry }: ErrorViewProps) => (
  <div className="error-wrap" role="alert">
    <img src={retryImageUrl} alt="Retry" className="error-icon" />
    <p className="error-message">{error}</p>
    <button className="error-button" onClick={onRetry} type="button">
      Повторить запрос
    </button>
  </div>
);
