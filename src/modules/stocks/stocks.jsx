import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import ApiClient from "../services/apiClient";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import apiClient from "../services/apiClient";

const Stocks = () => {
  const [stocks, setStocks] = useState(undefined);
  const [products, setProducts] = useState(undefined);
  const [stores, setStores] = useState(undefined);
  const [showNewStockModal, setShowNewStockModal] = useState(false);

  useEffect(() => {
    ApiClient.getAllStocks().then((data) => {
      setStocks(data);
      console.log(data.data);
    });
    ApiClient.getAllProducts().then((data) => {
      setProducts(data);
      console.log(data);
    });
    ApiClient.getAllStores().then((data) => {
      setStores(data);
      console.log(data);
    });

  }, []);

  const handleCloseNewStockModal = () => setShowNewStockModal(false);
  const handleShowNewStockModal = () => setShowNewStockModal(true);

  const handleSaveNewStock = () => {
    apiClient
      .addNewStock({
        productId: "62be4ea0dfe120febe5afbb8",
        storeId: "62be4ec8dfe120febe5afbb9",
      })
      .then(() => {
        apiClient.getAllStocks().then((data) => setStocks(data));
        setShowNewStockModal(false);
      });
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
                stocks.data.map((stock) => {
                  return (
                    <tr>
                      <td>{stock._id}</td>
                      <td>{stock.productId}</td>
                      <td>{stock.qty}</td>
                      <td>{stock.storeId}</td>
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
              <Form.Select>
                {products &&
                  products.data.map((product) => {
                    return <option>{product.name}</option>;
                  })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Store:</Form.Label>
              <Form.Select>
                {stores &&
                    stores.data.map((store) => {
                      return <option>{store.name}</option>;
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
