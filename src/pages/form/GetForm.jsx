import React, { Component } from 'react';
import {Card} from 'antd';
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

    componentDidMount = () => {
        const query_string = window.location.search;
        const path = new URLSearchParams(query_string);
        const param = parseInt(path.get("id"));
        console.log({query_string, param});
        if(param){
            this.setState({id: param}, () => {
                this.setState({loading: false, isEditable: false})
            })
        }else{
            setTimeout(()=> {
                this.setState({loading: false, isEditable: false})
            }, 1000)
        }
    }

    render() {
        return (
            <Card title={!this.state.isEditable ? "Add Form" : "Updated Form"} loading={this.state.loading}>
                {
                    this.state.id
                    ?  <AddForm />
                    : <EditForm id={this.state.id}/>
                }
            </Card>
        );
    }
}

export default GetForm;