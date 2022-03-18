import React, { Component } from 'react';
import {Card, Spin} from 'antd';
import AddForm from '../../components/AddForm/AddForm';
import EditForm from '../../components/EditForm/EditForm';
class GetForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            isEditable: false,
            id: null,
        }
    }

    componentWillMount = () => {
        const query_string = window.location.search;
        const path = new URLSearchParams(query_string);
        const param = parseInt(path.get("id"));
        // console.log({query_string, param});
        if(param){
            this.setState({id: param}, () => {
                this.setState({loading: false, isEditable: true})
            })
        }else{
            setTimeout(()=> {
                this.setState({loading: false, isEditable: false})
            }, 1000)
        }
    }

    render() {
        return (
            <Card title={<div className='text-center text-uppercase' style={{color: '#1D3B70'}}>
                {!this.state.isEditable ? "Save Info" : "Updated Info"}</div>}>
                {
                    // !this.state.loading ?
                    // : null
                    !this.state.loading
                    ?   this.state.id
                        ? <EditForm id={this.state.id}/>
                        :  <AddForm />
                    : <Spin className='d-flex justify-content-center align-self-center' />
                    
                }
            </Card>
        );
    }
}

export default GetForm;