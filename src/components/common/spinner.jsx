import Row from "react-bootstrap/Row";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <Row className="justify-content-md-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Row>
  );
};

export default LoadingSpinner;
