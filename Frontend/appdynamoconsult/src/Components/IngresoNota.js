// IngresoNota
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios  from 'axios';

function IngresoNota() {

    const [carnet, setcarnet] = useState('');
    const [tipo, settipo] = useState('');
    const [nota, setnota] = useState('');


    const send = async() => { 
        const res = await axios.post(`http://localhost:3001/newNota`, {  
            carnet:carnet,
            tipo:tipo, 
            nota: nota
        } ).then(
            function (response) {
                console.log(response);
                window.location.reload();
            }
        );
    }

    return (
        <div>
            <br /> 
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <Card border="secondary">
                            <Card.Header> <h2>Ingreso de Asignacion</h2> </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        
                                        <Form.Label><Card.Title>Ingrese el carnet</Card.Title></Form.Label>
                                        <Form.Control type="number" placeholder="carnet" value={carnet} onChange={event => setcarnet(event.target.value)} />
                                        
                                        <Form.Label><Card.Title>Ingrese el codigo de la actividad</Card.Title></Form.Label>
                                        <Form.Control type="text" placeholder="tipo" value={tipo} onChange={event => settipo(event.target.value)} />
                                        
                                        <Form.Label><Card.Title>Ingrese el nota</Card.Title></Form.Label>
                                        <Form.Control type="number" placeholder="carnet" value={nota} onChange={event => setnota(event.target.value)} />
                                        
                                    </Form.Group>
                                    <Button variant="primary" onClick={ send }>
                                        Ingresar
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );

}

export default IngresoNota;