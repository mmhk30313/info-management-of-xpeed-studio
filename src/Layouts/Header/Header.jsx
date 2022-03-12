import React from 'react';
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
                    
                    title={<h2 style={{padding: 0, margin: 0}}>xPeed Studio</h2>}
                    // subTitle="This is a subtitle"
                    // extra={[
                    subTitle={[
                        <Link style={{margin: '0 7px' , color: '#7B7975'}} exact key={"1"} to="/">Table</Link>,
                        <Link style={{marginLeft: "7px", color: '#7B7975'}} key={"2"} to="/get-form">Get Form</Link>,
                        <a style={{marginLeft: "7px", color: '#7B7975'}} key={"3"} >Update Form</a>,
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