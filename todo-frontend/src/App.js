/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * App Component
 */
import React from 'react';
import './App.css';
import addIcon from './assets/plus-icon.svg';
import { NewEntrySheet, IEntry } from './components/NewEntrySheet';
import { TaskList } from './components/TaskList';
import { storageKey } from './constants/constants';
import { get } from 'https';

const App = () => {
    const [isEntrySheetOpen, setIsEntrySheetOpen] = React.useState(false);
    const [entries,setEntries]=React.useState([]);
    
    const openEntrySheet = () => {
        setIsEntrySheetOpen(true);
        let url = 'http://localhost:5000/add-task';
        fetch(url).then(res=>res.json()).then(data=>{
            if(data!="empty")
            {
                setEntries(data);
                setTask(data);
            }
            else{
                setEntries([]);
                setTask([]);
            }
        });
    };

    const closeEntrySheet = () => {
        setIsEntrySheetOpen(false);
        let url = 'http://localhost:5000/add-task';
        fetch(url).then(res=>res.json()).then(data=>{
            if(data!="empty")
            {
                setEntries(data);
                setTask(data);
            }
            else{
                setEntries([]);
                setTask([]);
            }
        });
    };

    const onAddEntry = (entry) => {
        // console.log(entry);
        
        let url = 'http://localhost:5000/add-task';
        fetch(url,{
            method:"POST",
            body:JSON.stringify({
                task_header:entry.task,
                task_due_date:entry.dueDate,
                task_type : entry.task,
                task_description : entry.remarks,
                task_points : '10',
                task_status : entry.taskstatus,
                task_priority : entry.taskstatus
            }),
            headers:{
                "Content-type":"application/json; charset=UTF-8",
                'Accept': 'application/json'
            }
        }).then(res=>res.json()).then(data=>{
            // existingTasksString=data;
            console.log('success');
        });

        url = 'http://localhost:5000/add-task';
        fetch(url).then(res=>res.json()).then(data=>{
            if(data!="empty")
            {
                setEntries(data);
                setTask(data);
            }
            else{
                setEntries([]);
                setTask([]);
            }
        });
        const existingTasksString = window.localStorage.getItem(storageKey);
        if (existingTasksString) {
            const existingTasks = JSON.parse(existingTasksString);
            const newTasks = [...existingTasks, entry];
             window.localStorage.setItem(storageKey, JSON.stringify(newTasks));
        } else {
             window.localStorage.setItem(storageKey, JSON.stringify([entry]));
        }
        closeEntrySheet();
        
    };
    // const entries=[];
    const getTaskEntries = () => {
        let url = 'http://localhost:5000/add-task';
        fetch(url).then(res=>res.json()).then(data=>{
            //  alert(data);
            if(entries.length==0)
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
        // let url = 'http://localhost:5000/add-task';
        // let result=fetch(url).then(res=>res.json()).then(data=>{
        //     return data;
        //     //  console.log(entriess);
        //     // console.log('success');
        // });
        // //  const entriesString = window.localStorage.getItem(storageKey);
        // //  entriess = entriesString ? JSON.parse(entriesString) : [];
        
        // return result;
    };

    let index;
    
    const closeEntryCard = (id) => {
        // console.log(entry.id);
        // console.log("asdfaf");
        // let tasks=localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')||'{}') : [];
        // //Crossicon is working by refreshing the page or addding new stylesheet but by clicking on cross icon its value from local storage gets deleted
        // entries=task;
        let url = 'http://localhost:5000/add-task';
        fetch(url,{
            method:"PUT",
            body:JSON.stringify({
                id:id
            }),

            headers:{
                "Content-type":"application/json; charset=UTF-8",
                'Accept': 'application/json'
            }
        }).then(res=>res.json()).then(data=>{
            // existingTasksString=data;
            console.log('success');
        });
        // console.log("sadfjab");
        // for(let i=0;i<tasks.length;i++)
        // {
        //    if(tasks[i].id===entry.id){'Accept': 'application/json'
        //         index=i;
        //         tasks.splice(index,1);
        //         break;
        //    }
        // }
       // if(index === undefined) return 
    //    url = 'http://localhost:5000/add-task';
    //     fetch(url).then(res=>res.json()).then(data=>{
    //         setTask(data);
    //         setEntries(data);
    //     });
    //    setTask(tasks);
    //    if(checkit==true)
    //    {
    //     setCheckIt(false);
    //     setPrevCheckIt(true);
    //    }
    //    else{
    //     setCheckIt(true);
    //     setPrevCheckIt(false);
    //    }
        // localStorage.setItem('tasks',JSON.stringify(tasks));
        //  getTaskEntries();
         url = 'http://localhost:5000/add-task';
        fetch(url).then(res=>res.json()).then(data=>{
            if(entries.length==1)
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
            // closeEntrySheet();
    }

    
    // let entri=getTaskEntries();
    // let promise=Promise.resolve(getTaskEntries());
    // const entries=promise.then(function(val){
    //     console.log(val);
    //     return val;
    // })
    //  console.log(entries);
    const [task,setTask]=React.useState(entries);
    React.useEffect(()=>{
        let url = 'http://localhost:5000/add-task';
        fetch(url).then(res=>(res.json(),console.log(res))).then(data=>{
            if(entries.length==0)
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
      },[]);

      
    let styles;
    let i=0,hour=0,minutes=0,totaltime=0;
    // for(i=0;i<entries.length;i = i + 1)
    // {
    //     hour = hour + entries[i].hours * 60;
    //     minutes = minutes + entries[i].minutes * 1;
    // }
    // totaltime = hour + minutes;
    // if( totaltime>0 && totaltime < 240)
    //  {
    //      let w=totaltime/480;
    //     styles={backgroundColor:'red',width:`calc(100%* ${w})`, height: '.5em',borderRadius: '4px'}
    //  }
    //  else if(totaltime >= 240 && totaltime < 480) 
    //  {
    //     let w=totaltime/480;
    //      styles={backgroundColor:'orange',width:`calc(100%* ${w})`, height: '.5em',borderRadius: '4px'}
    //  } 
    //  else if(totaltime>=480) 
    //  {
    //      styles={backgroundColor:'rgb(35,174,24)',width:'100%', height: '.5em',borderRadius: '4px'}
    //  }
    //  else 
    //  {
    //      styles={backgroundColor:'#a0a4a8', height: '.5em',borderRadius: '4px'}
    //  }
     
     return (
        <div className="app-container">
            <h1>To-do List</h1>
            <section className="progress-container" >
                <div style={styles}></div>
            </section>
            <button onClick={getTaskEntries}>Refresh</button>
            {  entries.length > 0 ? (
                <TaskList entries={entries} cardClose={(id)=>closeEntryCard(id)}/>
            ) : (
                <p className="empty-text">No entries yet. Add a new entry by clicking the + button.</p>
            )}
            <button className="floating-add-entry-btn" onClick={openEntrySheet}>
                <img className="add-icon" src={addIcon} alt="add entry" />
            </button>
            {isEntrySheetOpen && <NewEntrySheet onClose={closeEntrySheet} onAdd={onAddEntry} />}
        </div>
    );
};

export default App;
