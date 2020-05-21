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

export const TaskList = (props) => {
    let { entries } = props;
    // const [task,setTask]=React.useState(entries);
    // const [checkit,setCheckIt]=React.useState(true);
    // const [prevCheckIt,setPrevCheckIt]=React.useState(false);
    

    return (
        <div className="task-list">
            { entries.map((entry) => (
                <TaskCard entry={entry} onClose={()=>props.cardClose(entry.id)}/>
            ))}
            
        </div>
    );
};

const TaskCard = (props) => {
    const {
        entry: { task, dueDate, taskstatus,remarks },
    } = props;

    const duedate=Moment(dueDate).format('YYYY-MM-DD')
    
    return (
        <div className="task-card">
            <button className="remove-task-icon" onClick={props.onClose} autoFocus>
                <img src={crossIcon} alt="close" className="cross-icon"/>
            </button>
            <div>
                <div className="task-title">{task}</div>
                <div className="remarks">
                <p className="task-remarks">{remarks}</p></div>
            </div>
            <div className="task-time">{`Due Date: ${duedate} Task Type: ${taskstatus}`}</div>
        </div>
    );
};

