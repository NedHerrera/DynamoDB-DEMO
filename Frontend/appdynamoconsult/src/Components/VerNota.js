// 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Row, Card, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios  from 'axios';

function VerNota() {

    const [curso, setcurso] = useState('');
    const [reportes, setReportes] = useState([]);
    //const [tipo, settipo] = useState('');
    //const [nota, setnota] = useState('');


    const getAssignation = async() => { 
        const res = await axios.post(`http://localhost:3001/viewNotas`, {  
            tipo:curso
        } ).then(
            function (response) {
                console.log(response);
                setReportes(response.data.asignacionees);
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
                            <Card.Header> <h2>reporte de actividad</h2> </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        
                                        <Form.Label><Card.Title>Ingrese la actividad</Card.Title></Form.Label>
                                        <Form.Control type="text" placeholder="curso" value={curso} onChange={event => setcurso(event.target.value)} />

                                    </Form.Group>
                                    <Button variant="primary" onClick={ getAssignation }>
                                        Ingresar
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <br /><br />
            <Container>

                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>actividad</th>
                    <th>carnet</th>
                    <th>nota</th>
                    </tr>
                </thead>
                <tbody>
                    {reportes.map((reporte) => (
                    <tr>
                        <th>{reporte.actividad}</th>
                        <th>{reporte.carnet}</th>
                        <th>{reporte.nota}</th>
                    </tr>
                    
                    ))}
                </tbody>
                </Table>
            </Container>
                    

        </div>
    );

}

export default VerNota; 