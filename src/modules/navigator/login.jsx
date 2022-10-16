import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {useContext, useState} from "react";
import apiClient from "../../services/apiClient";
import {setSessionCookie, deleteSessionCookie} from "../../services/sessionCookie";
import {SessionContext} from "../../context/sessionContext";


const Login = () => {

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [userNameAndPassword, setUsernameAndPassword] = useState({})
    const session = useContext(SessionContext);

    const handleFormChanges = (field, value) => {
        setUsernameAndPassword(prevState => {
            return {
                ...prevState,
                [field]: value
            }
        })
    }

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    }

    const handleLogin = () => {
        alert('Intentó loguearse')
        console.log(userNameAndPassword)
        apiClient.login(userNameAndPassword).then(response => {
                setSessionCookie(response.data.token);
            window.location.reload();
            }
        )

        setShowLoginModal(false);
    }

    const handleLogout = () => {
        deleteSessionCookie();
        window.location.reload();
    }

    return (
        <>
            {session ? <Button onClick={handleLogout}>Logout</Button>
            :
                <Button onClick={() => setShowLoginModal(true)}>Login</Button>}

            <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={(e) => handleFormChanges('username', e.target.value )}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => handleFormChanges('password', e.target.value )}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLoginModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Login;

