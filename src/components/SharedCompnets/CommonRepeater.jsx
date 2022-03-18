import React, {useEffect, useState} from 'react';
import { Button, notification, Collapse } from 'antd';
const { Panel } = Collapse;

const CommonRepeater = (props) => {
    const {repeaters, setRepeaterData, name: repeater_key} = props;
    // const [repeater, setRepeaterState] = useState(props.repeater);

    const [lastTrackId, setLastTrackId] = useState(0);
    const [repeater_fields, setRepeater_fields] = useState({});
    const [values, setValues] = useState([]);
    const [newField, setNewField] = useState({});
    const [isLastOne, setIsLastOne] = useState(false);

    useEffect(() => {
        const {repeater_fields, value: field_values} = props?.repeater;
        setRepeater_fields(repeater_fields);
        field_values?.map((value, idx) => value.key = idx);
        const new_field_keys = Object.keys(repeater_fields);
        const new_field_values = {};
        new_field_keys.map((key) => {
            return new_field_values[key] = "";
        });
        setNewField(new_field_values);
        // console.log({repeaters});
        setLastTrackId(field_values?.length || 0);
        setValues(field_values);

    }, [repeater_key]);

    useEffect(() => {
        // const { name, label} = props.repeater;
        const filter_data = repeaters.filter(field => Object.keys(field)[0] !== repeater_key);
        // const current_data = repeaters.find(field => Object.keys(field)[0] === repeater_key);
        // console.log({filter_data, current_data});
        setRepeaterData("repeater_data", [...filter_data, {[repeater_key]: values}]);
        // console.log({values});
    }, [values]);

    const onInputValidation = ({e, ...rest}) => {
        const {id, key, type, message, myState, setMyState} = rest;
        const { value } = e.target;
        console.log('Input value: ', value);
     
        const regex = {text: /^[A-Za-z ]+$/, email: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, number: /^[0-9]*$/};

        notification.destroy();
        if (value === "" || regex[type].test(value)) {
          // setMessage(value);
          const filter_data = myState.filter(cur_data => cur_data.key !== id);
          const cur_data = myState.find(cur_data => cur_data.key === id);
        //   console.log({cur_data, filter_data});
          cur_data[key] = value;
          const new_data = [...filter_data, cur_data].sort((a, b) => a.key - b.key);
        //   console.log({new_data});
          setMyState(new_data);
          return true;
        }else if(message){
          notification.warn({top: 60, message: message, duration: 1000 });
          return false;
        }else{
            // notification.warn({ message: `${key} is not valid`, duration: 1000 });
            return false;
        }
    }

    // console.log({values});
    return (
        <Collapse defaultActiveKey={['1']} accordion className='my-4' >
            <Panel header={props?.repeater?.label} key="1">
                {/* <Card className='my-3' title={props?.repeater?.label}> */}
                    {
                        values?.length 
                        ? values?.map((fields, idx) => {
                            const field_keys_values = Object.entries(fields);
                            return (
                                <Collapse bordered={false} Collapse defaultActiveKey={['0']} accordion className='my-3' key={idx}>
                                    <Panel  header={props?.repeater?.label + "-" + (idx+1)} key={idx}>
                                        {
                                            field_keys_values.map(([key, value], idx) => {
                                                if(repeater_fields[key]?.type === 'text' || repeater_fields[key]?.type === 'email' || repeater_fields[key]?.type === 'number') {
                                                    return (
                                                        <div key={idx} className="form-group my-2">
                                                            <label className='my-2' htmlFor={repeater_fields[key]?.html_attr?.id || ""}>{repeater_fields[key]?.label || repeater_fields[key]?.title || "N/A"} 
                                                            <span style={{color: 'red'}}>{repeater_fields[key].required ? "*" : ""}</span></label>
                                                            <input 
                                                                // {...repeater_fields[key]} 
                                                                type={repeater_fields[key]?.type}
                                                                className={`form-control ${repeater_fields[key]?.html_attr?.class}`}
                                                                id={`${repeater_fields[key]?.html_attr?.id}`}
                                                                name={`${key}`}
                                                                value={value || ""}
                                                                onFocus={() => setIsLastOne(false)}
                                                                placeholder={repeater_fields[key]?.html_attr?.placeholder || "Enter " + (repeater_fields[key]?.label || repeater_fields[key]?.title || "something")}
                                                                required={repeater_fields[key]?.required || false}
                                                                onChange={e => {
                                                                    const flag = repeater_fields[key]?.validate
                                                                                    ? onInputValidation({e, ...{id:  fields.key, key, type: repeater_fields[key]?.type, message: repeater_fields[key]?.validate, myState: values, setMyState: setValues}})
                                                                                    : onInputValidation({e, ...{id:  fields.key, key, type: repeater_fields[key]?.type, message: "", myState: values, setMyState: setValues}});

                                                                    if(flag) {
                                                                        setIsLastOne(true);
                                                                    }else{
                                                                        e.target.value = value;
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                    )
                                                } else if(repeater_fields[key]?.type === "textarea"){
                                                    return (
                                                        <div key={idx} className="form-group my-2">
                                                            <label className='my-2' htmlFor={repeater_fields[key]?.html_attr?.id || ""}>{repeater_fields[key]?.label || repeater_fields[key]?.title || "N/A"} 
                                                            <span style={{color: 'red'}}>{repeater_fields[key].required ? "*" : ""}</span></label>
                                                            <textarea 
                                                                // {...repeater_fields[key]} 
                                                                rows={3}
                                                                className={`form-control ${repeater_fields[key]?.html_attr?.class}`}
                                                                id={`${repeater_fields[key]?.html_attr?.id}`}
                                                                name={`${key}`}
                                                                value={value || ""}
                                                                onFocus={() => setIsLastOne(false)}
                                                                placeholder={repeater_fields[key]?.html_attr?.placeholder || "Enter " + (repeater_fields[key]?.label || repeater_fields[key]?.title || "something")}
                                                                required={repeater_fields[key]?.required || false}
                                                                onChange={e => {
                                                                    const flag = repeater_fields[key]?.validate
                                                                                    ? onInputValidation({e, ...{id:  fields.key, key, type: repeater_fields[key]?.type, message: repeater_fields[key]?.validate, myState: values, setMyState: setValues}})
                                                                                    : onInputValidation({e, ...{id:  fields.key, key, type: repeater_fields[key]?.type, message: "", myState: values, setMyState: setValues}});

                                                                    if(flag) {
                                                                        setIsLastOne(true);
                                                                    }else{
                                                                        e.target.value = value;
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                    )
                                                }   
                                            })
                                        }
                                        <div className='d-flex justify-content-end text-uppercase my-3'>
                                            <Button type="danger" onClick={() => {
                                                if(values.length > 1) {
                                                    const last_track_key = fields?.key;
                                                    setLastTrackId(last_track_key);
                                                    setValues(prevState => prevState.filter((item) => fields.key !== item.key));
                                                    setIsLastOne(true);
                                                } 
                                                else {
                                                    // message dite hobe je r kora jabena delete.....
                                                    setIsLastOne(true);
                                                }

                                            }}>
                                                Remove
                                            </Button>
                                        </div>
                                        {
                                            values?.length === 1 && isLastOne
                                            ? <p className='text-danger text-center'>At least one should be remain in the repeater</p>
                                            : null
                                        }
                                    </Panel>
                                </Collapse>
                            )
                        })
                        : null  
                    }
                    <div>
                        <button type="button" className="btn btn-outline-success brand-bg text-light text-uppercase w-100" onClick={() => {
                            const last_track_key = lastTrackId+1;
                            setLastTrackId(last_track_key);
                            setValues(prevState => [...prevState, {
                                key: last_track_key,
                                ...newField
                            }])
                        }}>
                            Add New {props?.repeater?.label}
                        </button>
                    </div>
            </Panel>
        </Collapse>
    );
};

export default CommonRepeater;