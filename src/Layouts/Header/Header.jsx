import React, { Fragment } from 'react';
import { PageHeader } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from '../../pages/home/Home';
import GetForm from '../../pages/form/GetForm';

const Header = () => {
    return (
        <Router>
            <div style={{backgroundColor: '#EBF2F7'}}>
                <PageHeader 
                    
                    title={<h1 style={{padding: 0, margin: 0}}>xPeed Studio</h1>}
                    // subTitle="This is a subtitle"
                    // extra={[
                    subTitle={[
                        <div style={{marginTop: 5}}>
                            <Link style={{margin: '0 10px' , color: '#7B7975', fontSize: 16}} exact key={"1"} to="/">Table</Link>
                            <Link style={{marginLeft: "10px", color: '#7B7975', fontSize: 16}} key={"2"} to="/get-form">Get Form</Link>
                            <a style={{marginLeft: "10px", color: '#7B7975', fontSize: 16}} key={"3"} >Update Form</a>
                        </div>
                    ]}
                />

            </div>
            <div style={{margin: 20}}>
                <Switch>
                    <Route exact path="/" component={() => <Home />} />
                    <Route path="/get-form" component={() => <GetForm />} />
                </Switch>
            </div>
            
        </Router>
        
    );
};

export default Header;