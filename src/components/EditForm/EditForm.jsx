import React, { Component } from 'react'

class EditForm extends Component {
  constructor(props){
    super(props);
    this.state = {}
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
    this.setState({id});
  }

  render() {
    const {id} = this.state;
    return (
      <div>EditForm Comes: {id}</div>
    )
  }
}

export default  EditForm;