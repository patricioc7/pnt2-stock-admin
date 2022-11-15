import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import apiClient from "../../services/apiClient";
import {
  setSessionCookie,
  deleteSessionCookie,
} from "../../services/sessionCookie";
import { SessionContext } from "../../context/sessionContext";

const LoginAndRegister = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [userNameAndPassword, setUsernameAndPassword] = useState({});
  const [registerObject, setRegisterObject] = useState({});
  const [registrationResult, setRegistrationResult] = useState(undefined);
  const session = useContext(SessionContext);

  const handleLoginFormChanges = (field, value) => {
    setUsernameAndPassword((prevState) => {
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  const handleRegisterFormChanges = (field, value) => {
    setRegisterObject((prevState) => {
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setRegistrationResult(undefined);
  };

  const handleLogin = () => {
    apiClient.login(userNameAndPassword).then((response) => {
      setSessionCookie(response.data.token);
      window.location.reload();
    });

    setShowLoginModal(false);
  };

  const handleRegister = () => {
    apiClient
      .registerNewUser(registerObject)
      .then((response) => {
        console.log(response);
        if (response.status === 200)
          setRegistrationResult({ status: "success", error: null });
      })
      .catch((error) =>
        setRegistrationResult({ status: "failed", error: error })
      );
  };

  const handleLogout = () => {
    deleteSessionCookie();
    window.location.reload();
  };

  return (
    <>
      {session ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <>
          <Button onClick={() => setShowRegisterModal(true)}>Register</Button>
          <Button variant="link" onClick={() => setShowLoginModal(true)}>
            Login
          </Button>
        </>
      )}

      <Modal show={showLoginModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                placeholder="email"
                onChange={(e) =>
                  handleLoginFormChanges("username", e.target.value)
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  handleLoginFormChanges("password", e.target.value)
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRegisterModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        {!registrationResult ? (
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre completo:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Juan Pérez"
                onChange={(e) =>
                  handleRegisterFormChanges("name", e.target.value)
                }
              />
            </Form.Group>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="juan@perez.com"
                  onChange={(e) =>
                    handleRegisterFormChanges("username", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*****"
                  onChange={(e) =>
                    handleRegisterFormChanges("password", e.target.value)
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
        ) : (
          <Modal.Body>
            {registrationResult.status === "success" ? (
              <h1>Registración exitosa</h1>
            ) : (
              <h1>Oops, error</h1>
            )}{" "}
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Cerrar
          </Button>
          {!registrationResult && (
            <Button variant="primary" onClick={handleRegister}>
              Register
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginAndRegister;
