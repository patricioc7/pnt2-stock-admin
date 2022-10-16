import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import ApiClient from "../../services/apiClient";
import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import apiClient from "../../services/apiClient";
import { SessionContext } from "../../context/sessionContext";

const Stocks = () => {
  const [stocks, setStocks] = useState(undefined);
  const [products, setProducts] = useState(undefined);
  const [stores, setStores] = useState(undefined);
  const [showNewStockModal, setShowNewStockModal] = useState(false);
  const [newStock, setNewStock] = useState({});
  const jwt = useContext(SessionContext);

  useEffect(() => {
    ApiClient.getAllProducts(jwt)
      .then((allProductsResponse) => setProducts(allProductsResponse.data))
      .then(() => {
        ApiClient.getAllStores(jwt)
          .then((allStoresResponse) => setStores(allStoresResponse.data))
          .then(() => {
            ApiClient.getAllStocks(jwt).then((allStocksData) =>
              setStocks(allStocksData.data)
            );
          });
      });
  }, []);

  const handleCloseNewStockModal = () => setShowNewStockModal(false);
  const handleShowNewStockModal = () => setShowNewStockModal(true);

  const handleSaveNewStock = () => {
    apiClient.addNewStock(jwt, newStock).then(() => {
      apiClient.getAllStocks().then((data) => setStocks(data));
      setShowNewStockModal(false);
    });
  };

  const getProductName = (productId) => {
    const found = products.find((p) => productId === p._id);
    if (found) {
      return found.name;
    }
  };

  const getStoreName = (storeId) => {
    const found = stores.find((s) => storeId === s._id);
    if (found) {
      return found.name;
    }
  };

  return (
    <Container>
      <Row>
        <h1>Inventario</h1>
        <Col>
          <Button onClick={handleShowNewStockModal}>Sumar nuevo stock</Button>
          <hr />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Store</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {stocks &&
                stocks.map((stock) => {
                  return (
                    <tr>
                      <td>{stock._id}</td>
                      <td>{getProductName(stock.productId)}</td>
                      <td>{stock.qty}</td>
                      <td>{getStoreName(stock.storeId)}</td>
                      <td>Sumar - Vender</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showNewStockModal} onHide={handleCloseNewStockModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sumar nuevo stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Producto:</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setNewStock({ ...newStock, productId: e.target.value })
                }
              >
                {products &&
                  products.map((product) => {
                    return (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Store:</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setNewStock({ ...newStock, storeId: e.target.value })
                }
              >
                {stores &&
                  stores.map((store) => {
                    return (
                      <option key={store._id} value={store._id}>
                        {store.name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNewStockModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveNewStock}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Stocks;
