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
import { AiOutlineDelete } from "react-icons/ai";

const Stores = () => {
  const [stores, setStores] = useState(undefined);
  const [showNewStoreModal, setShowNewStoreModal] = useState(false);
  const [newStore, setNewStore] = useState({});

  const [selectedStore, setSelectedStore] = useState({});

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const jwt = useContext(SessionContext);

  useEffect(() => {
    ApiClient.getAllStores(jwt).then((allStoresResponse) =>
      setStores(allStoresResponse.data)
    );
  }, []);

  const handleCloseNewStoreModal = () => setShowNewStoreModal(false);
  const handleShowNewStoreModal = () => setShowNewStoreModal(true);

  const handleCloseDeleteModal = () => setShowConfirmDeleteModal(false);

  const handleSaveNewStore = () => {
    apiClient.addNewStore(jwt, newStore).then(() => {
      apiClient.getAllStores().then((data) => setStores(data));
      setShowNewStoreModal(false);
    });
  };

  const handleDeleteConfirmation = (product) => {
    setSelectedStore(product);
    setShowConfirmDeleteModal(true);
  };

  const handleDelete = () => {
    apiClient
      .deleteStore(jwt, selectedStore._id)
      .then(() =>
        apiClient.getAllStores(jwt).then((response) => setStores(response.data))
      );
    setShowConfirmDeleteModal(false);
  };

  return (
    <Container>
      <Row>
        <h1>Stores</h1>
        <Col>
          <Button onClick={handleShowNewStoreModal}>Sumar nuevo store</Button>
          <hr />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {stores &&
                stores.map((store) => {
                  return (
                    <tr>
                      <td>{store._id}</td>
                      <td>{store.name}</td>
                      <td>
                        <AiOutlineDelete
                          onClick={() => handleDeleteConfirmation(store)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/*DELETE PRODUCT MODAL*/}
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

      {/*ADD STOCK MODAL*/}
      <Modal show={showNewStoreModal} onHide={handleCloseNewStoreModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sumar Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="quantity">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                onChange={(e) =>
                  setNewStore({ ...newStore, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNewStoreModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveNewStore}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* END INCREASE STOCK MODAL*/}
    </Container>
  );
};

export default Stores;
