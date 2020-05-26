/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * TaskList Component - Renders list of task cards of all the tasks entered in timesheet.
 */
import * as React from 'react';
import './styles.css';
import crossIcon from '../../assets/cross-icon.svg';
import { IEntry } from '../NewEntrySheet';
 import { storageKey } from '../../constants/constants';
import Moment from 'moment';
import { Form, Checkbox } from 'semantic-ui-react';

export const TaskList = (props) => {
    let { entries } = props;
    // const [task,setTask]=React.useState(entries);
    // const [checkit,setCheckIt]=React.useState(true);
    // const [prevCheckIt,setPrevCheckIt]=React.useState(false);
    

    return (
        <div className="task-list">
            {
            entries.map((entry) => (
                <TaskCard entry={entry} onClose={()=>props.cardClose(entry.id)}/>
            ))}
            
        </div>
    );
};

const TaskCard = (props) => {
    const {
        entry: { task, dueDate, taskstatus,remarks },
    } = props;
    const [status,setStatus]=React.useState(props.entry.task_status);
    const duedate=Moment(props.entry.task_due_date).format('YYYY-MM-DD')
    const handleChange=(e)=>{
        setStatus(e.target.value);
        let url = 'http://localhost:5000/update-status';
        fetch(url,{
            method:"PUT",
            body:JSON.stringify({
                id:props.entry.id,
                task_status:e.target.value
            }),

            headers:{
                "Content-type":"application/json; charset=UTF-8",
                'Accept': 'application/json'
            }
        }).then(res=>res.json()).then(data=>{
            // existingTasksString=data;
            console.log('success');
        });
    }
    return (
        <div className="task-card">
            <button className="remove-task-icon" onClick={props.onClose} autoFocus>
                <img src={crossIcon} alt="close" className="cross-icon"/>
            </button>
            <div>
                <div className="task-title">{props.entry.task_header}</div>
                <div className="remarks">
                <p className="task-remarks">{props.entry.task_description}</p></div>
            </div>
            <div className="task-time">
                <section>
                    {`Due Date: ${duedate} Task Type: ${status}`}
                </section>
                <Form>
                    <Form.Field>
                    {/* Selected value: <b>{this.state.value}</b> */}
                    </Form.Field>
                    <Form.Field style={{display:'flex',justifyContent:'space-between'}}>
                    <Checkbox
                        radio
                        label='New'
                        name='checkboxRadioGroup'
                        value='New'
                        checked={status === 'New'}
                        onChange={handleChange}
                    />
                    {/* </Form.Field>
                    <Form.Field> */}
                    <Checkbox
                        radio
                        label='In Progress'
                        name='checkboxRadioGroup'
                        value='In Progress'
                        checked={status === 'In Progress'}
                        onChange={handleChange}
                    />
                    {/* </Form.Field>
                    <Form.Field> */}
                    <Checkbox
                        radio
                        label='Completed'
                        name='checkboxRadioGroup'
                        value='Completed'
                        checked={status === 'Completed'}
                        onChange={handleChange}
                    />
                    </Form.Field>
                </Form>

            </div>

        </div>
    );
};

