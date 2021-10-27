// IngresoActividad
//

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios  from 'axios';

function IngresoActividad() {

    const [tipo, setTipo] = useState('');
    const [fecha_inicio, setFecha_inicio] = useState('');
    const [fecha_fin, setFecha_fin] = useState('');


    const send = async() => { 
        const res = await axios.post(`http://localhost:3001/newActiviy`, {  
            tipo:tipo,
            fecha_inicio:fecha_inicio, 
            fecha_fin: fecha_fin
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
                                        <Form.Label><Card.Title>Ingrese el tipo de actividad</Card.Title></Form.Label>
                                        <Form.Control type="text" placeholder="tipo" value={tipo} onChange={event => setTipo(event.target.value)} />
                                        
                                        <Form.Label><br /> <Card.Title>Ingrese la fecha de inicio</Card.Title></Form.Label>
                                        <Form.Control type="text" placeholder="fecha_inicio" value={fecha_inicio} onChange={event => setFecha_inicio(event.target.value)} />
                                        
                                        <Form.Label><br /> <Card.Title>Ingrese la fecha de fin</Card.Title></Form.Label>
                                        <Form.Control type="text" placeholder="fecha_fin" value={fecha_fin} onChange={event => setFecha_fin(event.target.value)} />

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

export default IngresoActividad;