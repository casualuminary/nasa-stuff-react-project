const LoadingIndicator = ({ loadingState }) => {
  return (
    <div className="d-flex justify-content-center">
      {/*<h3>{loadingState}</h3>*/}
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>

  );
};

export default LoadingIndicator;