import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ApiClient from "../services/apiClient"
import {useState, useEffect} from "react";

const Stocks = () => {
    const [stocks, setStocks] = useState(undefined);

    useEffect(() => {
        ApiClient.getAllStocks().then(data =>  {
            setStocks(data)
            console.log(data.data)
        });

    }, []);

    return (
        <Container >
            <Row>
                <h1>Inventario</h1>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Store</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stocks && stocks.data.map( stock => {
                            return (   <tr>
                                <td>{stock._id}</td>
                                <td>{stock.productId}</td>
                                <td>{stock.qty}</td>
                                <td>{stock.storeId}</td>
                            </tr>)
                        })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default Stocks;