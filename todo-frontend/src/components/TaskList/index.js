/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * TaskList Component - Renders list of task cards of all the tasks entered in timesheet.
 */
import * as React from 'react';
import './styles.css';
import crossIcon from '../../assets/cross-icon.svg';
import Moment from 'moment';
import { taskStatus } from '../../constants/constants';

export const TaskList = (props) => {
    let { entries } = props;
    return (
        <div className="task-list">
            {
            entries.map((entry) => (
                <TaskCard  className="taskk" entry={entry} onClose={()=>props.cardClose(entry.id)}/>
            ))}
            
        </div>
    );
};





const TaskCard = (props) => {
    
    
    let duedate;
    if(props.entry.task_points==='10')
    {
        duedate=Moment(props.entry.task_due_date).utc().format('ddd, Do MMMM YYYY, hh:mma');
    }
    else
    {
        duedate=Moment(props.entry.task_due_date).format('ddd, Do MMMM YYYY, hh:mma');
    }
//    const handleChange=(e)=>{
//         let url = 'http://localhost:5000/update-status';
//         fetch(url,{
//             method:"PUT",
//             body:JSON.stringify({
//                 id:props.entry.id,
//                 task_status:e.target.value
//             }),

//             headers:{
//                 "Content-type":"application/json; charset=UTF-8",
//                 'Accept': 'application/json'
//             }
//         }).then(res=>res.json()).then(data=>{
//             // existingTasksString=data;
//             console.log('success');
//         });
//     }
    // const [checkid,setCheckId]=React.useState([]);
    const [taskstatus,setTaskStatus]=React.useState(props.entry.task_status);
    let t;
    if(props.entry.task_status==='New')
    {
        t='#CD4436';
    }
    else if(props.entry.task_status==='In Progress')
    {
        t='#F19f0f';
    }
    else{
        t='#2AC56C';
    }
    const [titlestyle,setTitleStyle]=React.useState(t);
    const onTaskStatusChange = (event) => {
        setTaskStatus(event.target.value);
        if(event.target.value==='New')
        {
            t='#CD4436';
            setTitleStyle(t);
        }
        else if(event.target.value==='In Progress')
        {
            t='#F19f0f';
            setTitleStyle(t);
        }
        else{
            t='#2AC56C';
            setTitleStyle(t);
        }
        let url = 'https://todobackend-api.herokuapp.com/update-status';
        fetch(url,{
            method:"PUT",
            body:JSON.stringify({
                id:props.entry.id,
                task_status:event.target.value
            }),

            headers:{
                "Content-type":"application/json; charset=UTF-8",
                'Accept': 'application/json'
            }
        }).then(res=>res.json()).then(data=>{
            // existingTasksString=data;
            console.log('success');
        });
    };

    //  titlestyle='#2AC56C';
    // if(props.entry.task_status=='New')
    // {
    //     titlestyle='#CD4436';
    // }
   
    return (
        
            <div className="task-card">
            <button className="remove-task-icon" onClick={props.onClose} autoFocus>
                <img src={crossIcon} alt="close" className="cross-icon"/>
            </button>
            <div className="task-title" style={{backgroundColor:titlestyle}}>
                {props.entry.task_header}
                <span style={{float:"right",fontSize:'0.8em',marginTop:'0.2em'}}>
                    <select style={{backgroundColor:titlestyle}} className="drop" onChange={onTaskStatusChange} value={taskstatus}>
                                            {taskStatus.map((taskstatus) => (
                                                <option value={taskstatus}>{taskstatus}</option>
                                            ))}
                    </select>
                </span>
            </div>
           
           
            <div className="remarks">
                    <p className="task-remarks">{props.entry.task_description}</p>
            </div>
            <div className="task-time">
                <section>
                {<span className="card-duedate">Deadline : {duedate}</span>}
                    {
                        props.entry.task_priority==='on'?
                        <span className="priority-set" style={{backgroundColor:titlestyle}}>High</span>:<span style={{backgroundColor:titlestyle}} className="priority-set">Low</span>
                      }
                </section>
                
                {/* <Form>
                    <Form.Field>
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
                   
                    <Checkbox
                        radio
                        label='In Progress'
                        name='checkboxRadioGroup'
                        value='In Progress'
                        checked={status === 'In Progress'}
                        onChange={handleChange}
                    />
                    
                    <Checkbox
                        radio
                        label='Completed'
                        name='checkboxRadioGroup'
                        value='Completed'
                        checked={status === 'Completed'}
                        onChange={handleChange}
                    />
                    </Form.Field>
                </Form> */}
                
            </div>
            
            </div>
            

    );
};

