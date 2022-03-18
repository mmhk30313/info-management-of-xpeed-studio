import React, { Fragment } from 'react';
// import { PageHeader } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from '../../pages/home/Home';
import GetForm from '../../pages/form/GetForm';
import {Navbar, Container, Nav} from 'react-bootstrap';

const Header = () => {
    return (
        <Fragment>
            <Router>
                <Navbar className="sticky-top" bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand style={{padding: 0, margin: "0 10px"}}><Link to="/" style={{fontSize: 24, textDecoration: 'none', fontWeight: 'bold', color: "#2352a4"}}>xPeed Studio</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Link style={{margin: '0 10px', fontWeight: 'bold',color: '#AFAFAF', fontSize: 16, textDecoration: 'none'}} key={"1"} to="/">Table</Link>
                                <Link style={{margin: "0 10px", fontWeight: 'bold',color: '#AFAFAF', fontSize: 16, textDecoration: 'none'}} key={"2"} to="/get-form">Get Form</Link>
                                <Link style={{marginLeft: "0 10px", fontWeight: 'bold',color: '#AFAFAF', fontSize: 16, textDecoration: 'none'}} key={"3"} to={'/get-form'} >Update Form</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {/* <div style={{backgroundColor: '#EBF2F7', margin: "0 20px"}}>
                    <PageHeader 
                        // title={<h1 style={{padding: 0, margin: 0}}>MMHK Studio</h1>}
                        title={<h1 style={{padding: 0, margin: 0, color: "#1D3B70"}}>xPeed Studio</h1>}
                        // subTitle="This is a subtitle"
                        // extra={[
                        subTitle={[
                            <div key={1} style={{marginTop: 5}}>
                                <Link style={{margin: '0 10px', fontWeight: 'bold',color: '#AFAFAF', fontSize: 16, textDecoration: 'none'}} key={"1"} to="/">Table</Link>
                                <Link style={{marginLeft: "10px", fontWeight: 'bold',color: '#AFAFAF', fontSize: 16, textDecoration: 'none'}} key={"2"} to="/get-form">Get Form</Link>
                                <Link style={{marginLeft: "10px", fontWeight: 'bold',color: '#AFAFAF', fontSize: 16, textDecoration: 'none'}} key={"3"} to={'/get-form'} >Update Form</Link>
                            </div>
                        ]}
                    />

                </div> */}
                <div style={{margin: 20}}>
                    <Switch>
                        <Route exact path="/" component={() => <Home />} />
                        <Route path="/get-form" component={() => <GetForm />} />
                    </Switch>
                </div>
                
            </Router>
        </Fragment>
    );
};

export default Header;