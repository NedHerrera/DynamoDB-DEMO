import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap';
import  { Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios  from 'axios';

function IngresoCurso() {

    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [creditos_necesarios, setCreditos_necesarios] = useState('');
    const [creditos_otorgados, setCreditos_otorgados] = useState('');

    const send = async() => { 
        const res = await axios.post(`http://localhost:3001/newCourse`, {  
            codigo:codigo,
            nombre:nombre, 
            creditos_necesarios: creditos_necesarios, 
            creditos_otorgados: creditos_otorgados
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
                            <Card.Header> <h2>Ingreso de curso</h2> </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label><Card.Title>Ingrese el codigo</Card.Title></Form.Label>
                                        <Form.Control type="number" placeholder="codigo" value={codigo} onChange={event => setCodigo(event.target.value)} />
                                        <Form.Label><br /> <Card.Title>Ingrese el nombre</Card.Title></Form.Label>
                                        <Form.Control type="text" placeholder="nombre" value={nombre} onChange={event => setNombre(event.target.value)} />
                                        <Form.Label><br /> <Card.Title>Ingrese creditos necesario</Card.Title></Form.Label>
                                        <Form.Control type="number" placeholder="creditos necesarios" value={creditos_necesarios} onChange={event => setCreditos_necesarios(event.target.value)} />
                                        <Form.Label><br /> <Card.Title>Ingrese creditos otorgados</Card.Title></Form.Label>
                                        <Form.Control type="number" placeholder="creditos otorgados" value={creditos_otorgados} onChange={event => setCreditos_otorgados(event.target.value)} />
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

export default IngresoCurso;