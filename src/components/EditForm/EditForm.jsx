import { notification, Skeleton } from 'antd';
import React, { useState, useEffect } from 'react'
import { get_form_edit_data } from '../../services/all_services';

const EditForm = ({id}) => {
  // const [form_data, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState([]);
  const [number, setNumber] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [textarea, setTextarea] = useState([]);
  const [select, setSelect] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  const [radio, setRadio] = useState([]);
  const [repeater, setRepeater] = useState([]);
  // const [message, setMessage] = useState('');

  
  const loadData = async () => {
    const res_form_data = await get_form_edit_data(id);
    // console.log({res_form_data});
    const { data, status, messages } = res_form_data;
    notification.destroy();
    if(status) {
      messages.map(message => {
        return notification.success({ notification: "Info Notification",message: message });
      });
      const {fields} = data;
      try {
        const all_fields = Object.entries(fields[0]);
        console.log({all_fields});
        all_fields?.map((cur_field, idx) => {
          // console.log({cur_field});
          const [key, value] = cur_field;
          // console.log({key, value});
          value.name = key;
          value.label = value.title || value.label;
          value.id = idx;
          delete value.title;
          if(value.type === 'text') {
            setText([...text, value]);
          }else if(value.type === 'email') {
            setEmail([...email, value]);
          }else if(value.type === 'password') {
            setPassword([...password, value]);
          }else if(value.type === 'textarea') {
            setTextarea([...textarea, value]);
          }else if(value.type === 'select') {
            setSelect([...select, value]);
          }else if(value.type === 'checkbox') {
            setCheckbox([...checkbox, value]); 
          } else if(value.type === 'radio') {
            setRadio([...radio, value]);
          } else if(value.type === 'repeater') {
            setRepeater([...repeater, value]);
          }else if(value.type === 'number') {
            setNumber([...number, value]);
          } else if(value.type === 'checkbox') {
            setCheckbox([...checkbox, value]);
          }
          return null;
        })
      } catch (error) {
        console.log({error});
      } finally {
        setLoading(false);
      }

    }else{
      messages.map(message => {
        return notification.error({ notification: "Info Notification",message: message });
      });
    }
  }
  useEffect(() => {
    setText([]);
    setNumber([]);
    setEmail([]);
    setPassword([]);
    setTextarea([]);
    setSelect([]);
    setCheckbox([]);
    setRadio([]);
    setRepeater([]);
    // setMessage("");
    loadData();
  }, [""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form_data = {};
    text.map(cur_text => {
      console.log({["text_value"+cur_text.id]: e.target[cur_text.name].value});
      // form_data[cur_text.name] = cur_text.value;
       form_data[cur_text.name] = e.target[cur_text.name].value;
    });
    number.map(cur_number => {
      console.log({["number_value"+cur_number.id]: e.target[cur_number.name].value});
      // form_data[cur_number.name] = cur_number.value;
       form_data[cur_number.name] = e.target[cur_number.name].value;
    });
    email.map(cur_email => {
      console.log({["email_value"+cur_email.id]: e.target[cur_email.name].value});
      // form_data[cur_email.name] = cur_email.value;
       form_data[cur_email.name] = e.target[cur_email.name].value;
    });
    password.map(cur_password => {
      console.log({["password_value"+cur_password.id]: e.target[cur_password.name].value});
      // form_data[cur_password.name] = cur_password.value;
       form_data[cur_password.name] = e.target[cur_password.name].value;
    });
    textarea.map(cur_textarea => {
      console.log({["textarea_value"+cur_textarea.id]: e.target[cur_textarea.name].value});
      // form_data[cur_textarea.name] = cur_textarea.value;
       form_data[cur_textarea.name] = e.target[cur_textarea.name].value;
    });
    select.map(cur_select => {
      console.log({["select_value"+cur_select.id]: e.target[cur_select.name].value});
      // form_data[cur_select.name] = cur_select.value;
       form_data[cur_select.name] = e.target[cur_select.name].value;
    });
    checkbox.map(cur_checkbox => {
      console.log({["checkbox_value"+cur_checkbox.id]: e.target[cur_checkbox.name].value});
      // form_data[cur_checkbox.name] = cur_checkbox.value;
       form_data[cur_checkbox.name] = e.target[cur_checkbox.name].value;
    });
    radio.map(cur_radio => {
      console.log({["radio_value"+cur_radio.id]: e.target[cur_radio.name].value});
      // form_data[cur_radio.name] = cur_radio.value;
       form_data[cur_radio.name] = e.target[cur_radio.name].value;
    });

    const repeaters = [];
    repeater.map(cur_repeater => {
      console.log({cur_repeater});
      cur_repeater?.value?.map(cur_value => {
        console.log({cur_value});
        const value_objects = Object.entries(cur_value);
        const value_object = {};
        value_objects.map((cur_value_object, idx) => {
          const [key, value] = cur_value_object;
          value_object[key] = value;
        });
        console.log({value_object})
        repeaters.push(value_object);
      })
      // form_data.repeater.value[cur_repeater.name] = e.target[cur_repeater.name].value;
    });
    form_data.repeater = repeaters;
    console.log({form_data});
  };

  const onInputValidation = ({e, ...rest}) => {
    const {id, key, message, myState, setMyState} = rest;
    const { value } = e.target;
    // console.log('Input value: ', value);
 
    const re = {text: /^[A-Za-z ]+$/, email: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, number: /^[0-9]*$/};
    // const re = /^[A-Za-z]+$/;
    // console.log({isValidated: re[key].test(value)});
    notification.destroy();
    if (!message || value === "" || re[key].test(value)) {
      // setMessage(value);
      const filter_data = myState.filter(cur_data => cur_data.id !== id);
      const cur_data = myState.find(cur_data => cur_data.id === id);
      console.log({cur_data, filter_data});
      cur_data.value = value;
      const new_data = [...filter_data, cur_data].sort((a, b) => a.id - b.id);
      console.log({new_data});
      setMyState(new_data);
      return true;
    }else{
      notification.warn({ message: message, duration: 1000 });
      return false;
    }
  }

  console.log({text, email, password, textarea, select, checkbox, radio, repeater, number});
  return (
    <div>
      <Skeleton loading={loading}>
         <form onSubmit={handleSubmit}>
           {
              text.map((field, idx) => {
                return (
                  <div key={field.name+idx} className="form-group">
                    <label htmlFor={field?.html_attr?.id || ""}>{field?.label || ""} <span style={{color: 'red'}}>{field?.required && "*"}</span></label>
                    <input type="text" name={field.name} 
                      onChange={(e) => {
                        console.log({text_value: e.target.value});
                        if(field?.validate){
                          const flag = onInputValidation({e, key: "text", id: field?.id, myState: text, setMyState: setText, message: field?.validate || "Please enter valid input"});
                          !flag && (e.target.value = field.value);

                        } else{
                          onInputValidation({e, key: "text", id: field?.id, myState: text, setMyState: setText});
                        }
                         
                      }}
                      className={`${field?.html_attr?.class || ""} form-control my-2`} id={`${field?.html_attr?.id || ""}`} 
                      required={field?.required || false}
                      defaultValue={field?.value || ""} 
                      data-something={field["data-something"]} 
                    />
                  </div>
                )
              })
           }
           {
              email.map((field, idx) => {
                return (
                  <div key={field.name+idx} className="form-group">
                    <label htmlFor={field?.html_attr?.id || ""}>{field?.label || ""} <span style={{color: 'red'}}>{field?.required && "*"}</span></label>
                    <input type="email" name={field.name}
                      onChange={(e) => {
                        console.log({email_value: e.target.value});
                        if(field?.validate){
                          const flag = onInputValidation({e, key: "email", id: field?.id, myState: email, setMyState: setEmail, message: field?.validate || "Please enter valid input"});
                          !flag && (e.target.value = field.value);
                        } else{
                          onInputValidation({e, key: "email", id: field?.id, myState: email, setMyState: setEmail});
                        }
                      }}
                      className={`${field?.html_attr?.class || ""} form-control my-2`} id={`${field?.html_attr?.id || ""}`} 
                      required={field?.required || false}
                      defaultValue={field?.value || ""} 
                      data-something={field?.html_attr["data-something"]} 
                    />
                  </div>
                )
              })
           }
           {
              password.map((field, idx) => {
                return (
                  <div key={field.name+idx} className="form-group">
                    <label htmlFor={field?.html_attr?.id || ""}>{field?.label || ""} <span style={{color: 'red'}}>{field?.required && "*"}</span></label>
                    <input type="password" name={field.name}
                      onChange={(e) => {
                        console.log({password_value: e.target.value});
                        // if(field?.validate){
                        //   const flag = onInputValidation({e, key: "password", id: field?.id, myState: password, setMyState: setPassword, message: field?.validate || "Please enter valid input"});
                        //   !flag && (e.target.value = field.value);
                        // } else{
                        //   onInputValidation({e, key: "password", id: field?.id, myState: password, setMyState: setPassword});
                        // }
                        onInputValidation({e, key: "password", id: field?.id, myState: password, setMyState: setPassword});
                      }}
                      className={`${field?.html_attr?.class || ""} form-control my-2`} id={`${field?.html_attr?.id || ""}`} 
                      required={field?.required || false}
                      defaultValue={field?.value || ""} 
                      data-something={field?.html_attr["data-something"]} 
                    />
                  </div>
                )
              })
           }

           {
              select.map((field, idx) => {
                return (
                  <div key={field.name+idx} className="form-group">
                    <label htmlFor={field?.html_attr?.id || ""}>{field?.label || ""} <span style={{color: 'red'}}>{field?.required && "*"}</span></label>
                    <select name={field.name}
                      onChange={(e) => {
                        console.log({select_value: e.target.value});
                        // if(field?.validate){
                        //   const flag = onInputValidation({e, key: "select", id: field?.id, myState: select, setMyState: setSelect, message: field?.validate || "Please enter valid input"});
                        //   !flag && (e.target.value = field.value);
                        // } else{
                        //   onInputValidation({e, key: "select", id: field?.id, myState: select, setMyState: setSelect});
                        // }
                        onInputValidation({e, key: "select", id: field?.id, myState: select, setMyState: setSelect});
                      }} 
                      className={`${field?.html_attr?.class || ""} form-control my-2`} id={`${field?.html_attr?.id || ""}`} 
                      required={field?.required || false}
                      defaultValue={field?.value || ""} 
                      data-something={field?.html_attr["data-something"]}
                      placeholder={field?.placeholder || "Select an option"}
                    >
                      {
                        field?.options?.map((option) => {
                          return <option key={option.key} value={option.key}>{option.label}</option>
                        })
                      }
                    </select>
                  </div>
                )
              })
           }

           {
              radio.map((field, idx) => {
                return (
                  <div key={idx+field.name} className="form-group">
                    <label htmlFor={field?.html_attr?.id || ""}>{field?.label || ""} <span style={{color: 'red'}}>{field?.required && "*"}</span></label>
                    <div className="form-check">
                      {
                        field?.options?.map((option) => {
                          return (
                            <div key={option.key+idx} className="form-check form-check-inline">
                              <input type="radio" name={field.name}
                                onChange={(e) => {
                                  console.log({radio_value: e.target.value});
                                  // if(field?.validate){
                                  //   const flag = onInputValidation({e, key: "radio", id: field?.id, myState: radio, setMyState: setRadio, message: field?.validate || "Please enter valid input"});
                                  //   !flag && (e.target.value = field.value);
                                  // } else{
                                  //   onInputValidation({e, key: "radio", id: field?.id, myState: radio, setMyState: setRadio});
                                  // }
                                  onInputValidation({e, key: "radio", id: field?.id, myState: radio, setMyState: setRadio});
                                }}
                                className="form-check-input"  
                                id={`${field?.html_attr?.id || ""}`}
                                defaultValue={option.key}
                                defaultChecked={field.value === option.key ? true : false}
                                required={field?.required || false}
                              />
                              <label className="form-check-label" htmlFor={`${field?.html_attr?.id || ""}`}>{option.label}</label>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
           }

           {
              checkbox.map((field) => {
                return (
                  <div key={field.name} className="form-group">
                    <label htmlFor={field?.html_attr?.id || ""}>{field?.label || ""} <span style={{color: 'red'}}>{field?.required && "*"}</span></label>
                    <div className="form-check">
                      {
                        field?.options?.map((option) => {
                          return (
                            <div key={option.key} className="form-check form-check-inline">
                              <input type="checkbox" name={field.name}
                                onChange={(e) => {
                                  console.log({checkbox_value: e.target.value});
                                  // if(field?.validate){
                                  //   const flag = onInputValidation({e, key: "checkbox", id: field?.id, myState: checkbox, setMyState: setCheckbox, message: field?.validate || "Please enter valid input"});
                                  //   !flag && (e.target.value = field.value);
                                  // } else{
                                  //   onInputValidation({e, key: "checkbox", id: field?.id, myState: checkbox, setMyState: setCheckbox});
                                  // }
                                  onInputValidation({e, key: "checkbox", id: field?.id, myState: checkbox, setMyState: setCheckbox});
                                }}
                                defaultChecked={option?.value || false} 
                                className="form-check-input"  
                                id={`${field?.html_attr?.id || ""}`} defaultValue={option.key}
                                required={field?.required || false}
                              />
                              <label className="form-check-label" htmlFor={`${field?.html_attr?.id || ""}`}>{option.label}</label>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
           }

           {
              repeater.map(field => {
                return (
                  <div key={field.name} className="form-group">
                    <label htmlFor={field?.html_attr?.id || ""}>{field?.label || ""} <span style={{color: 'red'}}>{field?.required && "*"}</span></label>
                    <div className="form-group">
                      <div className="form-check">
                        {
                          field?.options?.map((option) => {
                            return (
                              <div key={option.key} className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name={field.name} id={`${field?.html_attr?.id || ""}`} defaultValue={option.key} />
                                <label className="form-check-label" htmlFor={`${field?.html_attr?.id || ""}`}>{option.label}</label>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                )
              })
           }

           {
              textarea.map((field, idx) => {
                return (
                  <div key={field.name+idx} className="form-group">
                    <label htmlFor={field?.html_attr?.id || ""}>{field?.label || ""} <span style={{color: 'red'}}>{field?.required && "*"}</span></label>
                    <textarea rows={3} name={field.name}
                      onChange={(e) => {
                        console.log({textarea_value: e.target.value});
                        if(field?.validate){
                          const flag = onInputValidation({e, key: "textarea", id: field?.id, myState: textarea, setMyState: setTextarea, message: field?.validate || "Please enter valid input"});
                          !flag && (e.target.value = field.value);
                        } else{
                          onInputValidation({e, key: "textarea", id: field?.id, myState: textarea, setMyState: setTextarea});
                        }
                      }}
                      className={`${field?.html_attr?.class || ""} form-control my-2`} id={`${field?.html_attr?.id || ""}`} 
                      required={field?.required || false}
                      defaultValue={field?.value || ""} 
                      data-something={field?.html_attr["data-something"]} 
                    />
                  </div>
                )
              })
           }

           <button type="submit" className="btn btn-primary">Submit</button>
         </form>
       </Skeleton>
    </div>
  );
};

// class EditForm extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       html_template: '<p>Hello World</p>',
//     }
//   }

//   componentWillReceiveProps(props){
//     this.setState({
//       id:         null,
//       loading:    true,
//       fields:     {},
//       text:       [],
//       email:      [],
//       password:   [],
//       checkbox:   [],
//       radio:      [],
//       select:     [],
//       number:     [],
//       textarea:   [],

//     });
//   }

//   componentDidMount(){
//     const {id} = this.props;
//     console.log({props: this.props.id});
//     this.setState({id}, () => this.loadData());
//   }

//   loadData = async () => {
//     const {id} = this.state;
//     const res_form_data = await get_form_edit_data(id);
//     // console.log({res_form_data});
//     const { data, status, messages } = res_form_data;
//     notification.destroy();
//     if(status) {
//       messages.map(message => {
//         return notification.success({ notification: "Info Notification",message: message });
//       });
//       this.setState({
//         loading: false,
//       });
//       const {fields} = data;
//       fields.map(field => {
//         // console.log({field});
//         const all_fields = Object.entries(field);
//         // console.log({all_fields});
//         all_fields.map((cur_field) => {
//           console.log({cur_field});
//           // const [key, value] = cur_field;
//           // console.log({key, value});
//           const {type, html_attr} = cur_field[1];
//           if(type === 'text'){

//             this.setState({
//               text: this.state.text({... cur_field[1], name: cur_field[0], ...html_attr})
//             });
//           }else if(type === 'password'){
//             this.setState({
//               type: this.state.password({... cur_field[1], name: cur_field[0], ...html_attr})
//             });
//           }
//         });
//         // const {html_attr} = field;
//         // this.setState({
//         //   [type]: [...this.state[type], {...field, ...html_attr}]
//         // });
//       })
//     }else{
//       messages.map(message => {
//         return notification.error({ notification: "Info Notification",message: message });
//       });
//     }
//   }

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     const {id} = this.state;
//     console.log({data: e});
//   };
//   render() {
//     const {loading, email, text, number, select, password, radio, textarea, checkbox} = this.state;
//     console.log({email, text, number, select, password, radio, textarea, checkbox});
//     return (
//       <Skeleton loading={this.state.loading}>
//         <form onSubmit={this.handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="exampleInputEmail1">Email address</label>
//             <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" required/>
//             <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//           </div>
//           <div className="form-group">
//             <label htmlFor="exampleInputPassword1">Password</label>
//             <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required/>
//           </div>
//           <div className="form-group form-check">
//             <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
//             <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
//           </div>
//           <button type="submit" className="btn btn-primary">Submit</button>
//         </form>
//       </Skeleton>
//     )
//   }
// }

export default  EditForm;