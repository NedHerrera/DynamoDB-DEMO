import logo from './logo.svg';
import {Navbar, Nav, Container, } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link,  Redirect } from 'react-router-dom'
import IngresoEstudiante from './Components/IngresoEstudiante';
import IngresoCurso  from './Components/IngresoCurso';
import IngresoAsignacion  from './Components/IngresoAsignacion'; 
import IngresoActividad  from './Components/IngresoActividad';  
import IngresoNota  from './Components/IngresoNota';  
import VerAsignaciones  from './Components/VerAsignaciones';   
import VerNota  from './Components/VerNota';   

function App() {
  return (
    <Router>

<Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand >Dynamo practice DEMO</Navbar.Brand>
    <Nav className="me-auto">
       <Link className="nav-link" to="/ingresoestudiante">Ingreso de estudiante</Link>
       <Link className="nav-link" to="/ingresocurso">Ingreso de cursos</Link>
       <Link className="nav-link" to="/ingresoasignacion">asignacion</Link> 
       <Link className="nav-link" to="/IngresoActividad">nueva Actividad</Link> 
       <Link className="nav-link" to="/IngresoNota">nueva nota</Link> 
       <Link className="nav-link" to="/VerAsignaciones">ver Asignaciones</Link>  
       <Link className="nav-link" to="/VerNota">ver VerNota</Link>  
    </Nav>
    </Container>
  </Navbar> 





    <Switch>
        <Redirect exact from="/" to="/ingresoestudiante" />
        <Route path="/ingresoestudiante">
            <IngresoEstudiante/>
        </Route>
        <Route path="/ingresocurso">
            <IngresoCurso/>
        </Route>
        <Route path="/ingresoasignacion">
            <IngresoAsignacion/>
        </Route> 
        <Route path="/IngresoActividad">
            <IngresoActividad/> 
        </Route> 
        <Route path="/IngresoNota">
            <IngresoNota/> 
        </Route> 
        <Route path="/VerAsignaciones">
            <VerAsignaciones/>   
        </Route> 
        <Route path="/VerNota">
            <VerNota/>   
        </Route> 
    </Switch>
</Router>
  );
}

export default App;