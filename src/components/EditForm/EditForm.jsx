import { notification } from 'antd';
import React, { Component } from 'react'
import { get_form_edit_data } from '../../services/all_services';

class EditForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      html_template: '<p>Hello World</p>',
    }
  }

  componentWillReceiveProps(props){
    this.setState({
      loading: true,
      data: [],
      id: null,
    });
  }

  componentDidMount(){
    const {id} = this.props;
    console.log({props: this.props.id});
    this.setState({id}, () => this.loadData());
  }

  loadData = async () => {
    const {id} = this.state;
    const res_form_data = await get_form_edit_data(id);
    // console.log({res_form_data});
    const { data, status, messages } = res_form_data;
    notification.destroy();
    if(status) {
      messages.map(message => {
        return notification.success({ notification: "Info Notification",message: message });
      });
      let html_template = `<div>
        <form>
          <div className="form-group">
            <label for="email">Email address</label>
            <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" required>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" className="form-control" id="password" placeholder="Password" required>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1">
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>`;
      this.setState({
        html_template,
        loading: false,
      });
      const {fields} = data;
      console.log({fields});
    }else{
      messages.map(message => {
        return notification.error({ notification: "Info Notification",message: message });
      });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {id} = this.state;
    console.log({data: e});
  };
  render() {
    return (
      // <div dangerouslySetInnerHTML={{ __html: this.state.html_template }}></div>
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" required/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required/>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default  EditForm;