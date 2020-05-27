/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * NewEntrySheet Component - Renders action sheet for adding new entry.
 */
import * as React from 'react';
import './styles.css';
import crossIcon from '../../assets/cross-icon.svg';
import { Button } from '../Button';
import { taskTypes } from '../../constants/constants';
import { taskStatus } from '../../constants/constants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export const NewEntrySheet= (props) => {
    const [task, setTask] = React.useState(taskTypes[0]);
    const [taskstatus,setTaskStatus]=React.useState(taskStatus[0]);

    // const [hours, setHours] = React.useState('');
    // const [minutes, setMinutes] = React.useState('');
    const [remarks,setRemarks] = React.useState('');
    const [priority,setPriority]=React.useState('off');
    const [isVisible,setVisible]=React.useState(true);
    const [dueDate,setDueDate]=React.useState(new Date());
    const [id,setid]=React.useState(1);
    const onTaskChange = (event) => {
        setTask(event.target.value);
        
    };

    const onPriortyChange=()=>{
        if(priority=='off')
        {
            setPriority('on');
        }
            
        else{
            setPriority('off');
        }
            
        
    }

    const onTaskStatusChange = (event) => {
        setTaskStatus(event.target.value);
        
    };

    const handleChange = date => {
        setDueDate(date)
      };

    // const onHoursChange = (event) => {
    //     setHours(event.target.value);
    //     if(event.target.value&&minutes&&remarks)
    //     {
    //         setVisible(false);
    //     }
            
    // };

    // const onMinutesChange = (event) => {
    //     setMinutes(event.target.value);
    //     if(event.target.value&&hours&&remarks)
    //     {
    //         setVisible(false);
    //     }
    // };

    const onRemarksChange = (event)=>{
        setRemarks(event.target.value);
        if(event.target.value)
        {
            setVisible(false);
              setid(id + 1);
        }
    }

    const onAddEntry = () => {
         setid(id + 1);
        const entry = { id ,task,taskstatus,priority,dueDate,remarks };
        props.onAdd(entry);
    };

    return (
        <div className="new-entry-sheet">
            <div className="sheet-header">
                <div className="sheet-title">
                    <span className="title">Add New Entry</span>
                </div>
                <button className="close-sheet-btn" onClick={props.onClose} autoFocus>
                    <img src={crossIcon} alt="close" className="close-icon" />
                </button>
            </div>
            <div className="sheet-body">
                <div className="row">
                    <div>
                        <label className="task-input">
                            Task Type
                            <select className="task-select task-type" onChange={onTaskChange} value={task}>
                                {taskTypes.map((task) => (
                                    <option value={task}>{task}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="task-input">
                            Due Date
                            <DatePicker
                                selected={dueDate}
                                onChange={handleChange}
                                className="date-input"
                            />
                            {/* <div className="time-input-fields">
                                <div>
                                    <input
                                        type="number"
                                        placeholder="hours"
                                        className="hour-input"
                                        onChange={onHoursChange}
                                        value={hours}
                                    />
                                    <span className="time-indicator">h</span>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="minutes"
                                        className="minute-input"
                                        onChange={onMinutesChange}
                                        value={minutes}
                                    />
                                    <span className="time-indicator">m</span>
                                </div>
                            </div> */}
                        </label>
                    </div>
                    <div>
                        <label className="task-input">
                            Task Status
                            <select className="task-select task-status" onChange={onTaskStatusChange} value={taskstatus}>
                                {taskStatus.map((taskstatus) => (
                                    <option value={taskstatus}>{taskstatus}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="priority">
                            <p className="priority-tag">Priority</p>
                            <label class="switch">
                                    <input className="priority-toogle" type="checkbox" onChange={onPriortyChange}/>
                                    <span class="slider round"></span>
                            </label>
                        </label>
                    </div>
                </div>
                <div className="row remarks-margin" style={{justifyContent:'flex-start'}}>
                    <label className="remarks">
                        Remarks
                        <div className="remarks-input-fields">
                            <input
                                type="text"
                                placeholder="Remarks"
                                className="remarks-input"
                                onChange={onRemarksChange}
                                value={remarks}
                            />    
                        </div>
                    </label>
                </div>
            </div>
            <div className="sheet-footer">
                <div className="action-group">
                    <Button color={remarks ? 'primary':'secondary'} onClick={onAddEntry} disabled={isVisible} >
                        Add Entry
                    </Button>
                </div>
            </div>
        </div>
    );
};
