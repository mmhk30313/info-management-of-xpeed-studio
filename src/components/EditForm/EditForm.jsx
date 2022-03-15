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
    console.log({res_form_data});
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
        all_fields.map((cur_field) => {
          console.log({cur_field});
          const [key, value] = cur_field;
          console.log({key, value});
          value.name = key;
          value.label = value.title;
          delete value.title;
          if(value.type === 'text') {
            setText([...text, value]);
          }else if(value.type === 'email') {
            setEmail([...email, value]);
          }else if(value.type === 'password') {
            setPassword([...password, value]);
          }else if(value.type === 'textarea') {
            setTextarea([...textarea, value]);
          }else if(value.typekey === 'select') {
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
    console.log({data: e.target});
  };

  const onInputValidation = (e, message) => {
    const { value } = e.target;
    // console.log('Input value: ', value);
 
    const re = /^[A-Za-z]+$/;
    notification.destroy();
    if (value === "" || re.test(value)) {
      // setMessage(value);
    }else{
      notification.warn({ message: message }); 
    }
  }

  console.log({text, email, password, textarea, select, checkbox, radio, repeater, number});
  return (
    <div>
      <Skeleton loading={loading}>
         <form onSubmit={handleSubmit}>
           {
              text.map((field) => {
                return (
                  <div key={field.name} className="form-group">
                    <label htmlFor={field?.id || ""}>{field?.label || ""} <span style={{color: 'red'}}>{field?.required && "*"}</span></label>
                    <input type="text" 
                      onChange={(e) => field?.validate && onInputValidation(e, field?.validate || "Please enter valid input")}
                      name={field.name} 
                      className={`${field?.class || ""} form-control my-2`} id={`${field?.id || ""}`} 
                      required={field?.required || false}
                      value={field?.value || ""} 
                      data-something={field["data-something"]} 
                    />
                  </div>
                )
              })
           }
           {
              email.map((field) => {
                return (
                  <div key={field.name} className="form-group">
                    <label htmlFor={field?.html_attr?.id || ""}>{field?.label || ""} <span style={{color: 'red'}}>{field?.required && "*"}</span></label>
                    <input type="email" name={field.name} 
                      className={`${field?.html_attr?.class || ""} form-control my-2`} id={`${field?.html_attr?.id || ""}`} 
                      required={field?.required || false}
                      value={field?.value || ""} 
                      data-something={field?.html_attr["data-something"]} 
                    />
                  </div>
                )
              })
           }
           {
              password.map((field) => {
                return (
                  <div key={field.name} className="form-group">
                    <label htmlFor={field?.html_attr?.id || ""}>{field?.label || ""} <span style={{color: 'red'}}>{field?.required && "*"}</span></label>
                    <input type="password" name={field.name} 
                      className={`${field?.html_attr?.class || ""} form-control my-2`} id={`${field?.html_attr?.id || ""}`} 
                      required={field?.required || false}
                      value={field?.value || ""} 
                      data-something={field?.html_attr["data-something"]} 
                    />
                  </div>
                )
              })
           }

           {
              select.map((field) => {
                return (
                  <div key={field.name} className="form-group">
                    <label htmlFor={field?.html_attr?.id || ""}>{field?.label || ""} <span style={{color: 'red'}}>{field?.required && "*"}</span></label>
                    <select name={field.name} 
                      className={`${field?.html_attr?.class || ""} form-control my-2`} id={`${field?.html_attr?.id || ""}`} 
                      required={field?.required || false}
                      value={field?.value || ""} 
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
                              <input 
                                className="form-check-input" type="radio" 
                                name={field.name} id={`${field?.html_attr?.id || ""}`}
                                value={option.key}
                                checked={field.value === option.key ? true : false} 
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
                              <input checked={option?.value || false} className="form-check-input" type="checkbox" name={field.name} id={`${field?.html_attr?.id || ""}`} value={option.key} />
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
                                <input className="form-check-input" type="checkbox" name={field.name} id={`${field?.html_attr?.id || ""}`} value={option.key} />
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
              textarea.map((field) => {
                return (
                  <div key={field.name} className="form-group">
                    <label htmlFor={field?.html_attr?.id || ""}>{field?.label || ""} <span style={{color: 'red'}}>{field?.required && "*"}</span></label>
                    <textarea rows={3} name={field.name} 
                      className={`${field?.html_attr?.class || ""} form-control my-2`} id={`${field?.html_attr?.id || ""}`} 
                      required={field?.required || false}
                      value={field?.value || ""} 
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