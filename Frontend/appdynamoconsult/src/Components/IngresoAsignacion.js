//

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios  from 'axios';

function IngresoAsignacion() {

    const [carnet, setCarnet] = useState('');
    const [curso, setCurso] = useState('');
    const [periodo, setPeriodo] = useState('');


    const send = async() => { 
        const res = await axios.post(`http://localhost:3001/newAssignation`, {  
            carnet:carnet,
            curso:curso, 
            periodo: periodo
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
                                        <Form.Control type="number" placeholder="carnet" value={carnet} onChange={event => setCarnet(event.target.value)} />
                                        <Form.Label><br /> <Card.Title>Ingrese el curso</Card.Title></Form.Label>
                                        <Form.Control type="number" placeholder="curso" value={curso} onChange={event => setCurso(event.target.value)} />
                                        <Form.Label><br /> <Card.Title>Ingrese el periodo</Card.Title></Form.Label>
                                        <Form.Control type="number" placeholder="periodo" value={periodo} onChange={event => setPeriodo(event.target.value)} />
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

export default IngresoAsignacion;