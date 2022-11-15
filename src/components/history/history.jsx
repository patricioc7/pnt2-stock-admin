import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import ApiClient from "../../services/apiClient";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../context/sessionContext";
import LoadingSpinner from "../common/spinner";
import Paginator from "../paginator/paginator";

const Products = () => {
  const [historyEntries, setHistoryEntries] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [historyPages, setHistoryPages] = useState(true);

  const jwt = useContext(SessionContext);

  useEffect(() => {
    ApiClient.getHistoryPages(jwt)
      .then((historyPagesResponse) => {
        setHistoryPages(historyPagesResponse.data);
      })
      .then(() =>
        ApiClient.getHistoryPaginated(jwt, 0).then((historyResponse) => {
          console.log(historyResponse);
          setHistoryEntries(historyResponse.data);
          setLoading(false);
        })
      );
  }, []);

  const handlePageChange = (pageNumber) => {
    setLoading(true);
    ApiClient.getHistoryPaginated(jwt, pageNumber).then((response) => {
      setHistoryEntries(response.data);
      setLoading(false);
    });
  };

  return (
    <Container>
      {!jwt ? (
        <p>Por favor logueese o registrese.</p>
      ) : (
        <>
          <Row>
            <h1>Historial</h1>
            <Col>
              <hr />
              {!loading ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Tipo</th>
                      <th>Cantidad</th>
                      <th>Store</th>
                      <th>Customer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyEntries &&
                      historyEntries.map((entry) => {
                        return (
                          <tr>
                            <td>{entry._id}</td>
                            <td>{entry.type}</td>
                            <td>{entry.qty}</td>
                            <td>{entry.storeId}</td>
                            <td>{entry.customerId}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              ) : (
                <LoadingSpinner />
              )}
            </Col>
          </Row>
          <Row>
            <Paginator
              handlePageChange={handlePageChange}
              pageQty={historyPages}
            />
          </Row>
        </>
      )}
    </Container>
  );
};

export default Products;
