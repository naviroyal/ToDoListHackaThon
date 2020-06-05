import React from 'react';
import './App.css';
import addIcon from './assets/plus-icon.svg';
import { NewEntrySheet } from './components/NewEntrySheet';
import { TaskList } from './components/TaskList';
import {filter} from './constants/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import {Header} from './components/Header/header';
import {useLocation} from 'react-router-dom';

const App = () => {
    const [isEntrySheetOpen, setIsEntrySheetOpen] = React.useState(false);
    const [entries,setEntries]=React.useState([]);
    const [taskfilter, setTaskFilter] = React.useState(filter[0]);
    let location=useLocation();
    const openEntrySheet = () => {
        setIsEntrySheetOpen(true);
    };

    const onTaskFilterChange = (event) => {
        setTaskFilter(event.target.value);
        if(event.target.value === 'Priority')
        {
            let url = 'https://todobackend-api.herokuapp.com/task-by-priority?email='+location.state.email+'';
            fetch(url).then(res=>res.json()).then(data=>{
                if(data!=="empty")
                {
                    setEntries(data);
                    setTask(data);
                }
                else{
                    setEntries([]);
                    setTask([]);
                }
            });
        }
        else if(event.target.value === 'Due Date')
        {
            let url = 'https://todobackend-api.herokuapp.com/add-task?email='+location.state.email+'';
            fetch(url).then(res=>res.json()).then(data=>{
                if(data!=="empty")
                {
                    setEntries(data);
                    setTask(data);
                }
                else{
                    setEntries([]);
                    setTask([]);
                }
            });
        }
        else if(event.target.value === 'Label')
        {
            let url = 'https://todobackend-api.herokuapp.com/task-by-label?email='+location.state.email+'';
            fetch(url).then(res=>res.json()).then(data=>{
                if(data!=="empty")
                {
                    setEntries(data);
                    setTask(data);
                }
                else{
                    setEntries([]);
                    setTask([]);
                }
            });
        }
        
    };

    const closeEntrySheet = () => {
        setIsEntrySheetOpen(false);
    };

    const onAddEntry = (entry) => {
       
        let sheet={
            id:entry.id,
            email:location.state.email,
            task_header:entry.task,
            task_due_date:entry.dueDate,
            task_type : entry.task,
            task_description : entry.remarks,
            task_points : '20',
            task_status : entry.taskstatus,
            task_priority : entry.priority
        }
       
        let entr=[...entries,sheet];
            setEntries(entr);
       
        let url = 'https://todobackend-api.herokuapp.com/add-task';
        fetch(url,{
            method:"POST",
            body:JSON.stringify({
                id:entry.id,
                email:location.state.email,
                task_header:entry.task,
                task_due_date:entry.dueDate,
                task_type : entry.task,
                task_description : entry.remarks,
                task_points : '10',
                task_status : entry.taskstatus,
                task_priority : entry.priority
            }),
            headers:{
                "Content-type":"application/json; charset=UTF-8",
                'Accept': 'application/json'
            }
        }).then(res=>res.json()).then(data=>{
            console.log('success');
        });
        notify();
        closeEntrySheet();
        
    };
    
    const closeEntryCard = (id) => {
        console.log(id);

        let url = 'https://todobackend-api.herokuapp.com/add-task';
        fetch(url,{
            method:"PUT",
            body:JSON.stringify({
                id:id
            }),

            headers:{
                "Content-type":"application/json; charset=UTF-8",
                'Accept': 'application/json'
            }
        }).then(res=>{
            if(res.status===200)
            {
                setEntries(entries.filter( i => i.id !== id));
                return res.json();
            }   
            else
            {
                console('fail');
            }
           
        
        });
        notify();
    }

    const [task,setTask]=React.useState(entries);
    React.useEffect(()=>{
        let url = 'https://todobackend-api.herokuapp.com/add-task?email='+location.state.email+'';
        fetch(url,{
            method:"GET",
            headers:{
                "Content-type":"application/json; charset=UTF-8",
                'Accept': 'application/json'
            }
        }).then(res=>(res.json())).then(data=>{
            if(!data)
            {
                setEntries([]);
                setTask([]);
                console.log('hullu')
            }
            else{
                setEntries(data);
                setTask(data);
            }
        });
      });
    
    let hght='auto';

    const notify = () => toast.success('Success', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-success-container toast-success-container-after',
      progressClassName: css({
        background: '#2AC56C',
      }),
      });

     return (
             <div className="app-container" style={{height:hght}}>
            <ToastContainer
                className="toast-container"
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Header buttonText="LOGOUT"/>
            
            <section className="refresh-btn-container">
                <div>
                    <label className="task-input">
                        <span className="filter">Sort By</span>
                        <select  style={{border:'2px solid black'}} className="task-select task-type" onChange={onTaskFilterChange} value={taskfilter}>
                            {filter.map((task) => (
                                <option value={task}>{task}</option>
                            ))}
                        </select>
                    </label>
                </div>
            </section>
            { entries.length > 0 ? (
                    <TaskList entries={entries} cardClose={(id)=>closeEntryCard(id)}/>
                ) : (
                    <ul className="empty-text-container">
                        <li className="empty-text">No Entries yet</li>
                        <li className="empty-text">Click on + icon to create new entry</li>
                        <li className="empty-text">No need of memorize things to do just add here.</li>
                    </ul>
                )
            }
            
            <button className="floating-add-entry-btn" style={{position:'fixed'}} onClick={openEntrySheet}>
                <img className="add-icon" src={addIcon} alt="add entry" />
            </button>
            {isEntrySheetOpen && <NewEntrySheet onClose={closeEntrySheet} onAdd={onAddEntry} />}
            
        </div>   
    );
};

export default App;
