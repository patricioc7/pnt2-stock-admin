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
import {AiOutlineDelete} from "react-icons/ai";

const Products = () => {
    const [products, setProducts] = useState(undefined);
    const [showNewProductModal, setShowNewProductModal] = useState(false);
    const [newProduct, setNewProduct] = useState({});


    const [selectedProduct, setSelectedProduct] = useState({});

    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

    const jwt = useContext(SessionContext);

    useEffect(() => {
        ApiClient.getAllProducts(jwt)
            .then((allProductsResponse) => setProducts(allProductsResponse.data))
    }, []);

    const handleCloseNewProductModal = () => setShowNewProductModal(false);
    const handleShowNewProductModal = () => setShowNewProductModal(true);

    const handleCloseDeleteModal = () => setShowConfirmDeleteModal(false);

    const handleSaveNewProduct = () => {
        apiClient.addNewProduct(jwt, newProduct).then(() => {
            apiClient.getAllProducts().then((data) => setProducts(data));
            setShowNewProductModal(false);
        });
    };

    const handleDeleteConfirmation = (product) => {
        setSelectedProduct(product)
        setShowConfirmDeleteModal(true)
    }

    const handleDelete = () => {
        apiClient.deleteProduct(jwt, selectedProduct._id).then(() =>
            apiClient.getAllStocks( jwt). then(response => setProducts(response.data))
        )
        setShowConfirmDeleteModal(false)
    }

    return (
        <Container>
            <Row>
                <h1>Inventario</h1>
                <Col>
                    <Button onClick={handleShowNewProductModal}>Sumar nuevo producto</Button>
                    <hr />
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>SKU</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products &&
                            products.map((product) => {
                                return (
                                    <tr>
                                        <td>{product._id}</td>
                                        <td>{product.sku}</td>
                                        <td>{product.name}</td>
                                        <td><AiOutlineDelete onClick={() => handleDeleteConfirmation(product)}/></td>
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
                <Modal.Body>
                </Modal.Body>
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
            <Modal show={showNewProductModal} onHide={handleCloseNewProductModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sumar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="quantity">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control type="text" placeholder="Nombre"
                              onChange={(e) =>
                                  setNewProduct({ ...newProduct, name: e.target.value })
                              }
                            />
                            <Form.Label>SKU:</Form.Label>
                            <Form.Control type="text" placeholder="SKU"
                                          onChange={(e) =>
                                              setNewProduct({ ...newProduct, sku: e.target.value })
                                          }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseNewProductModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleSaveNewProduct}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* END INCREASE STOCK MODAL*/}

        </Container>
    );
};

export default Products;
