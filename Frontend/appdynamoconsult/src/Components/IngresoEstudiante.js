import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios  from 'axios';

function IngresoEstudiante() {

    const [carnet, setCarnet] = useState('');
    const [nombre, setNombre] = useState('');
    const [CUI, setCUI] = useState('');
    const [fechanac, setFechanac] = useState('');
    const [email, setEmail] = useState('');

    const send = async() => { 
        const res = await axios.post(`http://localhost:3001/newStudent`, {  
            carnet:carnet,
            nombre:nombre, 
            CUI: CUI, 
            fechanac: fechanac, 
            email:email
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
                            <Card.Header> <h2>Ingreso de estudiante</h2> </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label><Card.Title>Ingrese el carnet</Card.Title></Form.Label>
                                        <Form.Control type="text" placeholder="carnet" value={carnet} onChange={event => setCarnet(event.target.value)} />
                                        <Form.Label><br /> <Card.Title>Ingrese el nombre</Card.Title></Form.Label>
                                        <Form.Control type="text" placeholder="nombre" value={nombre} onChange={event => setNombre(event.target.value)} />
                                        <Form.Label><br /> <Card.Title>Ingrese el CUI</Card.Title></Form.Label>
                                        <Form.Control type="text" placeholder="CUI" value={CUI} onChange={event => setCUI(event.target.value)} />
                                        <Form.Label><br /> <Card.Title>Ingrese la fecha de nacimiento</Card.Title></Form.Label>
                                        <Form.Control type="text" placeholder="fechanac" value={fechanac} onChange={event => setFechanac(event.target.value)} />
                                        <Form.Label><br /> <Card.Title>Ingrese el email</Card.Title></Form.Label>
                                        <Form.Control type="text" placeholder="email" value={email} onChange={event => setEmail(event.target.value)} />
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

export default IngresoEstudiante;