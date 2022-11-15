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
import LoadingSpinner from "../common/spinner";

const Customers = () => {
  const [customers, setCustomers] = useState(undefined);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const jwt = useContext(SessionContext);

  useEffect(() => {
    ApiClient.getAllCustomers(jwt).then((allCustomersResponse) => {
      setCustomers(allCustomersResponse.data);
      setLoading(false);
    });
  }, []);

  const handleCloseNewCustomerModal = () => setShowNewCustomerModal(false);
  const handleShowNewCustomerModal = () => setShowNewCustomerModal(true);

  const handleCloseDeleteModal = () => setShowConfirmDeleteModal(false);

  const handleSaveNewCustomer = () => {
    apiClient.addNewCustomer(jwt, newCustomer).then(() => {
      apiClient.getAllCustomers(jwt).then((data) => setCustomers(data));
      setShowNewCustomerModal(false);
    });
  };

  const handleDeleteConfirmation = (product) => {
    setSelectedCustomer(product);
    setShowConfirmDeleteModal(true);
  };

  const handleDelete = () => {
    apiClient
      .deleteCustomer(jwt, selectedCustomer._id)
      .then(() =>
        apiClient
          .getAllCustomers(jwt)
          .then((response) => setCustomers(response.data))
      );
    setShowConfirmDeleteModal(false);
  };

  return (
    <Container>
      <Row>
        <h1>Customers</h1>
        <Col>
          <Button onClick={handleShowNewCustomerModal}>
            Sumar nuevo customer
          </Button>
          <hr />
          {!loading ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {customers &&
                  customers.map((store) => {
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
          ) : (
            <LoadingSpinner />
          )}
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
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* END DELETE STOCK MODAL*/}

      {/*ADD STOCK MODAL*/}
      <Modal show={showNewCustomerModal} onHide={handleCloseNewCustomerModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="quantity">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNewCustomerModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveNewCustomer}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* END INCREASE STOCK MODAL*/}
    </Container>
  );
};

export default Customers;
