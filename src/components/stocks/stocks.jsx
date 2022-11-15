import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import ApiClient from "../../services/apiClient";
import { useState, useEffect, useContext } from "react";
import { Button, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import apiClient from "../../services/apiClient";
import { SessionContext } from "../../context/sessionContext";
import {
  AiFillDollarCircle,
  AiFillPlusCircle,
  AiOutlineDelete,
} from "react-icons/ai";
import Paginator from "../paginator/paginator";

const Stocks = () => {
  const [stocks, setStocks] = useState(undefined);
  const [products, setProducts] = useState(undefined);
  const [stores, setStores] = useState(undefined);
  const [showNewStockModal, setShowNewStockModal] = useState(false);
  const [newStock, setNewStock] = useState({});

  const [loading, setLoading] = useState(true);

  const [selectedStock, setSelectedStock] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [showIncreseModal, setShowIncreseModal] = useState(false);

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const jwt = useContext(SessionContext);

  useEffect(() => {
    ApiClient.getAllProducts(jwt)
      .then((allProductsResponse) => setProducts(allProductsResponse.data))
      .then(() => {
        ApiClient.getAllStores(jwt)
          .then((allStoresResponse) => setStores(allStoresResponse.data))
          .then(() => {
            ApiClient.getAllStocksPaginated(jwt, 0).then((allStocksData) => {
              setLoading(false);
              setStocks(allStocksData.data);
            });
          });
      });
  }, []);

  const handleCloseNewStockModal = () => setShowNewStockModal(false);
  const handleShowNewStockModal = () => setShowNewStockModal(true);

  const handleCloseAddModal = () => setShowIncreseModal(false);
  const handleCloseDeleteModal = () => setShowConfirmDeleteModal(false);

  const handleQuantityChange = (qty) => {
    setQuantity(qty);
  };

  const handleSaveNewStock = () => {
    apiClient.addNewStock(jwt, newStock).then(() => {
      ApiClient.getAllStocksPaginated(jwt, 0).then((allStocksData) => {
        setLoading(false);
        setStocks(allStocksData.data);
      });
      setShowNewStockModal(false);
    });
  };

  const handleIncreaseQuantity = () => {
    ApiClient.increaseStock(jwt, selectedStock._id, quantity).then(() =>
      ApiClient.getAllStocksPaginated(jwt, 0).then((allStocksData) => {
        setLoading(false);
        setStocks(allStocksData.data);
      })
    );
    setShowIncreseModal(false);
  };

  const getProductName = (productId) => {
    if (products) {
      const found = products.find((p) => productId === p._id);
      if (found) {
        return found.name;
      }
    }
  };

  const getStoreName = (storeId) => {
    if (stocks) {
      const found = stores.find((s) => storeId === s._id);
      if (found) {
        return found.name;
      }
    }
  };

  const handleIncreaseModalShow = (stock) => {
    setSelectedStock(stock);
    setShowIncreseModal(true);
  };

  const handleDeleteConfirmation = (stock) => {
    setSelectedStock(stock);
    setShowConfirmDeleteModal(true);
  };

  const handleDelete = () => {
    apiClient
      .deleteProduct(jwt, selectedStock._id)
      .then(() =>
        apiClient
          .getAllProducts(jwt)
          .then((response) => setStocks(response.data))
      );
    setShowConfirmDeleteModal(false);
  };

  const handlePageChange = (pageNumber) => {
    setLoading(true);
    ApiClient.getAllStocksPaginated(jwt, pageNumber).then((response) => {
      setStocks(response.data);
      setLoading(false);
    });
  };

  return (
    <Container>
      {!loading ? (
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
                        <td>
                          <AiFillPlusCircle
                            onClick={() => handleIncreaseModalShow(stock)}
                          />
                          <AiFillDollarCircle />
                          <AiOutlineDelete
                            onClick={() => handleDeleteConfirmation(stock)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-md-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      )}
      <Row>
        <Paginator handlePageChange={handlePageChange} />
      </Row>

      {/*NEW INCREASE MODAL*/}
      <Modal show={showNewStockModal} onHide={handleCloseNewStockModal}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir nuevo stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cantidad:</Form.Label>
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
      {/* END NEW STOCK MODAL*/}

      {/*ADD STOCK MODAL*/}
      <Modal show={showIncreseModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sumar stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="quantity">
              <p>
                <b>Stock:</b> {selectedStock._id}
              </p>
              <p>
                <b>Producto:</b> {getProductName(selectedStock.productId)}
              </p>
              <p>
                <b>Store:</b> {getStoreName(selectedStock.storeId)}
              </p>
              <Form.Label>Cantidad:</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                onChange={(e) => handleQuantityChange(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleIncreaseQuantity}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* END INCREASE STOCK MODAL*/}

      {/*DELETE STOCK MODAL*/}
      <Modal show={showConfirmDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Está seguro?</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* END DELETE STOCK MODAL*/}
    </Container>
  );
};

export default Stocks;
